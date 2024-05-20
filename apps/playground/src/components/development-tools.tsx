import * as React from 'react';
import {EnvironmentEnum, isInEnvironment} from '@/helpers/environment';

const shouldEnableDevelopmentTools =
  isInEnvironment(EnvironmentEnum.Local) || isInEnvironment(EnvironmentEnum.Staging);

const ReactQueryDevelopmentTools = React.lazy(async () =>
  shouldEnableDevelopmentTools
    ? import('@tanstack/react-query-devtools/build/modern/production.js').then((d) => ({
        default: d.ReactQueryDevtools,
      }))
    : Promise.resolve({default: () => null}),
);

const TanStackRouterDevelopmentTools = React.lazy(async () =>
  shouldEnableDevelopmentTools
    ? import('@tanstack/router-devtools').then((d) => ({
        default: d.TanStackRouterDevtools,
      }))
    : Promise.resolve({default: () => null}),
);

type DevelopmentToolsProps = {
  readonly tools?: {
    router?: boolean;
    queryClient?: boolean;
  };
};

function DevelopmentTools({
  tools: {router = true, queryClient = true} = {router: true, queryClient: true},
}: DevelopmentToolsProps): React.ReactElement {
  return (
    <React.Suspense fallback={null}>
      {router && <TanStackRouterDevelopmentTools />}
      {queryClient && <ReactQueryDevelopmentTools />}
    </React.Suspense>
  );
}

export {DevelopmentTools};
