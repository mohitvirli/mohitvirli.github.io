'use client';

import { useEffect } from "react";
import * as THREE from "three";
import CanvasLoader from "./components/CanvasLoader";
import Hero from "./components/Hero";
import { Memory } from "./components/models/Memory";
import { Wanderer } from "./components/models/Wanderer";
import Projects from "./components/Projects";
import ScrollWrapper from "./components/ScrollWrapper";
import useProjectStore from "./store/store";
import { Project } from "./types";

// TODO:
const projects: Project[] = [
  {
    title: 'WORK AND EDUCATION',
    component: <Memory scale={new THREE.Vector3(5, 5, 5)} position={new THREE.Vector3(0, -6, 1)}/>,
    color: '#b9c6d6',
    textAlign: 'right',
    active: false,
  },
  {
    title: 'SIDE PROJECTS',
    component: <Wanderer rotation={new THREE.Euler(0, Math.PI / 6, 0)} scale={new THREE.Vector3(1.5, 1.5, 1.5)} position={new THREE.Vector3(0, -1, -1)}/>,
    textAlign: 'left',
    color: '#bdd1e3',
    active: false,
  },
];

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
