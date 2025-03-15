
import { MeshPortalMaterial, Text, useScroll } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from "gsap";
import { useRef } from 'react';
import * as THREE from 'three';
import useProjectStore from '../store/store';
import { Project } from '../types';

interface GridTileProps {
  grid: Project;
  index: number;
}

const GridTile = (props: GridTileProps) => {
  const portalRef = useRef(null);
  const data = useScroll();
  const { grid, index } = props;
  const position = new THREE.Vector3(index * 4, 0, 0);
  const { camera } = useThree();
  const isActive = useProjectStore((state) => state.activeProjectId === grid.id);
  const setActiveProject = useProjectStore((state) => state.setActiveProject);
  const activeProjectId = useProjectStore((state) => state.activeProjectId);

  useFrame(() => {
    const d = data.range(2/3, 1 / 4);
    if (d === 0 && isActive) {
      exitPortal();
    }
  });

  const portalInto = () => {
    if (isActive || activeProjectId) return;
    setActiveProject(grid);
    // isAnyGridActive = true;
    gsap.to(camera.position, {
      x: camera.position.x - 2 + position.x ,
      // y: position.y,
      z: 3,

      duration: 1,
    });

    gsap.to(portalRef.current, {
      blend: 1,
      duration: 1,
      // ease: 'power2.in'
    });
  };

  const exitPortal = () => {
    if (!isActive) return;
    setActiveProject(null);

    gsap.to(camera.position, {
      x: 0,
      // y: position.y,
      z: 5,

      duration: 1,
    });
    gsap.to(portalRef.current, {
      blend: 0,
      duration: 1,
    });
  }

  const fontProps = {
    font: "./soria-font.ttf",
  };

  return (<mesh position={position} key={index} castShadow onClick={portalInto}>
    <planeGeometry args={[4, 4, 1]} />
    <Text maxWidth={2} position={[0, -1.8, 0.2]} {...fontProps} fontSize={0.7} castShadow anchorX="center" anchorY={'bottom'} textAlign={grid.textAlign}>
      {grid.title}
    </Text>
    <MeshPortalMaterial ref={portalRef} blend={0} resolution={0} blur={0}>
      <color attach="background" args={[grid.color]} />
      {grid.component}
    </MeshPortalMaterial>
  </mesh>)
}

export default GridTile;