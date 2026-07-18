"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { COLORS } from "@/lib/constants/theme";

const CHASSIS_COLOR = "#4a473e";
const DECK_COLOR = "#2c2a24";

function Chassis({ face }: { face: number }) {
  return (
    <meshStandardMaterial
      attach={`material-${face}`}
      color={face === 2 ? DECK_COLOR : CHASSIS_COLOR}
      metalness={0}
      roughness={1}
      emissive={COLORS.primary}
      emissiveIntensity={face === 2 ? 0.12 : 0.2}
    />
  );
}

export function Laptop() {
  const floatRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (floatRef.current) {
      // Gentle sway, not a full spin — the screen face needs to stay
      // generally toward the camera, unlike the (radially even) orbiting
      // icons, which read fine from any angle.
      floatRef.current.rotation.y = -0.25 + Math.sin(state.clock.elapsedTime * 0.3) * 0.12;
      floatRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.06;
    }
  });

  return (
    <group ref={floatRef} rotation={[0.45, -0.25, 0]}>
      {/* Base / keyboard deck — thin box, top face (+y, index 2) is the deck */}
      <mesh>
        <boxGeometry args={[1.6, 0.07, 1.02]} />
        {[0, 1, 2, 3, 4, 5].map((face) => (
          <Chassis key={face} face={face} />
        ))}
      </mesh>

      {/* Front edge trim light — makes the base readable even at a shallow angle */}
      <mesh position={[0, 0.02, 0.5]}>
        <boxGeometry args={[1.5, 0.015, 0.02]} />
        <meshBasicMaterial color={COLORS.accent} />
      </mesh>

      {/* Lid, hinged at the back edge of the base and standing upright
          (perpendicular to the base) for an unambiguous open silhouette. */}
      <group position={[0, 0.035, -0.5]} rotation={[-0.18, 0, 0]}>
        <mesh position={[0, 0.44, 0]}>
          <boxGeometry args={[1.6, 0.88, 0.045]} />
          <Chassis face={0} />
          <Chassis face={1} />
          <Chassis face={2} />
          <Chassis face={3} />
          <meshBasicMaterial attach="material-4" color={COLORS.accent} />
          <Chassis face={5} />
        </mesh>
      </group>
    </group>
  );
}
