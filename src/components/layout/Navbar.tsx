"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LuMenu, LuX } from "react-icons/lu";
import { useExperienceStage } from "@/hooks/useExperienceStage";
import { NAV_LINKS } from "@/lib/constants/nav";
import { HERO_COPY, STATUS_LABEL } from "@/lib/constants/copy";
import { cn } from "@/lib/utils/cn";
import { SmartLink } from "@/components/shared/SmartLink";

export function Navbar() {
  const stage = useExperienceStage();
  const [open, setOpen] = useState(false);
  const visible = stage !== "loading";

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="fixed inset-x-0 top-0 z-30 px-4 pt-4 sm:px-8"
    >
      <div className="border-glass-border bg-glass mx-auto flex max-w-6xl items-center justify-between rounded-full border px-5 py-3 backdrop-blur-md">
        <SmartLink
          href="/"
          className="border-glass-border bg-glass flex h-9 w-9 items-center justify-center rounded-full border text-sm font-bold tracking-wide text-white"
        >
          D
        </SmartLink>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <SmartLink
              key={link.href}
              href={link.href}
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </SmartLink>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="bg-success absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" />
              <span className="bg-success relative inline-flex h-2 w-2 rounded-full" />
            </span>
            <span className="font-mono text-[11px] tracking-wider text-white/60">
              {STATUS_LABEL}
            </span>
          </div>
        </div>

        <SmartLink
          href="/contact"
          className="bg-primary hover:bg-primary/90 hidden rounded-full px-5 py-2 text-sm font-semibold text-black transition-colors md:inline-block"
        >
          {HERO_COPY.primaryCta}
        </SmartLink>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="text-white md:hidden"
        >
          {open ? <LuX size={22} /> : <LuMenu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className={cn(
              "border-glass-border bg-glass mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-2xl border p-4 backdrop-blur-md md:hidden",
            )}
          >
            {NAV_LINKS.map((link) => (
              <SmartLink
                key={link.href}
                href={link.href}
                onNavigate={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </SmartLink>
            ))}
            <SmartLink
              href="/contact"
              onNavigate={() => setOpen(false)}
              className="bg-primary mt-2 rounded-full px-4 py-2 text-center text-sm font-semibold text-black"
            >
              {HERO_COPY.primaryCta}
            </SmartLink>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
