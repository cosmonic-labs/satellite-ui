import * as React from 'react';

type CopyFunction = (value: string) => Promise<boolean>;

function useCopyToClipboard(): CopyFunction {
  return React.useCallback(async (value: string) => {
    if (!globalThis?.navigator?.clipboard) {
      console.warn('Clipboard API not found');
      return false;
    }

    try {
      await globalThis.navigator.clipboard.writeText(value);
      return true;
    } catch (error) {
      console.error('Failed to copy:', error);
      return false;
    }
  }, []);
}

export {useCopyToClipboard};
