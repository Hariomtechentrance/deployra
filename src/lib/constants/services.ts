import type { IconType } from "react-icons";
import {
  LuBrainCircuit,
  LuCode,
  LuSmartphone,
  LuBuilding2,
  LuCloud,
  LuPalette,
  LuMegaphone,
} from "react-icons/lu";

export const SERVICES: {
  slug: string;
  Icon: IconType;
  title: string;
  description: string;
  features: string[];
}[] = [
  {
    slug: "ai-solutions",
    Icon: LuBrainCircuit,
    title: "AI Agent Development",
    description:
      "Custom AI agents that work around the clock — lead capture, CRM automation, and intelligent chatbots built on your workflows.",
    features: [
      "24/7 automated lead capture and qualification",
      "CRM and workflow automation",
      "Custom chatbots trained on your data",
      "Integrations with your existing tools",
    ],
  },
  {
    slug: "web-development",
    Icon: LuCode,
    title: "Web Development",
    description:
      "Modern, fast, conversion-focused websites and platforms built to generate leads and drive revenue.",
    features: [
      "Marketing sites, dashboards, and web apps",
      "Performance and SEO built in from the start",
      "Headless CMS integration where needed",
      "Analytics and conversion tracking",
    ],
  },
  {
    slug: "mobile-app-development",
    Icon: LuSmartphone,
    title: "Mobile Apps",
    description:
      "Scalable, performant native and cross-platform apps for iOS and Android.",
    features: [
      "Cross-platform builds from a single codebase",
      "Native performance where it matters",
      "Push notifications and offline support",
      "App Store and Play Store release management",
    ],
  },
  {
    slug: "dashboard-development",
    Icon: LuBuilding2,
    title: "Enterprise Software",
    description:
      "CRM, ERP, and internal tools tailored to how your team works, with automation built in.",
    features: [
      "Custom CRM and ERP builds",
      "Role-based access and audit trails",
      "Workflow automation across departments",
      "Migration from legacy systems",
    ],
  },
  {
    slug: "cloud",
    Icon: LuCloud,
    title: "Cloud",
    description:
      "Reliable cloud infrastructure and deployment pipelines that scale with demand.",
    features: [
      "CI/CD pipelines for fast, safe releases",
      "Auto-scaling infrastructure",
      "Monitoring, logging, and alerting",
      "Cost optimization and reliability audits",
    ],
  },
  {
    slug: "ui-ux",
    Icon: LuPalette,
    title: "UI/UX",
    description:
      "UI/UX consultation and design audits that improve engagement, usability, and conversion.",
    features: [
      "UX audits and usability testing",
      "Design systems built for consistency",
      "Conversion-focused interface design",
      "Prototyping and user research",
    ],
  },
  {
    slug: "growth-marketing",
    Icon: LuMegaphone,
    title: "Growth Marketing",
    description:
      "End-to-end growth marketing — paid ads, funnels, SEO, and brand building that fills your pipeline.",
    features: [
      "Google, Meta, and LinkedIn paid ads",
      "High-converting landing pages and funnels",
      "Brand identity and positioning",
      "Technical SEO and content strategy",
    ],
  },
];
