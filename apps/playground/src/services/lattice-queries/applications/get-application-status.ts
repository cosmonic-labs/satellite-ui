import {queryOptions} from '@tanstack/react-query';
import {latticeClients} from '@/context/lattice-client';
import {applicationQueryKeys} from './query-keys';

async function getApplicationStatus(name: string) {
  const client = latticeClients.getClient();
  const response = await client.applications.status(name);
  return response.status;
}

function applicationStatusQueryOptions(name: string) {
  return queryOptions({
    queryKey: applicationQueryKeys.status(name),
    queryFn: async () => getApplicationStatus(name),
  });
}

export {applicationStatusQueryOptions};
