import {createFileRoute} from '@tanstack/react-router';

type ApplicationsNewRouteSearch = {
  'app-name'?: string;
  'app-version'?: string;
  'manifest'?: string;
};

export const Route = createFileRoute('/(applications)/applications/new')({
  beforeLoad: () => ({
    title: 'Applications',
    description: 'Applications',
    breadcrumb: {
      label: 'New',
      path: '/applications/new',
    },
  }),
  validateSearch(search: Record<string, unknown>): ApplicationsNewRouteSearch {
    return {
      'app-name': search['app-name'] as string,
      'app-version': search['app-version'] as string,
      'manifest': search.manifest as string,
    };
  },
});
