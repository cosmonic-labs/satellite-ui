import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/(configs)/configs/new')({
  beforeLoad: () => ({
    title: 'Configs > New',
    description: 'Create a new config on your wasmCloud lattice',
    breadcrumb: {
      label: 'New',
      path: '/applications/new',
    },
  }),
});
