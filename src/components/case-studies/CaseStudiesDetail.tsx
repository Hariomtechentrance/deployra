"use client";

import { motion } from "motion/react";
import { CASE_STUDIES } from "@/lib/constants/caseStudies";
import { SmartLink } from "@/components/shared/SmartLink";

export function CaseStudiesDetail() {
  return (
    <main className="bg-bg min-h-svh px-6 pt-36 pb-24 sm:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-eyebrow text-primary font-mono font-medium tracking-[0.3em] uppercase">
          Proven Results
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold text-white sm:text-5xl">
          Real businesses, <span className="text-accent">real numbers</span>
        </h1>
        <p className="mt-4 max-w-xl text-sm text-white/60">
          No fluff. Just measurable outcomes for businesses that chose to
          automate and grow.
        </p>

        <div className="mt-16 flex flex-col gap-6">
          {CASE_STUDIES.map(
            ({ badge, title, problem, solution, result, stat }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="border-glass-border bg-glass rounded-2xl border p-6 backdrop-blur-md sm:p-8"
              >
                <div className="border-glass-border flex items-center gap-4 border-b pb-5">
                  <span className="border-glass-border bg-bg text-accent rounded-full border px-3 py-1 text-xs font-medium">
                    {badge}
                  </span>
                  <h3 className="text-lg font-semibold text-white">{title}</h3>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <div>
                    <p className="font-mono text-xs tracking-wider text-white/40 uppercase">
                      The Problem
                    </p>
                    <p className="mt-3 text-sm text-white/60">{problem}</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs tracking-wider text-white/40 uppercase">
                      Our Solution
                    </p>
                    <p className="mt-3 text-sm text-white/60">{solution}</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs tracking-wider text-white/40 uppercase">
                      The Result
                    </p>
                    <p className="text-accent mt-2 text-4xl font-bold">
                      {stat}
                    </p>
                    <p className="mt-2 text-sm text-white/60">{result}</p>
                  </div>
                </div>
              </motion.div>
            ),
          )}
        </div>

        <div className="border-glass-border bg-glass mt-16 flex flex-col items-start gap-4 rounded-2xl border p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-semibold text-white">
              Your business could be our next case study
            </p>
            <p className="mt-1 text-sm text-white/60">
              Book a free strategy call and we&apos;ll show you what results are
              realistic for you.
            </p>
          </div>
          <SmartLink
            href="/book-appointment"
            className="bg-primary hover:bg-primary/90 shrink-0 rounded-full px-7 py-3 text-sm font-semibold text-white transition-colors"
          >
            Book Free Consultation
          </SmartLink>
        </div>
      </div>
    </main>
  );
}
