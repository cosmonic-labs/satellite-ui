import {createFileRoute, redirect} from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  beforeLoad({location}) {
    if (location.pathname === '/') {
      throw redirect({to: '/applications', statusCode: 302});
    }

    return {
      title: 'wasmCloud Playground',
      description: 'hosted by Cosmonic',
      breadcrumb: {
        label: 'Lattice',
        path: '/',
      },
    };
  },
});
