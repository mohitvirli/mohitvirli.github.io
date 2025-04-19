// import "react-crud-icons/dist/react-crud-icons.css";

import { useGSAP } from "@gsap/react";
import { usePortalStore, useThemeStore } from "@stores";
import gsap from "gsap";
import Image from 'next/image';
import { useRef } from "react";

const ThemeSwitcher = () => {
  const themeSwitcherRef = useRef<HTMLDivElement>(null);
  const nextColor = useThemeStore((state) => state.nextColor);
  const isActive = usePortalStore((state) => state.activePortalId);
  const toggleTheme = () => nextColor();

  useGSAP(() => {
    gsap.to(themeSwitcherRef.current, {
      opacity: isActive ? 0 : 1,
      duration: 1,
      delay: isActive ? 0 : 1,
    });
  }, [isActive]);

  return (
    <div className="fixed left-5 bottom-5" ref={themeSwitcherRef} style={{ opacity: 0, zIndex: 2 }}>
      <div className="flex items-center justify-center gap-2">
        <a className="hover:cursor-pointer" onClick={toggleTheme}>
          <Image src="/night-mode.svg" width={24} height={24} alt="night mode" loading="lazy" />
        </a>
      </div>
    </div>
  );
};

export default ThemeSwitcher;