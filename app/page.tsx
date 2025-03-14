'use client';

import { useEffect } from "react";
import * as THREE from "three";
import CanvasLoader from "./components/CanvasLoader";
import Hero from "./components/Hero";
import Computer from "./components/models/Computer";
import Projects from "./components/Projects";
import ScrollWrapper from "./components/ScrollWrapper";
import useProjectStore from "./store/store";
import { Project } from "./types";

// TODO:
const projects: Project[] = [{
  title: 'Education',
  component: <Computer scale={new THREE.Vector3(2, 2, 2)} castShadow />,
  color: '#FCF516',
  active: false,
},
{
  title: 'Experience',
  component: <Computer scale={new THREE.Vector3(2, 2, 2)} castShadow />,
  color: '#62C65B',
  active: false,
},
{
  title: 'Experience',
  component: <Computer scale={new THREE.Vector3(2, 2, 2)} castShadow />,
  color: '#E579D7',
  active: false,
},
{
  title: 'Experience',
  component: <Computer scale={new THREE.Vector3(2, 2, 2)} castShadow />,
  color: '#BAEBF4',
  active: false,
}];

const Home = () => {
  const addProject = useProjectStore(state => state.addProject);

  useEffect(() => {
    projects.forEach(addProject);
  }, []);

  return (
    <CanvasLoader>
      <ScrollWrapper>
        <Hero />
        <Projects/>
      </ScrollWrapper>
    </CanvasLoader>
  );
};
export default Home;
