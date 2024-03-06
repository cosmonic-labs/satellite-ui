import * as React from 'react';

const useHandleClickOutside = (
  reference: React.MutableRefObject<HTMLElement>,
  callback: (clickValue: boolean) => void,
): void => {
  const handleCallback = React.useCallback(() => {
    callback(false);
  }, [callback]);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        event.target &&
        reference.current &&
        !reference.current.contains(event.target as HTMLElement)
      ) {
        handleCallback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [reference, handleCallback]);
};

export {useHandleClickOutside};
