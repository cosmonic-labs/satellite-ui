import * as SwitchPrimitives from '@radix-ui/react-switch';
import {cva} from 'class-variance-authority';
import * as React from 'react';
import {cn} from '@/util/cn.js';

const rootStyle = cva(
  'peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
  {
    variants: {
      size: {
        small: 'h-[20px] w-[36px]',
        medium: 'h-[24px] w-[44px]',
      },
    },
  },
);

const thumbStyle = cva(
  'pointer-events-none block size-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0',
  {
    variants: {
      size: {
        small: 'size-4 data-[state=checked]:translate-x-4',
        medium: 'size-5 data-[state=checked]:translate-x-5',
      },
    },
  },
);

type SwitchProperties = {
  readonly size?: 'small' | 'medium';
};

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProperties & React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({className, size = 'medium', ...properties}, reference) => (
  <SwitchPrimitives.Root
    className={cn(rootStyle({size}), className)}
    {...properties}
    ref={reference}
  >
    <SwitchPrimitives.Thumb className={cn(thumbStyle({size}))} />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export {Switch};
