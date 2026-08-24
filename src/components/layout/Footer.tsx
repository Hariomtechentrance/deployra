"use client";

import { useState } from "react";
import Image from "next/image";
import { LuLinkedin, LuMapPin } from "react-icons/lu";
import { SiX, SiGithub, SiInstagram } from "react-icons/si";
import { NAV_LINKS } from "@/lib/constants/nav";
import { CONTACT_INFO } from "@/lib/constants/contact";
import { SmartLink } from "@/components/shared/SmartLink";

const SOCIALS = [
  { Icon: LuLinkedin, label: "LinkedIn" },
  { Icon: SiX, label: "X" },
  { Icon: SiGithub, label: "GitHub" },
  { Icon: SiInstagram, label: "Instagram" },
];

type NewsletterStatus = "idle" | "submitting" | "success" | "error";

export function Footer() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<NewsletterStatus>("idle");

  const handleNewsletterSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className="bg-bg relative border-t border-white/10 px-6 py-16 sm:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 md:flex-row md:justify-between">
        <div className="max-w-sm">
          <div className="mb-4 flex h-10 w-10 items-center justify-center">
            <Image
              src="/logo.jpeg"
              alt="Deployra"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
          </div>
          <p className="text-sm text-white/60">
            Deployra Private Limited builds AI-powered software, enterprise
            platforms, and cloud solutions that help startups and enterprises
            scale with confidence.
          </p>

          <div className="mt-8 flex flex-col gap-5">
            {CONTACT_INFO.offices.map((office) => (
              <div key={office.city}>
                <p className="font-mono text-xs tracking-wider text-white/40 uppercase">
                  {office.label} — {office.city}
                </p>
                <a
                  href={office.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent mt-1.5 inline-flex items-center gap-1.5 text-sm hover:text-white"
                >
                  <LuMapPin size={14} />
                  View on Google Maps
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-12">
          <div>
            <p className="font-mono text-xs tracking-wider text-white/40 uppercase">
              Quick Links
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <SmartLink
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white"
                  >
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs tracking-wider text-white/40 uppercase">
              Contact
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-sm text-white/70 hover:text-white"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
              {CONTACT_INFO.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="text-sm text-white/70 hover:text-white"
                  >
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs tracking-wider text-white/40 uppercase">
              Stay Updated
            </p>
            {status === "success" ? (
              <p className="text-success mt-4 text-sm">
                You&apos;re subscribed 🎉
              </p>
            ) : (
              <form
                onSubmit={handleNewsletterSubmit}
                className="relative mt-4 flex gap-2"
              >
                {/* Honeypot — hidden from real visitors, catches basic bots */}
                <input
                  type="text"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute h-0 w-0 opacity-0"
                />
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="border-glass-border bg-glass min-w-0 flex-1 rounded-full border px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none sm:w-48 sm:flex-none"
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="bg-primary rounded-full px-4 py-2 text-sm font-semibold text-black disabled:opacity-60"
                >
                  {status === "submitting" ? "…" : "Join"}
                </button>
              </form>
            )}
            {status === "error" && (
              <p className="mt-2 text-xs text-red-400">
                Something went wrong. Try again.
              </p>
            )}

            <div className="mt-6 flex gap-3">
              {SOCIALS.map(({ Icon, label }) => (
                <span
                  key={label}
                  aria-label={label}
                  className="border-glass-border bg-glass flex h-9 w-9 items-center justify-center rounded-full border text-white/70"
                >
                  <Icon size={16} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="mx-auto mt-12 max-w-6xl border-t border-white/10 pt-6 text-xs text-white/40">
        © {new Date().getFullYear()} Deployra Private Limited. All rights
        reserved.
      </p>
    </footer>
  );
}
