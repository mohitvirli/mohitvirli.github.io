'use client';

import Hero from "./components/Hero";

export default function Home() {
  return (
  <div className="min-h-screen relative">
    <div
      style={{
        backgroundColor: "transparent",
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat",
        backgroundSize: "182px",
        opacity: 0.7,
        top: 0,
        left: 0,
        position: "absolute",
        width: "100%",
        height: "100%"
      }}>
    </div>
      <Hero />
    </div>
  );
}
