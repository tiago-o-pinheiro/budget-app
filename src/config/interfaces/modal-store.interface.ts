type ModalType = string | null;

export interface ModalProps {
  type: ModalType;
  id?: number;
}

export interface ModalStore {
  modal: ModalProps;
  setModal: (type: string, id?: number) => void;
  closeModal: () => void;
}
