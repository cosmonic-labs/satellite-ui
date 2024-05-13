import * as React from 'react';
import {CopyButton} from '@/components/copy-button/index.jsx';
import {cn} from '@/util/cn.js';

const MiniDetailsTable = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<React.HTMLProps<HTMLDivElement>>
>(({children, className, ...properties}, reference) => (
  <div
    ref={reference}
    className={cn('w-full min-w-0 max-w-full text-xs', className)}
    {...properties}
  >
    {children}
  </div>
));
MiniDetailsTable.displayName = 'MiniDetailsTable';

const MiniDetailsTableRow = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  ({children, className, ...properties}, reference) => (
    <div ref={reference} className={cn('grid grid-cols-[1fr,3fr]', className)} {...properties}>
      {children}
    </div>
  ),
);
MiniDetailsTableRow.displayName = 'MiniDetailsTableRow';

const MiniDetailsTableKey = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  ({children, className, ...properties}, reference) => (
    <div
      ref={reference}
      className={cn('font-medium text-cosmo-blue dark:text-cosmo-blue-100', className)}
      {...properties}
    >
      {children}
    </div>
  ),
);
MiniDetailsTableKey.displayName = 'MiniDetailsTableKey';

type MiniDetailsTableValueProperties = React.HTMLProps<HTMLDivElement> & {
  readonly noCopy?: boolean;
};
const MiniDetailsTableValue = React.forwardRef<HTMLDivElement, MiniDetailsTableValueProperties>(
  ({children, className, noCopy = false, ...properties}, reference) => {
    const isString = typeof children === 'string';

    return (
      <div
        ref={reference}
        className={cn('flex overflow-hidden', {'pl-1.5': noCopy || !isString})}
        {...properties}
      >
        {isString ? (
          <>
            {!noCopy && (
              <CopyButton
                variant="ghost"
                className="-my-0.5 h-5 p-1"
                size="xs"
                textToCopy={children}
              />
            )}
            <span className="truncate" title={children}>
              {children}
            </span>
          </>
        ) : (
          children
        )}
      </div>
    );
  },
);
MiniDetailsTableValue.displayName = 'MiniDetailsTableValue';

export {MiniDetailsTable, MiniDetailsTableRow, MiniDetailsTableKey, MiniDetailsTableValue};
