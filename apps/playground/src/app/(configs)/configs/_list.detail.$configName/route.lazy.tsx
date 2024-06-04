import {useSuspenseQuery} from '@tanstack/react-query';
import {createLazyFileRoute, useParams} from '@tanstack/react-router';
import {ConfigDetailSheetContent} from '@/app/(configs)/-components/config-details-sheet-content';
import {getManagedAppName} from '@/app/(configs)/-helpers/is-config-managed';
import {listApplicationsQueryOptions} from '@/services/lattice-queries/applications/list-application';
import {getConfigQueryOptions} from '@/services/lattice-queries/configs/get-config';

export const Route = createLazyFileRoute('/(configs)/configs/_list/detail/$configName')({
  component: () => <InfrastructureHostsDetailRoute />,
});

function InfrastructureHostsDetailRoute() {
  const {configName} = useParams({from: '/configs/_list/detail/$configName'});
  const query = useSuspenseQuery(getConfigQueryOptions(configName));
  const applications = useSuspenseQuery(listApplicationsQueryOptions());

  const appName = getManagedAppName(configName, applications.data);

  return <ConfigDetailSheetContent config={query.data} appName={appName} />;
}
