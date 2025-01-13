import {
  type HostHeartbeatEvent,
  type WasmCloudHost,
  type WasmCloudHostRef,
} from '@wasmcloud/lattice-client-core';
import {queryClient} from '@/context/query-client/query-client-instance';
import {hostQueryKeys} from '@/services/lattice-queries/hosts/query-keys';

function handleHostHeartbeat(event: HostHeartbeatEvent): void {
  queryClient.setQueryData<WasmCloudHost>(
    hostQueryKeys.detail(event.id),
    (existingHost): WasmCloudHost | undefined => {
      if (!existingHost) return;
      return {
        ...existingHost,
        uptime_seconds: event.data.uptime_seconds,
      };
    },
  );
  queryClient.setQueryData<WasmCloudHostRef[]>(hostQueryKeys.list(), (existingHosts) => {
    if (!existingHosts) return;
    return existingHosts.map((host) => {
      if (host.id !== event.data.host_id) return host;
      return {
        ...host,
        uptime_seconds: event.data.uptime_seconds,
      };
    });
  });
  queryClient.setQueryData<WasmCloudHost[]>(hostQueryKeys.listExpanded(), (existingHosts) => {
    if (!existingHosts) return;
    return existingHosts.map((host) => {
      if (host.host_id !== event.data.host_id) return host;
      return {
        ...host,
        uptime_seconds: event.data.uptime_seconds,
      };
    });
  });
}

export {handleHostHeartbeat};
