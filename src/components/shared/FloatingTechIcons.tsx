"use client";

import { motion } from "motion/react";
import { TECH_ICONS } from "@/lib/constants/techIcons";

const POSITIONS = [
  { top: "10%", left: "8%" },
  { top: "8%", left: "88%" },
  { top: "32%", left: "5%" },
  { top: "30%", left: "93%" },
  { top: "58%", left: "7%" },
  { top: "56%", left: "91%" },
  { top: "84%", left: "14%" },
  { top: "84%", left: "84%" },
  { top: "16%", left: "32%" },
  { top: "16%", left: "68%" },
] as const;

export function FloatingTechIcons({ show }: { show: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden md:block">
      {TECH_ICONS.map(({ Icon, label }, i) => {
        const pos = POSITIONS[i % POSITIONS.length];
        return (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 0 }}
            animate={
              show
                ? { opacity: 1, y: [0, -8, 0] }
                : { opacity: 0 }
            }
            transition={{
              opacity: { duration: 0.6, delay: 0.3 + i * 0.05 },
              y: {
                duration: 3.5 + (i % 3) * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.15,
              },
            }}
            className="border-glass-border bg-glass absolute flex h-11 w-11 items-center justify-center rounded-xl border text-white/70 shadow-[0_0_16px_rgba(255,215,0,0.12)] backdrop-blur-md"
            style={{ top: pos.top, left: pos.left }}
            title={label}
          >
            <Icon size={18} />
          </motion.div>
        );
      })}
    </div>
  );
}
