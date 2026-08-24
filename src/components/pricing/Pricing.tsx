"use client";

import { motion } from "motion/react";
import { LuCheck } from "react-icons/lu";
import { PRICING_TIERS } from "@/lib/constants/pricing";
import { SmartLink } from "@/components/shared/SmartLink";

export function Pricing() {
  return (
    <section id="pricing" className="bg-bg relative px-6 py-28 sm:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-eyebrow text-primary font-mono font-medium tracking-[0.3em] uppercase">
          Transparent Pricing
        </p>
        <h2 className="mt-4 max-w-2xl text-4xl font-semibold text-white sm:text-5xl">
          Plans that fit your budget
        </h2>
        <p className="mt-4 max-w-xl text-sm text-white/60">
          No hidden fees. No lock-ins. Just results.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PRICING_TIERS.map(
            ({ tier, price, period, featured, features, cta, ctaHref }, i) => (
              <motion.div
                key={tier}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`border-glass-border bg-glass relative flex flex-col rounded-2xl border p-8 backdrop-blur-md ${
                  featured ? "border-primary" : ""
                }`}
              >
                {featured && (
                  <span className="bg-primary absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-semibold text-black">
                    Most Popular
                  </span>
                )}
                <p className="text-sm font-medium text-white/60">{tier}</p>
                <p className="mt-3 text-3xl font-semibold text-white">
                  {price}
                  {period && (
                    <span className="text-base font-normal text-white/40">
                      {period}
                    </span>
                  )}
                </p>

                <ul className="mt-6 flex flex-col gap-3">
                  {features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-white/75"
                    >
                      <LuCheck
                        size={16}
                        className="text-success mt-0.5 shrink-0"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <SmartLink
                  href={ctaHref}
                  className={`mt-8 rounded-full px-6 py-3 text-center text-sm font-semibold transition-colors ${
                    featured
                      ? "bg-primary hover:bg-primary/90 text-black"
                      : "border-glass-border border text-white/80 hover:text-white"
                  }`}
                >
                  {cta}
                </SmartLink>
              </motion.div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
