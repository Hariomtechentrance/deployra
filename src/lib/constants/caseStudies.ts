/**
 * Carried over from the prior brand identity (Techentrance) — same caveat as
 * TESTIMONIALS in ./testimonials.ts: these are illustrative examples of the
 * kind of outcomes Deployra aims to deliver, not verified client results.
 */
export const CASE_STUDIES: {
  badge: string;
  title: string;
  problem: string;
  solution: string;
  result: string;
  stat: string;
}[] = [
  {
    badge: "🦷 Dental Clinic — Bengaluru",
    title: "AI Appointment System Transformed a 3-Chair Clinic",
    problem:
      "The clinic was losing significant monthly revenue from missed appointments and no-shows. Staff spent hours daily on manual reminder calls.",
    solution:
      "Deployed an AI reminder system with WhatsApp + SMS sequences at 48h, 24h, and 2h before each appointment. Added an online booking chatbot to the website.",
    result:
      "Increase in confirmed bookings within 30 days. Staff time on calls reduced from hours to minutes per day.",
    stat: "+40%",
  },
  {
    badge: "🛒 E-commerce Store — Hyderabad",
    title: "Cart Abandonment AI Doubled Monthly Revenue",
    problem:
      "A high cart abandonment rate with no follow-up system — the owner was manually reaching out to some customers via WhatsApp.",
    solution:
      "Built an AI cart recovery sequence — WhatsApp message at 1hr, email at 6hr, discount offer at 24hr. Integrated with Shopify, fully automated.",
    result:
      "Revenue doubled in 60 days. Cart recovery rate improved dramatically with zero additional ad spend.",
    stat: "2x",
  },
  {
    badge: "🏠 Real Estate Agency — Mumbai",
    title: "AI Lead Gen Funnel Generates 1000+ Monthly Leads",
    problem:
      "Heavy ad spend with no lead nurturing. Agents wasting time on unqualified cold leads, and a CRM that was a mess.",
    solution:
      "Built an AI lead qualification chatbot on the website and WhatsApp, integrated with the CRM, plus automated follow-up sequences with property recommendations.",
    result:
      "Qualified leads per month, with a meaningful reduction in cost-per-lead — agents now only talk to ready-to-buy prospects.",
    stat: "1000+",
  },
  {
    badge: "💼 SaaS Startup — Pune",
    title: "Website Redesign + AI Onboarding = 3x Trial Signups",
    problem:
      "An outdated website with a low conversion rate, no onboarding automation, and trial users churning without converting to paid.",
    solution:
      'Rebuilt the website with conversion-focused design and added an AI onboarding assistant that guides trial users to their "aha moment" within 48 hours.',
    result:
      "Trial-to-paid conversion jumped significantly, and website conversion rate improved several times over.",
    stat: "3x",
  },
];
