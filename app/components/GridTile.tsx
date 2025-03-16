
import { MeshPortalMaterial, Text, useScroll } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from "gsap";
import { useRef } from 'react';
import * as THREE from 'three';
import useProjectStore from '../store/store';
import { Project } from '../types';
import usePortalStore from '../store/store';

interface GridTileProps {
  // grid: Project;
  id: string;
  title: string;
  textAlign: any;
  children: React.ReactNode;
  color: string;
  position: any;
}

// TODO: Rename this
const GridTile = (props: GridTileProps) => {
  const portalRef = useRef(null);
  const data = useScroll();
  const { title, textAlign, children, color, position, id } = props;
  const { camera } = useThree();
  const setActivePortal = usePortalStore((state) => state.setActivePortal);
  const isActive = usePortalStore((state) => state.activePortalId === id);

  useFrame(() => {
    const d = data.range(2/3, 1 / 4);
    if (d === 0 && isActive) {
      exitPortal();
    }
  });

  const portalInto = () => {
    if (isActive) return;
    setActivePortal(id);

    gsap.to(camera.position, {
      x: camera.position.x - 2 + position.x ,
      z: 3,
      duration: 1,
    });

    gsap.to(portalRef.current, {
      blend: 1,
      duration: 1,
    });
  };

  const exitPortal = () => {
    if (!isActive) return;
    setActivePortal(null);

    gsap.to(camera.position, {
      x: 0,
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

  return (<mesh position={position} castShadow onClick={portalInto}>
    <planeGeometry args={[4, 4, 1]} />
    <Text maxWidth={2} position={[0, -1.8, 0.2]} {...fontProps} fontSize={0.7} castShadow anchorX="center" anchorY={'bottom'} textAlign={textAlign}>
      {title}
    </Text>
    <MeshPortalMaterial ref={portalRef} blend={0} resolution={0} blur={0}>
      <color attach="background" args={[color]} />
      {children}
    </MeshPortalMaterial>
  </mesh>)
}

export default GridTile;