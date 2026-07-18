"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { motion } from "motion/react";
import * as THREE from "three";
import { TECH_ICONS } from "@/lib/constants/techIcons";
import { Laptop } from "./Laptop";
import { Pedestal } from "./Pedestal";

function fibonacciSphere(count: number, radius: number): [number, number, number][] {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const points: [number, number, number][] = [];
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;
    points.push([
      Math.cos(theta) * r * radius,
      y * radius * 0.7,
      Math.sin(theta) * r * radius,
    ]);
  }
  return points;
}

const CLUSTER_RADIUS = 2.2;

export function TechIconCluster({
  position = [0, 0, 0],
}: {
  position?: [number, number, number];
}) {
  // Only the icon orbit spins continuously. The laptop is a sibling, not a
  // child, of the orbit group — an asymmetric shape like a laptop would
  // periodically show its back to the camera if it inherited a full spin,
  // unlike the icons (which read fine from any angle).
  const orbitRef = useRef<THREE.Group>(null);
  const positions = useMemo(
    () => fibonacciSphere(TECH_ICONS.length, CLUSTER_RADIUS),
    [],
  );

  useFrame((_, delta) => {
    if (orbitRef.current) orbitRef.current.rotation.y += delta * 0.08;
  });

  return (
    <group position={position}>
      <Laptop />
      <Pedestal />

      <group ref={orbitRef}>
        {TECH_ICONS.map(({ Icon, label }, i) => (
          <Html key={label} position={positions[i]} center distanceFactor={8} occlude={false}>
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 3 + (i % 3) * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.15,
              }}
              className="border-glass-border bg-glass flex h-11 w-11 items-center justify-center rounded-xl border text-white/85 shadow-[0_0_16px_rgba(255,215,0,0.15)] backdrop-blur-md"
              title={label}
            >
              <Icon size={18} />
            </motion.div>
          </Html>
        ))}
      </group>
    </group>
  );
}
