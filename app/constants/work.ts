import * as THREE from "three";
import { WorkTimelinePoint } from "../types";

export const WORK_TIMELINE: WorkTimelinePoint[] = [
  {
    point: new THREE.Vector3(0, 0, 0),
    year: '2020',
    title: 'CBSE 10th',
    subtitle: 'BVB Vidyashram • 89%',
    position: 'right',
  },
  {
    point: new THREE.Vector3(-4, -4, -3),
    year: '2022',
    title: 'Amity University',
    subtitle: 'B.Tech CSE • 8.16 CGPA',
    position: 'left',
  },
  {
    point: new THREE.Vector3(-3, -1, -6),
    year: '2024',
    title: 'GSSoC',
    subtitle: 'Open Source Contributor',
    position: 'left',
  },
  {
    point: new THREE.Vector3(0, -1, -10),
    year: '2025',
    title: 'Jabsz Gaming',
    subtitle: 'Web Development Intern',
    position: 'left',
  },
  {
    point: new THREE.Vector3(1, 1, -12),
    year: new Date().toLocaleDateString('default', { year: 'numeric' }),
    title: 'Final Year',
    subtitle: 'Graduating 2026',
    position: 'right',
  }
]
