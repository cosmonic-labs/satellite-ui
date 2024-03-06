import {Slot} from '@radix-ui/react-slot';
import {type VariantProps} from 'class-variance-authority';
import * as React from 'react';
import {cn} from '@/util/cn.js';
import {buttonVariants} from './button-variants.js';

export type ButtonProps = {
  readonly asChild?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, variant, size, asChild = false, ...properties}, reference) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={reference}
        className={cn(buttonVariants({variant, size, className}))}
        {...properties}
      />
    );
  },
);
Button.displayName = 'Button';

export {Button};
