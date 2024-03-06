import {queryOptions} from '@tanstack/react-query';
import {latticeClients} from '@/context/lattice-client';
import {applicationQueryKeys} from './query-keys';

async function listApplications() {
  const client = latticeClients.getClient();
  const result = await client.applications.list();

  if (result.result !== 'success') {
    throw new Error(result.message);
  }

  return result.models;
}

function listApplicationsQueryOptions() {
  return queryOptions({
    queryKey: applicationQueryKeys.list(),
    queryFn: async () => listApplications(),
  });
}

export {listApplications, listApplicationsQueryOptions};
