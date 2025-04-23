import { create } from "zustand";

interface ThemeStore {
  colors: string[];
  activeColorIndex: number;
  color: string;
  nextColor: () => void;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  colors: ['#2d84c7', '#111'],
  activeColorIndex: 0,
  get color() {
    return get().colors[get().activeColorIndex];
  },
  nextColor: () => {
    const colors = get().colors;
    const activeColorIndex = (get().activeColorIndex + 1) % colors.length;
    set(() => ({ activeColorIndex: activeColorIndex, color: colors[activeColorIndex] }));
  },
}))