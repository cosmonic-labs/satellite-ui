import {useNavigate, useSearch} from '@tanstack/react-router';
import {ChevronLeftIcon} from 'lucide-react';
import * as React from 'react';
import {LatticeSettingsForm} from '@/app/(settings)/-components/lattice-settings-form';
import {useLatticeClient} from '@/context/lattice-client/use-lattice-client';
import {SetupScrollerButton} from './setup-scroller';

function SetupConfigureLattice() {
  const {client, key, name} = useLatticeClient();
  const {returnTo, reason} = useSearch({from: '/setup'});
  const navigate = useNavigate();
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-lg">Configure Lattice Settings</h1>
        <p className="text-sm">Adjust your default lattice connection</p>
      </div>
      <LatticeSettingsForm
        className="py-0"
        latticeClientConfig={client.instance.config}
        latticeKey={key}
        latticeName={name}
        closeButton={
          <SetupScrollerButton ref={buttonRef} isPrevious variant="secondary">
            <ChevronLeftIcon className="-ms-2 me-2 size-4" /> Back
          </SetupScrollerButton>
        }
        onSuccess={async () => {
          if (reason === 'failed-to-connect') {
            if (returnTo) {
              await client.instance.connect();
              await navigate({to: returnTo});
            } else {
              navigate({to: '/'}).catch(() => null);
            }
          } else {
            buttonRef.current?.click();
          }
        }}
      />
    </div>
  );
}

export {SetupConfigureLattice};
