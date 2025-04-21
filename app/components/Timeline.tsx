import { Box, Edges, Line, Text, TextProps } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { WORK_TIMELINE } from "../constants";
import { usePortalStore } from "../stores";
import { WorkTimelinePoint } from "../types";
import gsap from "gsap";

const TimelinePoint = ({ point, diff }: { point: WorkTimelinePoint, diff: number }) => {
  const getPoint = useMemo(() => (direction: WorkTimelinePoint['position']) => {
    switch (direction) {
      case 'left': return new THREE.Vector3(-0.3, 0, -0.1);
      case 'right': return new THREE.Vector3(0.3, 0, -0.1);
      default: return new THREE.Vector3(0, 0, 0);
    }
  }, []);

  const textAlign = point.position === 'left' ? 'right' : 'left';

  const textProps: Partial<TextProps> = {
    font: "./Vercetti-Regular.woff",
    color: "white",
    anchorX: textAlign,
    fillOpacity: 2 - 2 * diff,
  }

  const titleProps = {
    ...textProps,
    font: "./soria-font.ttf",
    fontSize: 0.6,
    maxWidth: 3,
  };

  return (
    <group position={point.point}>
      <Box args={[0.2, 0.2, 0.2]} position={[0, 0, -0.1]} scale={[1 - diff, 1 - diff, 1 - diff]}>
        <meshBasicMaterial color="white" wireframe/>
        <Edges color="white" lineWidth={1.5} />
      </Box>
      <group>
        <group position={getPoint(point.position)}>
          <Text {...textProps}
            fontSize={0.3}
            position={[-diff/2, 0, 0]}>
            {point.year}
          </Text>
          <group position={[0, -0.5, 0]}>
            <Text {...titleProps} fontSize={0.6} maxWidth={3} position={[0, -diff/2, 0]}>
              {point.title}
            </Text>

            <Text {...textProps} fontSize={0.2} position={[0, -0.4 - diff, 0]}>
              {point.subtitle}
            </Text>
          </group>
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
    () => timeline.slice(0, Math.max(1, Math.round(progress * (timeline.length - 1) + 1))),
    [timeline, progress]);

  const [visibleDashedCurvePoints, setVisibleDashedCurvePoints] = useState<THREE.Vector3[]>([]);

  useFrame((state, delta) => {
    if (isActive) {
      const position = curve.getPoint(progress);
      camera.position.x = THREE.MathUtils.damp(camera.position.x, -2 + position.x, 4, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, -39 + position.z, 4, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, 12 - position.y, 4, delta);
    }
  });

  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current?.scale, {
        x: isActive ? 1 : 0,
        y: isActive ? 1 : 0,
        z: isActive ? 1 : 0,
        duration: 1,
        delay: isActive ? 0.4 : 0,
      });
      gsap.to(groupRef.current?.position, { y: isActive ? 0 : -2, duration: 1, delay: isActive ? 0.4 : 0 });
    }

    // Animate the dashed line using set interval.
    if (isActive) {
      let interval: NodeJS.Timeout;
      setTimeout(() => {
        let i = 0;
        interval = setInterval(() => {
          const p = i++ / 100;
          setVisibleDashedCurvePoints(curvePoints.slice(0, Math.max(1, Math.ceil(p * curvePoints.length))));
          if (i > 100) {
            clearInterval(interval);
          }
        }, 10);
      }, 1000);

      return () => {
        clearInterval(interval);
      }
    } else {
      setVisibleDashedCurvePoints([]);
    }
  }, [isActive]);

  const getVisibleTimelinePoints = () => {
    return visibleTimelinePoints.map((point, i) => {
      const diff = Math.min(2 * Math.max(i - (progress * (timeline.length - 1)), 0), 1);
      return <TimelinePoint point={point} key={i} diff={diff}/>;
    });
  };

  return (
    <group position={[0, -0.1, -0.1]}>
      <Line
        points={visibleCurvePoints}
        color="white"
        lineWidth={3}
      />
      {visibleDashedCurvePoints.length > 0 && <Line
          points={visibleDashedCurvePoints}
          color="white"
          lineWidth={0.5}
          dashed
          dashSize={0.25}
          gapSize={0.25}
        />}
      <group ref={groupRef}>
        { getVisibleTimelinePoints() }
      </group>
    </group>
  );
}

export default Timeline;