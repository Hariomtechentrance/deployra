"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { TESTIMONIALS } from "@/lib/constants/testimonials";
import { StarRating, StarRatingInput } from "@/components/testimonials/StarRating";
import type { PublicTestimonial } from "@/lib/submissions";

type Status = "idle" | "submitting" | "success" | "error";

const initialForm = { name: "", role: "", email: "", quote: "", website: "" };

export function Testimonials({
  initialTestimonials,
}: {
  initialTestimonials: PublicTestimonial[];
}) {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [form, setForm] = useState(initialForm);
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const hasRealReviews = testimonials.length > 0;

  const update =
    (field: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (rating === 0) {
      setStatus("error");
      setErrorMessage("Pick a star rating.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, rating }),
      });
      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      // Goes live instantly — show it in the list right away for this
      // visitor rather than waiting on the next revalidation.
      setTestimonials((prev) => [data.testimonial, ...prev]);
      setStatus("success");
      setForm(initialForm);
      setRating(0);
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="bg-bg relative border-t border-white/10 px-6 py-24 sm:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-eyebrow text-primary font-mono font-medium tracking-[0.3em] uppercase">
          {hasRealReviews ? "Client Feedback" : "Sample Feedback — Illustrative"}
        </p>
        <h2 className="mt-4 max-w-2xl text-4xl font-semibold text-white sm:text-5xl">
          {hasRealReviews ? "What clients say" : "What clients could expect"}
        </h2>
        {!hasRealReviews && (
          <p className="mt-4 max-w-xl text-sm text-white/50">
            Deployra is a new brand — these are illustrative examples of the
            experience we aim to deliver, not verified customer reviews.
          </p>
        )}

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {(hasRealReviews ? testimonials : TESTIMONIALS).map((item, i) => (
            <motion.figure
              key={hasRealReviews ? (item as PublicTestimonial).id : item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="border-glass-border bg-glass flex flex-col justify-between rounded-2xl border p-6 backdrop-blur-md"
            >
              <div>
                {hasRealReviews && (
                  <StarRating rating={(item as PublicTestimonial).rating} />
                )}
                <blockquote className="mt-3 text-sm text-white/75">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
              </div>
              <figcaption className="mt-6 border-t border-white/10 pt-4">
                <p className="text-sm font-semibold text-white">{item.name}</p>
                <p className="text-xs text-white/50">
                  {hasRealReviews ? (item as PublicTestimonial).role : item.role}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="border-glass-border bg-glass mt-14 flex flex-col gap-4 rounded-2xl border p-6 backdrop-blur-md sm:p-8"
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

          <div>
            <p className="text-lg font-semibold text-white">
              Worked with us? Share your experience
            </p>
            <p className="mt-1 text-sm text-white/50">
              Your feedback goes live on this page as soon as you submit it.
            </p>
          </div>

          <StarRatingInput value={rating} onChange={setRating} />

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
              type="text"
              placeholder="Role / company (optional)"
              value={form.role}
              onChange={update("role")}
              className="border-glass-border bg-bg rounded-xl border px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
          </div>
          <input
            type="email"
            placeholder="Email (optional, not shown publicly)"
            value={form.email}
            onChange={update("email")}
            className="border-glass-border bg-bg rounded-xl border px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
          />
          <textarea
            required
            placeholder="What was your experience working with Deployra?"
            rows={4}
            maxLength={600}
            value={form.quote}
            onChange={update("quote")}
            className="border-glass-border bg-bg resize-none rounded-xl border px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
          />

          {status === "success" ? (
            <p className="text-success rounded-xl border border-current/20 bg-current/5 px-4 py-3 text-sm">
              Thanks for sharing — your feedback is live above.
            </p>
          ) : (
            <button
              type="submit"
              disabled={status === "submitting"}
              className="bg-primary hover:bg-primary/90 self-start rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors disabled:opacity-60"
            >
              {status === "submitting" ? "Submitting…" : "Submit feedback"}
            </button>
          )}
          {status === "error" && (
            <p className="text-sm text-red-400">{errorMessage}</p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
