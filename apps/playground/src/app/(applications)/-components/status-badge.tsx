import {cn} from '@cosmonic/orbit-ui';
import {DeploymentStatus} from '@wasmcloud/lattice-client-core';
import {cva} from 'class-variance-authority';
import * as React from 'react';

const statusBadgeStyles = cva('rounded-full px-2.5 py-0.5 font-medium uppercase tracking-wide', {
  variants: {
    status: {
      [DeploymentStatus.Failed]: 'bg-red-400 text-red-900',
      [DeploymentStatus.Reconciling]: 'bg-yellow-400 text-yellow-900',
      [DeploymentStatus.Deployed]: 'bg-green-400 text-green-900',
      [DeploymentStatus.Undeployed]: 'bg-gray-400 text-gray-900',
      [DeploymentStatus.Unknown]: 'bg-gray-400 text-gray-900',
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
