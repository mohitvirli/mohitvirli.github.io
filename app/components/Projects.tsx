import * as THREE from "three";
import { Wanderer } from "./models/Wanderer";
import { Box, Scroll, ScrollControls, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { usePortalStore } from "../stores";

const Projects = () => {
  const { camera } = useThree();
  const isActive = usePortalStore((state) => state.activePortalId === "projects");
  const [scroll, setScroll] = useState<Event | null>(null);
  const handleScroll = (event: Event) => setScroll(event);

  // Hack: If the portal is active, add the scroll event listener to the scroll
  // wrapper div. If the portal is not active, remove the scroll event listener.
  // ScrollControls doesn't work out of the box, so we have to manually handle
  // the scroll event.
  useEffect(() => {
    if (isActive) {
      const scrollWrapper = document.querySelector('div[style*="z-index: -1"]') as HTMLElement;
      scrollWrapper.addEventListener('scroll', handleScroll)
      scrollWrapper.scrollTo({ top: 1650 / 2, behavior: 'instant'})
      scrollWrapper.style.zIndex = '1';
    } else {
      const scrollWrapper = document.querySelector('div[style*="z-index: 1"]') as HTMLElement;
      if (scrollWrapper) {
        setScroll(null);
        scrollWrapper.removeEventListener('scroll', handleScroll);
        scrollWrapper.style.zIndex = '-1';
      }
    }
  }, [isActive]);

  useFrame(() => {
    if (scroll && isActive) {
      const target = scroll.target as HTMLElement;
      const scrollTop = target.scrollTop;
      const scrollHeight = target.scrollHeight - target.clientHeight;

      const progress = 0.6 - Math.min(Math.max(scrollTop / scrollHeight, 0), 1);

      camera.position.x = THREE.MathUtils.lerp(
        camera.position.x,
        2 + progress * 4,
        0.05,
      );

      camera.rotation.y = THREE.MathUtils.lerp(
        camera.rotation.y,
        Math.PI * progress,
        0.05,
      );
    }
  });



  // TODO:
  const getBox = (position: THREE.Vector3, key: number) => {
    return (
      <Box position={position} key={key}>
        <meshBasicMaterial color={'red'} />
      </Box>);
  }

  const getBoxes = () => {
    const projects = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,  12, 13, 14];

    const length = projects.length;
    return projects.map((p, i) => {
      const fov =  Math.PI;
      const angle =  (fov / length)* (i + 1);
      const distance = 15;
      const z = - distance * Math.sin(angle);
      const x = distance * Math.cos(angle);

      return getBox(new THREE.Vector3(x, 0, z), i);
    });
  }

  return (
    <group>
      <Wanderer rotation={new THREE.Euler(0, Math.PI / 6, 0)} scale={new THREE.Vector3(1.5, 1.5, 1.5)} position={new THREE.Vector3(0, -1, -1)}/>
      {getBoxes()}
    </group>
  );
};

export default Projects;