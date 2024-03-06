import {QueryClientProvider as QueryClientProviderRoot} from '@tanstack/react-query';
import {queryClient} from './query-client-instance';

function QueryClientProvider({children}: React.PropsWithChildren): JSX.Element {
  return <QueryClientProviderRoot client={queryClient}>{children}</QueryClientProviderRoot>;
}

export {QueryClientProvider};
