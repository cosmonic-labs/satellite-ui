import {canConnect} from '@wasmcloud/lattice-client-core';
import {LoaderCircleIcon} from 'lucide-react';
import React from 'react';

type LatticeStatusProps = {
  readonly url: string;
  readonly isShort?: boolean;
};

function LatticeStatus({url, isShort}: LatticeStatusProps) {
  const [isChecking, setIsChecking] = React.useState(false);
  const [isValidConnection, setIsValidConnection] = React.useState(false);

  React.useEffect(() => {
    if (!url) return;
    setIsChecking(true);
    (async () => {
      setIsValidConnection(await canConnect(url));
      setIsChecking(false);
    })();
  }, [url]);

  return (
    <span className="font-normal text-muted-foreground">
      {isChecking ? (
        <span className="inline">
          <span className="inline-block">
            <LoaderCircleIcon className="mb-[-0.2em] me-[0.2em] size-[1.1em] animate-spin" />
          </span>
          Checking connection...
        </span>
      ) : url ? (
        isValidConnection ? (
          <span>
            <StatusDot isValid />
            Connected
          </span>
        ) : (
          <span>
            <StatusDot isValid={false} />
            Unable to connect
          </span>
        )
      ) : null}
    </span>
  );
}

function StatusDot({isValid}: {readonly isValid: boolean}) {
  return (
    <span className="inline-block">
      <span
        className={`mb-[0.1em] me-[0.5em] ms-[0.25em] block size-[0.5em] rounded-full ${isValid ? 'bg-green-400' : 'bg-slate-500'}`}
      />
    </span>
  );
}

export {LatticeStatus};
