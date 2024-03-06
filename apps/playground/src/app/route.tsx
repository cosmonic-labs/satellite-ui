import {createFileRoute, redirect} from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
  beforeLoad({context, location}): Partial<typeof context> {
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

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  );
}
