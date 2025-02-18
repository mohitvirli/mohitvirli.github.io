import { Cloud, Clouds, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CloudContainer = () => {
  const data = useScroll();
  useFrame((state) => {
    const a = data.range(0, 1 / 6);
    const b = data.range(1 / 6, 1 / 2);
    const c = data.range(2/3, 1/3);


    state.camera.rotation.x = -0.5 * Math.PI * a;

    if (b < 0.5) {
      state.camera.position.y = - 30 * b;
    } else if (b < 1){
      state.camera.position.y = - 15 -  20 * (b - 0.5);
    } else {
      state.camera.position.y = - 25 - 10 * (c);
    }
  });

  return (
    <Clouds material={THREE.MeshBasicMaterial} position={[0, -3.5, 0]} frustumCulled={false}>
      <Cloud seed={1}
        segments={1}
        concentrate="inside"
        bounds={[10, 10, 10]}
        growth={3}
        position={[-1, 0, 0]}
        smallestVolume={2}
        scale={1.9}
        volume={2}
        speed={0.2}
        fade={5}
        />
      <Cloud
        seed={3}
        segments={1}
        concentrate="outside"
        bounds={[10, 10, 10]}
        growth={2}
        position={[2, 0, 2]}
        smallestVolume={2}
        scale={1}
        volume={2}
        fade={3}
        speed={0.1}/>

      <Cloud
        seed={4}
        segments={1}
        concentrate="outside"
        bounds={[10, 20, 15]}
        growth={4}
        position={[-10, -10, 4]}
        smallestVolume={2}
        scale={2}
        speed={0.2}
        volume={3}/>

      <Cloud
        seed={5}
        segments={1}
        concentrate="outside"
        bounds={[5, 5, 5]}
        growth={2}
        position={[6, -3, 8]}
        smallestVolume={2}
        scale={2}
        volume={2}
        fade={0.1}
        speed={0.1}/>

      <Cloud
        seed={6}
        segments={1}
        concentrate="outside"
        bounds={[5, 5, 5]}
        growth={2}
        position={[0, -15, 20]}
        smallestVolume={2}
        scale={4}
        volume={3}
        fade={0.1}
        speed={0.1}/>

      <Cloud
        seed={7}
        segments={1}
        concentrate="outside"
        bounds={[5, 5, 5]}
        growth={2}
        position={[10, -20, -10]}
        smallestVolume={2}
        scale={4}
        volume={3}
        fade={0.1}
        speed={0.1}/>
    </Clouds>);
}

export default CloudContainer;