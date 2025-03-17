'use client';

import { Scroll, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useLayoutEffect } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from "three";
import { useThemeStore } from "@stores";

const ScrollWrapper = (props: { children: React.ReactNode | React.ReactNode[]}) => {
  const { gl, scene, camera } = useThree();
  const data = useScroll();
  const showThemeSwitcher = useThemeStore((state) => state.showThemeSwitcher);
  const setShowThemeSwitcher = useThemeStore((state) => state.setShowThemeSwitcher);

  // Precompile to improve framerate
  useLayoutEffect(() => void gl.compile(scene, camera), []);

  useFrame((state, delta) => {
    if (data) {
      const a = data.range(0, 1 / 6);
      const b = data.range(1 / 6, 1 / 2);
      const c = data.range(5/12, 1 / 6);
      const d = data.range(3.1 / 5, 1 / 4);

      camera.rotation.x = THREE.MathUtils.damp(camera.rotation.x, -0.5 * Math.PI * a, c === 0 ? 2 : 10, delta);

      // Hide theme switcher after first screen
      if (a !== 1) {
        !showThemeSwitcher && setShowThemeSwitcher(true);
      } else {
        showThemeSwitcher && setShowThemeSwitcher(false);
      }

      if (b < 0.5) {
        camera.position.y = - 30 * b;
      } else if (b < 1){
        camera.position.y = - 15 -  20 * (b - 0.5);
      }

      if ( d > 0) {
        camera.position.y = - 40 - 8 *d;
        camera.rotation.x = THREE.MathUtils.damp(0, 0, 10, delta);
      }

      // Move camera slightly on mouse movement.
      if (!isMobile) {
        camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, -(state.pointer.x * Math.PI) / 90, 0.05);
      }
    }
  });

  const children = Array.isArray(props.children) ? props.children : [props.children];

  return <>
    {children.map((child, index) => {
      return <Scroll key={index}>
        {child}
      </Scroll>
    })}
  </>
}

export default ScrollWrapper;