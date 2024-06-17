import {queryOptions} from '@tanstack/react-query';
import {latticeClients} from '@/context/lattice-client';
import {hostQueryKeys} from './query-keys';

async function getHost(id: string) {
  const client = latticeClients.getClient();
  const result = await client.hosts.get(id);

  if (!result.success) {
    throw new Error(result.message);
  }

  return result.response;
}

function getHostQueryOptions(id: string) {
  return queryOptions({
    queryKey: hostQueryKeys.detail(id),
    queryFn: async () => getHost(id),
  });
}

export {getHost, getHostQueryOptions};
