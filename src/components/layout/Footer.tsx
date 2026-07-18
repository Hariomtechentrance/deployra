"use client";

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

export function Footer() {
  return (
    <footer className="bg-bg relative border-t border-white/10 px-6 py-16 sm:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 md:flex-row md:justify-between">
        <div className="max-w-sm">
          <div className="border-glass-border bg-glass mb-4 flex h-9 w-9 items-center justify-center rounded-full border text-sm font-bold text-white">
            D
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
            <form
              onSubmit={(event) => event.preventDefault()}
              className="mt-4 flex gap-2"
            >
              <input
                type="email"
                placeholder="you@company.com"
                className="border-glass-border bg-glass w-48 rounded-full border px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-primary rounded-full px-4 py-2 text-sm font-semibold text-black"
              >
                Join
              </button>
            </form>

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
        © {new Date().getFullYear()} Deployra Private Limited. All rights reserved.
      </p>
    </footer>
  );
}
