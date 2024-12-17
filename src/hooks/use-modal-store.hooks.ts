import { useModalStore } from "@stores";

export const useModalProvider = () => {
  const modal = useModalStore((state) => state.modal);
  const setModal = useModalStore((state) => state.setModal);
  const closeModal = useModalStore((state) => state.closeModal);

  return { modal, setModal, close: closeModal };
};
