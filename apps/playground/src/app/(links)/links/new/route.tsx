import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/(links)/links/new')({
  beforeLoad: () => ({
    title: 'Links > New',
    description: 'Create a new link between two components or a component and a providers',
    breadcrumb: {
      label: 'New',
      path: '/links/new',
    },
  }),
});
