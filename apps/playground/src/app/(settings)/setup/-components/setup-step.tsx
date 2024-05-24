import {cn} from '@cosmonic/orbit-ui';
import * as React from 'react';

const SetupStep = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement> & {readonly activeIndex?: number; readonly index?: number}
>(({className, activeIndex, index, ...props}, ref) => {
  if (activeIndex !== index) return null;

  return (
    <div ref={ref} className={cn('size-full px-6', className)} {...props}>
      {props.children}
    </div>
  );
});

export {SetupStep};
