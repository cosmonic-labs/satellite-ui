import {cn} from '@cosmonic/orbit-ui';
import * as React from 'react';

const TopBar = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  ({children, className, ...props}, ref): React.ReactElement => (
    <div
      ref={ref}
      className={cn(
        'flex h-10 shrink-0 items-center justify-between overflow-x-auto px-4 py-1',
        'border-b bg-muted text-muted-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);
TopBar.displayName = 'TopBar';

export {TopBar};
