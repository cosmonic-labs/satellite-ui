import * as AccordionPrimitive from '@radix-ui/react-accordion';
import {ChevronDownIcon} from 'lucide-react';
import * as React from 'react';
import {cn} from '@/util/cn.js';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({className, ...properties}, reference) => (
  <AccordionPrimitive.Item ref={reference} className={cn(className)} {...properties} />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  {
    readonly iconPosition?: 'before' | 'after' | 'none';
    /** @deprecated use iconPosition */
    readonly iconBefore?: boolean;
  } & React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(
  (
    {
      className,
      children,
      // eslint-disable-next-line @typescript-eslint/no-deprecated -- deprecation notice from here
      iconBefore = false,
      iconPosition = 'after',
      ...properties
    },
    reference,
  ) => (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={reference}
        className={cn(
          'flex flex-1 items-center justify-start border-b py-4 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&[data-state=closed]>svg]:-rotate-90',
          className,
        )}
        {...properties}
      >
        {(iconBefore || iconPosition === 'before') && (
          <ChevronDownIcon className="me-2 size-4 shrink-0 transition-transform duration-200" />
        )}
        {children}
        {(!iconBefore || iconPosition === 'after') && (
          <ChevronDownIcon className="ms-auto size-4 shrink-0 transition-transform duration-200" />
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  ),
);

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({className, children, ...properties}, reference) => (
  <AccordionPrimitive.Content
    ref={reference}
    className={cn(
      'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      className,
    )}
    {...properties}
  >
    {children}
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export {Accordion, AccordionContent, AccordionItem, AccordionTrigger};
