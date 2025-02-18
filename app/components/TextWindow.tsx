'use client';

import { Text, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const TextWindow = () => {
  const data = useScroll();
  const windowRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const c = data.range(2/3, 1 / 4);

    if (windowRef.current) {
      windowRef.current.setRotationFromAxisAngle(new THREE.Vector3(0, -1, 0), 0.5 *Math.PI * c);
      windowRef.current.position.x =  -0.6 * c;
      // windowRef.current.position.y =  c;
      windowRef.current.position.z = -0.6 * c;
    }
  });

  return (
    <group position={[0, -0.4, 0]} ref={windowRef}>

      <Text color="white" anchorX="left" anchorY="middle"
        scale={[1, -1, 1]}
        rotation={[0, 0,  -Math.PI / 2]}>
        FRONTEND DEVELOPER
      </Text>

      <Text color="white" anchorX="right" anchorY="middle"
        scale={[-1, -1, 1]}
        position={[0, 0, -1.4]}
        rotation={[0, 0,  -Math.PI / 2]}>
        DESIGNER.  DEVELOPER
      </Text>

      <group position={[-0.5, 0, -0.4]}>
        <Text color="white" anchorX="left" anchorY="middle"
          scale={[1, -1, 1]}
          fontSize={0.7}
          rotation={[0, -Math.PI / 2,  -Math.PI / 2]}>
          DESIGNER. DUMBASS.
        </Text>

        <Text color="white" anchorX="left" anchorY="middle"
          scale={[1, -1, 1]}
          fontSize={0.7}
          position={[0, 0, -0.6]}
          rotation={[0, -Math.PI / 2,  -Math.PI / 2]}>
          AMATEUR DJ. AUDIOPHILE
        </Text>
      </group>

      <group position={[0.5, 0, -0.4]}>
        <Text color="white" anchorX="right" anchorY="middle"
          scale={[-1, -1, 1]}
          fontSize={0.7}
          rotation={[0, -Math.PI / 2,  -Math.PI / 2]}>
          GAMER. CREATIVE.
        </Text>
        <Text color="white" anchorX="right" anchorY="middle"
          scale={[-1, -1, 1]}
          fontSize={0.7}
          position={[0, 0, -0.6]}
          rotation={[0, -Math.PI / 2,  -Math.PI / 2]}>
          FOOTBALLER
        </Text>
      </group>
    </group>
  );
}

export default TextWindow;