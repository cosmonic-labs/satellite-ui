import * as React from 'react';
import {cn} from '@/util/cn.js';

export type InputProps = Record<string, unknown> & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({className, type, ...properties}, reference) => (
    <input
      ref={reference}
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...properties}
    />
  ),
);
Input.displayName = 'Input';

export {Input};
