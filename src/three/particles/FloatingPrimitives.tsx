"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { COLORS } from "@/lib/constants/theme";

type Shape = "icosahedron" | "octahedron" | "torus" | "box";

const SHAPES: {
  shape: Shape;
  position: [number, number, number];
  scale: number;
  speed: number;
  seed: number;
}[] = [
  { shape: "torus", position: [-3.4, 1.6, -1.5], scale: 0.22, speed: 0.4, seed: 0.6 },
  { shape: "icosahedron", position: [3.8, 2.2, -2], scale: 0.16, speed: 0.55, seed: 2.1 },
  { shape: "octahedron", position: [-3, -1.8, -1], scale: 0.18, speed: 0.35, seed: 4.4 },
  { shape: "box", position: [4.2, -1.4, -1.8], scale: 0.14, speed: 0.5, seed: 1.3 },
  { shape: "icosahedron", position: [0.5, 3, -3], scale: 0.13, speed: 0.6, seed: 5.2 },
];

function Primitive({ shape, position, scale, speed, seed }: (typeof SHAPES)[number]) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * speed * 0.5;
    ref.current.rotation.y = t * speed;
    ref.current.position.y = position[1] + Math.sin(t * 0.4 + seed) * 0.25;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      {shape === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
      {shape === "octahedron" && <octahedronGeometry args={[1, 0]} />}
      {shape === "torus" && <torusGeometry args={[0.8, 0.28, 8, 24]} />}
      {shape === "box" && <boxGeometry args={[1, 1, 1]} />}
      <meshBasicMaterial color={COLORS.accent} wireframe transparent opacity={0.3} />
    </mesh>
  );
}

export function FloatingPrimitives() {
  return (
    <>
      {SHAPES.map((props, i) => (
        <Primitive key={i} {...props} />
      ))}
    </>
  );
}
