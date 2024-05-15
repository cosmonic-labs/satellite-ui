import {useQueryClient} from '@tanstack/react-query';
import {useNavigate, useRouterState} from '@tanstack/react-router';
import {
  type LatticeClient,
  type LatticeEvent,
  LatticeEventType,
} from '@wasmcloud/lattice-client-core';
import * as React from 'react';
import {applicationQueryKeys} from '@/services/lattice-queries/applications/query-keys';
import {hostQueryKeys} from '@/services/lattice-queries/hosts/query-keys';
import {linkQueryKeys} from '@/services/lattice-queries/links/query-keys';
import {handleHostHeartbeat} from './event-handlers/host-heartbeat';
import {latticeClients} from './lattice-client-map';
import {eventLogger} from './logger';
import {latticeClientContext} from '.';

function LatticeClientProvider({children}: React.PropsWithChildren) {
  const {isConnected, isLoading} = useRedirectIfLatticeClientNotConnected();
  useLatticeEventSubscription(latticeClients.getClient());

  const value = React.useMemo(
    () => ({
      latticeClients,
      isLoading,
      isConnected,
    }),
    [isLoading, isConnected],
  );

  return <latticeClientContext.Provider value={value}>{children}</latticeClientContext.Provider>;
}

function useRedirectIfLatticeClientNotConnected(): {isConnected: boolean; isLoading: boolean} {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isConnected, setIsConnected] = React.useState(false);
  const navigate = useNavigate();
  const {location} = useRouterState();

  React.useEffect(() => {
    latticeClients
      .isConnected()
      .then((isConnected) => {
        setIsConnected(isConnected);
      })
      .catch(async () => {
        setIsConnected(false);

        if (location.pathname.startsWith('/setup')) return;

        return navigate({
          to: '/setup',
          search: {reason: 'failed-to-connect', returnTo: location.href},
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [location.href, location.pathname, navigate]);

  return {isConnected, isLoading};
}

function useLatticeEventSubscription(client: LatticeClient) {
  const queryClient = useQueryClient();

  const handleEvent = React.useCallback(
    async (event: LatticeEvent) => {
      eventLogger.log(event.type, event.data);
      switch (event.type) {
        case LatticeEventType.ComponentScaled:
        case LatticeEventType.HostStarted:
        case LatticeEventType.HostStopped:
        case LatticeEventType.HealthCheckPassed:
        case LatticeEventType.LabelsChanged:
        case LatticeEventType.ProviderStarted:
        case LatticeEventType.ProviderStopped: {
          await queryClient.invalidateQueries({queryKey: hostQueryKeys.all});
          await queryClient.invalidateQueries({queryKey: applicationQueryKeys.all});
          break;
        }

        case LatticeEventType.LinkDefinitionSet:
        case LatticeEventType.LinkDefinitionDeleted: {
          await queryClient.invalidateQueries({queryKey: applicationQueryKeys.all});
          await queryClient.invalidateQueries({queryKey: linkQueryKeys.all});
          break;
        }

        case LatticeEventType.ConfigDeleted:
        case LatticeEventType.ConfigSet: {
          // noop
          break;
        }

        case LatticeEventType.HostHeartbeat: {
          handleHostHeartbeat(event);
          break;
        }

        case LatticeEventType.ComponentScaleFailed:
        case LatticeEventType.ProviderStartFailed:
        case LatticeEventType.HealthCheckFailed:
        case LatticeEventType.HealthCheckStatus: {
          // Do nothing
          break;
        }
      }
    },
    [queryClient],
  );

  React.useEffect(() => {
    const {unsubscribe} = client.instance.subscribe(
      `wasmbus.evt.${client.instance.config.latticeId}.>`,
      handleEvent,
    );
    return () => {
      unsubscribe();
    };
  }, [client.instance, handleEvent]);
}

export {LatticeClientProvider};
