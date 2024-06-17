import {queryOptions} from '@tanstack/react-query';
import {latticeClients} from '@/context/lattice-client';
import {applicationQueryKeys} from './query-keys';

async function getApplicationDetail(name: string) {
  const client = latticeClients.getClient();
  const manifestResponse = await client.applications.detail(name);
  return manifestResponse.detail;
}

function applicationDetailQueryOptions(name: string) {
  return queryOptions({
    queryKey: applicationQueryKeys.detail(name),
    queryFn: async () => getApplicationDetail(name),
  });
}

export {applicationDetailQueryOptions};
