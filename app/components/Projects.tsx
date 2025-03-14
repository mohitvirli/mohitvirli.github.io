import { Text, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from 'three';
import useProjectStore from "../store/store";
import GridTile from "./GridTile";
import PaperPlane from "./models/PaperPlane";
// import Tea from "./Tea";


// TODO:
const Projects = () => {
  const groupRef = useRef<THREE.Group>(null);
  const data = useScroll();

  const allProjects = useProjectStore(state => state.projects);

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
  })

  const getGrid = () => {
    return allProjects.map((grid, index) => {
      return <GridTile key={index} grid={grid} index={index}/>
    });
  }

  return (
    <group position={[0, -67, 0]} ref={groupRef} rotation={[0 , 0 , -Math.PI / 2]}>
      {/* <mesh receiveShadow>
        <planeGeometry args={[20, 20, 1]} />
        <meshBasicMaterial color="white"></meshBasicMaterial>
      </mesh> */}
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

        <group position={[-3, -2, 0]}>
          {getGrid()}
        </group>

      </group>

      <pointLight castShadow position={[-8, 0, 4]} intensity={1}></pointLight>
    </group>
  );
};

export default Projects;