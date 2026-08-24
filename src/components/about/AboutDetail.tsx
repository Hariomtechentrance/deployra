"use client";

import { motion } from "motion/react";
import {
  MISSION,
  CORE_VALUES,
  TEAM_NOTE,
  TRACK_RECORD,
} from "@/lib/constants/about";
import { SmartLink } from "@/components/shared/SmartLink";

export function AboutDetail() {
  return (
    <main className="bg-bg min-h-svh px-6 pt-36 pb-24 sm:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-eyebrow text-primary font-mono font-medium tracking-[0.3em] uppercase">
          Our Story
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold text-white sm:text-5xl">
          We help businesses{" "}
          <span className="text-accent">make more money</span> using AI
        </h1>
        <p className="mt-4 max-w-xl text-sm text-white/60">
          Not just technology — measurable revenue growth for every client we
          work with.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="border-glass-border bg-glass mt-16 rounded-2xl border p-8 text-center sm:p-14"
        >
          <h2 className="text-2xl font-semibold text-white">
            {MISSION.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/60">
            {MISSION.body}
          </p>
        </motion.div>

        <div className="mt-20">
          <p className="text-primary font-mono text-xs tracking-[0.3em] uppercase">
            What We Stand For
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            Our Core Values
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CORE_VALUES.map(({ Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
                className="border-glass-border bg-glass rounded-2xl border p-6 text-center backdrop-blur-md"
              >
                <div className="border-glass-border bg-bg text-accent mx-auto flex h-12 w-12 items-center justify-center rounded-xl border">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-white">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-white/60">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <p className="text-primary font-mono text-xs tracking-[0.3em] uppercase">
            The Team
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            Built by builders, for business owners
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="border-glass-border bg-glass mx-auto mt-8 flex max-w-2xl flex-col gap-4 rounded-2xl border p-8 text-center"
          >
            {TEAM_NOTE.map((paragraph) => (
              <p
                key={paragraph}
                className="text-sm leading-relaxed text-white/60"
              >
                {paragraph}
              </p>
            ))}
            <p className="text-accent text-sm font-semibold">
              Based in Bengaluru 🇮🇳 — Serving businesses globally.
            </p>
          </motion.div>
        </div>

        <div className="mt-20">
          <p className="text-primary font-mono text-xs tracking-[0.3em] uppercase">
            By The Numbers
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            Our Track Record
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TRACK_RECORD.map(({ value, label, description }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
                className="border-glass-border bg-glass rounded-2xl border p-6 text-center backdrop-blur-md"
              >
                <div className="text-accent text-4xl font-bold">{value}</div>
                <h3 className="mt-2 text-sm font-semibold text-white">
                  {label}
                </h3>
                <p className="mt-2 text-sm text-white/60">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="border-glass-border bg-glass mt-20 flex flex-col items-start gap-4 rounded-2xl border p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-semibold text-white">
              Let&apos;s build something great together
            </p>
            <p className="mt-1 text-sm text-white/60">
              Book a free 30-min call and let&apos;s talk about how we can grow
              your business.
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
