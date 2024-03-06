import * as React from 'react';
import {cn} from '@/util/cn.js';

function Skeleton({
  className,
  ...properties
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return (
    <div className={cn('animate-pulse rounded-md bg-primary/10', className)} {...properties} />
  );
}

export {Skeleton};
