import {FormSection, PageHeader, Sheet, SheetContent} from '@cosmonic/orbit-ui';
import {createLazyFileRoute, Outlet, useMatches, useNavigate} from '@tanstack/react-router';
import * as React from 'react';
import {LatticeSelection} from '@/app/(settings)/-components/lattice-selection';
import {Breadcrumbs} from '@/components/breadcrumbs';
import {Container} from '@/components/container';
import {PageContent} from '@/components/page-content';
import {PageWrapper} from '@/components/page-wrapper';
import {TopBar} from '@/components/top-bar';

export const Route = createLazyFileRoute('/(settings)/settings/lattice')({
  component: () => <SettingsLatticeRoute />,
});

function SettingsLatticeRoute() {
  const matches = useMatches();
  const navigate = useNavigate();
  const isSheetOpen = matches.some(
    (match) => match.routeId === '/(settings)/settings/lattice/$latticeKey',
  );
  const onOpenChange = React.useCallback(
    async (open: boolean) => {
      if (!open) await navigate({to: '/settings/lattice', replace: true});
    },
    [navigate],
  );

  return (
    <>
      <PageWrapper>
        <PageContent>
          <TopBar>
            <Breadcrumbs />
          </TopBar>
          <Container>
            <PageHeader title="Lattice Settings" />
            <FormSection
              title="Lattice Connections"
              description="Lattice connections are made directly between your browser and the lattice. You will need to be able to reach the lattice directly. Data will remain in your browser and will not be sent to any server."
            >
              <LatticeSelection />
            </FormSection>
          </Container>
        </PageContent>
      </PageWrapper>
      <Sheet open={isSheetOpen} onOpenChange={onOpenChange}>
        <SheetContent>
          <Outlet />
        </SheetContent>
      </Sheet>
    </>
  );
}
