"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { ensureGsapPlugins, gsap, ScrollTrigger } from "@/lib/gsap";
import { LenisContext } from "@/hooks/useLenisContext";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    ensureGsapPlugins();

    const instance = new Lenis({ duration: 1.2, smoothWheel: true });
    lenisRef.current = instance;

    instance.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      instance.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
  );
}
