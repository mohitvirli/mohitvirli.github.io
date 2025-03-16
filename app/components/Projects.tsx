import { Text } from "@react-three/drei";
import { Wanderer } from "./models/Wanderer";
import * as THREE from "three";

const Projects = () => {
  return (
    <group>
      <Wanderer rotation={new THREE.Euler(0, Math.PI / 6, 0)} scale={new THREE.Vector3(1.5, 1.5, 1.5)} position={new THREE.Vector3(0, -1, -1)}/>
      {/* <Text color={'white'} fontSize={2}>SIDE PROJECTS</Text> */}
    </group>
  );
};

export default Projects;