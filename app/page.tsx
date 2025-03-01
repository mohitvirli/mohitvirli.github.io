'use client';

import CanvasLoader from "./components/CanvasLoader";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import ScrollWrapper from "./components/ScrollWrapper";

const Home = () => {
  return (
    <CanvasLoader>
      <ScrollWrapper>
        <Hero />
        <Projects />
      </ScrollWrapper>
    </CanvasLoader>
  );
};
export default Home;
