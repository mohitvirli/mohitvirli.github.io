import { Box, Edges, Line, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";
import { WORK_TIMELINE } from "../constants";
import { usePortalStore } from "../stores";
import { WorkTimelinePoint } from "../types";

const TimelinePoint = ({ point }: { point: WorkTimelinePoint }) => {
  const getPoint = useMemo(() => (direction: WorkTimelinePoint['position']) => {
    switch (direction) {
      case 'left': return new THREE.Vector3(-0.3, 0, -0.1);
      case 'right': return new THREE.Vector3(0.3, 0, -0.1);
      default: return new THREE.Vector3(0, 0, 0);
    }
  }, []);

  const textAlign = point.position === 'left' ? 'right' : 'left';

  return (
    <group position={point.point}>
      <Box args={[0.2, 0.2, 0.2]}>
        <meshBasicMaterial color="white" wireframe wireframeLinewidth={4}/>
      </Box>
      <group position={getPoint(point.position)}>
        <Text color="white" fontSize={0.3} anchorX={textAlign}>
          {point.year}
        </Text>
        <group position={[0, -0.5, 0]}>
          <mesh position={[point.position === 'left' ? -0.9 : 0.9, 0, -0.1]}>
            <planeGeometry args={[2, 0.5, 1]} />
            <meshPhysicalMaterial
              transmission={1}
              roughness={0.3}
            />
            <Edges color="black" lineWidth={1.5} />
          </mesh>
          <Text color={'white'} fontSize={0.3} anchorX={textAlign} maxWidth={3}>
            {point.text}
          </Text>
        </group>
      </group>
    </group>
  );
}

const Timeline = ({ progress }: { progress: number }) => {
  const { camera } = useThree();
  const isActive = usePortalStore((state) => state.activePortalId === 'work');
  const timeline = [...WORK_TIMELINE];
  const curve = useMemo(() => new THREE.CatmullRomCurve3(timeline.map((p) => p.point), false), [timeline]);
  const curvePoints = useMemo(() => curve.getPoints(1000), [curve]);
  const visibleCurvePoints = useMemo(
    () => curvePoints.slice(0, Math.max(1, Math.ceil(progress * curvePoints.length))),
    [curvePoints, progress]);

  const visibleTimelinePoints = useMemo(
    () => timeline.slice(0, Math.max(1, Math.ceil(progress * timeline.length))),
    [timeline, progress]);

  useFrame((state, delta) => {
    if (isActive) {
      const position = curve.getPoint(progress);
      camera.position.x = THREE.MathUtils.damp(camera.position.x, -2 + position.x, 4, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, -39 + position.z, 4, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, 12 - position.y, 4, delta);
    }
  });

  return (
    <group>
      <Line
        points={visibleCurvePoints}
        color="white"
        lineWidth={3}
      />
      { visibleTimelinePoints.map((point, i) => (<TimelinePoint point={point} key={i} />))}
    </group>
  );
}

export default Timeline;