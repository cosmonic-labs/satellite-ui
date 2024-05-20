import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/(settings)/settings/lattice/$latticeKey')({
  beforeLoad: ({params}) => ({
    breadcrumb: {
      label: 'Host Detail',
      path: `/settings/lattice/${params.latticeKey}`,
    },
  }),
});
