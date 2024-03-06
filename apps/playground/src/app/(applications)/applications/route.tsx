import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/(applications)/applications')({
  beforeLoad: () => ({
    title: 'Applications',
    description: 'Applications',
    breadcrumb: {
      label: 'Applications',
      path: '/applications',
    },
  }),
});
