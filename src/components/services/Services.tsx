"use client";

import { motion } from "motion/react";
import { LuArrowRight } from "react-icons/lu";
import { SERVICES } from "@/lib/constants/services";
import { SmartLink } from "@/components/shared/SmartLink";

export function Services() {
  return (
    <section id="services" className="bg-bg relative px-6 py-28 sm:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-eyebrow text-primary font-mono font-medium tracking-[0.3em] uppercase">
          What We Do
        </p>
        <h2 className="mt-4 max-w-2xl text-4xl font-semibold text-white sm:text-5xl">
          Services built for scale
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ slug, Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="border-glass-border bg-glass group rounded-2xl border p-6 backdrop-blur-md transition-colors hover:border-white/25"
            >
              <div className="border-glass-border bg-bg text-accent flex h-12 w-12 items-center justify-center rounded-xl border transition-transform group-hover:scale-110">
                <Icon size={22} />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm text-white/60">{description}</p>
              <SmartLink
                href={`/services/${slug}`}
                className="text-accent mt-4 inline-flex items-center gap-1.5 text-sm font-medium hover:text-white"
              >
                Learn more <LuArrowRight size={14} />
              </SmartLink>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
