import { create } from "zustand";

type DialogStore = {
  isOpen: boolean;
  handleDialog: (open: boolean) => void;
};

const useDialogStore = create<DialogStore>((set) => ({
  isOpen: false,
  handleDialog: (open: boolean) => set({ isOpen: open }),
}));

export default useDialogStore;
