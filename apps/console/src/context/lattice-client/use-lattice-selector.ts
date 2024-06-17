import * as React from 'react';
import {type LatticeClientConfig, type LatticeClientEntry} from './lattice-client-map';
import {useLatticeClientsContext} from '.';

type UseLatticeSelector = {
  selectedKey: () => string;
  clientsMap: Map<string, LatticeClientEntry>;
  selectLattice: (key: string) => void;
  addEntry: (entry: {name: string; config: LatticeClientConfig}) => void;
  removeEntry: (key: string) => void;
  updateEntry: (
    key: string,
    entry: {
      name?: string;
      config?: LatticeClientConfig;
    },
  ) => void;
};

function useLatticeSelector(): UseLatticeSelector {
  const {latticeClients} = useLatticeClientsContext();
  // React.useSyncExternalStore(latticeClients.subscribe, latticeClients.getSnapshot);

  const result = React.useMemo(
    () =>
      ({
        selectedKey: latticeClients.selectedKey,
        clientsMap: latticeClients.clients,
        selectLattice: latticeClients.selectLattice,
        addEntry(entry) {
          latticeClients.addEntry(entry.name, entry.config);
        },
        removeEntry(key) {
          latticeClients.removeEntry(key);
        },
        updateEntry(key, entry) {
          latticeClients.updateEntry(key, entry);
        },
      }) satisfies UseLatticeSelector,
    [latticeClients],
  );

  return result;
}

export {useLatticeSelector};
