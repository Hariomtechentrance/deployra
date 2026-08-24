"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  EXPERIENCE_LEVELS,
  OPEN_POSITIONS,
  AVAILABILITY_OPTIONS,
} from "@/lib/constants/careers";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "border-glass-border bg-bg rounded-xl border px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none";

export function CareersDetail() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [resumeName, setResumeName] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/careers", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(
          data.error ?? "Something went wrong. Please try again.",
        );
        return;
      }

      setStatus("success");
      form.reset();
      setResumeName("");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="bg-bg min-h-svh px-6 pt-36 pb-24 sm:px-12">
      <div className="mx-auto max-w-4xl">
        <p className="text-eyebrow text-primary font-mono font-medium tracking-[0.3em] uppercase">
          Join Our Team
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold text-white sm:text-5xl">
          Ready to build the future with AI?
        </h1>
        <p className="mt-4 max-w-xl text-sm text-white/60">
          We&apos;re looking for talented people who want to make an impact in
          the digital world. Fill in your details and we&apos;ll get back to you
          within 48 hours.
        </p>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="border-glass-border bg-glass relative mt-12 flex flex-col gap-4 rounded-2xl border p-6 backdrop-blur-md sm:p-8"
        >
          {/* Honeypot — hidden from real visitors, catches basic bots */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute h-0 w-0 opacity-0"
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              name="first_name"
              required
              placeholder="First name *"
              className={inputClass}
            />
            <input
              name="last_name"
              required
              placeholder="Last name *"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              type="email"
              name="email"
              required
              placeholder="Email address *"
              className={inputClass}
            />
            <input
              type="tel"
              name="phone"
              required
              placeholder="Phone / WhatsApp *"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              name="current_position"
              required
              placeholder="Current position/role *"
              className={inputClass}
            />
            <select
              name="experience_level"
              required
              defaultValue=""
              className={inputClass}
            >
              <option value="" disabled>
                Experience level *
              </option>
              {EXPERIENCE_LEVELS.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <select
              name="position"
              required
              defaultValue=""
              className={inputClass}
            >
              <option value="" disabled>
                Position applied for *
              </option>
              {OPEN_POSITIONS.map((position) => (
                <option key={position.value} value={position.value}>
                  {position.label}
                </option>
              ))}
            </select>
            <input
              name="location"
              required
              placeholder="Location (city, state) *"
              className={inputClass}
            />
          </div>

          <input
            type="url"
            name="portfolio_url"
            placeholder="Portfolio / LinkedIn URL (optional)"
            className={inputClass}
          />

          <label className="border-glass-border bg-bg flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed px-4 py-6 text-center text-sm text-white/60 hover:border-white/30">
            <span>
              {resumeName ||
                "Click to upload resume (PDF, DOC, DOCX — max 5MB)"}
            </span>
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(event) =>
                setResumeName(event.target.files?.[0]?.name ?? "")
              }
            />
          </label>

          <textarea
            name="cover_letter"
            placeholder="Cover letter — tell us why you want to join Deployra (optional)"
            rows={4}
            className={`${inputClass} resize-none`}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <select
              name="availability"
              required
              defaultValue=""
              className={inputClass}
            >
              <option value="" disabled>
                Available to join *
              </option>
              {AVAILABILITY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <input
              name="expected_salary"
              placeholder="Expected salary (annual, optional)"
              className={inputClass}
            />
          </div>

          {status === "success" ? (
            <p className="text-success rounded-xl border border-current/20 bg-current/5 px-4 py-3 text-sm">
              Thank you for applying — we&apos;ll review your details and get
              back to you within 48 hours.
            </p>
          ) : (
            <button
              type="submit"
              disabled={status === "submitting"}
              className="bg-primary hover:bg-primary/90 rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors disabled:opacity-60"
            >
              {status === "submitting" ? "Submitting…" : "Submit Application"}
            </button>
          )}
          {status === "error" && (
            <p className="text-sm text-red-400">{errorMessage}</p>
          )}
        </motion.form>
      </div>
    </main>
  );
}
