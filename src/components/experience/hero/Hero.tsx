"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { DeviceCapability, ExperienceStage } from "@/types/experience";
import { HeroChrome } from "./HeroChrome";
import { HeroContent } from "./HeroContent";
import { HeroFallback } from "./HeroFallback";
import { TerminalPanel } from "@/components/shared/TerminalPanel";

const HeroCanvas = dynamic(
  () => import("./HeroCanvas").then((mod) => mod.HeroCanvas),
  { ssr: false, loading: () => null },
);

export function Hero({
  stage,
  capability,
  onIntroComplete,
}: {
  stage: ExperienceStage;
  capability: DeviceCapability | null;
  onIntroComplete: () => void;
}) {
  const [contextLost, setContextLost] = useState(false);
  // Once we've bailed out to the fallback, don't wait on the 3D intro's
  // GSAP timeline to "finish" — it never will, since the canvas that
  // would drive it is gone. Show the fallback content immediately.
  const showHeadline = contextLost || stage === "hero";

  if (capability === "static" || contextLost) {
    return <HeroFallback showHeadline={showHeadline} />;
  }

  return (
    <section id="hero" className="bg-bg relative flex h-svh w-full flex-col overflow-hidden">
      {capability !== null && (
        <HeroCanvas
          playIntro={stage === "intro"}
          onIntroComplete={onIntroComplete}
          capability={capability}
          onContextLost={() => setContextLost(true)}
        />
      )}
      <HeroChrome showChrome={showHeadline}>
        <div className="relative z-10 flex flex-1 items-center px-8 md:px-16">
          <HeroContent showHeadline={showHeadline} align="left" />
        </div>
        <TerminalPanel show={showHeadline} />
      </HeroChrome>
    </section>
  );
}
