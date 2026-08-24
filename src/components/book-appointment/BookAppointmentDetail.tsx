"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  LuGlobe,
  LuBrainCircuit,
  LuTrendingUp,
  LuLightbulb,
} from "react-icons/lu";

type Status = "idle" | "submitting" | "success" | "error";

const APPOINTMENT_TYPES = [
  {
    value: "website",
    Icon: LuGlobe,
    title: "Website Development",
    description: "30 mins — discuss your website requirements",
  },
  {
    value: "ai",
    Icon: LuBrainCircuit,
    title: "AI Solutions",
    description: "45 mins — explore AI automation opportunities",
  },
  {
    value: "marketing",
    Icon: LuTrendingUp,
    title: "Growth Marketing",
    description: "30 mins — marketing strategy consultation",
  },
  {
    value: "general",
    Icon: LuLightbulb,
    title: "General Consultation",
    description: "30 mins — free business audit and strategy",
  },
] as const;

const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

function formatTime(time: string) {
  const [hourStr, minute] = time.split(":");
  const hour = Number(hourStr);
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${minute} ${period}`;
}

const inputClass =
  "border-glass-border bg-bg rounded-xl border px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none";

export function BookAppointmentDetail() {
  const [type, setType] = useState<string>("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    notes: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  const update =
    (field: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const canSubmit =
    type &&
    date &&
    time &&
    form.firstName &&
    form.lastName &&
    form.email &&
    form.phone;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          date,
          time,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          companyName: form.companyName,
          notes: form.notes,
        }),
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
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="bg-bg min-h-svh px-6 pt-36 pb-24 sm:px-12">
      <div className="mx-auto max-w-3xl">
        <p className="text-eyebrow text-primary font-mono font-medium tracking-[0.3em] uppercase">
          Schedule Your Consultation
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold text-white sm:text-5xl">
          Book your <span className="text-accent">free strategy call</span>
        </h1>
        <p className="mt-4 max-w-xl text-sm text-white/60">
          Choose a convenient time slot and we&apos;ll help you grow your
          business with AI-powered solutions.
        </p>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-glass-border bg-glass mt-12 rounded-2xl border p-8 text-center"
          >
            <p className="text-success text-lg font-semibold">
              Appointment booked!
            </p>
            <p className="mt-2 text-sm text-white/60">
              We&apos;ll confirm your{" "}
              {APPOINTMENT_TYPES.find(
                (t) => t.value === type,
              )?.title.toLowerCase()}{" "}
              call on {date} at {formatTime(time)} by email shortly.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-10">
            <section>
              <h2 className="text-lg font-semibold text-white">
                Step 1 — Choose Appointment Type
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {APPOINTMENT_TYPES.map(
                  ({ value, Icon, title, description }) => (
                    <button
                      type="button"
                      key={value}
                      onClick={() => setType(value)}
                      className={`border-glass-border bg-glass flex flex-col items-start gap-2 rounded-2xl border p-5 text-left transition-colors ${
                        type === value
                          ? "border-primary bg-primary/10"
                          : "hover:border-white/25"
                      }`}
                    >
                      <span className="text-accent flex h-9 w-9 items-center justify-center">
                        <Icon size={20} />
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {title}
                      </span>
                      <span className="text-xs text-white/60">
                        {description}
                      </span>
                    </button>
                  ),
                )}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white">
                Step 2 — Select Date &amp; Time
              </h2>
              <input
                type="date"
                required
                min={today}
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className={`${inputClass} mt-4`}
              />
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {TIME_SLOTS.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setTime(slot)}
                    className={`border-glass-border bg-glass rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                      time === slot
                        ? "border-primary bg-primary/10 text-white"
                        : "text-white/70 hover:border-white/25"
                    }`}
                  >
                    {formatTime(slot)}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white">
                Step 3 — Your Information
              </h2>
              <div className="mt-4 flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input
                    required
                    placeholder="First name *"
                    value={form.firstName}
                    onChange={update("firstName")}
                    className={inputClass}
                  />
                  <input
                    required
                    placeholder="Last name *"
                    value={form.lastName}
                    onChange={update("lastName")}
                    className={inputClass}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input
                    type="email"
                    required
                    placeholder="Email address *"
                    value={form.email}
                    onChange={update("email")}
                    className={inputClass}
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone number *"
                    value={form.phone}
                    onChange={update("phone")}
                    className={inputClass}
                  />
                </div>
                <input
                  placeholder="Company name (optional)"
                  value={form.companyName}
                  onChange={update("companyName")}
                  className={inputClass}
                />
                <textarea
                  placeholder="What would you like to discuss? (optional)"
                  rows={4}
                  value={form.notes}
                  onChange={update("notes")}
                  className={`${inputClass} resize-none`}
                />
              </div>
            </section>

            {type && date && time && (
              <div className="border-glass-border bg-glass rounded-2xl border p-5">
                <h3 className="text-sm font-semibold text-white">
                  Appointment Summary
                </h3>
                <div className="mt-3 flex flex-col gap-1.5 text-sm text-white/70">
                  <div className="flex justify-between">
                    <span className="text-white/40">Type</span>
                    <span>
                      {APPOINTMENT_TYPES.find((t) => t.value === type)?.title}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Date</span>
                    <span>{date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Time</span>
                    <span>{formatTime(time)}</span>
                  </div>
                </div>
              </div>
            )}

            {status === "error" && (
              <p className="text-sm text-red-400">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={!canSubmit || status === "submitting"}
              className="bg-primary hover:bg-primary/90 w-full rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-40"
            >
              {status === "submitting" ? "Booking…" : "Book Appointment"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
