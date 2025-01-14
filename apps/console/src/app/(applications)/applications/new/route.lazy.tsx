import {createLazyFileRoute} from '@tanstack/react-router';
import {NewApplicationForm} from '@/app/(applications)/-components/new-application-form';
import {Breadcrumbs} from '@/components/breadcrumbs';
import {PageContent} from '@/components/page-content';
import {PageWrapper} from '@/components/page-wrapper';
import {TopBar} from '@/components/top-bar';

export const Route = createLazyFileRoute('/(applications)/applications/new')({
  component: () => <ApplicationsNewRoute />,
});

function ApplicationsNewRoute() {
  return (
    <PageWrapper>
      <TopBar>
        <Breadcrumbs />
      </TopBar>
      <PageContent>
        <NewApplicationForm />
      </PageContent>
    </PageWrapper>
  );
}
