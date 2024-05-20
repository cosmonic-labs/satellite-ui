import {createFileRoute, notFound, useParams} from '@tanstack/react-router';
import {SheetLatticeSettingsForm} from '@/app/(settings)/-components/sheet-lattice-settings-form';
import {useLatticeClient} from '@/context/lattice-client/use-lattice-client';

export const Route = createFileRoute('/(settings)/settings/lattice/$latticeKey')({
  component: () => <SettingsLatticeDetailRoute />,
});

function SettingsLatticeDetailRoute() {
  const {latticeKey} = useParams({from: '/settings/lattice/$latticeKey'});
  const {client, name} = useLatticeClient(latticeKey);

  if (!client) {
    throw notFound();
  }

  return (
    <SheetLatticeSettingsForm
      latticeKey={latticeKey}
      latticeName={name}
      latticeClientConfig={client.instance.config}
    />
  );
}
