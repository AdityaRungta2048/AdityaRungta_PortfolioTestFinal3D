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
    point: new THREE.Vector3(-3, -3, -3),
    year: '2022',
    title: 'CBSE 12th',
    subtitle: 'BVB Vidyashram • 86.4%',
    position: 'left',
  },
  {
    point: new THREE.Vector3(-4, -3, -6),
    year: '2022',
    title: 'Amity University',
    subtitle: 'B.Tech CSE • 8.16 CGPA',
    position: 'left',
  },
  {
    point: new THREE.Vector3(-2, -2, -9),
    year: '2024',
    title: 'GSSoC',
    subtitle: 'Open Source Contributor',
    position: 'left',
  },
  {
    point: new THREE.Vector3(0, -1, -11),
    year: '2025',
    title: 'Kind Beings',
    subtitle: 'NGO Internship',
    position: 'right',
  },
  {
    point: new THREE.Vector3(1, 0, -13),
    year: '2025',
    title: 'Jabsz Gaming',
    subtitle: 'Web Development Intern',
    position: 'left',
  },
  {
    point: new THREE.Vector3(1.5, 1.5, -15),
    year: new Date().toLocaleDateString('default', { year: 'numeric' }),
    title: 'Final Year',
    subtitle: 'Graduating 2026',
    position: 'right',
  }
]
