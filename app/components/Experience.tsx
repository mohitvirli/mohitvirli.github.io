import { Text, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { usePortalStore } from "@stores";
import { useRef } from "react";
import * as THREE from 'three';
import GridTile from "./GridTile";
// import PaperPlane from "./models/PaperPlane";
import Projects from "./Projects";
import Work from "./Work";

// TODO:
const Experience = () => {
  const groupRef = useRef<THREE.Group>(null);
  const data = useScroll();
  const isActive = usePortalStore((state) => !!state.activePortalId);

  const fontProps = {
    font: "./soria-font.ttf",
  };

  useFrame((sate, delta) => {
    const d = data.range(0.8, 0.1);
    if (groupRef.current && !isActive) {
      groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, d > 0 ? 12 : 50, 7, delta);
    }
  });

  return (
    <group position={[0, -41.5, 100]} rotation={[-Math.PI / 2, 0 ,-Math.PI / 2]} ref={groupRef}>
      {/* <mesh receiveShadow position={[-5, 0, 0.1]}>
        <planeGeometry args={[10, 5, 1]} />
        <shadowMaterial opacity={0.1} />
      </mesh> */}
      <group rotation={[0, 0, Math.PI / 2]}>

        <Text color="white" anchorX="center" anchorY="top"
          castShadow
          {...fontProps}
          position={[0, 4, 1]}
          fontSize={1}>
          experience
        </Text>

        {/* <group position={[-1, 4, 3.5]} >
          <PaperPlane scale={new THREE.Vector3(2, 2, 2)}/>
        </group> */}

        <group>
          <GridTile title='WORK AND EDUCATION'
            id="work"
            color='#b9c6d6'
            textAlign='left'
            position={new THREE.Vector3(-2, 0, 0)}>
            <Work/>
          </GridTile>
          <GridTile title='SIDE PROJECTS'
            id="projects"
            color='#bdd1e3'
            textAlign='right'
            position={new THREE.Vector3(2, 0, 0)}>
            <Projects/>
          </GridTile>
        </group>
      </group>
      <pointLight castShadow position={[-8, 0, 4]} intensity={1}></pointLight>
    </group>
  );
};

export default Experience;