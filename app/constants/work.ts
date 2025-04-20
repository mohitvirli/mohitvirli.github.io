import * as THREE from "three";
import { WorkTimelinePoint } from "../types";

export const WORK_TIMELINE: WorkTimelinePoint[] = [
  {
    point: new THREE.Vector3(0, -1, 0),
    year: '2014',
    text: 'IIT Roorkee',
    position: 'right',
  },
  {
    point: new THREE.Vector3(-4, -4, -3),
    year: '2016',
    text: 'XPrep',
    position: 'left',
  },
  {
    point: new THREE.Vector3(-3, -1, -6),
    year: '2017',
    text: 'Headout',
    position: 'left',
  },
  {
    point: new THREE.Vector3(0, -1, -10),
    year: '2018',
    text: 'Cohesity',
    position: 'left',
  },
  {
    point: new THREE.Vector3(1, 1, -12),
    year: '2025',
    text: 'This portfolio',
    position: 'right',
  }
]