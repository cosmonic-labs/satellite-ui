import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/(tools)/tools/lattice-tester')({
  beforeLoad: ({context}): Partial<typeof context> => ({
    title: 'Tools > Lattice Tester',
    description: 'Send NATS requests across the connected wasmCloud lattice.',
    breadcrumb: {
      label: 'Lattice Tester',
      path: '/tools/lattice-tester',
    },
  }),
});
