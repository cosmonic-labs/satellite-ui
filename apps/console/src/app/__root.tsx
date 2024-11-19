import {TooltipProvider} from '@cosmonic/orbit-ui';
import {createRootRouteWithContext, Outlet, useMatches} from '@tanstack/react-router';
import {AppProvider} from '@/components/app-provider';
import {DevelopmentTools} from '@/components/development-tools';
import {Loader} from '@/components/loader';
import {PrimaryNavigation} from '@/components/primary-navigation';
import {Shell} from '@/components/shell';
import {LatticeClientProvider} from '@/context/lattice-client/lattice-client-provider';
import {QueryClientProvider} from '@/context/query-client/query-client-provider';
import {SettingsProvider} from '@/context/settings/settings-provider';

export type AppRouteContext = {
  title?: string;
  description?: string;
  breadcrumb?: {
    label: string;
    path: string;
    isDisabled?: boolean;
    isSkipped?: boolean;
  };
  hasNoShell?: boolean;
};

export const Route = createRootRouteWithContext<AppRouteContext>()({
  component: () => <RootRoute />,
  pendingComponent: () => <Loader />,
  beforeLoad: (): AppRouteContext => ({
    breadcrumb: undefined,
  }),
});

function RootRoute() {
  const hasNoShell = useMatches({
    select: (matches) => matches.some((match) => match.context?.hasNoShell ?? false),
  });

  return (
    <AppProvider
      components={[QueryClientProvider, LatticeClientProvider, SettingsProvider, TooltipProvider]}
    >
      {hasNoShell ? (
        <Outlet />
      ) : (
        <Shell
          slots={{
            aside: PrimaryNavigation,
            main: Outlet,
            footer: DevelopmentTools,
          }}
        />
      )}
    </AppProvider>
  );
}
