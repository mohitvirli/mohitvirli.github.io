'use client';

import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();

  return (
    <Html as="div"
      center
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}>
        CANVAS LOADING
      {progress}
    </Html>
  );
};

export default CanvasLoader;