"use client";

import { motion } from "motion/react";
import { TESTIMONIALS } from "@/lib/constants/testimonials";

export function Testimonials() {
  return (
    <section className="bg-bg relative border-t border-white/10 px-6 py-24 sm:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-eyebrow text-primary font-mono font-medium tracking-[0.3em] uppercase">
          Sample Feedback — Illustrative
        </p>
        <h2 className="mt-4 max-w-2xl text-4xl font-semibold text-white sm:text-5xl">
          What clients could expect
        </h2>
        <p className="mt-4 max-w-xl text-sm text-white/50">
          Deployra is a new brand — these are illustrative examples of the
          experience we aim to deliver, not verified customer reviews.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map(({ quote, name, role }, i) => (
            <motion.figure
              key={name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="border-glass-border bg-glass flex flex-col justify-between rounded-2xl border p-6 backdrop-blur-md"
            >
              <blockquote className="text-sm text-white/75">
                &ldquo;{quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-white/10 pt-4">
                <p className="text-sm font-semibold text-white">{name}</p>
                <p className="text-xs text-white/50">{role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
