import {createFileRoute} from '@tanstack/react-router';
import {queryClient} from '@/context/query-client/query-client-instance';
import {listLinksQueryOptions} from '@/services/lattice-queries/links/list-links';

export const Route = createFileRoute('/(links)/links/_list')({
  async loader() {
    await queryClient.ensureQueryData(listLinksQueryOptions());
  },
});
