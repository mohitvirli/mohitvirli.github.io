import { Text } from "@react-three/drei";
import { Memory } from "./models/Memory";
import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import usePortalStore from "../store/store";
import gsap from "gsap";

const Work = () => {
  const groupRef = useRef<THREE.Group>(null);
  const isActive = usePortalStore((state) => state.activePortalId === 'work');

  useFrame(() => {
    if (groupRef.current) {
      if (isActive) {
        gsap.to(groupRef.current.position, {
          y: 1.5,
          duration: 1,
        });
      } else {

        gsap.to(groupRef.current.position, {
          y: -3,
          duration: 1,
        });
      }
    }
  });

  const fontProps = {
    font: "./soria-font.ttf",
  };

  return (
    <group>
      <Memory scale={new THREE.Vector3(5, 5, 5)} position={new THREE.Vector3(0, -6, 1)}/>
      <group ref={groupRef}>
        <Text color={'white'} fontSize={1} {...fontProps}>WORK</Text>
        {/* <Text color={'white'} fontSize={1} {...fontProps}>AND</Text> */}
      </group>
    </group>
  );
};

export default Work;