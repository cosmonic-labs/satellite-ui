import {useCallback, useRef} from 'react';
import {CopyButton} from '@/components/copy-button/index.jsx';
import {cn} from '@/util/cn';

type LongTextCopyProperties = {
  readonly textToCopy?: string;
  readonly children?: string;
};

function LongTextCopy({textToCopy, children}: LongTextCopyProperties): JSX.Element {
  const inputReference = useRef<HTMLInputElement>(null);

  const handleTextClick = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }

    inputReference.current?.select();
  }, []);

  return (
    <div className="flex items-center">
      <div
        className={cn(
          'relative mr-0.5 overflow-hidden rounded border border-slate-200 bg-slate-50 dark:border-slate-600 dark:bg-slate-800',
          'after:pointer-events-none after:absolute after:right-0 after:top-0 after:block after:h-full after:w-8 after:bg-gradient-to-l after:from-slate-50 dark:after:from-slate-800',
        )}
      >
        <input
          ref={inputReference}
          readOnly
          className="bg-transparent pl-1"
          value={children}
          onClick={handleTextClick}
        />
      </div>
      <CopyButton
        textToCopy={textToCopy ?? children ?? ''}
        variant="ghost"
        size="sm"
        className="h-[22px] rounded-md px-1.5 focus-visible:ring-offset-0"
      />
    </div>
  );
}

export {LongTextCopy};
