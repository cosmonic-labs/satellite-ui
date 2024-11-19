import {useSuspenseQuery} from '@tanstack/react-query';
import {createLazyFileRoute, useParams} from '@tanstack/react-router';
import {HostDetailSheetContent} from '@/app/(infrastructure)/-components/host-detail-sheet-content';
import {getHostQueryOptions} from '@/services/lattice-queries/hosts/get-host';

export const Route = createLazyFileRoute('/(infrastructure)/infrastructure/hosts/$hostId')({
  component: () => <InfrastructureHostsDetailRoute />,
});

function InfrastructureHostsDetailRoute() {
  const {hostId} = useParams({from: '/(infrastructure)/infrastructure/hosts/$hostId'});
  const query = useSuspenseQuery(getHostQueryOptions(hostId));
  return <HostDetailSheetContent host={query.data} />;
}
