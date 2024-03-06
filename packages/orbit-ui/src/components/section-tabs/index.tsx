import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';
import {cn} from '@/util/cn.js';

const SectionTabs = TabsPrimitive.Root;

const SectionTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({className, children, ...properties}, reference) => (
  <TabsPrimitive.List
    ref={reference}
    className={cn(
      'relative inline-flex h-9 w-full items-center justify-start border-b border-border',
      className,
    )}
    {...properties}
  >
    {children}
  </TabsPrimitive.List>
));
SectionTabsList.displayName = 'SectionTabsList';

const SectionTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({className, ...properties}, reference) => (
  <TabsPrimitive.Trigger
    ref={reference}
    className={cn(
      'relative inline-flex cursor-pointer items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      'after:absolute after:left-0 after:top-full after:hidden after:h-0.5 after:w-full after:bg-primary data-[state=active]:after:block',
      className,
    )}
    {...properties}
  />
));
SectionTabsTrigger.displayName = 'SectionTabsTrigger';

const SectionTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({className, ...properties}, reference) => (
  <TabsPrimitive.Content
    ref={reference}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    {...properties}
  />
));
SectionTabsContent.displayName = 'SectionTabsContent';

export {SectionTabs, SectionTabsList, SectionTabsTrigger, SectionTabsContent};
