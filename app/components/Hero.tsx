'use client';

import { useGSAP } from "@gsap/react";
import { ScrollControls, Text } from "@react-three/drei";

import { Canvas } from '@react-three/fiber';
import gsap from "gsap";
import { Suspense } from "react";
import CloudContainer from "./Cloud";
import TextWindow from "./TextWindow";
import WindowModel from "./WindowModel";

const Hero = () => {
  useGSAP(() => {
    gsap.fromTo('.min-h-screen', { opacity: 0 }, { opacity: 1, duration: 1, delay: 0 });
    gsap.fromTo('.base-canvas', { opacity: 0 }, { opacity: 1, duration: 2, delay: 0.5 });
  }, []);

  const noiseOverlayStyle = {
    backgroundBlendMode: "soft-light",
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E\")",
    backgroundRepeat: "repeat",
    backgroundSize: "100px",
  }
  const fontProps = {
    font: "./soria-font.ttf",
    fontSize: 1.2,
    // anchorY: "middle",
  }
  return (
    <div className="min-h-screen bg-sky-600 relative">
      <Canvas className="w-full h-full base-canvas bg-sky-600"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          overflow: "hidden",
          ...noiseOverlayStyle,
        }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={4} />
            <pointLight position={[0, -25, 2]} intensity={2} />

            <ScrollControls pages={2} damping={0.3}>
              <Text position={[0, 2, -10]} {...fontProps}>Hi, I am Mohit Virli.</Text>
              <CloudContainer/>
              <group position={[0, -25, 5.69]}>
                <WindowModel/>
                <TextWindow/>
              </group>
              {/* <Scroll html>
                <h1 style={ { height: '100vh '}}>html in here (optional)</h1>
              </Scroll> */}
            </ScrollControls>
          </Suspense>
      </Canvas>
    </div>
  );
};

export default Hero;
