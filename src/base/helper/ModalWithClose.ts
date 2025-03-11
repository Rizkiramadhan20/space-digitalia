import { useEffect } from "react";

interface UseModalWithCloseProps {
  isOpen: boolean;
  onClose: () => void;
}

export const useModalWithClose = ({
  isOpen,
  onClose,
}: UseModalWithCloseProps) => {
  // Handle Escape key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  // Handle click outside
  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return {
    handleClickOutside,
  };
};
