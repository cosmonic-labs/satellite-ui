import {type VariantProps} from 'class-variance-authority';
import * as React from 'react';
import {cn} from '@/util/cn.js';
import {badgeVariants} from './badge-variants.js';

export type BadgeProps = {
  readonly isMini?: boolean;
} & React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants>;

function Badge({
  className,
  variant,
  isMini = false,
  ...properties
}: BadgeProps): React.ReactElement {
  return <div className={cn(badgeVariants({variant, isMini}), className)} {...properties} />;
}

export {Badge};
