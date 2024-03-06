import {type VariantProps, cva} from 'class-variance-authority';
import * as React from 'react';
import {cn} from '@/util/cn.js';

enum EntityStatus {
  Healthy = 'Healthy',
  Fail = 'Fail',
  Warn = 'Warn',
  Unavailable = 'Unavailable',
}

const textColor = cva('', {
  variants: {
    status: {
      [EntityStatus.Healthy]: 'text-green-700 dark:text-green-500',
      [EntityStatus.Fail]: 'text-red-700 dark:text-red-500',
      [EntityStatus.Warn]: 'text-orange-700 dark:text-orange-500',
      [EntityStatus.Unavailable]: 'text-gray-700 dark:text-gray-500',
    } satisfies Record<EntityStatus, string>,
  },
});

const backgroundColor = cva(
  'size-2 rounded-full bg-current after:absolute after:inline-flex after:size-2 after:animate-ping after:rounded-full after:bg-current after:opacity-80',
  {
    variants: {
      status: {
        [EntityStatus.Healthy]: 'text-green-500',
        [EntityStatus.Fail]: 'text-red-500',
        [EntityStatus.Warn]: 'text-orange-500',
        [EntityStatus.Unavailable]: 'text-gray-700',
      } satisfies Record<EntityStatus, string>,
    },
  },
);

type StatusIndicatorProperties = React.HTMLAttributes<HTMLDivElement> & {
  readonly showText?: boolean;
} & VariantProps<typeof backgroundColor>;

export const StatusIndicator = React.forwardRef<HTMLDivElement, StatusIndicatorProperties>(
  ({className, status, showText = false, ...properties}, reference) => (
    <div
      ref={reference}
      className={cn('relative flex items-center', className)}
      data-test-id="status-indicator"
      data-status={status}
      {...properties}
    >
      <div className={cn(backgroundColor({status}))} />
      {showText && (
        <div className="ml-2">
          <StatusIndicatorText status={status} />
        </div>
      )}
    </div>
  ),
);
StatusIndicator.displayName = 'StatusIndicator';

type StatusIndicatorTextProperties = VariantProps<typeof textColor>;

function StatusIndicatorText({status}: StatusIndicatorTextProperties): React.ReactElement {
  return <div className={textColor({status})}>{status}</div>;
}
