import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/(links)/links/_list/')({
  beforeLoad: () => ({
    title: 'Links',
    description: 'All of the hosts on the connected lattice',
    breadcrumb: {
      label: 'Links',
      path: '/links',
    },
  }),
});
