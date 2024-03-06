import * as React from 'react';

function useHandleEscapeOnModal(showModal: boolean, closeCallback: () => void): void {
  React.useEffect(() => {
    function handleEscapeOnModal(event: KeyboardEvent) {
      if ((event.key === 'Escape' || event.key === 'esc') && showModal) {
        closeCallback();
      }
    }

    document.addEventListener('keydown', handleEscapeOnModal);

    return () => {
      document.removeEventListener('keydown', handleEscapeOnModal);
    };
  }, [showModal, closeCallback]);
}

export {useHandleEscapeOnModal};
