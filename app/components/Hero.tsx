'use client';

import { Text } from "@react-three/drei";

import CloudContainer from "./models/Cloud";
import TextWindow from "./TextWindow";
import WindowModel from "./models/WindowModel";

const Hero = () => {
  const fontProps = {
    font: "./soria-font.ttf",
    fontSize: 1.2,
  };

  return (
    <>
      <Text position={[0, 2, -10]} {...fontProps}>Hi, I am Mohit Virli.</Text>
      <CloudContainer/>
      <group position={[0, -25, 5.69]}>
        <pointLight castShadow position={[1, 1, -2.5]} intensity={60} distance={10}/>
        <WindowModel receiveShadow/>
        <TextWindow/>
      </group>
    </>
  );
};

export default Hero;
