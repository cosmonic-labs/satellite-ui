import {queryOptions} from '@tanstack/react-query';
import {type WasmCloudHost, type WasmCloudHostRef} from '@wasmcloud/lattice-client-core';
import {latticeClients} from '@/context/lattice-client';
import {hostQueryKeys} from './query-keys';

async function listHosts<Expand extends boolean>(
  expand?: Expand,
): Promise<Expand extends true ? WasmCloudHost[] : WasmCloudHostRef[]>;
async function listHosts(expand?: boolean): Promise<WasmCloudHost[] | WasmCloudHostRef[]> {
  const client = latticeClients.getClient();
  const result = await client.hosts.list({expand});

  if (!result.success) {
    throw new Error(result.message);
  }

  return result.response;
}

function listHostsQueryOptions() {
  return queryOptions({
    queryKey: hostQueryKeys.list(),
    queryFn: async () => listHosts(false),
  });
}

function listHostDetailsQueryOptions() {
  return queryOptions({
    queryKey: hostQueryKeys.listExpanded(),
    queryFn: async () => listHosts(true),
  });
}

export {listHosts, listHostsQueryOptions, listHostDetailsQueryOptions};
