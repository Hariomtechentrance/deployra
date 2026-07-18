"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";
import { gsap } from "@/lib/gsap";
import { ParticleField } from "@/three/particles/ParticleField";
import { FloatingPrimitives } from "@/three/particles/FloatingPrimitives";
import { TechIconCluster } from "@/three/geometry/TechIconCluster";
import { COLORS } from "@/lib/constants/theme";

const INTRO_CAMERA_Z = 16;
const RESTING_CAMERA_Z = 6.5;

export function HeroScene({
  playIntro,
  onIntroComplete,
  capability,
}: {
  playIntro: boolean;
  onIntroComplete: () => void;
  capability: "full" | "reduced";
}) {
  const { camera } = useThree();
  const parallaxRef = useRef<THREE.Group>(null);

  useGSAP(
    () => {
      if (!playIntro) return;

      camera.position.set(0, 0.6, INTRO_CAMERA_Z);
      gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: RESTING_CAMERA_Z,
        duration: 2.2,
        ease: "power3.out",
        onComplete: onIntroComplete,
      });
    },
    { dependencies: [playIntro] },
  );

  // Subtle mouse parallax — the scene content tilts toward the pointer
  // instead of moving the camera, so it never fights the GSAP intro dolly.
  useFrame((state) => {
    if (!parallaxRef.current) return;
    const targetY = state.pointer.x * 0.15;
    const targetX = -state.pointer.y * 0.1;
    parallaxRef.current.rotation.y += (targetY - parallaxRef.current.rotation.y) * 0.04;
    parallaxRef.current.rotation.x += (targetX - parallaxRef.current.rotation.x) * 0.04;
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight
        position={[5, 5, 5]}
        intensity={capability === "full" ? 60 : 40}
        color={COLORS.primary}
      />
      <group ref={parallaxRef}>
        <ParticleField count={2500} radius={7} />
        <FloatingPrimitives />
        <TechIconCluster position={[1.7, 0, 0]} />
      </group>
    </>
  );
}
