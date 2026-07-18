"use client";

import { motion } from "motion/react";
import { COLORS } from "@/lib/constants/theme";

const GRAIN_SVG =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`,
  );

const CORNERS = [
  { position: "top-6 left-6 border-t border-l", label: "BUILD 2026.07.14", labelPos: "top-14 left-6" },
  { position: "top-6 right-6 border-t border-r", label: null, labelPos: "" },
  { position: "bottom-6 left-6 border-b border-l", label: null, labelPos: "" },
  { position: "bottom-6 right-6 border-b border-r", label: "STATUS: NOMINAL", labelPos: "bottom-14 right-6" },
] as const;

export function HeroChrome({
  showChrome,
  children,
}: {
  showChrome: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5] opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={showChrome ? { opacity: 0.2 } : {}}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute -bottom-20 -left-32 z-[6] h-3 w-[130%] mix-blend-screen"
        style={{
          background: `linear-gradient(90deg, transparent, ${COLORS.accent}, transparent)`,
          transform: "rotate(-18deg)",
          filter: "blur(14px)",
        }}
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={showChrome ? { opacity: 0.12 } : {}}
        transition={{ duration: 1.2, delay: 0.15 }}
        className="pointer-events-none absolute -top-16 -right-32 z-[6] h-2 w-[110%] mix-blend-screen"
        style={{
          background: `linear-gradient(90deg, transparent, ${COLORS.primary}, transparent)`,
          transform: "rotate(-18deg)",
          filter: "blur(10px)",
        }}
      />

      {CORNERS.map(({ position }) => (
        <motion.span
          key={position}
          initial={{ opacity: 0 }}
          animate={showChrome ? { opacity: 0.35 } : {}}
          transition={{ duration: 0.6 }}
          aria-hidden
          className={`pointer-events-none absolute z-10 h-10 w-10 border-white/60 ${position}`}
        />
      ))}

      {CORNERS.filter((c) => c.label).map(({ position, label, labelPos }) => (
        <motion.span
          key={`label-${position}`}
          initial={{ opacity: 0 }}
          animate={showChrome ? { opacity: 0.4 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          aria-hidden
          className={`pointer-events-none absolute z-10 hidden font-mono text-[10px] tracking-wider text-white/60 uppercase md:block ${labelPos}`}
        >
          {label}
        </motion.span>
      ))}

      <motion.p
        initial={{ opacity: 0 }}
        animate={showChrome ? { opacity: 0.4 } : {}}
        transition={{ duration: 0.6 }}
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-6 z-10 hidden -translate-y-1/2 font-mono text-[11px] tracking-[0.3em] text-white/70 uppercase md:block"
        style={{ writingMode: "vertical-rl" }}
      >
        Engineering_The_Future
      </motion.p>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: `url("${GRAIN_SVG}")` }}
      />

      {children}
    </>
  );
}
