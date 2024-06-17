import {cn} from '@cosmonic/orbit-ui';
import * as React from 'react';

const PageContent = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  ({children, className, ...props}, ref): React.ReactElement => (
    <div ref={ref} className={cn('flex grow flex-col overflow-auto', className)} {...props}>
      {children}
    </div>
  ),
);
PageContent.displayName = 'PageContent';

export {PageContent};
