import {createFileRoute} from '@tanstack/react-router';

type ApplicationsNewTemplateRouteSearch = {
  manifest?: string;
};

export const Route = createFileRoute('/(applications)/applications/new_/template')({
  beforeLoad: ({context}): Partial<typeof context> => ({
    title: 'Applications > Create New Application',
    description: 'Create a new wasmCloud Application from one of the available templates.',
    breadcrumb: {
      label: 'New App from Template',
      path: '/applications/new/template',
    },
  }),
  validateSearch: (search: Record<string, unknown>): ApplicationsNewTemplateRouteSearch => ({
    manifest: (search?.manifest as string) ?? undefined,
  }),
});
