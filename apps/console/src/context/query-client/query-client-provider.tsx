import {QueryClientProvider as QueryClientProviderRoot} from '@tanstack/react-query';
import React from 'react';
import {queryClient} from './query-client-instance';

function QueryClientProvider({children}: React.PropsWithChildren): React.ReactElement {
  return <QueryClientProviderRoot client={queryClient}>{children}</QueryClientProviderRoot>;
}

export {QueryClientProvider};
