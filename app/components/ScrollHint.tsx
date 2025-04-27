import { useScrollHintStore } from "@stores";
import gsap from "gsap";
import Image from "next/image";
import { useEffect } from "react";

export const ScrollHint = () => {
  const { showScrollHint, hintText } = useScrollHintStore();

  useEffect(() => {
    if (showScrollHint) {
      gsap.to('.scroll-hint', {
        opacity: 1,
        duration: 1.5,
        delay: 1.5,
      });
    } else {
      gsap.killTweensOf('.scroll-hint');
      gsap.to('.scroll-hint', {
        opacity: 0,
        duration: 0.5,
      });
    }
  }, [showScrollHint]);

  const svgSrc = hintText === 'PAN' ? '/chevrons-left-right.svg' : '/chevrons-up-down.svg';

  return (
    <div className="fixed w-full bottom-5 scroll-hint" style={{ opacity: 0 }}>
      <div className="flex items-center justify-center animate-pulse">
        { showScrollHint }
        <Image src={svgSrc} width={18} height={18} alt="night mode" loading="lazy" />
        <span>{hintText}</span>
      </div>
    </div>
  );
}