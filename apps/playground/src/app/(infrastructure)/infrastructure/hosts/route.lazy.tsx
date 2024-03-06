import {Button, Sheet, SheetContent} from '@cosmonic/orbit-ui';
import {useSuspenseQuery} from '@tanstack/react-query';
import {createLazyFileRoute, Link, Outlet, useMatches, useNavigate} from '@tanstack/react-router';
import {PlusIcon} from 'lucide-react';
import * as React from 'react';
import {HostsTable} from '@/app/(infrastructure)/-components/hosts-table';
import {Breadcrumbs} from '@/components/breadcrumbs';
import {TopBar} from '@/components/top-bar';
import {listHostsQueryOptions} from '@/services/lattice-queries/hosts/list-hosts';

export const Route = createLazyFileRoute('/(infrastructure)/infrastructure/hosts')({
  component: () => <InfrastructureHostsRoute />,
});

function InfrastructureHostsRoute() {
  const matches = useMatches();
  const navigate = useNavigate();
  const hostsQuery = useSuspenseQuery(listHostsQueryOptions());
  const hosts = hostsQuery.data.sort((a, b) => a.id.localeCompare(b.id));
  const isSheetOpen = matches.some((match) => match.routeId === '/infrastructure/hosts/$hostId');
  const onOpenChange = React.useCallback(
    async (open: boolean) => {
      if (!open) await navigate({to: '/infrastructure/hosts', replace: true});
    },
    [navigate],
  );

  return (
    <>
      <TopBar>
        <Breadcrumbs />
        <Button asChild size="xs">
          <Link to="/applications/new/template">
            <PlusIcon className="-ms-1 me-0.5 size-4" />
            New App
          </Link>
        </Button>
      </TopBar>
      <HostsTable hosts={hosts} isLoading={hostsQuery.isFetching} />
      <Sheet open={isSheetOpen} onOpenChange={onOpenChange}>
        <SheetContent>
          <Outlet />
        </SheetContent>
      </Sheet>
    </>
  );
}
