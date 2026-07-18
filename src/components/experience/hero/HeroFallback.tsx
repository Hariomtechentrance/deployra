"use client";

import { HeroChrome } from "./HeroChrome";
import { HeroContent } from "./HeroContent";
import { FloatingTechIcons } from "@/components/shared/FloatingTechIcons";

export function HeroFallback({ showHeadline }: { showHeadline: boolean }) {
  return (
    <section id="hero" className="bg-bg relative flex h-svh w-full flex-col overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(212,175,55,0.22), transparent 55%), radial-gradient(circle at 70% 65%, rgba(255,215,0,0.16), transparent 55%)",
        }}
      />
      <FloatingTechIcons show={showHeadline} />
      <HeroChrome showChrome={showHeadline}>
        <div className="relative z-10 flex flex-1 items-center justify-center px-6">
          <HeroContent showHeadline={showHeadline} align="center" />
        </div>
      </HeroChrome>
    </section>
  );
}
