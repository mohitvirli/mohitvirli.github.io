import { Text, useCursor, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from "three";
import { FOOTER_LINKS } from "../constants";
import { FooterLink } from "../types";

const FooterLinkItem = ({ link }: { link: FooterLink }) => {
  const textRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const onPointerOver = () => setHovered(true);
  const onPointerOut = () => setHovered(false);
  const fontProps = {
    font: "./Vercetti-Regular.woff",
    fontSize: 0.2,
    color: 'white',
    onPointerOver,
    onPointerOut,
    onClick: () => window.open(link.url, '_blank'),
  };

  useEffect(() => {
    gsap.to(textRef.current, {
      letterSpacing: hovered ? 0.3 : 0,
      duration: 0.3,
    });
  }, [hovered]);

  useCursor(hovered);

  return (
    <Text ref={textRef} {...fontProps} >
      {link.name.toUpperCase()}
    </Text>
  )
}

const Footer = () => {
  const groupRef = useRef<THREE.Group>(null);
  const data = useScroll();

  useFrame(() => {
    const d = data.range(0.8, 0.2);
    if (groupRef.current) {
      groupRef.current.visible = d > 0;
    }
  });

  const getLinks = () => {
    return FOOTER_LINKS.map((link, i) => {
      return (
        <group key={i} position={[i * (isMobile ? 1.2 : 2), 0, 0]}>
          <FooterLinkItem link={link}/>
        </group>
      );
    });
  };

  return (
    <group position={[0, -44, 18]} rotation={[-Math.PI / 2, 0, 0]} ref={groupRef}>
      <group position={[isMobile ? -2 : -4, 0, 0]} scale={isMobile ? 0.9 : 1}>
        { getLinks() }
      </group>
    </group>
  );
};

export default Footer;