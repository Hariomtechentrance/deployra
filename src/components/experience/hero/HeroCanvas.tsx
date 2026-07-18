"use client";

import { Canvas } from "@react-three/fiber";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { HeroScene } from "./HeroScene";

export function HeroCanvas({
  playIntro,
  onIntroComplete,
  capability,
  onContextLost,
}: {
  playIntro: boolean;
  onIntroComplete: () => void;
  capability: "full" | "reduced";
  onContextLost: () => void;
}) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 6.5], fov: 45 }}
      style={{ position: "absolute", inset: 0 }}
      onCreated={({ gl }) => {
        // A lost WebGL context (GPU driver reset, too many contexts across
        // tabs, out-of-memory) leaves the canvas permanently blank without
        // this — fall back to the static hero instead of a broken render.
        gl.domElement.addEventListener("webglcontextlost", (event) => {
          event.preventDefault();
          onContextLost();
        });
      }}
    >
      <HeroScene
        playIntro={playIntro}
        onIntroComplete={onIntroComplete}
        capability={capability}
      />
      {capability === "full" && (
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.6}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.3}
            mipmapBlur
          />
          <ChromaticAberration offset={[0.0006, 0.0006]} />
          <Noise opacity={0.025} />
          <Vignette eskil={false} offset={0.25} darkness={0.9} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
