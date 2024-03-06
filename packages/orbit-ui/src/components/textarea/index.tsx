import * as React from 'react';
import {cn} from '@/util/cn.js';

export type TextareaProps = Record<string, unknown> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({className, ...properties}, reference) => (
    <textarea
      ref={reference}
      className={cn(
        'flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...properties}
    />
  ),
);
Textarea.displayName = 'Textarea';

export {Textarea};
