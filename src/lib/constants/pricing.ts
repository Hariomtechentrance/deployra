/**
 * Carried over from the prior brand identity (Techentrance) — treat these
 * figures as a placeholder starting point, not confirmed Deployra pricing.
 * Review before this goes live.
 */
export const PRICING_TIERS: {
  tier: string;
  price: string;
  period?: string;
  featured?: boolean;
  features: string[];
  cta: string;
  ctaHref: string;
}[] = [
  {
    tier: "Starter",
    price: "₹1,999",
    period: "/mo",
    features: [
      "Landing page",
      "Basic AI chatbot",
      "Lead capture form",
      "Monthly report",
    ],
    cta: "Get Started",
    ctaHref: "/contact",
  },
  {
    tier: "Growth",
    price: "₹7,999",
    period: "/mo",
    featured: true,
    features: [
      "Full website",
      "AI lead gen agent",
      "CRM automation",
      "Monthly ads management",
      "Analytics dashboard",
    ],
    cta: "Book Free Call",
    ctaHref: "/book-appointment",
  },
  {
    tier: "Enterprise",
    price: "Custom",
    features: [
      "Mobile app",
      "Full AI stack",
      "PR & brand campaign",
      "Dedicated manager",
      "Priority support",
    ],
    cta: "Get Custom Quote",
    ctaHref: "/contact",
  },
];
