import {queryOptions} from '@tanstack/react-query';
import {latticeClients} from '@/context/lattice-client';
import {configQueryKeys} from './query-keys';

async function getConfig(name: string) {
  const client = latticeClients.getClient();
  const result = await client.configs.get(name);

  if (!result.success) {
    throw new Error(result.message);
  }

  return result.response;
}

function getConfigQueryOptions(name: string) {
  return queryOptions({
    queryKey: configQueryKeys.detail(name),
  });
}

export {getConfig, getConfigQueryOptions};
