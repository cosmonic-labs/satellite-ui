import {createFileRoute} from '@tanstack/react-router';
import {queryClient} from '@/context/query-client/query-client-instance';
import {listConfigNamesQueryOptions} from '@/services/lattice-queries/configs/list-configs';

export const Route = createFileRoute('/(configs)/configs/_list')({
  async loader() {
    await queryClient.ensureQueryData(listConfigNamesQueryOptions());
  },
});
