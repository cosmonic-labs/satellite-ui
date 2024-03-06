import * as PanelPrimitive from '@radix-ui/react-dialog';
import {Slot} from '@radix-ui/react-slot';
import {type VariantProps, cva} from 'class-variance-authority';
import {XIcon} from 'lucide-react';
import * as React from 'react';
import {Button, type ButtonProps} from '@/components/button/index.js';
import {cn} from '@/util/cn.js';

type DetailsPanelProperties = {
  readonly open: boolean;
  readonly setOpen: (open: boolean) => void;
} & React.ComponentPropsWithoutRef<typeof PanelPrimitive.Content>;

const DetailsPanel = React.forwardRef<
  React.ElementRef<typeof PanelPrimitive.Content>,
  DetailsPanelProperties
>(({children, className, open, setOpen, ...properties}, reference) => (
  <PanelPrimitive.Root open={open} modal={false} onOpenChange={setOpen}>
    <PanelPrimitive.Content
      ref={reference}
      className={cn(
        'pointer-events-auto z-50 flex max-h-full flex-col overflow-hidden rounded-md border bg-background',
        'transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
        className,
      )}
      onInteractOutside={(event) => {
        event.preventDefault();
      }}
      onPointerDownOutside={(event) => {
        event.preventDefault();
      }}
      {...properties}
    >
      {children}
    </PanelPrimitive.Content>
  </PanelPrimitive.Root>
));
DetailsPanel.displayName = 'DetailsPanel';

const DetailsPanelHeader = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<React.HTMLProps<HTMLDivElement>>
>(({children, className, ...properties}, reference) => (
  <div
    ref={reference}
    className={cn('relative shrink-0 border-b border-border p-2', className)}
    {...properties}
  >
    {children}
  </div>
));
DetailsPanelHeader.displayName = 'DetailsPanelHeader';

const DetailsPanelClose = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({children, className, ...properties}, reference) => (
    <PanelPrimitive.Close asChild>
      <Button
        ref={reference}
        variant="ghost"
        className={cn('h-auto p-1', className)}
        {...properties}
      >
        <XIcon className="size-4" />
      </Button>
    </PanelPrimitive.Close>
  ),
);
DetailsPanelClose.displayName = 'DetailsPanelClose';

const detailsPanelHeadingVariants = cva('font-semibold text-cosmo-blue dark:text-cosmo-blue-100', {
  variants: {
    variant: {
      primary: 'text-base',
      secondary: 'text-sm font-medium',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

type DetailsPanelHeadingProperties = {
  readonly asChild?: boolean;
} & React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof detailsPanelHeadingVariants>;
const DetailsPanelHeading = React.forwardRef<HTMLHeadingElement, DetailsPanelHeadingProperties>(
  ({children, asChild = false, className, variant, ...properties}, reference) => {
    const Comp = asChild ? Slot : 'h2';
    return (
      <Comp
        ref={reference}
        className={cn(detailsPanelHeadingVariants({variant}), className)}
        {...properties}
      >
        {children}
      </Comp>
    );
  },
);
DetailsPanelHeading.displayName = 'DetailsPanelHeading';

const DetailsPanelContent = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<React.HTMLProps<HTMLDivElement>>
>(({children, ...properties}, reference) => (
  <div ref={reference} className="overflow-y-auto" {...properties}>
    {children}
  </div>
));
DetailsPanelContent.displayName = 'DetailsPanelContent';

const DetailsPanelSection = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<React.HTMLProps<HTMLDivElement>>
>(({children, className, ...properties}, reference) => (
  <div
    ref={reference}
    className={cn('max-w-full overflow-hidden border-b p-2', className)}
    {...properties}
  >
    {children}
  </div>
));
DetailsPanelSection.displayName = 'DetailsPanelSection';

const DetailsPanelLabel = React.forwardRef<
  HTMLHeadingElement,
  React.PropsWithChildren<React.HTMLProps<HTMLHeadingElement>>
>(({children, className, ...properties}, reference) => (
  <h3
    ref={reference}
    className={cn(
      'mb-1 text-sm font-medium leading-none text-cosmo-blue dark:text-cosmo-blue-100',
      className,
    )}
    {...properties}
  >
    {children}
  </h3>
));
DetailsPanelLabel.displayName = 'DetailsPanelLabel';

const DetailsPanelFooter = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<React.HTMLProps<HTMLDivElement>>
>(({children, className, ...properties}, reference) => (
  <div ref={reference} className={cn('-mt-px shrink-0 border-t p-2', className)} {...properties}>
    {children}
  </div>
));
DetailsPanelFooter.displayName = 'DetailsPanelFooter';

export {
  DetailsPanel,
  DetailsPanelClose,
  DetailsPanelContent,
  DetailsPanelHeader,
  DetailsPanelHeading,
  DetailsPanelSection,
  DetailsPanelLabel,
  DetailsPanelFooter,
};
