import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import * as React from 'react';
import {buttonVariants} from '@/components/button/index.js';
import {cn} from '@/util/cn.js';

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

function AlertDialogPortal({
  children,
  ...properties
}: AlertDialogPrimitive.AlertDialogPortalProps): JSX.Element {
  return (
    <AlertDialogPrimitive.Portal {...properties}>
      <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
        {children}
      </div>
    </AlertDialogPrimitive.Portal>
  );
}

AlertDialogPortal.displayName = AlertDialogPrimitive.Portal.displayName;

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({className, children, ...properties}, reference) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity animate-in fade-in',
      className,
    )}
    {...properties}
    ref={reference}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({className, ...properties}, reference) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={reference}
      className={cn(
        'fixed z-50 grid w-full max-w-lg scale-100 gap-4 border bg-background p-6 opacity-100 shadow-lg animate-in fade-in-90 slide-in-from-bottom-10 sm:rounded-lg sm:zoom-in-90 sm:slide-in-from-bottom-0 md:w-full',
        className,
      )}
      {...properties}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

function AlertDialogHeader({
  className,
  ...properties
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return <div className={cn('flex flex-col space-y-2 sm:text-left', className)} {...properties} />;
}

AlertDialogHeader.displayName = 'AlertDialogHeader';

function AlertDialogFooter({
  className,
  ...properties
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return (
    <div
      className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
      {...properties}
    />
  );
}

AlertDialogFooter.displayName = 'AlertDialogFooter';

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({className, ...properties}, reference) => (
  <AlertDialogPrimitive.Title
    ref={reference}
    className={cn('text-lg font-semibold', className)}
    {...properties}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({className, ...properties}, reference) => (
  <AlertDialogPrimitive.Description
    ref={reference}
    className={cn('text-sm text-muted-foreground', className)}
    {...properties}
  />
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({className, ...properties}, reference) => (
  <AlertDialogPrimitive.Action
    ref={reference}
    className={cn(buttonVariants(), className)}
    {...properties}
  />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({className, ...properties}, reference) => (
  <AlertDialogPrimitive.Cancel
    ref={reference}
    className={cn(buttonVariants({variant: 'outline'}), className)}
    {...properties}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
