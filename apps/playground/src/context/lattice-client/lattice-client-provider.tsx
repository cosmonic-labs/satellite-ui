import {type PropsWithChildren} from 'react';
import {latticeClients} from './lattice-client-map';
import {latticeClientContext} from '.';

function LatticeClientProvider({children}: PropsWithChildren) {
  return (
    <latticeClientContext.Provider value={latticeClients}>{children}</latticeClientContext.Provider>
  );
}

export {LatticeClientProvider};
