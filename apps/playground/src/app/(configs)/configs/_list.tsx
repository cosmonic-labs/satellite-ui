import {createFileRoute} from '@tanstack/react-router';
import {queryClient} from '@/context/query-client/query-client-instance';
import {listConfigNamesQueryOptions} from '@/services/lattice-queries/configs/list-configs';

export const Route = createFileRoute('/(configs)/configs/_list')({
  beforeLoad: () => ({
    title: 'Hosts',
    description: 'All of the hosts on the connected lattice',
    breadcrumb: {
      label: 'Hosts',
      path: '/infrastructure/hosts',
    },
  }),
  async loader() {
    await queryClient.ensureQueryData(listConfigNamesQueryOptions());
  },
});
