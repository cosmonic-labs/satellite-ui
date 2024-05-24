import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/(settings)/settings/lattice')({
  beforeLoad: () => ({
    title: 'Lattice',
    description: 'Lattice',
    breadcrumb: {
      label: 'Lattice Settings',
      path: '/settings/lattice',
    },
  }),
});
