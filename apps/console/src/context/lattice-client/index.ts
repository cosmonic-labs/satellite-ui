import * as React from 'react';
import {type LatticeClientMap} from './lattice-client-map';

export type LatticeClientContextValue = {
  latticeClients: LatticeClientMap;
  isLoading: boolean;
  isConnected: boolean;
};

const latticeClientContext = React.createContext<LatticeClientContextValue | undefined>(undefined);

function useLatticeClientsContext(): LatticeClientContextValue {
  const context = React.useContext(latticeClientContext);

  if (context === undefined) {
    throw new Error('useLatticeClients must be used within a LatticeClientProvider');
  }

  return context;
}

export {latticeClients} from './lattice-client-map';
export {useLatticeClientsContext, latticeClientContext};
