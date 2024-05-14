import * as React from 'react';
import {type LatticeClientMap} from './lattice-client-map';

export type LatticeClientContextValue = {
  latticeClients: LatticeClientMap;
  isLoading: boolean;
  isConnected: boolean;
};

const latticeClientContext = React.createContext<LatticeClientContextValue | undefined>(undefined);

export {latticeClients} from './lattice-client-map';
export {latticeClientContext};
