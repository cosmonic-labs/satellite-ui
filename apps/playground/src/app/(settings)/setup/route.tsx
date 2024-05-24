import {Dialog, DialogContent} from '@cosmonic/orbit-ui';
import {createFileRoute} from '@tanstack/react-router';
import * as React from 'react';
import {useLocalStorage} from 'usehooks-ts';
import {PG_INITIALIZED} from '@/helpers/local-storage-keys';
import {SetupConfigureLattice} from './-components/setup-configure-lattice';
import {SetupHealthCheck} from './-components/setup-health-check';
import {SetupScroller} from './-components/setup-scroller';
import {SetupStep} from './-components/setup-step';

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
    hasNoShell: true,
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
  const [isInitialized, setIsInitialized] = useLocalStorage(PG_INITIALIZED, false);

  React.useEffect(() => {
    if (isInitialized) return;
    setIsInitialized(true);
  }, [isInitialized, setIsInitialized]);

  return (
    <Dialog open>
      <DialogContent hasNoClose>
        <SetupScroller>
          <SetupStep>
            <SetupHealthCheck />
          </SetupStep>
          <SetupStep>
            <SetupConfigureLattice />
          </SetupStep>
        </SetupScroller>
      </DialogContent>
    </Dialog>
  );
}
