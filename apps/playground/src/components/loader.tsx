import {Loader2Icon} from 'lucide-react';
import * as React from 'react';

function Loader(): React.ReactElement {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center">
        <Loader2Icon className="size-8 animate-spin text-primary" />
        <div className="mt-4 text-primary">Loading...</div>
      </div>
    </div>
  );
}

export {Loader};
