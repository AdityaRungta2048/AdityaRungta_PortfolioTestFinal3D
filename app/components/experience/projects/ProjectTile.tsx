import { Edges, Text, TextProps } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from "three";

import { usePortalStore, useProjectStore } from "@stores";
import { Project } from "@types";

interface ProjectTileProps {
  project: Project;
  index: number;
  position: [number, number, number];
  rotation: [number, number, number];
  activeId: number | null;
  onClick: () => void;
  datePosition: 'top' | 'bottom';
}

const ProjectTile = ({ project, index, position, rotation, activeId, onClick, datePosition }: ProjectTileProps) => {
  const projectRef = useRef<THREE.Group>(null);
  const hoverAnimRef = useRef<gsap.core.Timeline | null>(null);
  const [desktopHovered, setDesktopHovered] = useState(false);
  const [descHeight, setDescHeight] = useState(0.9);
  const isProjectSectionActive = usePortalStore((state) => state.activePortalId === "projects");
  const setActiveProject = useProjectStore((state) => state.setActiveProject);
  const hovered = isMobile ? activeId === index : desktopHovered;
  const isTop = datePosition === 'top';

  const titleProps = useMemo(() => ({
    font: "./soria-font.ttf",
    color: "black",
  }), []);

  const subtitleProps: Partial<TextProps> = useMemo(() => ({
    font: "./Vercetti-Regular.woff",
    color: "black",
    anchorX: "left",
    anchorY: "top",
  }), []);

  // Measure the teaser height so the "click to know more" hint always sits
  // just below the text instead of covering it.
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const handleDescSync = (troika: any) => {
    const bounds = troika?.textRenderInfo?.blockBounds;
    if (!bounds) return;
    const height = bounds[3] - bounds[1];
    setDescHeight((prev) => (Math.abs(prev - height) > 0.01 ? height : prev));
  };
  const hintY = Math.max(0.25 - descHeight, -0.7);

  useEffect(() => {
    if (!projectRef.current) return;
    hoverAnimRef.current?.kill();

    const [mesh, title, dateGroup, textBox, button] = projectRef.current.children;

    hoverAnimRef.current = gsap.timeline();
    hoverAnimRef.current
      .to(projectRef.current.position, { z: hovered ? 1 : 0, duration: 0.2 }, 0)
      .to(projectRef.current.position, { y: hovered ? isTop ? -2 : 0 : 0 }, 0)
      .to(projectRef.current.scale, {
        x: hovered ? 1.3 : 1,
        y: hovered ? 1.3 : 1,
        z: hovered ? 1.3 : 1,
      }, 0)
      .to(title.position, { y: hovered ? 0.7 : -0.8 }, 0)
      .to(textBox.position, { y: hovered ? 0.7 : 0 }, 0)
      // .to(textBox.scale, { y: hovered ? 1 : 0, x: hovered ? 1 : 0 }, 0)
      .to(textBox, { fillOpacity: hovered ? 1 : 0, duration: 0.4 }, 0)
      .to(dateGroup.position, { y: hovered ? 2.6 : isTop? 1.4 : -1.4  }, 0)
      .to(mesh.scale, { y: hovered ? 2 : 1 }, 0)
      .to((mesh as THREE.Mesh).material, { opacity: hovered ? 0.95 : 0.3 }, 0)
      .to(mesh.position, { y: hovered ? 1 : 0 }, 0);

    // Reveal the "click to know more" hint alongside the description on hover.
    if (button) {
      hoverAnimRef.current
        .to(button.scale, { y: hovered ? 1 : 0, x: hovered ? 1 : 0 }, 0)
        .to(button.position, { z: hovered ? 0.3 : -1 }, 0);
    }
  }, [hovered]);

  useEffect(() => {
    if (projectRef.current) {
      gsap.to(projectRef.current.position, {
        y: isProjectSectionActive ? 0 : -11,
        duration: 1,
        delay: isProjectSectionActive ? index * 0.1 : 0,
      });
    }
  }, [isProjectSectionActive]);

  const handlePointerOver = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (!isMobile && isProjectSectionActive) {
      // Hovering only previews the tile (description + "click to know more"
      // hint). The detail panel opens on click.
      setDesktopHovered(true);
    }
  };

  const handleTileClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onClick();
    // Desktop: a click anywhere on the tile opens the detail panel.
    // Mobile: the first tap selects the tile (revealing the hint) and the
    // hint button below opens the panel.
    if (!isMobile && isProjectSectionActive) {
      setActiveProject(index);
    }
  };

  const handleOpenPanel = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (isProjectSectionActive) {
      setActiveProject(index);
    }
  };

  return (
    <group
      position={position}
      rotation={rotation}
      onClick={handleTileClick}
      onPointerOver={handlePointerOver}
      onPointerOut={() => !isMobile && isProjectSectionActive && setDesktopHovered(false)}>
      <group ref={projectRef}>
        <mesh>
          <planeGeometry args={[4.2, 2, 1]} />
          <meshBasicMaterial color="#FFF" transparent opacity={0.3}/>
          {/* <meshPhysicalMaterial transmission={1} roughness={0.3} /> */}
          <Edges color="black" lineWidth={1.5} />
        </mesh>
        <Text
          {...titleProps}
          position={[-1.9, -0.8, 0.101]}
          anchorX="left"
          anchorY="bottom"
          maxWidth={4}
          fontSize={0.8}>
          {project.title}
        </Text>
        <group position={[-1.25, 1.4, 0.01]}>
          <mesh>
            <planeGeometry args={[1.7, 0.4, 1]} />
            <meshBasicMaterial color="#777" opacity={0} wireframe />
            <Edges color="black" lineWidth={1} />
          </mesh>
          <Text
            {...subtitleProps}
            position={[-0.7, 0.2, 0]}
            fontSize={0.3}>
            {project.date.toUpperCase()}
          </Text>
        </group>
        <Text
          {...subtitleProps}
          maxWidth={3.8}
          position={[-1.9, 2.3, 0.1]}
          fontSize={0.2}
          onSync={handleDescSync}>
          {project.tagline ?? project.subtext}
        </Text>
        <group
          position={[0, hintY, -1]}
          scale={[0, 0, 1]}
          onClick={handleOpenPanel}
          onPointerOver={() => document.body.style.cursor = 'pointer'}
          onPointerOut={() => document.body.style.cursor = 'auto'}>
          <mesh>
            <planeGeometry args={[2.9, 0.5, 1]} />
            <meshBasicMaterial color="#111" transparent opacity={0.9} />
            <Edges color="#111" lineWidth={1} />
          </mesh>
          <Text
            {...subtitleProps}
            color="white"
            anchorX="center"
            anchorY="middle"
            position={[0, 0, 0.02]}
            fontSize={0.22}>
            CLICK TO KNOW MORE ↗
          </Text>
        </group>
      </group>
    </group>
  );
};

export default ProjectTile;