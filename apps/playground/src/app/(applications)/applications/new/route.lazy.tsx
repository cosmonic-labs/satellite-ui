import {createLazyFileRoute} from '@tanstack/react-router';
import {NewApplicationForm} from '@/app/(applications)/-components/new-application-form';
import {Breadcrumbs} from '@/components/breadcrumbs';
import {TopBar} from '@/components/top-bar';

export const Route = createLazyFileRoute('/(applications)/applications/new')({
  component: () => <ApplicationsNewRoute />,
});

function ApplicationsNewRoute() {
  return (
    <>
      <TopBar>
        <Breadcrumbs />
      </TopBar>
      <NewApplicationForm />
    </>
  );
}
