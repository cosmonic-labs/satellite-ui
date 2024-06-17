import {cn} from '@cosmonic/orbit-ui';
import * as React from 'react';

const PageWrapper = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  ({children, className, ...props}, ref): React.ReactElement => (
    <div ref={ref} className={cn('flex h-full flex-col', className)} {...props}>
      {children}
    </div>
  ),
);
PageWrapper.displayName = 'PageWrapper';

export {PageWrapper};
