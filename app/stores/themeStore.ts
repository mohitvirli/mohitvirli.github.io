import { create } from "zustand";
import { persist } from "zustand/middleware";

const AvailableColors = ['#2d84c7', '#111'];

interface ThemeStore {
  colors: string[];
  color: string;
  nextColor: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      colors: [...AvailableColors],
      color: AvailableColors[0],
      nextColor: () => {
        const colors = get().colors;
        const activeColorIndex = colors.indexOf(get().color);
        const nextColorIndex = (activeColorIndex + 1) % colors.length;
        set(() => ({ color: colors[nextColorIndex] }));
      },
    }),
    {
      name: "theme-storage",
      partialize: (state) => ({ color: state.color }),
    }
  )
);