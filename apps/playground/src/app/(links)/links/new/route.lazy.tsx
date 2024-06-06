import {PageHeader} from '@cosmonic/orbit-ui';
import {createLazyFileRoute} from '@tanstack/react-router';
import {NewLinkForm} from '@/app/(links)/-components/new-link-form';
import {Breadcrumbs} from '@/components/breadcrumbs';
import {Container} from '@/components/container';
import {PageContent} from '@/components/page-content';
import {PageWrapper} from '@/components/page-wrapper';
import {TopBar} from '@/components/top-bar';

export const Route = createLazyFileRoute('/(links)/links/new')({
  component: () => <ApplicationsNewRoute />,
});

function ApplicationsNewRoute() {
  return (
    <PageContent>
      <TopBar>
        <Breadcrumbs />
      </TopBar>
      <PageWrapper>
        <Container>
          <PageHeader title="Create New Link" />
          <NewLinkForm />
          <div className="h-16 md:h-24" />
        </Container>
      </PageWrapper>
    </PageContent>
  );
}
