import {PlusIcon} from 'lucide-react';
import * as React from 'react';
import {Button, type ButtonProps} from '@/components/button/button';
import {cn} from '@/util/cn';

const CanvasToolbar = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  ({children, className, ...properties}, reference) => (
    <div
      ref={reference}
      className={cn('flex flex-col gap-0.5 rounded-xl bg-secondary', className)}
      {...properties}
    >
      {children}
    </div>
  ),
);
CanvasToolbar.displayName = 'CanvasToolbar';

type CanvasToolbarItemProperties = {
  readonly icon?: React.ReactNode | string;
  readonly text?: React.ReactNode | string;
} & ButtonProps;

const CanvasToolbarItem = React.forwardRef<HTMLButtonElement, CanvasToolbarItemProperties>(
  ({children, className, icon, text, ...properties}, reference) => (
    <Button
      ref={reference}
      className={cn('flex h-auto flex-col rounded-xl px-2.5', className)}
      variant="ghost"
      {...properties}
    >
      {icon ? (
        <div className="relative px-2 py-1.5">
          <div className="size-4 [&>svg]:size-full">{icon}</div>
          <PlusIcon className="absolute left-0 top-0 size-2.5" strokeWidth={3} />
        </div>
      ) : null}
      {text ? <div className="-mt-0.5 hidden text-xs font-medium xs:block">{text}</div> : null}
      {children}
    </Button>
  ),
);
CanvasToolbarItem.displayName = 'CanvasToolbarItem';

export {CanvasToolbar, CanvasToolbarItem};
