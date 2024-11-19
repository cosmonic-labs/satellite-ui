import {QueryClientConfig} from '@tanstack/react-query';
import {
  RenderHookResult,
  RenderHookOptions,
  RenderOptions,
  RenderResult,
  render,
  renderHook,
} from '@testing-library/react';
import React, {PropsWithChildren} from 'react';
import {TooltipProvider} from '@cosmonic/orbit-ui';
import createQueryClientWrapper from '@/test/create-query-client-wrapper';

type WrapQueryClientOptions = {
  wrapQueryClient?: true;
  queryConfig?: QueryClientConfig;
};

type RenderUiOptions<T> = T & WrapQueryClientOptions;

function buildComponentWrapper(
  options: RenderUiOptions<RenderOptions>,
): [React.JSXElementConstructor<PropsWithChildren>, RenderOptions] {
  const {wrapQueryClient, queryConfig, wrapper, ...renderOptions} = options || {};

  const componentTree = ({children}: PropsWithChildren): JSX.Element => {
    let componentTree: JSX.Element = <TooltipProvider>{children}</TooltipProvider>;
    if (wrapper) {
      const Wrapper = wrapper;
      componentTree = <Wrapper>{componentTree}</Wrapper>;
    }

    if (wrapQueryClient) {
      const QueryClientWrapper = createQueryClientWrapper(queryConfig);
      componentTree = <QueryClientWrapper>{componentTree}</QueryClientWrapper>;
    }

    return componentTree;
  };

  return [componentTree, renderOptions];
}

/**
 * Render the given component within an app context.
 *
 * @param ui - the component to render
 * @param options - options to enabled wrappers (extends {@link @testing-library/react#RenderOptions})
 * @returns the render result (including store if redux was wrapped)
 * @see {@link https://testing-library.com/docs/react-testing-library/api#render-options}
 */
export default function renderApp(
  ui: JSX.Element,
  options: RenderUiOptions<RenderOptions> = {},
): RenderResult {
  const [wrapper, renderOptions] = buildComponentWrapper(options);
  return render(ui, {wrapper, ...renderOptions});
}

/**
 * Render the given hook within an app context.
 *
 * @param render - the component to render
 * @param options - options to enabled wrappers (extends {@link @testing-library/react-hooks#RenderHookOptions})
 * @returns the render result (including store if redux was wrapped)
 * @see {@link https://react-hooks-testing-library.com/reference/api#renderhook}
 */
export function renderAppHook<Result, Props>(
  render: (initialProps: Props) => Result,
  options: RenderUiOptions<RenderHookOptions<Props>> = {},
): RenderHookResult<Result, Props> {
  const [wrapper, renderOptions] = buildComponentWrapper(options);

  return renderHook(render, {wrapper, ...renderOptions});
}
