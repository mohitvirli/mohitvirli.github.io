// import "react-crud-icons/dist/react-crud-icons.css";

import { useGSAP } from "@gsap/react";
import { usePortalStore, useThemeStore } from "@stores";
import gsap from "gsap";
import Image from 'next/image';
import { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";

const ThemeSwitcher = () => {
  const themeSwitcherRef = useRef<HTMLDivElement>(null);
  const nextColor = useThemeStore((state) => state.nextColor);
  const isActive = usePortalStore((state) => state.activePortalId);
  const [positionClass, setPositionClass] = useState<string>('');
  const toggleTheme = () => nextColor();

  useGSAP(() => {
    gsap.to(themeSwitcherRef.current, {
      opacity: isActive ? 0 : 1,
      duration: 1,
      delay: isActive ? 0 : 1,
    });
  }, [isActive]);

  useEffect(() => {
    setPositionClass(isMobile ? 'bottom-2 left-2' : 'top-6 right-6');
  }, [isMobile]);

  return (
    <div className={`fixed ${positionClass}`} ref={themeSwitcherRef} style={{ opacity: 0, zIndex: 2 }}>
      <div className="flex items-center justify-center gap-2">
        <a className="hover:cursor-pointer" onClick={toggleTheme}>
          <Image src="/night-mode.svg" width={24} height={24} alt="night mode" loading="lazy" />
        </a>
      </div>
    </div>
  );
};

export default ThemeSwitcher;