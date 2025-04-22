'use client';

import { useGSAP } from "@gsap/react";
import { Preload, ScrollControls, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useThemeStore } from "@stores";
import gsap from "gsap";
import { Suspense, useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import ThemeSwitcher from "./ThemeSwitcher";
import ProgressLoader from "./ProgressLoader";
// import {Perf} from "r3f-perf"

const CanvasLoader = (props: { children: React.ReactNode }) => {
  const ref= useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundColor = useThemeStore((state) => state.color);
  const { progress } = useProgress();
  const [canvasStyle, setCanvasStyle] = useState<React.CSSProperties>({
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0,
    overflow: "hidden",
  });

  useEffect(() => {
    if (!isMobile) {
      const borderStyle = {
        inset: '1rem',
        width: 'calc(100% - 2rem)',
        height: 'calc(100% - 2rem)',
      };
      setCanvasStyle({ ...canvasStyle, ...borderStyle})
    }
  }, [isMobile]);

  useGSAP(() => {
    if (progress === 0) {
      gsap.fromTo('.min-h-screen', { opacity: 0 }, { opacity: 1, duration: 1, delay: 0 });
    }
    if (progress === 100) {
      gsap.to('.base-canvas', { opacity: 1, duration: 3, delay: 1 });
    }
  }, [progress]);

  useGSAP(() => {
    gsap.to(ref.current, {
      backgroundColor: backgroundColor,
      duration: 1,
    });
    gsap.to(canvasRef.current, {
      backgroundColor: backgroundColor,
      duration: 1,
      ...noiseOverlayStyle,
    });
  }, [backgroundColor]);

  const noiseOverlayStyle = {
    backgroundBlendMode: "soft-light",
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E\")",
    backgroundRepeat: "repeat",
    backgroundSize: "100px",
  };

  return (
    <div className="h-[100dvh] relative">
      <div className="h-[100dvh] relative" ref={ref}>
        <Canvas className="base-canvas"
          shadows
          style={canvasStyle}
          ref={canvasRef}
          dpr={[1, 2]}>
          {/* <Perf/> */}
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />

            <ScrollControls pages={3} damping={0.4} maxSpeed={1} distance={1} style={{ zIndex: 1 }}>
              {props.children}
            </ScrollControls>

            <Preload all />
          </Suspense>
        </Canvas>
        <ProgressLoader progress={progress} />
      </div>
      <ThemeSwitcher />
    </div>
  );
};

export default CanvasLoader;