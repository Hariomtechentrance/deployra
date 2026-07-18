"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils/cn";
import { TERMINAL_LOG } from "@/lib/constants/copy";

function lineClass(line: string) {
  if (line.startsWith("✓")) return "text-success";
  if (line.startsWith("$")) return "text-white/80";
  return "text-accent";
}

export function TerminalPanel({ show }: { show: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={show ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="border-glass-border bg-glass absolute right-10 bottom-10 z-10 hidden w-80 rounded-lg border font-mono text-xs backdrop-blur-md lg:block"
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="ml-2 text-white/40">deployra — zsh</span>
      </div>
      <div className="flex flex-col gap-1.5 px-4 py-3">
        {TERMINAL_LOG.map((line, i) => (
          <motion.p
            key={line}
            initial={{ opacity: 0 }}
            animate={show ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.7 + i * 0.25 }}
            className={cn(lineClass(line))}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}
