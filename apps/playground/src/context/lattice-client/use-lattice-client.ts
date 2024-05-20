import {type LatticeClient, type LatticeClientOptions} from '@wasmcloud/lattice-client-core';
import {useLatticeClientsContext} from '.';

type LatticeClientConfig = LatticeClientOptions['config'];

type UseLatticeClient = {
  key: string;
  name: string;
  client: LatticeClient;
  isConnected: boolean;
  isLoading: boolean;
  removeClient: () => void;
  configureClient: (config: LatticeClientConfig) => void;
};

function useLatticeClient(key?: string): UseLatticeClient {
  const {latticeClients, isConnected, isLoading} = useLatticeClientsContext();
  const selectedKey = key ?? latticeClients.selectedKey();
  const entry = latticeClients.getEntry(selectedKey);

  return {
    key: selectedKey,
    name: entry.name,
    client: entry.client,
    isConnected,
    isLoading,
    removeClient() {
      latticeClients.removeEntry(selectedKey);
    },
    configureClient(config: LatticeClientConfig) {
      latticeClients.updateEntry(selectedKey, {
        config,
      });
    },
  };
}

export {useLatticeClient};

export {useLatticeClientsContext} from '.';
