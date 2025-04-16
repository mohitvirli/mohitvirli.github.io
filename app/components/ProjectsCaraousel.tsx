import { Edges, Text, TextProps } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import * as THREE from "three";
import { PROJECTS } from "../constants";
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
    if (projectRef.current) {
      gsap.to(projectRef.current?.position, {
        y: isActive ? 0 : -10,
        duration: 1,
        delay: isActive ? index * 0.1 : 0,
      });
    }
  }, [isActive]);

  // TODO: Cursor?
  useEffect(() => {
    const projectGroup = projectRef.current;
    if (!projectGroup) return;

    const [mesh, title, dateGroup, textBox] = projectGroup.children;

    const tl = gsap.timeline();
    tl
      .to(projectGroup.position, { y: isHovered ? 1 : 0, delay: 0.4 }, 0)
      .to(projectGroup.scale, { x: isHovered ? 2 : 1, y: isHovered ? 2 : 1, delay: 0.3 }, 0)
      .to(title.position, { y: isHovered ? 0.7 : -0.8, delay: 0.6 }, 0)
      .to(textBox.position, { y: isHovered ? 0.7 : 0, delay: 0.3 }, 0)
      .to(textBox.scale, { y: isHovered ? 1 : 0, x: isHovered ? 1 : 0, delay: 0.5 }, 0)
      .to(dateGroup.position, { y: isHovered ? 2.6 : 1.4, delay: 0.4 }, 0)
      .to(dateGroup.position, { x: isHovered ? 1.2 : -1.3, delay: 0.8 }, 0)
      .to(mesh.scale, { y: isHovered ? 2 : 1 }, 0)
      .to(mesh.position, { y: isHovered ? 1 : 0 }, 0)
      // .to(languages.scale, { y: isHovered ? 1 : 0, delay: 0.4 }, 0)

  }, [isHovered]);

  return (
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
        position={[-1.9, -0.8, 0.01]}
        anchorX={'left'}
        anchorY={'bottom'}
        maxWidth={4}
        fontSize={0.8}>
        {project.title}
      </Text>
      <group position={[-1.3, 1.4, 0.01]}>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[1.6, 0.4, 1]} />
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
      <Text maxWidth={4}
        {...subtitleProps}
        position={[-1.9, 2.3, 0.1]}
        fontSize={0.2}>
        {project.subtext}
      </Text>
      {/* <group position={[-1.3, -1.4, 0.01]}>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[1.6, 0.4, 1]} />
          <meshBasicMaterial color={'#777'} wireframe opacity={0}/>
          <Edges color="black" lineWidth={1} />
        </mesh>
        <Text
          {...subtitleProps}
          position={[-0.7, 0.2, 0]}
          fontSize={0.3}>
          {project.date.toUpperCase()}
        </Text>
      </group> */}
    </group>
  );
}

const ProjectsCaraousel = () => {
  const [activeHoverId, setActiveHoverId] = useState<number | null>(null);

  const getProjects = () => {
    const onPointerOver = (id: number) => setActiveHoverId(id);
    const onPointerOut = () => setActiveHoverId(null);
    const length = PROJECTS.length;

    return PROJECTS.map((project, i) => {
      const fov =  Math.PI;
      const angle =  (fov / length) * i;
      const distance = 13;
      const z = - distance * Math.sin(angle);
      const x = - distance * Math.cos(angle);
      const rotationY = Math.PI/2 - angle;

      const props = {
        project,
        isHovered: activeHoverId === i,
        index: i,
      };

      return (
        <group key={i}
          position={[x, 1, z]}
          rotation={[0, rotationY, 0]}
          onPointerOver={() => onPointerOver(i)}
          onPointerOut={onPointerOut}>
          <ProjectTile {...props} />
        </group>
      );
    });
  };

  return (
    <group rotation={[0, -Math.PI / 12, 0]}>
      { getProjects() }
    </group>
  );
}

export default ProjectsCaraousel;
