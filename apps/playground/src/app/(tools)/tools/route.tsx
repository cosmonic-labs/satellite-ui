import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/(tools)/tools')({
  beforeLoad: ({context}): Partial<typeof context> => ({
    title: 'Tools',
    description: 'Tools for interacting with the wasmCloud lattice.',
    breadcrumb: {
      label: 'Tools',
      path: '/tools',
      isDisabled: true,
    },
  }),
});
