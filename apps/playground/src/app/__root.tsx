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
  breadcrumb?: {
    label: string;
    path: string;
    isDisabled?: boolean;
    isSkipped?: boolean;
  };
  isNakedRoute?: boolean;
};

export const Route = createRootRouteWithContext<AppRouteContext>()({
  component: () => <RootRoute />,
  pendingComponent: () => <Loader />,
  beforeLoad: () => ({
    breadcrumb: undefined,
  }),
});

function RootRoute() {
  const isNakedRoute = useMatches({
    select: (matches) => matches.some((match) => match.context.isNakedRoute),
  });

  return (
    <AppProvider
      components={[QueryClientProvider, LatticeClientProvider, SettingsProvider, TooltipProvider]}
    >
      {isNakedRoute ? (
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
