import {PageHeader, Sheet, SheetContent} from '@cosmonic/orbit-ui';
import {createLazyFileRoute, Outlet, useMatches, useNavigate} from '@tanstack/react-router';
import * as React from 'react';
import {LatticeSelection} from '@/app/(settings)/-components/lattice-selection';
import {Container} from '@/components/container';
import {PageContent} from '@/components/page-content';
import {PageWrapper} from '@/components/page-wrapper';

export const Route = createLazyFileRoute('/(settings)/settings/lattice')({
  component: () => <SettingsLatticeRoute />,
});

function SettingsLatticeRoute() {
  const matches = useMatches();
  const navigate = useNavigate();
  const isSheetOpen = matches.some((match) => match.routeId === '/settings/lattice/$latticeKey');
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
          <Container>
            <PageHeader title="Lattice Settings" className="text-primary" />
            <LatticeSelection />
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
