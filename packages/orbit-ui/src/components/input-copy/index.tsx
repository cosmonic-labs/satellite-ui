import * as React from 'react';
import {CopyButton} from '@/components/copy-button/index.jsx';
import {Input} from '@/components/input/index.jsx';
import {useForwardedRef} from '@/hooks/use-forwarded-ref.js';
import {cn} from '@/util/cn.js';

const InputCopy = React.forwardRef<HTMLInputElement, React.HTMLProps<HTMLInputElement>>(
  ({className, ...properties}, reference) => {
    const inputReference = useForwardedRef(reference);
    const handleClick = React.useCallback(() => {
      if (inputReference?.current) {
        inputReference.current.select();
      }
    }, [inputReference]);

    return (
      <div className={cn('group relative', className)}>
        <Input onClick={handleClick} {...properties} ref={inputReference} readOnly />
        <div className="absolute right-1.5 top-1/2 -translate-y-1/2 pl-8 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
          <div className="absolute right-0 top-0 size-full bg-gradient-to-r from-transparent via-background to-background" />
          <CopyButton
            size="xs"
            textToCopy={properties.value?.toString() ?? ''}
            className="relative"
          />
        </div>
      </div>
    );
  },
);
InputCopy.displayName = 'InputCopy';

export {InputCopy};
