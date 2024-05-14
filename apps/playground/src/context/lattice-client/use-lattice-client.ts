import {type LatticeClient, type LatticeClientOptions} from '@wasmcloud/lattice-client-core';
import * as React from 'react';
import {latticeClientContext, type LatticeClientContextValue} from '.';

function useLatticeClients(): LatticeClientContextValue {
  const context = React.useContext(latticeClientContext);

  if (context === undefined) {
    throw new Error('useLatticeClients must be used within a LatticeClientProvider');
  }

  return context;
}

type LatticeClientConfig = LatticeClientOptions['config'];

type UseLatticeClient = {
  client: LatticeClient;
  isConnected: boolean;
  isLoading: boolean;
  removeClient: () => void;
  configureClient: (config: LatticeClientConfig) => void;
};

function useLatticeClient(key?: string): UseLatticeClient {
  const {latticeClients, isConnected, isLoading} = useLatticeClients();
  const selectedKey = key ?? latticeClients.selectedKey;
  const client = latticeClients.getClient(selectedKey);

  return {
    client,
    isConnected,
    isLoading,
    removeClient() {
      latticeClients.removeClient(selectedKey);
    },
    configureClient(config: LatticeClientConfig) {
      latticeClients.configureClient(selectedKey, config);
    },
  };
}

export {useLatticeClients, useLatticeClient};
