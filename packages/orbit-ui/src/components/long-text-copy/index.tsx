import {useCallback, useRef} from 'react';
import {CopyButton} from '@/components/copy-button/index.jsx';

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
    <div className="flex items-center ">
      <div
        className={
          'relative mr-1 bg-slate-50 border border-slate-200 rounded overflow-hidden dark:bg-slate-800 dark:border-slate-600' +
          ' after:absolute after:right-0 after:top-0 after:block after:h-full after:w-8 after:bg-gradient-to-l after:from-slate-50 after:pointer-events-none dark:after:from-slate-800'
        }
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
        className="h-[26px] rounded-md px-2"
      />
    </div>
  );
}

export {LongTextCopy};
