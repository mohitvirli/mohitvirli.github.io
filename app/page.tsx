'use client';

import CanvasLoader from "./components/CanvasLoader";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import ScrollWrapper from "./components/ScrollWrapper";

const Home = () => {
  return (
    <CanvasLoader>
      <ScrollWrapper>
        <Hero />
        <Experience/>
      </ScrollWrapper>
    </CanvasLoader>
  );
};
export default Home;
