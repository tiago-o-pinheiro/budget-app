import { useEffect, useState } from "react";
import { useModalProvider } from "./use-modal-store.hooks";

export const useCheckModalStatus = (type: string) => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const { modal } = useModalProvider();

  useEffect(() => {
    if (modal.type === type) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [type, modal.type]);

  return { isOpen, id: modal.id };
};
