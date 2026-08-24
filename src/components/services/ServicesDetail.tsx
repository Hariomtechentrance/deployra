"use client";

import { motion } from "motion/react";
import { LuCheck } from "react-icons/lu";
import { SERVICES } from "@/lib/constants/services";
import { SmartLink } from "@/components/shared/SmartLink";
import { HERO_COPY } from "@/lib/constants/copy";

export function ServicesDetail() {
  return (
    <main className="bg-bg min-h-svh px-6 pt-36 pb-24 sm:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-eyebrow text-primary font-mono font-medium tracking-[0.3em] uppercase">
          What We Do
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold text-white sm:text-5xl">
          Services built for scale
        </h1>
        <p className="mt-4 max-w-xl text-sm text-white/60">
          From AI agents to enterprise platforms — engineered, not templated.
        </p>

        <div className="mt-16 flex flex-col gap-6">
          {SERVICES.map(({ slug, Icon, title, description, features }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="border-glass-border bg-glass grid grid-cols-1 gap-6 rounded-2xl border p-6 backdrop-blur-md sm:p-8 md:grid-cols-[1fr_1.2fr]"
            >
              <div>
                <div className="border-glass-border bg-bg text-accent flex h-12 w-12 items-center justify-center rounded-xl border">
                  <Icon size={22} />
                </div>
                <h2 className="mt-5 text-xl font-semibold text-white">
                  {title}
                </h2>
                <p className="mt-2 text-sm text-white/60">{description}</p>
                <SmartLink
                  href={`/services/${slug}`}
                  className="text-accent mt-4 inline-block text-sm font-medium hover:text-white"
                >
                  Learn more →
                </SmartLink>
              </div>

              <ul className="flex flex-col gap-3 sm:justify-center">
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
            </motion.div>
          ))}
        </div>

        <div className="border-glass-border bg-glass mt-16 flex flex-col items-start gap-4 rounded-2xl border p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-semibold text-white">
              Ready to start your project?
            </p>
            <p className="mt-1 text-sm text-white/60">
              Tell us what you&apos;re building — we&apos;ll take it from there.
            </p>
          </div>
          <SmartLink
            href="/contact"
            className="bg-primary hover:bg-primary/90 shrink-0 rounded-full px-7 py-3 text-sm font-semibold text-white transition-colors"
          >
            {HERO_COPY.primaryCta}
          </SmartLink>
        </div>
      </div>
    </main>
  );
}
