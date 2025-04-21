'use client';

import CanvasLoader from "./components/CanvasLoader";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import ScrollWrapper from "./components/ScrollWrapper";

const Home = () => {
  return (
    <CanvasLoader>
      <ScrollWrapper>
        <Hero/>
        <Experience/>
        <Footer/>
      </ScrollWrapper>
    </CanvasLoader>
  );
};
export default Home;
