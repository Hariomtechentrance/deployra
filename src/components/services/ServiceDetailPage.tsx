"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { LuCheck, LuChevronDown } from "react-icons/lu";
import type { ServiceDetail } from "@/lib/constants/serviceDetails";
import { SmartLink } from "@/components/shared/SmartLink";

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-glass-border bg-glass overflow-hidden rounded-2xl border">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
      >
        <span className="text-sm font-medium text-white">{question}</span>
        <LuChevronDown
          size={16}
          className={`shrink-0 text-white/50 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <p className="px-5 pb-5 text-sm text-white/60">{answer}</p>}
    </div>
  );
}

export function ServiceDetailPage({ service }: { service: ServiceDetail }) {
  return (
    <main className="bg-bg min-h-svh px-6 pt-36 pb-24 sm:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-eyebrow text-primary font-mono font-medium tracking-[0.3em] uppercase">
          {service.eyebrow}
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold text-white sm:text-5xl">
          {service.heading}
        </h1>
        <p className="mt-4 max-w-xl text-sm text-white/60">
          {service.subheading}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <SmartLink
            href="/book-appointment"
            className="bg-primary hover:bg-primary/90 rounded-full px-6 py-3 text-sm font-semibold text-black transition-colors"
          >
            Book Free Consultation
          </SmartLink>
          <SmartLink
            href="/services"
            className="border-glass-border bg-glass rounded-full border px-6 py-3 text-sm font-semibold text-white/80 transition-colors hover:text-white"
          >
            All Services
          </SmartLink>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="border-glass-border bg-glass rounded-2xl border p-6 backdrop-blur-md sm:p-8"
          >
            <h2 className="text-lg font-semibold text-white">
              {service.offerings.title}
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {service.offerings.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-white/75"
                >
                  <LuCheck size={16} className="text-success mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="border-glass-border bg-glass rounded-2xl border p-6 backdrop-blur-md sm:p-8"
          >
            <h2 className="text-lg font-semibold text-white">
              {service.features.title}
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {service.features.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-white/75"
                >
                  <LuCheck size={16} className="text-success mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <p className="font-mono text-xs tracking-wider text-white/40 uppercase">
            Technologies
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {service.techStack.map((tech) => (
              <span
                key={tech}
                className="border-glass-border bg-glass rounded-full border px-4 py-1.5 text-xs text-white/75"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-white">
            Why Choose Deployra
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {service.whyUs.map(({ title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="border-glass-border bg-glass rounded-2xl border p-6 backdrop-blur-md"
              >
                <h3 className="text-sm font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-white/60">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-white">
            Frequently Asked Questions
          </h2>
          <div className="mt-6 flex flex-col gap-3">
            {service.faq.map((item) => (
              <FaqItem key={item.question} {...item} />
            ))}
          </div>
        </div>

        <div className="border-glass-border bg-glass mt-16 flex flex-col items-start gap-4 rounded-2xl border p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-semibold text-white">
              Ready to get started?
            </p>
            <p className="mt-1 text-sm text-white/60">
              Tell us what you&apos;re building — we&apos;ll take it from there.
            </p>
          </div>
          <SmartLink
            href="/contact"
            className="bg-primary hover:bg-primary/90 shrink-0 rounded-full px-7 py-3 text-sm font-semibold text-white transition-colors"
          >
            Start Your Project
          </SmartLink>
        </div>
      </div>
    </main>
  );
}
