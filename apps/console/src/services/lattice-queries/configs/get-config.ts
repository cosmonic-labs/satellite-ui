import {queryOptions} from '@tanstack/react-query';
import {type WasmCloudConfig} from '@wasmcloud/lattice-client-core';
import {latticeClients} from '@/context/lattice-client';
import {configQueryKeys} from './query-keys';

async function getConfig(name: string) {
  const client = latticeClients.getClient();
  const result = await client.configs.get(name);

  if (!result.success) {
    throw new Error(result.message);
  }

  const config: WasmCloudConfig = {
    name,
    entries: result.response,
  };

  return config;
}

function getConfigQueryOptions(name: string) {
  return queryOptions({
    queryKey: configQueryKeys.detail(name),
    queryFn: async () => getConfig(name),
  });
}

export {getConfig, getConfigQueryOptions};
