import {queryOptions} from '@tanstack/react-query';
import {latticeClients} from '@/context/lattice-client';
import {linkQueryKeys} from './query-keys';

async function listLinks() {
  const client = latticeClients.getClient();
  const result = await client.links.list();

  if (!result.success) {
    throw new Error(result.message);
  }

  return result.response;
}

function listLinksQueryOptions() {
  return queryOptions({
    queryKey: linkQueryKeys.list(),
    queryFn: async () => listLinks(),
  });
}

export {listLinks, listLinksQueryOptions};
