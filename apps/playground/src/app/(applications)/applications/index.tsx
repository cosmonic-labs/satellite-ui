import {createFileRoute} from '@tanstack/react-router';
import {queryClient} from '@/context/query-client/query-client-instance';
import {listApplicationsQueryOptions} from '@/services/lattice-queries/applications/list-application';

export const Route = createFileRoute('/(applications)/applications/')({
  beforeLoad: () => ({
    title: 'Applications',
    description: 'Applications',
    breadcrumb: undefined,
  }),
  async loader() {
    await queryClient.ensureQueryData(listApplicationsQueryOptions());
  },
});
