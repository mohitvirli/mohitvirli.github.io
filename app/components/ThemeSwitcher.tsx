// import "react-crud-icons/dist/react-crud-icons.css";

import { useGSAP } from "@gsap/react";
import Image from 'next/image';
import { useThemeStore } from "@stores";
import { useRef } from "react";
import gsap from "gsap";

const ThemeSwitcher = () => {
  const themeSwitcherRef = useRef<HTMLDivElement>(null);
  const nextColor = useThemeStore((state) => state.nextColor);
  const toggleTheme = () => nextColor();

  useGSAP(() => {
    gsap.to(themeSwitcherRef.current, {
      opacity: 1,
      duration: 2,
      delay: 0.5,
    });
  }, []);

  return (
    <div className="fixed right-5 bottom-5" ref={themeSwitcherRef} style={{ opacity: 0 }}>
      <div className="flex items-center justify-center gap-2">
        <a className="hover:cursor-pointer" onClick={toggleTheme}>
          <Image src="/night-mode.svg" width={24} height={24} alt="night mode" loading="lazy" />
        </a>
      </div>
    </div>
  );
};

export default ThemeSwitcher;