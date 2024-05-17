import {PageHeader} from '@cosmonic/orbit-ui';
import {createLazyFileRoute} from '@tanstack/react-router';
import {LatticeSelection} from '@/app/(settings)/-components/lattice-selection';
import {Container} from '@/components/container';
import {PageContent} from '@/components/page-content';
import {PageWrapper} from '@/components/page-wrapper';

export const Route = createLazyFileRoute('/(settings)/settings/lattice/')({
  component: () => <SettingsLatticeRoute />,
});

function SettingsLatticeRoute() {
  return (
    <PageWrapper>
      <PageContent>
        <Container>
          <PageHeader title="Lattice Settings" className="text-primary" />
          <LatticeSelection />
        </Container>
      </PageContent>
    </PageWrapper>
  );
}
