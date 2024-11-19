import {DeploymentStatus} from '@wasmcloud/lattice-client-core';
import {cva} from 'class-variance-authority';
import * as React from 'react';
import {StatusBadge} from './status-badge';

const versionBadgeStyles = cva(
  'inline-flex items-center gap-2 rounded-full border-2 border-border ps-2.5 font-semibold',
  {
    variants: {
      status: {
        reconciling: 'border-yellow-400',
        deployed: 'border-green-400',
        failed: 'border-red-400',
        undeployed: 'border-gray-400',
        unknown: 'border-gray-400',
      },
    },
  },
);

function VersionStatusBadge({
  status,
  version,
}: {
  readonly version?: string;
  readonly status: DeploymentStatus;
}): React.ReactElement {
  return (
    <div className={versionBadgeStyles({status})}>
      {version}
      <StatusBadge status={status} />
    </div>
  );
}

export {VersionStatusBadge};
