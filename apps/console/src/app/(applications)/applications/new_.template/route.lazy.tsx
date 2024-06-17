import {PageHeader} from '@cosmonic/orbit-ui';
import {createLazyFileRoute} from '@tanstack/react-router';
import {Breadcrumbs} from '@/components/breadcrumbs';
import {Container} from '@/components/container';
import {PageContent} from '@/components/page-content';
import {PageWrapper} from '@/components/page-wrapper';
import {TopBar} from '@/components/top-bar';
import {NewAppTemplateForm} from './-components/new-app-template-form';

export const Route = createLazyFileRoute('/(applications)/applications/new/template')({
  component: () => <ApplicationsNewTemplateRoute />,
});

function ApplicationsNewTemplateRoute() {
  return (
    <PageWrapper>
      <TopBar>
        <Breadcrumbs />
      </TopBar>
      <PageContent>
        <Container>
          <PageHeader title="Create a new Managed Application" />
          <NewAppTemplateForm />
        </Container>
      </PageContent>
    </PageWrapper>
  );
}
