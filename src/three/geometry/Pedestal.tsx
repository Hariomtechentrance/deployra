"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { COLORS } from "@/lib/constants/theme";

export function Pedestal() {
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ringRef.current) ringRef.current.rotation.z += delta * 0.15;
    if (ring2Ref.current) ring2Ref.current.rotation.z -= delta * 0.1;
  });

  return (
    <group position={[0, -1.05, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.55, 0.62, 0.03, 48]} />
        <meshStandardMaterial color="#26241f" metalness={0} roughness={1} />
      </mesh>

      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <torusGeometry args={[0.56, 0.005, 8, 96]} />
        <meshBasicMaterial color={COLORS.accent} transparent opacity={0.45} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <torusGeometry args={[0.42, 0.003, 8, 96]} />
        <meshBasicMaterial color={COLORS.accent} transparent opacity={0.22} />
      </mesh>
    </group>
  );
}
