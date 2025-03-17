import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useRef } from "react";
import * as THREE from "three";
import { usePortalStore } from "@stores";
import { Memory } from "./models/Memory";

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

  // const fontProps = {
  //   font: "./soria-font.ttf",
  // };

  return (
    <group>
      <mesh receiveShadow>
        <planeGeometry args={[4, 4, 1]} />
        <shadowMaterial opacity={0.1} />
      </mesh>
      <Memory scale={new THREE.Vector3(5, 5, 5)} position={new THREE.Vector3(0, -6, 1)}/>
      {/* <Text color={'white'}
        maxWidth={2}
        fontSize={0.3}
        castShadow
        {...fontProps}>/WORK AND EDUCATION</Text> */}
      <group ref={groupRef}>
        {/* <Text color={'white'} fontSize={1} {...fontProps}>WORK</Text> */}
        {/* <Text color={'white'} fontSize={1} {...fontProps}>AND</Text> */}
      </group>
    </group>
  );
};

export default Work;