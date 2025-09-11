import { create } from "zustand";

type RevertChangesType = {
  isDisabled: boolean,
  setDisabled: (value: boolean) => void
}

export const useRevertChanges = create<RevertChangesType>()((set) => ({
  isDisabled: true,
  setDisabled: (value: boolean) => set({ isDisabled: value }),
}));