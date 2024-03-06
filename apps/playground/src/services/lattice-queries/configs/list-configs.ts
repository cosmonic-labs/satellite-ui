import {type WasmCloudConfig} from '@cosmonic/lattice-client-core';
import {queryOptions} from '@tanstack/react-query';
import {latticeClients} from '@/context/lattice-client';
import {configQueryKeys} from './query-keys';

async function listConfigs<Expand extends boolean>(
  expand?: Expand,
): Promise<Expand extends true ? WasmCloudConfig[] : string[]>;
async function listConfigs(expand?: boolean): Promise<WasmCloudConfig[] | string[]> {
  const client = latticeClients.getClient();
  const result = await client.configs.list({expand});

  if (!result.success) {
    throw new Error(result.message);
  }

  return result.response;
}

function listConfigEntriesQueryOptions() {
  return queryOptions({
    queryKey: configQueryKeys.list(),
    queryFn: async () => listConfigs(true),
  });
}

function listConfigNamesQueryOptions() {
  return queryOptions({
    queryKey: configQueryKeys.listExpanded(),
    queryFn: async () => listConfigs(false),
  });
}

export {listConfigs, listConfigEntriesQueryOptions, listConfigNamesQueryOptions};
