import {Tooltip, TooltipContent, TooltipTrigger} from '@cosmonic/orbit-ui';
import {DeploymentStatus} from '@wasmcloud/lattice-client-core';
import {cva} from 'class-variance-authority';
import * as React from 'react';
import {versionLooksLikeULID} from '@/app/(applications)/-helpers/version-looks-like-ulid';
import {StatusBadge} from './status-badge';

const versionBadgeStyles = cva(
  'inline-flex items-center gap-2 rounded-full border-2 border-border ps-2.5 text-sm font-medium',
  {
    variants: {
      status: {
        reconciling: 'border-yellow-400',
        deployed: 'border-green-400',
        failed: 'border-red-400',
        waiting: 'border-blue-400',
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
  const StatusText = React.useMemo(() => {
    function StatusText() {
      return version && versionLooksLikeULID(version) ? (
        <Tooltip delayDuration={0}>
          <TooltipContent>{version}</TooltipContent>
          <TooltipTrigger>{version.slice(0, 8)}...</TooltipTrigger>
        </Tooltip>
      ) : (
        version
      );
    }

    StatusText.displayName = 'StatusText';
    return StatusText;
  }, [version]);

  StatusText.displayName = 'StatusText';

  return (
    <div className={versionBadgeStyles({status})}>
      <StatusText />
      <StatusBadge status={status} />
    </div>
  );
}

export {VersionStatusBadge};
