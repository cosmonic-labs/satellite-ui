import {cn} from '@cosmonic/orbit-ui';
import {DeploymentStatus} from '@wasmcloud/lattice-client-core';
import {cva} from 'class-variance-authority';
import * as React from 'react';

const statusBadgeStyles = cva('rounded-full px-2.5 py-0.5 font-medium uppercase tracking-wide', {
  variants: {
    status: {
      failed: 'bg-red-400 text-red-900',
      reconciling: 'bg-yellow-400 text-yellow-900',
      deployed: 'bg-green-400 text-green-900',
      waiting: 'bg-blue-400 text-blue-900',
      undeployed: 'bg-gray-400 text-gray-900',
      unknown: 'bg-gray-400 text-gray-900',
    },
  },
});

type StatusBadgeProps = {
  readonly status: DeploymentStatus;
};

function StatusBadge({status}: StatusBadgeProps): React.ReactElement {
  return <div className={cn(statusBadgeStyles({status}))}>{status}</div>;
}

export {StatusBadge};
