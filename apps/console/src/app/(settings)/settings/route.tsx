import {createFileRoute, redirect} from '@tanstack/react-router';

export const Route = createFileRoute('/(settings)/settings')({
  beforeLoad({location}) {
    if (location.pathname === '/settings') {
      throw redirect({to: '/settings/lattice', statusCode: 301});
    }

    return {
      title: 'Settings',
      description: 'Settings',
      breadcrumb: {
        label: 'Settings',
        path: '/settings',
      },
    };
  },
});
