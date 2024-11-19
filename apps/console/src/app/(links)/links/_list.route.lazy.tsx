import {Button, Sheet, SheetContent} from '@cosmonic/orbit-ui';
import {useSuspenseQuery} from '@tanstack/react-query';
import {createLazyFileRoute, Link, Outlet, useMatches, useNavigate} from '@tanstack/react-router';
import {PlusIcon} from 'lucide-react';
import * as React from 'react';
import {Breadcrumbs} from '@/components/breadcrumbs';
import {TopBar} from '@/components/top-bar';
import {listApplicationsQueryOptions} from '@/services/lattice-queries/applications/list-application';
import {listLinksQueryOptions} from '@/services/lattice-queries/links/list-links';
import {LinksTable} from '../-components/links-table';
import {getManagedAppNameFromLink} from '../-helpers/get-managed-app-name-from-link';

export const Route = createLazyFileRoute('/(links)/links/_list')({
  component: () => <LinksRoute />,
});

function LinksRoute() {
  const matches = useMatches();
  const navigate = useNavigate();
  const isSheetOpen = matches.some(
    (match) => match.routeId === '/(configs)/configs/_list/detail/$configName',
  );
  const onOpenChange = React.useCallback(
    async (open: boolean) => {
      if (!open) await navigate({to: '/configs', replace: true});
    },
    [navigate],
  );

  const applicationsQuery = useSuspenseQuery(listApplicationsQueryOptions());
  const linksQuery = useSuspenseQuery(listLinksQueryOptions());

  const linksTableData = linksQuery.data.map((link) => ({
    link,
    applicationName: getManagedAppNameFromLink(link, applicationsQuery.data),
  }));

  return (
    <>
      <TopBar>
        <Breadcrumbs />
        <Button asChild size="xs">
          <Link to="/links/new">
            <PlusIcon className="-ms-1 me-0.5 size-4" />
            New Link
          </Link>
        </Button>
      </TopBar>
      <LinksTable data={linksTableData} isLoading={linksQuery.isFetching} />
      <Sheet open={isSheetOpen} onOpenChange={onOpenChange}>
        <SheetContent>
          <Outlet />
        </SheetContent>
      </Sheet>
    </>
  );
}
