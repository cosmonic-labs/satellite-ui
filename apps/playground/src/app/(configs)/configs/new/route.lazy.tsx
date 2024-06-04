import {PageHeader} from '@cosmonic/orbit-ui';
import {createLazyFileRoute} from '@tanstack/react-router';
import {NewConfigForm} from '@/app/(configs)/-components/new-config-form';
import {Breadcrumbs} from '@/components/breadcrumbs';
import {Container} from '@/components/container';
import {PageContent} from '@/components/page-content';
import {PageWrapper} from '@/components/page-wrapper';
import {TopBar} from '@/components/top-bar';

export const Route = createLazyFileRoute('/(configs)/configs/new')({
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
          <PageHeader title="Create New Config" />
          <NewConfigForm />
        </Container>
      </PageWrapper>
    </PageContent>
  );
}
