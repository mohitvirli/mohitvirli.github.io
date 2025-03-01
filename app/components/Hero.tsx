'use client';

import { Text } from "@react-three/drei";

import CloudContainer from "./Cloud";
import TextWindow from "./TextWindow";
import WindowModel from "./WindowModel";

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
          <WindowModel/>
          <TextWindow/>
        </group>

    </>
  );
};

export default Hero;
