import {ChevronRightIcon} from 'lucide-react';
import {SetupScrollerButton} from './setup-scroller';

function SetupFailedToConnect() {
  return (
    <div>
      <div className="mb-4">
        <h1 className="text-lg">Oops!</h1>
        <p className="text-sm">
          We couldn&rsquo;t connect to the server. Please check your connection and try again.
        </p>
      </div>
      <div className="flex justify-end">
        <SetupScrollerButton isNext>
          Settings
          <ChevronRightIcon className="-me-2 ms-2 size-4" />
        </SetupScrollerButton>
      </div>
    </div>
  );
}

export {SetupFailedToConnect};
