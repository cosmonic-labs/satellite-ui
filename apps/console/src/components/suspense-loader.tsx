import * as React from 'react';
import {Loader} from './loader';

function SuspenseLoader({children}: React.PropsWithChildren): React.ReactElement {
  return <React.Suspense fallback={<Loader />}>{children}</React.Suspense>;
}

export {SuspenseLoader};
