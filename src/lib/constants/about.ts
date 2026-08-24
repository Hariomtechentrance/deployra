import type { IconType } from "react-icons";
import { LuChartBar, LuZap, LuHandshake, LuSearch } from "react-icons/lu";

export const MISSION = {
  heading: "Our Mission",
  body: "Deployra exists to help businesses in India and beyond compete with the biggest players in their industry — by giving them access to AI automation and modern technology that was previously only available to Fortune 500 companies.",
} as const;

export const CORE_VALUES: {
  Icon: IconType;
  title: string;
  description: string;
}[] = [
  {
    Icon: LuChartBar,
    title: "Results Over Everything",
    description:
      "We measure success in revenue generated, leads captured, and time saved — not vanity metrics.",
  },
  {
    Icon: LuZap,
    title: "Speed Without Compromise",
    description:
      "We ship fast without cutting corners. Your website goes live in days, not months.",
  },
  {
    Icon: LuHandshake,
    title: "Long-Term Partnership",
    description:
      "We're not a one-time vendor. We grow with you — your success is our success.",
  },
  {
    Icon: LuSearch,
    title: "Radical Transparency",
    description:
      "Clear pricing, honest timelines, and weekly updates. No surprises, ever.",
  },
];

export const TEAM_NOTE = [
  "Deployra was founded by a team of engineers, designers, and growth marketers who were frustrated by agencies that charge high fees but deliver low results.",
  "We've built products used by thousands of users, run paid ad campaigns with substantial budgets, and deployed AI systems that generate measurable ROI — and now we bring all of that to your business.",
] as const;

/**
 * Carried over from the prior brand identity (Techentrance) — same caveat as
 * TESTIMONIALS in ./testimonials.ts: verify these figures for Deployra
 * specifically before treating them as confirmed, audited numbers.
 */
export const TRACK_RECORD: {
  value: string;
  label: string;
  description: string;
}[] = [
  {
    value: "50+",
    label: "Automations Built",
    description: "End-to-end automation systems across multiple industries",
  },
  {
    value: "30+",
    label: "Websites Launched",
    description: "High-converting, fast-loading business websites",
  },
  {
    value: "1000+",
    label: "Leads Generated",
    description: "For our clients through AI and marketing systems",
  },
  {
    value: "98%",
    label: "Client Retention",
    description: "Because we deliver results that keep clients coming back",
  },
];
