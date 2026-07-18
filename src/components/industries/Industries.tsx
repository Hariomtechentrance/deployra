"use client";

import { motion } from "motion/react";
import { INDUSTRIES } from "@/lib/constants/industries";

export function Industries() {
  return (
    <section id="industries" className="bg-bg relative border-t border-white/10 px-6 py-24 sm:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-eyebrow text-primary font-mono font-medium tracking-[0.3em] uppercase">
          Industries We Serve
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          {INDUSTRIES.map(({ Icon, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="border-glass-border bg-glass flex items-center gap-2 rounded-full border px-4 py-2"
            >
              <span className="text-accent">
                <Icon size={16} />
              </span>
              <span className="text-sm text-white/75">{label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
