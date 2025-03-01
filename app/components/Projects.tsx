import { MeshPortalMaterial, Text, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useRef } from "react";
import * as THREE from 'three';
// import Tea from "./Tea";

// TODO:
const Projects = () => {
  const groupRef = useRef<THREE.Group>(null);
  const carousel = useRef<THREE.Group>(null);
  const data = useScroll();
  const onNavigation = (direction: string) => {
    if (carousel.current) {
      gsap.to(carousel.current.position, {
        x: carousel.current.position.x + (direction === 'right' ? 1 : -1),
        duration: 0.5,
      });
    }
  };

  const fontProps = {
    font: "./soria-font.ttf",
  };

  useFrame (() => {

    const d = data.range(3.1 / 5, 1 / 4);
    if (groupRef.current) {
      if (d > 0) {
        groupRef.current.position.z = 0;
      } else {
        groupRef.current.position.z = 40;
      }
    }
  })

  return (
    <group position={[0, -68, 40]} ref={groupRef} rotation={[0 , 0 , -Math.PI / 2]}>
      <mesh>
        <planeGeometry args={[20, 20, 1]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <group rotation={[0, 0, Math.PI / 2]} position={[-7, 0, 0]}>

        <Text color="#0284c7" anchorX="center" anchorY="top"
          {...fontProps}
          position={[0, 2, 1]}
          fontSize={1}>
          work
        </Text>
        <group ref={carousel}>
          <mesh>
            <planeGeometry args={[2, 3, 1]} />
            <MeshPortalMaterial resolution={0} blur={0}>
              <color attach="background" args={[0.5, 0.5, 0.5]} />
              {/* <Tea position={[0, -2, 0]} /> */}
            </MeshPortalMaterial>
          </mesh>
          <mesh position={[-2,0,0]}>
            <planeGeometry args={[2, 3, 1]} />
            <MeshPortalMaterial resolution={0} blur={0}>
              {/* <Tea position={[0, -2, 0]} /> */}
            </MeshPortalMaterial>
          </mesh>
        </group>
        <group onClick={() => onNavigation('right')}>
          <Text {...fontProps}
            color={'#0284c7'}
            position={[3, 0, 1]}>
            {">"}
          </Text>
        </group>
        <group onClick={() => onNavigation('left')}>
          <Text {...fontProps}
            color={'#0284c7'}
            position={[-3, 0, 1]}>
            {"<"}
          </Text>
        </group>
      </group>


    </group>
  );
};

export default Projects;