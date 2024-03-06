import * as React from 'react';
import {type LatticeClientMap} from './lattice-client-map';

const latticeClientContext = React.createContext<LatticeClientMap | undefined>(undefined);

export {latticeClients} from './lattice-client-map';
export {latticeClientContext};
