import {queryOptions} from '@tanstack/react-query';
import {latticeClients} from '@/context/lattice-client';
import {applicationQueryKeys} from './query-keys';

function applicationVersionsQueryOptions(name: string) {
  return queryOptions({
    queryKey: applicationQueryKeys.versions(name),
    async queryFn() {
      const client = latticeClients.getClient();
      const response = await client.applications.versions(name);
      return response.versions;
    },
  });
}

export {applicationVersionsQueryOptions};
