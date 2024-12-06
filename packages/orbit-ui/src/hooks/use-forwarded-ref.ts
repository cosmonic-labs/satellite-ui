import * as React from 'react';

function useForwardedReference<T = unknown>(
  forwardedReference: React.ForwardedRef<T>,
): React.MutableRefObject<T | null> {
  const innerReference = React.useRef<T>(null);

  React.useEffect(() => {
    if (typeof forwardedReference === 'function') {
      forwardedReference(innerReference.current);
    } else if (forwardedReference !== null) {
      forwardedReference.current = innerReference.current;
    }
  }, [forwardedReference]);

  return innerReference;
}

export {useForwardedReference as useForwardedRef};
