import {createFileRoute, useSearch} from '@tanstack/react-router';

const REASONS = ['failed-to-connect', 'unknown'] as const;

type SetupRouteParameters = {
  reason?: (typeof REASONS)[number];
  returnTo?: string;
};

function checkReason(reason: string): reason is (typeof REASONS)[number] {
  return (REASONS as readonly string[]).includes(reason);
}

export const Route = createFileRoute('/(setup)/setup')({
  component: () => <SetupRoute />,
  validateSearch(parameters: Record<string, unknown>): SetupRouteParameters {
    if (parameters.reason && typeof parameters.reason === 'string') {
      if (checkReason(parameters.reason)) return {reason: parameters.reason};

      return {reason: 'unknown'};
    }

    return {};
  },
});

function SetupRoute() {
  const parameters = useSearch({from: '/setup'});
  return <div>{parameters.reason ?? ''}</div>;
}
