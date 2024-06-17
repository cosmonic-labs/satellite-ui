import {createLazyFileRoute} from '@tanstack/react-router';
import {NewApplicationForm} from '@/app/(applications)/-components/new-application-form';
import {Breadcrumbs} from '@/components/breadcrumbs';
import {Container} from '@/components/container';
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
        <Container>
          <NewApplicationForm />
        </Container>
      </PageContent>
    </PageWrapper>
  );
}
