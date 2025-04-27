import * as THREE from "three";
import { WorkTimelinePoint } from "../types";

export const WORK_TIMELINE: WorkTimelinePoint[] = [
  {
    point: new THREE.Vector3(0, 0, 0),
    year: '2014',
    title: 'IIT Roorkee',
    subtitle: 'Electrical Engineering',
    position: 'right',
  },
  {
    point: new THREE.Vector3(-4, -4, -3),
    year: '2016',
    title: 'XPrep',
    subtitle: 'Frontend Intern',
    position: 'left',
  },
  {
    point: new THREE.Vector3(-3, -1, -6),
    year: '2017',
    title: 'Headout',
    subtitle: 'Software Developer Intern',
    position: 'left',
  },
  {
    point: new THREE.Vector3(0, -1, -10),
    year: '2018',
    title: 'Cohesity',
    subtitle: 'Member of Technical Staff',
    position: 'left',
  },
  {
    point: new THREE.Vector3(1, 1, -12),
    year: new Date().toLocaleDateString('default', { year: 'numeric' }),
    title: '?',
    subtitle: '???',
    position: 'right',
  }
]