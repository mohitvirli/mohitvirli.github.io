import { create } from "zustand";

interface ScrollHintStore {
  hintText: 'SCROLL' | 'PAN' | null;
  showScrollHint: boolean;
  setScrollHint: (showScrollHint: boolean, hintText?: ScrollHintStore['hintText']) => void;
}

export const useScrollHintStore = create<ScrollHintStore>((set, get) => ({
  hintText: null,
  showScrollHint: false,
  setScrollHint: (showScrollHint, hintText) => set(() => ({
    showScrollHint,
    hintText: hintText ? hintText : get().hintText,
  })),
}));
