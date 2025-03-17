// import "react-crud-icons/dist/react-crud-icons.css";

import { useGSAP } from "@gsap/react";
import { useThemeStore } from "@stores";
import { useRef } from "react";
import gsap from "gsap";

const ThemeSwitcher = () => {
  const themeSwitcherRef = useRef<HTMLDivElement>(null);
  const nextColor = useThemeStore((state) => state.nextColor);
  const toggleTheme = () => nextColor();
  const showThemeSwitcher = useThemeStore((state) => state.showThemeSwitcher);

  useGSAP(() => {
    // TODO: Maybe hide it after scroll.
    gsap.to(themeSwitcherRef.current, {
      opacity: showThemeSwitcher ? 1 : 0,
      duration: 1,
    });
  }, [showThemeSwitcher]);

  return (
    <div className="fixed right-5 bottom-5" ref={themeSwitcherRef} style={{ opacity: 0 }}>
      <div className="flex items-center justify-center gap-2">
        <a className="hover:cursor-pointer" onClick={toggleTheme}>
          <img src="/night-mode.svg" className="w-6 h-6" alt="night mode" />
        </a>
      </div>
    </div>
  );
};

export default ThemeSwitcher;