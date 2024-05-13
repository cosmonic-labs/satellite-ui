import {TooltipProvider} from '@cosmonic/orbit-ui';
import {createRootRouteWithContext, Outlet} from '@tanstack/react-router';
import {type LatticeClient} from '@wasmcloud/lattice-client-core';
import {AppProvider} from '@/components/app-provider';
import {DevelopmentTools} from '@/components/development-tools';
import {Loader} from '@/components/loader';
import {PrimaryNavigation} from '@/components/primary-navigation';
import {Shell} from '@/components/shell';
import {type LatticeClientMap} from '@/context/lattice-client/lattice-client-map';
import {LatticeClientProvider} from '@/context/lattice-client/lattice-client-provider';
import {QueryClientProvider} from '@/context/query-client/query-client-provider';
import {SettingsProvider} from '@/context/settings/settings-provider';

export type AppRouteContext = {
  title: string;
  latticeClient: string;
  latticeClients: LatticeClientMap;
  getClient: (context: AppRouteContext) => LatticeClient;
  description?: string;
  breadcrumb?: {
    label: string;
    path: string;
    isDisabled?: boolean;
    isSkipped?: boolean;
  };
};

export const Route = createRootRouteWithContext<AppRouteContext>()({
  component: () => <RootRoute />,
  pendingComponent: () => <Loader />,
});

function RootRoute() {
  return (
    <AppProvider
      components={[QueryClientProvider, SettingsProvider, LatticeClientProvider, TooltipProvider]}
    >
      <Shell
        slots={{
          aside: PrimaryNavigation,
          main: Outlet,
          footer: DevelopmentTools,
        }}
      />
    </AppProvider>
  );
}
