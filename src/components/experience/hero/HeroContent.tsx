"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils/cn";
import { HERO_COPY } from "@/lib/constants/copy";
import { SmartLink } from "@/components/shared/SmartLink";
import { ProductCycler } from "./ProductCycler";

export function HeroContent({
  showHeadline,
  align = "left",
}: {
  showHeadline: boolean;
  align?: "left" | "center";
}) {
  const isLeft = align === "left";

  return (
    <div
      className={cn(
        "relative z-10 flex flex-col gap-8 px-6",
        isLeft ? "items-start text-left" : "items-center text-center",
      )}
    >
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={showHeadline ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-eyebrow text-primary font-mono font-medium tracking-[0.3em] uppercase"
      >
        {HERO_COPY.eyebrow}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={showHeadline ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
        className={cn("text-hero leading-[1.05] font-semibold", isLeft ? "max-w-xl" : "max-w-4xl")}
      >
        {HERO_COPY.headline.map((line, i) => (
          <span key={line} className="block">
            {i === 1 ? (
              <span className="from-primary to-accent bg-gradient-to-r bg-clip-text text-transparent">
                {line}
              </span>
            ) : (
              line
            )}
          </span>
        ))}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={showHeadline ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.25 }}
      >
        <ProductCycler active={showHeadline} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={showHeadline ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.35 }}
        className={cn(
          "flex flex-wrap items-center gap-4",
          isLeft ? "justify-start" : "justify-center",
        )}
      >
        <SmartLink
          href="/contact"
          className="bg-primary hover:bg-primary/90 rounded-full px-7 py-3 text-sm font-semibold text-white transition-colors"
        >
          {HERO_COPY.primaryCta}
        </SmartLink>
        <SmartLink
          href="/services"
          className="border-glass-border bg-glass rounded-full border px-7 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10"
        >
          {HERO_COPY.secondaryCta}
        </SmartLink>
      </motion.div>
    </div>
  );
}
