import { Clouds, Cloud, useScroll } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

const CloudContainer = () => {
  const data = useScroll();
  useFrame((state, delta) => {
    const a = data.range(0, 1 / 6);
    const b = data.range(1 / 6, 1 / 2);
    const c = data.range(2/3, 1/3);
    // state.camera.lookAt(0 - b, -a - b, 3 * (a + b));
    state.camera.rotation.x = -0.5 * Math.PI * a;
    if (b < 0.5) {
      state.camera.position.y = - 30 * b;
    } else if (b < 1){
      state.camera.position.y = - 15 -  20 * (b - 0.5);
    } else {
      state.camera.position.y = - 25 - 10 * (c);
    }
    // state.camera.position.z = 10 - 10* b;

  });
  return (
    <Clouds material={THREE.MeshBasicMaterial}>
      <Cloud
        seed={11}
        segments={6}
        concentrate={'inside'}
        bounds={[10, 10, 10]}
        growth={4}
        smallestVolume={4}
        scale={2}
        volume={2}
        fade={10}
        speed={0.2}/>
    </Clouds>);
}

export default CloudContainer;