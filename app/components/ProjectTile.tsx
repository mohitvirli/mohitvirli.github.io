import { Edges, Text, TextProps } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from "three";
import { usePortalStore } from "../stores";
import { Project } from "../types";

/**
 * Project Props.
 */
interface ProjectProps {
  project: Project,
  isHovered: boolean,
  index: number,
}

/**
 * Project Tile.
 */
const ProjectTile = ({ project, isHovered, index }: ProjectProps) => {
  const projectRef = useRef<THREE.Group>(null);
  const projectWrapperRef = useRef<THREE.Group>(null);
  const isActive = usePortalStore((state) => state.activePortalId === "projects");

  const titleProps = {
    font: "./soria-font.ttf",
    color: 'black',
  };

  const subtitleProps: Partial<TextProps> = {
    font: "./Vercetti-Regular.woff",
    color: "black",
    anchorX: "left",
    anchorY: "top",
  };

  useEffect(() => {
    if (projectWrapperRef.current) {
      gsap.to(projectWrapperRef.current?.position, {
        y: isActive ? 0 : -10,
        duration: 1,
        delay: isActive ? index * 0.1 : 0,
      });
    }
  }, [isActive]);

  // Fake debounce 200ms.
  useEffect(() => {
    // Set a timeout to only execute the animation after 200ms
    // TODO: Cleanup
    const timerRef = setTimeout(() => {
      const projectGroup = projectRef.current;
      if (!projectGroup) return;

      const [mesh, title, dateGroup, textBox, button] = projectGroup.children;

      const tl = gsap.timeline();
      tl.to(projectGroup.position, { z: isHovered ? 1 : 0, duration: 0.2}, 0)
        .to(projectGroup.position, { y: isHovered ? 0.5 : 0, delay: 0.2 }, 0)
        .to(projectGroup.scale, {
          x: isHovered ? 1.5 : 1,
          y: isHovered ? 1.5 : 1,
          z: isHovered ? 1.5 : 1,
          delay: 0.1
        }, 0)
        .to(title.position, { y: isHovered ? 0.7 : -0.8, delay: 0.5 }, 0)
        .to(textBox.position, { y: isHovered ? 0.7 : 0, delay: 0.3 }, 0)
        .to(textBox.scale, { y: isHovered ? 1 : 0, x: isHovered ? 1 : 0, delay: 0.4 }, 0)
        .to(dateGroup.position, { y: isHovered ? 2.6 : 1.4, delay: 0.3 }, 0)
        // .to(dateGroup.position, { x: isHovered ? 1.1 : -1.25, delay: 0.7 }, 0)
        .to(mesh.scale, { y: isHovered ? 2 : 1 }, 0)
        .to(mesh.position, { y: isHovered ? 1 : 0 }, 0);

      if (project.url) {
        tl.to(button.scale, { y: isHovered ? 1 : 0, x: isHovered ? 1 : 0, delay: 0.4 }, 0)
          .to(button.position, { z: isHovered ? 0.3 : -1, delay: 0.4 }, 0)
          // .to(button.position, { x: isHovered ? -1.3 : 1.3, delay: 0.8 }, 0);
      }
    }, isMobile ? 0 : 200);

    // Clean up function will clear the timeout if isHovered changes before 200ms
    return () => {
      if (isHovered && timerRef) {
        clearTimeout(timerRef);
      }
    };
  }, [isHovered]);

  /**
   * Handle click on project tile.
   */
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const button = e.eventObject;
    const tl = gsap.timeline();

    tl.to(button.position, { z: 0, duration: 0.1, ease: 'bounce.inOut' })
      .to(button.position, { z: 0.3, duration: 0.3});
    setTimeout(() => {
      window.open(project.url, '_blank');
    }, 200);
  };

  return (
    <group ref={projectWrapperRef}>
      <group ref={projectRef}>
        <mesh>
          <planeGeometry args={[4.2, 2, 1]} />
          <meshPhysicalMaterial
            transmission={1}
            roughness={0.3}
          />
          <Edges color="black" lineWidth={1.5} />
        </mesh>
        <Text {...titleProps}
          position={[-1.9, -0.8, 0.1]}
          anchorX={'left'}
          anchorY={'bottom'}
          maxWidth={4}
          fontSize={0.8}>
          {project.title}
        </Text>
        <group position={[-1.25, 1.4, 0.01]}>
          <mesh>
            <planeGeometry args={[1.7, 0.4, 1]} />
            <meshBasicMaterial color={'#777'} wireframe opacity={0}/>
            <Edges color="black" lineWidth={1} />
          </mesh>
          <Text
            {...subtitleProps}
            position={[-0.7, 0.2, 0]}
            fontSize={0.3}>
            {project.date.toUpperCase()}
          </Text>
        </group>
        <Text maxWidth={3.8}
          {...subtitleProps}
          position={[-1.9, 2.3, 0.1]}
          scale={[0, 0, 1]}
          fontSize={0.2}>
          {project.subtext}
        </Text>
        { project.url ? <group position={[1.3, -0.6, -1]}
          scale={[0, 0, 1]}
          onClick={handleClick}
          onPointerOver={() => document.body.style.cursor = 'pointer'}
          onPointerOut={() => document.body.style.cursor = 'auto'}>
          <mesh>
            <boxGeometry args={[1.1, 0.4, 0.2]} />
            <meshBasicMaterial color={'#222'}/>
            <Edges color="white" lineWidth={1} />
          </mesh>
          <Text
            {...subtitleProps}
            color={'white'}
            position={[-0.4, 0.15, 0.2]}
            fontSize={0.25}>
            VIEW ↗
          </Text>
        </group> : null }
      </group>
    </group>
  );
}

export default ProjectTile;