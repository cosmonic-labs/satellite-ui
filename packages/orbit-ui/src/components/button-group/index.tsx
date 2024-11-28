import {type ComponentPropsWithRef, type PropsWithChildren} from 'react';
import {cn} from '@/util/cn.js';

type ButtonGroupProperties = Record<string, unknown> & ComponentPropsWithRef<'div'>;

function ButtonGroup({
  children,
  className,
  ...properties
}: PropsWithChildren<ButtonGroupProperties>): React.ReactElement {
  return (
    <div
      className={cn(
        '-my-0.5 flex h-8 space-x-1 rounded-lg bg-slate-200 p-0.5 text-slate-900 dark:bg-slate-800 dark:text-slate-200',
        className,
      )}
      role="tablist"
      aria-orientation="horizontal"
      {...properties}
    >
      {children}
    </div>
  );
}

type ButtonGroupItemProperties = {
  readonly isActive?: boolean;
} & ComponentPropsWithRef<'button'>;

function ButtonGroupItem({
  children,
  isActive,
  ...properties
}: ButtonGroupItemProperties): React.ReactElement {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      className={cn(
        `flex items-center rounded-md px-3 py-1.5 text-xs font-semibold dark:text-slate-50`,
        {isActive: 'bg-white shadow dark:bg-slate-700'},
      )}
      {...properties}
    >
      {children}
    </button>
  );
}

ButtonGroupItem.displayName = 'ButtonGroupItem';

export {ButtonGroup, ButtonGroupItem};
