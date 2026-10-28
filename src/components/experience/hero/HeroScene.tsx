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
  const { camera, viewport, size } = useThree();
  const parallaxRef = useRef<THREE.Group>(null);

  // Below this width there isn't enough horizontal room for the headline
  // and the product model to share the screen without colliding — drop
  // the model entirely, same as the orbiting tech-icon badges already do
  // at `md`. The headline and background particles still render fine on
  // their own.
  const showCluster = size.width >= 1024;

  // Anchor the model in real screen pixels, not Three.js world units.
  // World units (viewport.width) are derived purely from the canvas's
  // aspect ratio, so two windows with the *same* aspect ratio but very
  // different pixel widths (e.g. a 1280x800 laptop vs a 1920x1200
  // monitor) produced an *identical* world-space position — while the
  // headline next to it is sized with vw units, i.e. real pixels, and
  // kept growing as the window did. That mismatch is what let the model
  // drift into the headline's column at some sizes. Pixels keep both in
  // the same coordinate space, so the gap between them stays consistent.
  const pxPerWorldUnit = size.width / viewport.width;
  const clusterScale = Math.min(1, Math.max(0.7, size.width / 1400));
  const targetOffsetPx = size.width * 0.18;
  const clusterX = Math.min(2.4, targetOffsetPx / pxPerWorldUnit);

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
        {showCluster && (
          <TechIconCluster position={[clusterX, 0, 0]} scale={clusterScale} />
        )}
      </group>
    </>
  );
}
