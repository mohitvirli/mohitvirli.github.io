import { ScrollControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { usePortalStore } from "@stores";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Memory } from "./models/Memory";

const Work = () => {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const isActive = usePortalStore((state) => state.activePortalId === 'work');
  const [scroll, setScroll] = useState<Event | null>(null);
  const handleScroll = (event: Event) => setScroll(event);

  useFrame((state, delta) => {
    if (scroll && isActive) {
      const target = scroll.target as HTMLElement;
      const scrollTop = target.scrollTop;
      const scrollHeight = target.scrollHeight - target.clientHeight;
      const progress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);

      camera.position.y = THREE.MathUtils.damp(camera.position.y, -39 - progress * 10, 7, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, 13 - progress * 5, 7, delta);
    }
  });

  // Hack: If the portal is active, add the scroll event listener to the scroll
  // wrapper div. If the portal is not active, remove the scroll event listener.
  // ScrollControls doesn't work out of the box, so we have to manually handle
  // the scroll event.
  useEffect(() => {
    if (isActive) {
      const scrollWrapper = document.querySelector('div[style*="z-index: -1"]') as HTMLElement;
      const originalScrollWrapper = document.querySelector('div[style*="z-index: 1"]') as HTMLElement;
      scrollWrapper.addEventListener('scroll', handleScroll)
      scrollWrapper.scrollTo({ top: 0, behavior: 'instant' });
      camera.position.z = THREE.MathUtils.damp(camera.position.z, 13, 3, 0.1);
      scrollWrapper.style.zIndex = '1';
      scrollWrapper.classList.add('red');
      originalScrollWrapper.style.zIndex = '-1';
    } else {
      const scrollWrapper = document.querySelector('div[style*="z-index: 1"]') as HTMLElement;
      const originalScrollWrapper = document.querySelector('div[style*="z-index: -1"]') as HTMLElement;

      if (scrollWrapper) {
        setScroll(null);
        scrollWrapper.removeEventListener('scroll', handleScroll);
        scrollWrapper.style.zIndex = '-1';
        originalScrollWrapper.style.zIndex = '1';
      }
    }
  }, [isActive]);

  return (
    <group>
      <mesh receiveShadow>
        <planeGeometry args={[4, 4, 1]} />
        <shadowMaterial opacity={0.1} />
      </mesh>
      <ScrollControls style={{ zIndex: -1}}>
        <Memory scale={new THREE.Vector3(5, 5, 5)} position={new THREE.Vector3(0, -6, 1)}/>
      </ScrollControls>
      {/* <Text color={'white'}
        maxWidth={2}
        fontSize={0.3}
        castShadow
        {...fontProps}>/WORK AND EDUCATION</Text> */}
      <group ref={groupRef}>
        {/* <Text color={'white'} fontSize={1} {...fontProps}>WORK</Text> */}
        {/* <Text color={'white'} fontSize={1} {...fontProps}>AND</Text> */}
      </group>
    </group>
  );
};

export default Work;