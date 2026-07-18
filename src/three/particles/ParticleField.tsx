"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { COLORS } from "@/lib/constants/theme";

function randomInSphere(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // Rejection sampling keeps the distribution uniform within the sphere
    // (naive spherical-coordinate sampling clusters points at the poles).
    let x = 0,
      y = 0,
      z = 0;
    let lengthSq = Infinity;
    do {
      x = Math.random() * 2 - 1;
      y = Math.random() * 2 - 1;
      z = Math.random() * 2 - 1;
      lengthSq = x * x + y * y + z * z;
    } while (lengthSq > 1);

    positions[i * 3] = x * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = z * radius;
  }
  return positions;
}

export function ParticleField({
  count = 3000,
  radius = 6,
  color = COLORS.accent,
}: {
  count?: number;
  radius?: number;
  color?: string;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => randomInSphere(count, radius), [count, radius]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.02;
    pointsRef.current.rotation.x += delta * 0.005;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color={color}
        size={0.014}
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}
