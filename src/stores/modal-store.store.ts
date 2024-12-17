import { ModalStore } from "@interfaces";
import { create } from "zustand";

export const useModalStore = create<ModalStore>((set) => ({
  modal: { type: null, id: undefined },

  setModal: (type, id) => set({ modal: { type, id } }),

  closeModal: () => set({ modal: { type: null, id: undefined } }),
}));
