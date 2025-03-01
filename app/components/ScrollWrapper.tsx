'use client';

import { Scroll, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const ScrollWrapper = (props: any) => {

  const { camera } = useThree();

  const data = useScroll();
  useFrame((state, delta) => {
    if (data) {

      const a = data.range(0, 1 / 6);
      const b = data.range(1 / 6, 1 / 2);
      const c = data.range(5/12, 1 / 6);
      const d = data.range(3.1 / 5, 1 / 4);

      camera.rotation.x = THREE.MathUtils.damp(camera.rotation.x, -0.5 * Math.PI * a, c === 0 ? 2 : 10, delta);
      if (b < 0.5) {
        camera.position.y = - 30 * b;
      } else if (b < 1){
        camera.position.y = - 15 -  20 * (b - 0.5);
      }

      if ( d > 0) {
        camera.position.y = - 40 - 10 *d;
        camera.rotation.x = THREE.MathUtils.damp(0, 0, 10, delta);
      }
    }
  });

  const children = props.children.length ? props.children : [props.children];

  return <>
    {children.map((child: any, index: number) => {
      return <Scroll key={index}>
        {child}
      </Scroll>
    })}
  </>
}

export default ScrollWrapper;