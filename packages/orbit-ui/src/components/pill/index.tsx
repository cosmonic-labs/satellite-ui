import {type VariantProps, cva} from 'class-variance-authority';
import * as React from 'react';
import {cn} from '@/util/cn.js';

type PillProperties = {
  readonly logo?: React.ReactElement;
} & React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof pillClasses>;

const pillClasses = cva(
  'relative flex h-6 items-center rounded-full border px-2 text-sm tabular-nums',
  {
    variants: {
      variant: {
        primary: 'border-primary bg-primary text-primary-foreground',
        secondary: 'border-primary bg-primary-foreground text-primary',
        error: 'border-red-600 bg-red-600 text-white',
        warning: 'border-amber-700 bg-amber-300 text-amber-800',
        disabled: 'border-cosmo-grey bg-cosmo-grey text-white',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

const Pill = React.forwardRef<HTMLDivElement, PillProperties>(
  ({children, logo, variant, className, ...properties}, reference): JSX.Element => (
    <div ref={reference} className={cn(pillClasses({variant}), className)} {...properties}>
      {logo ? (
        <div className="-mx-1 inline-block size-3.5 text-center text-current">{logo}</div>
      ) : null}
      {children && <div className="ml-2 font-semibold text-current only:ml-0">{children}</div>}
    </div>
  ),
);

Pill.displayName = 'Pill';

export {Pill};
