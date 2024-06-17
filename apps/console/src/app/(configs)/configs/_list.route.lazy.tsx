import {Button, Sheet, SheetContent} from '@cosmonic/orbit-ui';
import {useSuspenseQuery} from '@tanstack/react-query';
import {createLazyFileRoute, Link, Outlet, useMatches, useNavigate} from '@tanstack/react-router';
import {PlusIcon} from 'lucide-react';
import * as React from 'react';
import {Breadcrumbs} from '@/components/breadcrumbs';
import {TopBar} from '@/components/top-bar';
import {listApplicationsQueryOptions} from '@/services/lattice-queries/applications/list-application';
import {listConfigNamesQueryOptions} from '@/services/lattice-queries/configs/list-configs';
import {ConfigsTable} from '../-components/configs-table';
import {getManagedAppName} from '../-helpers/is-config-managed';

export const Route = createLazyFileRoute('/(configs)/configs/_list')({
  component: () => <ConfigsRoute />,
});

function ConfigsRoute() {
  const matches = useMatches();
  const navigate = useNavigate();
  const applicationsQuery = useSuspenseQuery({
    ...listApplicationsQueryOptions(),
    staleTime: 5000,
  });
  const configsQuery = useSuspenseQuery(listConfigNamesQueryOptions());
  const configs = configsQuery.data.sort((a, b) => a.localeCompare(b));
  const isSheetOpen = matches.some(
    (match) => match.routeId === '/configs/_list/detail/$configName',
  );
  const onOpenChange = React.useCallback(
    async (open: boolean) => {
      if (!open) await navigate({to: '/configs', replace: true});
    },
    [navigate],
  );

  const configsTableData = configs.map((config) => ({
    name: config,
    applicationName: getManagedAppName(config, applicationsQuery.data),
  }));

  return (
    <>
      <TopBar>
        <Breadcrumbs />
        <Button asChild size="xs">
          <Link to="/configs/new">
            <PlusIcon className="-ms-1 me-0.5 size-4" />
            New Config
          </Link>
        </Button>
      </TopBar>
      <ConfigsTable configs={configsTableData} isLoading={configsQuery.isFetching} />
      <Sheet open={isSheetOpen} onOpenChange={onOpenChange}>
        <SheetContent>
          <Outlet />
        </SheetContent>
      </Sheet>
    </>
  );
}
