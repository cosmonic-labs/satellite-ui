import {PageHeader} from '@cosmonic/orbit-ui';
import {createFileRoute} from '@tanstack/react-router';
import {Container} from 'lucide-react';
import {LatticeSettingsForm} from '@/app/(settings)/-components/lattice-settings-form';
import {PageContent} from '@/components/page-content';
import {PageWrapper} from '@/components/page-wrapper';

export const Route = createFileRoute('/(settings)/settings/lattice/$lattice')({
  component: () => <SettingsLatticeDetailRoute />,
});

function SettingsLatticeDetailRoute() {
  return (
    <PageWrapper>
      <PageContent>
        <Container>
          <PageHeader title="Lattice" className="text-primary" />
          <LatticeSettingsForm />
        </Container>
      </PageContent>
    </PageWrapper>
  );
}
