import {Button, SheetClose, SheetHeader, SheetTitle} from '@cosmonic/orbit-ui';
import {createLazyFileRoute, notFound, useNavigate, useParams} from '@tanstack/react-router';
import {CircuitBoardIcon} from 'lucide-react';
import * as React from 'react';
import {LatticeSettingsForm} from '@/app/(settings)/-components/lattice-settings-form';
import {useLatticeClient} from '@/context/lattice-client/use-lattice-client';

export const Route = createLazyFileRoute('/(settings)/settings/lattice/$latticeKey')({
  component: () => <SettingsLatticeDetailRoute />,
});

function SettingsLatticeDetailRoute() {
  const {latticeKey} = useParams({from: '/(settings)/settings/lattice/$latticeKey'});
  const {client, name} = useLatticeClient(latticeKey);
  const navigate = useNavigate();

  const handleClose = React.useCallback(
    async () => navigate({to: '/settings/lattice', replace: true}),
    [navigate],
  );

  if (!client) {
    throw notFound();
  }

  return (
    <>
      <SheetHeader>
        <div className="flex items-center gap-2 text-primary">
          <CircuitBoardIcon />
          <SheetTitle className="text-lg font-semibold">Edit Lattice Connection</SheetTitle>
        </div>
      </SheetHeader>
      <LatticeSettingsForm
        latticeKey={latticeKey}
        latticeName={name}
        latticeClientConfig={client.instance.config}
        closeButton={
          <SheetClose asChild>
            <Button variant="secondary">Cancel</Button>
          </SheetClose>
        }
        onSuccess={handleClose}
      />
    </>
  );
}
