import * as React from 'react';
import {cn} from '@/util/cn.js';

type HostLabelProperties = {
  readonly className?: string;
  readonly extras?: React.ReactElement;
} & React.HTMLAttributes<HTMLSpanElement> &
  ({children: string} | {pKey: string; pVal: string});

function KeyValuePairHighlight({
  pKey,
  pVal,
}: {
  readonly pKey: string;
  readonly pVal: string;
}): React.ReactElement {
  return (
    <>
      <span className="text-cosmo-purple dark:text-purple-400">{pKey}</span>=
      <span className="text-slate-800 dark:text-slate-300">{pVal}</span>
    </>
  );
}

const HostLabelContainer = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & {readonly extras?: React.ReactElement}
>(
  ({className, extras, children, ...props}, ref): React.ReactElement => (
    <span
      ref={ref}
      className={cn(
        'mb-0.5 mr-0.5 inline-flex items-center rounded border border-slate-300 bg-slate-100 px-1 text-xs font-medium text-slate-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-600',
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {extras && <span className="ms-1">{extras}</span>}
    </span>
  ),
);
HostLabelContainer.displayName = 'HostLabelContainer';

const HostLabel = React.forwardRef<HTMLSpanElement, HostLabelProperties>(
  ({className, extras, ...props}, ref): React.ReactElement => {
    if ('children' in props) {
      return (
        <HostLabelContainer ref={ref} className={className} extras={extras} {...props}>
          {props.children}
        </HostLabelContainer>
      );
    }

    const {pKey, pVal, ...container} = props;
    return (
      <HostLabelContainer ref={ref} className={className} extras={extras} {...container}>
        <KeyValuePairHighlight pKey={pKey} pVal={pVal} />
      </HostLabelContainer>
    );
  },
);
HostLabel.displayName = 'HostLabel';

export {HostLabel};
