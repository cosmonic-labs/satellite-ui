import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/(configs)/configs/_list/')({
  beforeLoad: () => ({
    title: 'Configs',
    description: 'All of the configs on the connected lattice',
    breadcrumb: {
      label: 'Configs',
      path: '/configs',
    },
  }),
});
