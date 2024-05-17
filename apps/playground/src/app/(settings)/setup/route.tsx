import {createFileRoute, useSearch} from '@tanstack/react-router';
import {SetupTutorial} from '../-components/setup-tutorial';

const REASONS = ['failed-to-connect', 'first-time', 'unknown'] as const;

type SetupRouteParameters = {
  reason?: (typeof REASONS)[number];
  returnTo?: string;
};

function isValidReason(reason: string): reason is (typeof REASONS)[number] {
  return (REASONS as readonly string[]).includes(reason);
}

export const Route = createFileRoute('/(settings)/setup')({
  component: () => <SetupRoute />,
  validateSearch(parameters: Record<string, unknown>): SetupRouteParameters {
    if (parameters.reason && typeof parameters.reason === 'string') {
      if (isValidReason(parameters.reason)) return {reason: parameters.reason};

      return {reason: 'unknown'};
    }

    return {};
  },
});

function SetupRoute() {
  const parameters = useSearch({from: '/setup'});
  return (
    <div>
      <SetupTutorial />
      {parameters.reason ?? ''}
    </div>
  );
}
