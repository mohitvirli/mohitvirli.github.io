import { Edges, Text, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { usePortalStore } from "@stores";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import GridTile from "./GridTile";
import PaperPlane from "./models/PaperPlane";
import Projects from "./Projects";
import Work from "./Work";

// TODO:
const Experience = () => {
  const groupRef = useRef<THREE.Group>(null);
  const hoverBoxRef = useRef<THREE.Mesh>(null);
  const [isRightSide, setIsRightSide] = useState(false);
  const gridRef1 = useRef<THREE.Group>(null);
  const gridRef2 = useRef<THREE.Group>(null);
  const data = useScroll();
  const [hovered, setHovered] = useState(false);
  const isActive = usePortalStore((state) => !!state.activePortalId);

  const fontProps = {
    font: "./soria-font.ttf",
  };

  useFrame (() => {
    const d = data.range(3.1 / 5, 1 / 4);
    if (groupRef.current) {
      if (d > 0) {
        groupRef.current.visible = true;
      } else {
        groupRef.current.visible = false;
      }
    }
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const isRight = event.clientX > window.innerWidth / 2;
      setIsRightSide(isRight);

      if (hovered && hoverBoxRef.current) {
        gsap.to(hoverBoxRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.4 });
        gsap.to(hoverBoxRef.current, { visible: true, duration: 0.25 });

        gsap.to(hoverBoxRef.current?.position, {
          x: isRightSide ? 4 : 0,
          duration: 0.5,
          ease: "sine",
        });

        if (gridRef1.current && gridRef2.current) {
          gsap.to(gridRef1.current?.position, {
            z: isRightSide ? 0 : 0.25,
            duration: 1,
            ease: "sine",
          });
          gsap.to(gridRef2.current?.position, {
            z: isRightSide ? 0.25 : 0,
            duration: 1,
            ease: "sine",
          })
        }
        document.body.style.cursor = !isActive ? 'pointer' : 'auto';
      } else {
        if (hoverBoxRef.current) {
          gsap.to(hoverBoxRef.current.scale, { x: 0, y: 0, z: 0, duration: 0.4 });
          gsap.to(hoverBoxRef.current, { visible: false, duration: 0.4 });
        }

        if (gridRef1.current && gridRef2.current) {
          gsap.to(gridRef1.current?.position, { z: 0, duration: 1, ease: "sine" });
          gsap.to(gridRef2.current?.position, { z: 0, duration: 1, ease: "sine" });
        }

        document.body.style.cursor = 'auto';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [hovered, isRightSide, isActive]);


  return (
    <group position={[0, -67, 0]} ref={groupRef} rotation={[0 , 0 , -Math.PI / 2]}>
      <mesh receiveShadow position={[-5, 0, 0.1]}>
        <planeGeometry args={[10, 5, 1]} />
        <shadowMaterial opacity={0.1} />
      </mesh>
      <group rotation={[0, 0, Math.PI / 2]} position={[-7, 0, 0]}>

        <Text color="white" anchorX="center" anchorY="top"
          castShadow
          {...fontProps}
          position={[0, 2, 1]}
          fontSize={1}>
          experience
        </Text>

        <group position={[-1, 4, 3.5]} >
          <PaperPlane scale={new THREE.Vector3(2, 2, 2)}/>
        </group>

        <group position={[-2, -1.5, 0]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}>
          <mesh ref={hoverBoxRef} position={[0, 0, 0]}>
            <boxGeometry args={[4, 4, 1]} />

            <meshPhysicalMaterial
              color="rgba(0, 0, 0)"
              transparent={true}
              opacity={0.3}
            />
            <Edges
              color="white"
              threshold={15} // Angle in degrees, edges with angles greater than this threshold are rendered
              lineWidth={3}
            />
          </mesh>

          <GridTile title='WORK AND EDUCATION'
            id="work"
            ref={gridRef1 as React.RefObject<THREE.Group>}
            color='#b9c6d6'
            textAlign='left'
            position={new THREE.Vector3(0, 0, 0)}>
            <Work/>
          </GridTile>
          <GridTile title='SIDE PROJECTS'
            ref={gridRef2 as React.RefObject<THREE.Group>}
            id="side-projects"
            color='#bdd1e3'
            textAlign='right'
            position={new THREE.Vector3(4, 0, 0)}>
            <Projects/>
          </GridTile>
        </group>
      </group>
      <pointLight castShadow position={[-8, 0, 4]} intensity={1}></pointLight>
    </group>
  );
};

export default Experience;