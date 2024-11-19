import {QueryClient, QueryClientConfig, QueryClientProvider} from '@tanstack/react-query';
import React, {PropsWithChildren} from 'react';

/** @internal use `import {renderApp} from 'test'` instead */
export default function createQueryClientWrapper(
  config: QueryClientConfig = {},
): React.JSXElementConstructor<PropsWithChildren> {
  const {defaultOptions, ...passedQueryConfig} = config;
  const {queries, ...passedDefaultOptions} = defaultOptions ?? {};
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        ...queries,
      },
      ...passedDefaultOptions,
    },
    ...passedQueryConfig,
  });

  return ({children}) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
