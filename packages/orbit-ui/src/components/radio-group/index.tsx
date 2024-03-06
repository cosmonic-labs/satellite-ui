import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import {CircleIcon} from 'lucide-react';
import * as React from 'react';
import {cn} from '@/util/cn.js';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({className, ...properties}, reference) => (
  <RadioGroupPrimitive.Root
    className={cn('grid gap-2', className)}
    {...properties}
    ref={reference}
  />
));
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({className, children, ...properties}, reference) => (
  <RadioGroupPrimitive.Item
    ref={reference}
    className={cn(
      'aspect-square size-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...properties}
  >
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
      <CircleIcon className="size-2.5 fill-current text-current" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export {RadioGroup, RadioGroupItem};
