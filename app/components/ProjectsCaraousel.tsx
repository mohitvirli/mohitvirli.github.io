import { useEffect, useState } from "react";

import { ThreeEvent } from "@react-three/fiber";
import { isMobile } from "react-device-detect";
import { PROJECTS } from "../constants";
import { usePortalStore, useScrollHintStore } from "../stores";
import ProjectTile from "./ProjectTile";

const ProjectsCaraousel = () => {
  const [activeHoverId, setActiveHoverId] = useState<number | null>(null);
  const { showScrollHint, setScrollHint } = useScrollHintStore();
  const isActive = usePortalStore((state) => state.activePortalId === "projects");

  useEffect(() => {
    if (!isActive) {
      setActiveHoverId(null);
    } else if (!showScrollHint) {
      setScrollHint(true, 'PAN');
    }
  }, [isActive]);

  const getProjects = () => {
    // Hacky way to set the active hover id with a delay.
    const onPointerOver = (id: number) => {
      if (isMobile) return;
      setTimeout(() => setActiveHoverId(id), 100);
    };

    const onClick = (id: number) => {
      if (!isMobile) return;
      setActiveHoverId(activeHoverId === id ? null : id);
    }

    const onPointerOut = (e: ThreeEvent<MouseEvent>) => {
      if (isMobile) return;
      e.stopPropagation();
      setActiveHoverId(null);
    }

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
          onClick={() => onClick(i)}
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
