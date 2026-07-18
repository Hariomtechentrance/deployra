"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { gsap } from "@/lib/gsap";
import { useAssetReady } from "./useAssetReady";

const MIN_DISPLAY_DURATION = 1.6;

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const assetsReady = useAssetReady();
  const [progress, setProgress] = useState(0);
  const tweenDone = useRef(false);
  const firedComplete = useRef(false);

  useEffect(() => {
    const counter = { value: 0 };
    const tween = gsap.to(counter, {
      value: 100,
      duration: MIN_DISPLAY_DURATION,
      ease: "power1.inOut",
      onUpdate: () => setProgress(Math.round(counter.value)),
      onComplete: () => {
        tweenDone.current = true;
      },
    });
    return () => {
      tween.kill();
    };
  }, []);

  useEffect(() => {
    if (!assetsReady || progress < 100 || firedComplete.current) return;
    firedComplete.current = true;
    onComplete();
  }, [assetsReady, progress, onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, filter: "blur(12px)" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="bg-bg fixed inset-0 z-50 flex flex-col items-center justify-center gap-6"
    >
      <p className="text-lg font-semibold tracking-[0.4em] text-white uppercase">
        Deployra
      </p>
      <div className="border-glass-border h-px w-40 overflow-hidden rounded-full border bg-white/5">
        <div
          className="from-primary to-accent h-full bg-gradient-to-r transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-eyebrow tabular-nums text-white/50">{progress}%</p>
    </motion.div>
  );
}
