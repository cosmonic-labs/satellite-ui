import {queryOptions} from '@tanstack/react-query';
import {latticeClients} from '@/context/lattice-client';
import {applicationQueryKeys} from './query-keys';

function applicationManifestQueryOptions(name: string, version?: string) {
  return queryOptions({
    queryKey: applicationQueryKeys.manifest(name, version),
    async queryFn() {
      const client = latticeClients.getClient();
      const response = await client.applications.manifest(name, version);
      return response.manifest;
    },
  });
}

export {applicationManifestQueryOptions};
