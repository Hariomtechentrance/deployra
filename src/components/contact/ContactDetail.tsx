"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { LuMail, LuPhone, LuMapPin } from "react-icons/lu";
import { CONTACT_INFO } from "@/lib/constants/contact";

type Status = "idle" | "submitting" | "success" | "error";

const initialForm = { name: "", email: "", company: "", message: "", website: "" };

export function ContactDetail() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const update =
    (field: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="bg-bg min-h-svh px-6 pt-36 pb-24 sm:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-eyebrow text-primary font-mono font-medium tracking-[0.3em] uppercase">
          Get In Touch
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold text-white sm:text-5xl">
          Let&apos;s build something
        </h1>
        <p className="mt-4 max-w-xl text-sm text-white/60">
          Tell us about your project and we&apos;ll get back to you.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr]">
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="border-glass-border bg-glass flex flex-col gap-4 rounded-2xl border p-6 backdrop-blur-md sm:p-8"
          >
            {/* Honeypot — hidden from real visitors, catches basic bots */}
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={update("website")}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute h-0 w-0 opacity-0"
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="text"
                required
                placeholder="Your name"
                value={form.name}
                onChange={update("name")}
                className="border-glass-border bg-bg rounded-xl border px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
              <input
                type="email"
                required
                placeholder="you@company.com"
                value={form.email}
                onChange={update("email")}
                className="border-glass-border bg-bg rounded-xl border px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
            </div>
            <input
              type="text"
              placeholder="Company (optional)"
              value={form.company}
              onChange={update("company")}
              className="border-glass-border bg-bg rounded-xl border px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
            <textarea
              required
              placeholder="Tell us about your project"
              rows={5}
              value={form.message}
              onChange={update("message")}
              className="border-glass-border bg-bg resize-none rounded-xl border px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
            />

            {status === "success" ? (
              <p className="text-success rounded-xl border border-current/20 bg-current/5 px-4 py-3 text-sm">
                Message sent — we&apos;ll get back to you soon.
              </p>
            ) : (
              <button
                type="submit"
                disabled={status === "submitting"}
                className="bg-primary hover:bg-primary/90 rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : "Send Message"}
              </button>
            )}
            {status === "error" && (
              <p className="text-sm text-red-400">{errorMessage}</p>
            )}
          </motion.form>

          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="border-glass-border bg-glass flex flex-col gap-4 rounded-2xl border p-6 backdrop-blur-md"
            >
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-3 text-sm text-white/75 hover:text-white"
              >
                <span className="border-glass-border bg-bg text-accent flex h-9 w-9 items-center justify-center rounded-lg border">
                  <LuMail size={16} />
                </span>
                {CONTACT_INFO.email}
              </a>
              {CONTACT_INFO.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-sm text-white/75 hover:text-white"
                >
                  <span className="border-glass-border bg-bg text-accent flex h-9 w-9 items-center justify-center rounded-lg border">
                    <LuPhone size={16} />
                  </span>
                  {phone}
                </a>
              ))}
            </motion.div>

            {CONTACT_INFO.offices.map((office, i) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                className="border-glass-border bg-glass overflow-hidden rounded-2xl border backdrop-blur-md"
              >
                <div className="flex items-center justify-between p-5 pb-3">
                  <p className="font-mono text-xs tracking-wider text-white/50 uppercase">
                    {office.label} — {office.city}
                  </p>
                  <a
                    href={office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent flex items-center gap-1.5 text-xs hover:text-white"
                  >
                    <LuMapPin size={13} />
                    Open in Maps
                  </a>
                </div>
                <iframe
                  src={office.embedUrl}
                  title={`${office.label} — ${office.city}`}
                  loading="lazy"
                  className="h-56 w-full grayscale invert-[0.9]"
                  style={{ border: 0 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
