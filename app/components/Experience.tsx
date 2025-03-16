import { Grid, Text, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from 'three';
import useProjectStore from "../store/store";
import GridTile from "./GridTile";
import PaperPlane from "./models/PaperPlane";
import Work from "./Work";
import Projects from "./Projects";
// import Tea from "./Tea";


// TODO:
const Experience = () => {
  const groupRef = useRef<THREE.Group>(null);
  const data = useScroll();

  const fontProps = {
    font: "./soria-font.ttf",
  };

  useFrame (() => {
    const d = data.range(3.1 / 5, 1 / 4);
    if (groupRef.current) {
      if (d > 0) {
        groupRef.current.visible = true;
      } else {
        groupRef.current.visible = false;
      }
    }
  });

  return (
    <group position={[0, -67, 0]} ref={groupRef} rotation={[0 , 0 , -Math.PI / 2]}>
      <mesh receiveShadow position={[0, 0, 0.1]}>
        <planeGeometry args={[20, 20, 1]} />
        <shadowMaterial opacity={0.1} />
      </mesh>
      <group rotation={[0, 0, Math.PI / 2]} position={[-7, 0, 0]}>

        <Text color="white" anchorX="center" anchorY="top"
          castShadow
          {...fontProps}
          position={[0, 2, 1]}
          fontSize={1}>
          experience
        </Text>

        <group position={[-1, 4, 3.5]} >
          <PaperPlane scale={new THREE.Vector3(2, 2, 2)}/>
        </group>

        <group position={[-2, -1.5, 0]}>
          <GridTile title='WORK AND EDUCATION'
            id="work"
            color='#b9c6d6'
            textAlign='right'
            position={new THREE.Vector3(0, 0, 0)}>
            <Work/>
          </GridTile>
          <GridTile title='SIDE PROJECTS'
            id="side-projects"
            color='#bdd1e3'
            textAlign='left'
            position={new THREE.Vector3(4, 0, 0)}>
            <Projects/>
          </GridTile>
        </group>

      </group>

      <pointLight castShadow position={[-8, 0, 4]} intensity={1}></pointLight>
    </group>
  );
};

export default Experience;