import {Dialog, DialogContent, DialogOverlay, DialogPortal} from '@cosmonic/orbit-ui';
import {createFileRoute, useSearch} from '@tanstack/react-router';
import {SetupFirstTime} from './-components/setup-first-time';
import {SetupScroller} from './-components/setup-scroller';
import {SetupStep} from './-components/setup-step';
import {SetupTutorial} from './-components/setup-tutorial';

const REASONS = ['failed-to-connect', 'first-time', 'unknown'] as const;
type SetupReason = (typeof REASONS)[number];

type SetupRouteParameters = {
  reason?: SetupReason;
  returnTo?: string;
};

function isValidReason(reason: string): reason is SetupReason {
  return (REASONS as readonly string[]).includes(reason);
}

export const Route = createFileRoute('/(settings)/setup')({
  beforeLoad: () => ({
    isNakedRoute: true,
  }),
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
    <Dialog open>
      <DialogContent hasNoClose>
        <SetupScroller>
          <SetupStep>{parameters.reason}</SetupStep>
          {parameters.reason === 'first-time' && (
            <SetupStep>
              <SetupFirstTime />
            </SetupStep>
          )}
          {parameters.reason === 'failed-to-connect' && (
            <SetupStep>
              <SetupTutorial />
            </SetupStep>
          )}
        </SetupScroller>
      </DialogContent>
    </Dialog>
  );
}
