import { useEffect, useCallback, useRef } from 'react';

/**
 * Hook to link any modal, dialog, or drawer with browser history.
 * When the modal is open, pressing the browser's Back button (or mobile swipe back)
 * dismisses the modal instead of navigating away or exiting the website.
 * 
 * @param isOpen Whether the modal is currently visible
 * @param onClose Callback to close the modal in React state
 * @param modalId Unique identifier for this modal (e.g. 'project-details', 'support-chat')
 * @returns A safe close handler to attach to modal close buttons ("X", backdrop, Cancel)
 */
export function useHistoryModal(
  isOpen: boolean,
  onClose: () => void,
  modalId: string
) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const isHandlingPopRef = useRef(false);

  useEffect(() => {
    if (!isOpen) return;

    // Check if the current state already has this modal (to avoid duplicate push)
    const currentState = window.history.state || {};
    if (currentState.modal !== modalId) {
      window.history.pushState({ ...currentState, modal: modalId }, '', window.location.href);
    }

    const handlePopState = (e: PopStateEvent) => {
      // If the back button was pressed and the active modal is no longer this modalId
      if (!e.state || e.state.modal !== modalId) {
        isHandlingPopRef.current = true;
        onCloseRef.current();
        setTimeout(() => {
          isHandlingPopRef.current = false;
        }, 50);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isOpen, modalId]);

  const handleClose = useCallback(() => {
    onCloseRef.current();
    // Only call history.back if the modal was closed via UI action and history is pointing to modal state
    if (!isHandlingPopRef.current && window.history.state?.modal === modalId) {
      window.history.back();
    }
  }, [modalId]);

  return handleClose;
}
