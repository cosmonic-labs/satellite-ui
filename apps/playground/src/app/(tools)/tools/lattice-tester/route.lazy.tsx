import {createLazyFileRoute} from '@tanstack/react-router';
import {LatticeRequestTester} from '@/app/(tools)/-components/lattice-request-tester';
import {Breadcrumbs} from '@/components/breadcrumbs';
import {Container} from '@/components/container';
import {PageContent} from '@/components/page-content';
import {PageWrapper} from '@/components/page-wrapper';
import {TopBar} from '@/components/top-bar';

export const Route = createLazyFileRoute('/(tools)/tools/lattice-tester')({
  component: ToolsLatticeTesterRoute,
});

function ToolsLatticeTesterRoute() {
  return (
    <PageWrapper>
      <TopBar>
        <Breadcrumbs />
      </TopBar>
      <PageContent>
        <Container>
          <LatticeRequestTester />
        </Container>
      </PageContent>
    </PageWrapper>
  );
}
