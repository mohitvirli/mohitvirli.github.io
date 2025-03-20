
import { MeshPortalMaterial, Text, TextProps } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { usePortalStore } from '@stores';
import gsap from "gsap";
import { RefObject, useRef } from 'react';
import * as THREE from 'three';

interface GridTileProps {
  // grid: Project;
  id: string;
  title: string;
  textAlign: TextProps['textAlign'];
  children: React.ReactNode;
  color: string;
  position: THREE.Vector3;
  ref: RefObject<THREE.Group> | null;
}

// TODO: Rename this
const GridTile = (props: GridTileProps) => {
  const portalRef = useRef(null);
  const { title, textAlign, children, color, position, id } = props;
  const { camera } = useThree();
  const setActivePortal = usePortalStore((state) => state.setActivePortal);
  const isActive = usePortalStore((state) => state.activePortalId === id);
  const activePortalId = usePortalStore((state) => state.activePortalId);

  const portalInto = () => {
    if (isActive || activePortalId) return;
    setActivePortal(id);

    const div = document.createElement('div');

    div.className = 'fixed close';
    div.style.transform = 'rotateX(90deg)';
    div.onclick = () => exitPortal(true);

    if (!document.querySelector('.close')) {
      document.body.appendChild(div);

      gsap.to(div, {
        opacity: 1,
        transform: 'rotateX(0deg)',
        duration: 1,
      })
    }

    gsap.to(camera.position, {
      x: camera.position.x + position.x ,
      y: camera.position.y - 2,
      duration: 1,
    });

    gsap.to(portalRef.current, {
      blend: 1,
      duration: 0.5,
    });
  };

  const exitPortal = (force = false) => {
    if (!force && !activePortalId) return;
    setActivePortal(null)

    gsap.to(camera.position, {
      x: camera.position.x - position.x,
      duration: 1,
    });

    gsap.to(portalRef.current, {
      blend: 0,
      duration: 0.5,
    });

    // Remove the div from the dom
    gsap.to(document.querySelector('.close'), {
      transform: 'rotateX(90deg)',
      duration: 0.5,
      onComplete: () => {
        document.querySelectorAll('.close').forEach((el) => {
          el.remove();
        });
      }
    })
  }

  const fontProps = {
    font: "./soria-font.ttf",
  };

  return (<mesh position={position} onClick={portalInto} ref={props.ref}>
    <planeGeometry args={[4, 4, 1]} />
    <group>
      <Text maxWidth={2} position={[0, -1.6, 0.51]} {...fontProps} fontSize={0.7} anchorX="center" anchorY={'bottom'} textAlign={textAlign}>
        {title}
      </Text>
    </group>
    <MeshPortalMaterial ref={portalRef} blend={0} resolution={0} blur={0}>
      <color attach="background" args={[color]} />
      {children}
    </MeshPortalMaterial>
  </mesh>)
}

export default GridTile;