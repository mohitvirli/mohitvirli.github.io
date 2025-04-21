import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from "three";
import { usePortalStore } from "../stores";
import { Wanderer } from "./models/Wanderer";
import ProjectsCaraousel from "./ProjectsCaraousel";

const Projects = () => {
  const { camera } = useThree();
  const isActive = usePortalStore((state) => state.activePortalId === "projects");
  const [scrollTop, setScrollTop] = useState<number>(0);
  const data = useScroll();
  const handleToucheMove = (e: TouchEvent) => {

    const x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
    // const y =(e.touches[0].clientY / window.innerHeight) * 2 - 1;

    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, (x * Math.PI) / 4, 0.1);
    // camera.position.y = THREE.MathUtils.damp(camera.position.y, d, 7, delta);
    // console.log(x, y);
  }

  useEffect(() => {
    setScrollTop(data.el.scrollTop);

    // TODO: Mobile changes?
    if (isMobile) {
      if (isActive) {
        data.el.addEventListener('touchmove', handleToucheMove);
      } else {
        data.el.removeEventListener('touchmove', handleToucheMove)
      }
    }
  }, [isActive]);

  useFrame((state, delta) => {
    if (isActive) {
      // console.log(state);
      if (!isMobile) {
        camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, -(state.pointer.x * Math.PI) / 4, 0.03);
        // console.log(camera.position.z);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, 11.5 - state.pointer.y, 7, delta);
      }
      // camera.position.y = THREE.MathUtils.damp(camera.position.y, d, 7, delta);
      data.el.scrollTo({ top: scrollTop, behavior: 'instant' });
    }
  });

  return (
    <group>
      <Wanderer rotation={new THREE.Euler(0, Math.PI / 6, 0)} scale={new THREE.Vector3(1.5, 1.5, 1.5)} position={new THREE.Vector3(0, -1, -1)}/>
      <ProjectsCaraousel />
    </group>
  );
};

export default Projects;
