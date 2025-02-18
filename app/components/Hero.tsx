'use client';

import { useGSAP } from "@gsap/react";
import { Environment, ScrollControls } from "@react-three/drei";

import { Canvas } from '@react-three/fiber';
import gsap from "gsap";
import { Suspense } from "react";
import CloudContainer from "./Cloud";
import TextWindow from "./TextWindow";
import WindowModel from "./WindowModel";

const Hero = () => {
  useGSAP(() => {
    // gsap.fromTo('.welcome-text', { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1, delay: 1 });
    gsap.fromTo('.base-canvas', { opacity: 0 }, { opacity: 1, duration: 2.5, delay: 0.5 });
  }, []);


  return (
    <div className="min-h-screen bg-sky-600 relative">
      <div className="flex items-center min-h-screen justify-center">
      <div className="text-center text-white">
        {/* <h1 className="text-6xl font-bold mb-4 welcome-text">Hello</h1>
        <p className="text-xl">Full Stack Developer & Tech Enthusiast</p> */}
      </div>
      </div>

      <Canvas className="w-full h-full base-canvas"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          overflow: "hidden",
        }}
        >
           <Suspense fallback={null}>
            <Environment preset="sunset" />
            <ambientLight intensity={1} />



            <ScrollControls pages={2} damping={0.3}>
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
