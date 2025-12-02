import * as THREE from "three";
import { WorkTimelinePoint } from "../types";

export const WORK_TIMELINE: WorkTimelinePoint[] = [
  {
    point: new THREE.Vector3(0, 0, 0),
    year: '2021',
    title: 'Dahiwadi college Dahiwadi – Junior College at Dahiwadi,Satara,Maharashtra,India ',
    subtitle: 'Higher Secondary Education',
    position: 'left',
  },
  {
    point: new THREE.Vector3(-4, -4, -3),
    year: '2022',
    title: 'Indian Institute of Information Technology Kota(IIITK)',
    subtitle: 'B.Tech Computer Science and Engineering',
    position: 'left',
  },
  {
    point: new THREE.Vector3(-3, -1, -6),
    year: '2023',
    title: 'Edureka',
    subtitle: 'Full Stack Web Development Internship',
    position: 'left',
  },
  {
    point: new THREE.Vector3(0, -1, -10),
    year: '2024',
    title: 'TATA’S Group ',
    subtitle: ' Cybersecurity Analyst Internship',
    position: 'left',
  },

  {
    point: new THREE.Vector3(-2, -1, -8),
    year: '2024',
    title: 'Forage',
    subtitle: ' Data Analytics & Visualization-Acccenture & Goldman Sachs Operations ',
    position: 'left',
  },

   {
    point: new THREE.Vector3(2, -1, -10),
    year: '2024',
    title: 'JP MORGAN CHASE & CO ',
    subtitle: ' Created a 2-pager for the client containing a company profile and summary of the auction process',
    position: 'left',
  },

     {
    point: new THREE.Vector3(0, -1, -10),
    year: '2025',
    title: 'Systemic Altruism',
    subtitle: 'Web3 Marketing Internship',
    position: 'right',
  },

  {
    point: new THREE.Vector3(1, 1, -12),
    year: new Date().toLocaleDateString('default', { year: 'numeric' }),
    title: '?',
    subtitle: '???',
    position: 'right',
  }




]