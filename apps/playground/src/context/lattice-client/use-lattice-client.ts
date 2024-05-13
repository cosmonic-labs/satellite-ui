import {useRouteContext} from '@tanstack/react-router';
import {type LatticeClient, type LatticeClientOptions} from '@wasmcloud/lattice-client-core';
import * as React from 'react';
import {type LatticeClientMap} from './lattice-client-map';
import {latticeClientContext} from '.';

function useLatticeClients(): LatticeClientMap {
  const context = React.useContext(latticeClientContext);

  if (context === undefined) {
    throw new Error('useLatticeClients must be used within a LatticeClientProvider');
  }

  return context;
}

type LatticeClientConfig = LatticeClientOptions['config'];

type UseLatticeClient = {
  client: LatticeClient;
  removeClient: () => void;
  configureClient: (config: LatticeClientConfig) => void;
};

function useLatticeClient(clientKey?: string): UseLatticeClient {
  const latticeClients = useLatticeClients();
  const rootContext = useRouteContext({strict: false});
  const key = clientKey ?? rootContext.latticeClient ?? 'default';
  const client = latticeClients.clients.get(key);

  if (client === undefined) {
    throw new Error(`Client not found at index "${key}"`);
  }

  return {
    client,
    removeClient() {
      latticeClients.removeClient(key);
    },
    configureClient(config: LatticeClientConfig) {
      latticeClients.configureClient(key, config);
    },
  };
}

function useLattice(clientKey?: string): {
  client: LatticeClient;
} {
  const {client} = useLatticeClient(clientKey);

  return {
    client,
  };
}

export {useLatticeClients, useLatticeClient, useLattice};
