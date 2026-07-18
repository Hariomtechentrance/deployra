"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import type { ExperienceStage } from "@/types/experience";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";
import { useLenisContext } from "@/hooks/useLenisContext";
import { useSetExperienceStage } from "@/hooks/useExperienceStage";
import { LoadingScreen } from "./loading-screen/LoadingScreen";
import { Hero } from "./hero/Hero";

export function ExperienceGate() {
  const [stage, setStage] = useState<ExperienceStage>("loading");
  const capability = useDeviceCapability();
  const lenis = useLenisContext();
  const setSharedStage = useSetExperienceStage();

  // Mirror this page's own loading -> intro -> hero progression into the
  // shared context so the globally-mounted Navbar knows when to fade in.
  useEffect(() => {
    setSharedStage(stage);
  }, [stage, setSharedStage]);

  // Leaving the homepage: reset the shared stage so Navbar doesn't stay
  // stuck showing whatever this page's stage happened to be.
  useEffect(() => {
    return () => setSharedStage("hero");
  }, [setSharedStage]);

  useEffect(() => {
    if (stage === "hero") {
      lenis?.start();
    } else {
      lenis?.stop();
    }
  }, [stage, lenis]);

  const handleLoadingComplete = useCallback(() => {
    setStage(capability === "static" ? "hero" : "intro");
  }, [capability]);

  const handleIntroComplete = useCallback(() => {
    setStage("hero");
  }, []);

  return (
    <>
      <AnimatePresence>
        {stage === "loading" && (
          <LoadingScreen onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>
      <Hero
        stage={stage}
        capability={capability}
        onIntroComplete={handleIntroComplete}
      />
    </>
  );
}
