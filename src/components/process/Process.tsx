"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ensureGsapPlugins, gsap } from "@/lib/gsap";
import { PROCESS_STEPS } from "@/lib/constants/process";

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ensureGsapPlugins();

      gsap.utils.toArray<HTMLElement>(".process-step").forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0, x: -32 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <section id="process" className="bg-bg relative px-6 py-28 sm:px-12">
      <div ref={containerRef} className="mx-auto max-w-3xl">
        <p className="text-eyebrow text-primary font-mono font-medium tracking-[0.3em] uppercase">
          How We Work
        </p>
        <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
          Our process
        </h2>

        <div className="border-glass-border relative mt-16 flex flex-col gap-10 border-l pl-8">
          {PROCESS_STEPS.map(({ Icon, title, description }, i) => (
            <div key={title} className="process-step relative">
              <div className="border-accent bg-bg text-accent absolute top-0 -left-[calc(2rem+1px)] flex h-8 w-8 items-center justify-center rounded-full border">
                <Icon size={14} />
              </div>
              <p className="font-mono text-xs tracking-wider text-white/40">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-1 text-sm text-white/60">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
