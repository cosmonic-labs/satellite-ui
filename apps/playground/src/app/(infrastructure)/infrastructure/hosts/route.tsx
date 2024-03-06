import {createFileRoute} from '@tanstack/react-router';
import {queryClient} from '@/context/query-client/query-client-instance';
import {listHostDetailsQueryOptions} from '@/services/lattice-queries/hosts/list-hosts';

export const Route = createFileRoute('/(infrastructure)/infrastructure/hosts')({
  beforeLoad: () => ({
    title: 'Hosts',
    description: 'All of the hosts on the connected lattice',
    breadcrumb: {
      label: 'Hosts',
      path: '/infrastructure/hosts',
    },
  }),
  async loader() {
    await queryClient.ensureQueryData(listHostDetailsQueryOptions());
  },
});
