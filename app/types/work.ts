import * as THREE from "three";

export interface WorkTimelinePoint {
  point: THREE.Vector3,
  year: string,
  text: string,
  position: 'left' | 'right',
}