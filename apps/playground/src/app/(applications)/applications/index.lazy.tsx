import {Button} from '@cosmonic/orbit-ui';
import {useSuspenseQuery} from '@tanstack/react-query';
import {Link, createLazyFileRoute, useRouterState} from '@tanstack/react-router';
import {PlusIcon} from 'lucide-react';
import {ApplicationsTable} from '@/app/(applications)/-components/applications-table';
import {Breadcrumbs} from '@/components/breadcrumbs';
import {TopBar} from '@/components/top-bar';
import {listApplicationsQueryOptions} from '@/services/lattice-queries/applications/list-application';

export const Route = createLazyFileRoute('/(applications)/applications/')({
  component: Applications,
});

function Applications() {
  const {isLoading} = useRouterState();
  const {data: applications} = useSuspenseQuery(listApplicationsQueryOptions());

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
      <ApplicationsTable applications={applications} isLoading={isLoading} />
    </>
  );
}
