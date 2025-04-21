import { Text, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const Footer = () => {
  const groupRef = useRef<THREE.Group>(null);
  const data = useScroll();

  useFrame(() => {
    const d = data.range(0.8, 0.2);
    if (groupRef.current) {
      groupRef.current.visible = d > 0;
    }
  });
  const links = [
    // {
    //   name: '© 2023 Mohit Virli'
    // },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/mohit-virli-b3b1a01a3/',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/mohitvirli',
    },
    {
      name: 'Spotify',
      url: 'https://open.spotify.com/user/mohitvirli',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/mohitvirli/',
    },
    {
      name: 'Resume',
      url: 'https://mohitvirli.github.io/resume/',
    }
  ];

  const fontProps = {
    // font: "./soria-font.ttf",
    font: "./Vercetti-Regular.woff",
  };
  const getLinks = () => {
    return links.map((link, i) => {
      return (
        <Text key={i} fontSize={0.2} {...fontProps} color="white" position={[i * 2, 0, 0]}>
          {link.name.toUpperCase()}
        </Text>
      );
    });
  };
  return (
    <group position={[0, -44, 18]} rotation={[-Math.PI / 2, 0, 0]} ref={groupRef}>
      {/* <Scroll html>
        <div style={{ height: '285vh', width: '100%' }}>
        </div>
        <div className="flex items-center justify-center w-screen">
          Hello
        </div>
      </Scroll> */}
      {/* <Box args={[1, 1, 1]} position={[0, 0, -0.1]} scale={[1, 1, 1]}/> */}

      <group position={[-4, 0, 0]}>

        { getLinks() }
      </group>
    </group>
  );
};

export default Footer;