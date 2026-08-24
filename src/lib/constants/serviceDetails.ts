export type ServiceDetail = {
  slug: string;
  eyebrow: string;
  heading: string;
  subheading: string;
  offerings: { title: string; items: string[] };
  features: { title: string; items: string[] };
  techStack: string[];
  whyUs: { title: string; description: string }[];
  faq: { question: string; answer: string }[];
};

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    slug: "web-development",
    eyebrow: "Web Development",
    heading: "Launch fast. Scale confidently. Convert visitors.",
    subheading:
      "Modern, fast, conversion-focused websites and web applications built to generate leads and drive revenue — not just look pretty.",
    offerings: {
      title: "What We Offer",
      items: [
        "Business websites",
        "Startup MVP development",
        "Corporate websites",
        "Landing pages",
        "Portfolio websites",
        "Custom web applications",
        "Admin dashboards",
        "CMS development",
        "API integrations",
        "SEO-optimized architecture",
      ],
    },
    features: {
      title: "Why Choose Deployra",
      items: [
        "Fast performance",
        "Secure architecture",
        "Responsive design",
        "SEO optimized",
        "Affordable development plans",
        "Scalable codebase",
      ],
    },
    techStack: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    whyUs: [
      {
        title: "Built to convert",
        description:
          "Every page is designed around a clear conversion goal, not just aesthetics.",
      },
      {
        title: "Shipped in sprints",
        description:
          "Focused, incremental delivery — see progress every week, not just at the end.",
      },
      {
        title: "SEO from day one",
        description:
          "Technical SEO and performance budgets are part of the build, not an afterthought.",
      },
    ],
    faq: [
      {
        question: "How long does website development take?",
        answer:
          "A landing page typically ships in 5–7 days; a full custom web application takes 3–6 weeks depending on scope.",
      },
      {
        question: "Do you offer ongoing maintenance?",
        answer:
          "Yes — monthly maintenance plans cover updates, monitoring, and small content changes after launch.",
      },
    ],
  },
  {
    slug: "ecommerce-development",
    eyebrow: "E-commerce Development",
    heading: "Ecommerce stores built to maximize sales",
    subheading:
      "From fashion brands to large online marketplaces, we build ecommerce solutions that help businesses scale faster and sell smarter.",
    offerings: {
      title: "Services Included",
      items: [
        "Custom ecommerce websites",
        "Shopify development",
        "WooCommerce development",
        "Payment gateway integration",
        "Product management system",
        "Order tracking",
        "Inventory management",
        "Coupon & offer systems",
        "Admin dashboard",
      ],
    },
    features: {
      title: "Key Features",
      items: [
        "Mobile optimized store",
        "Razorpay & Stripe integration",
        "SEO optimized products",
        "Fast checkout experience",
        "Wishlist & cart",
        "Customer login system",
        "Analytics dashboard",
      ],
    },
    techStack: ["React", "Shopify", "WooCommerce", "Node.js", "MongoDB"],
    whyUs: [
      {
        title: "Faster loading speed",
        description: "Optimized storefronts that keep shoppers from bouncing.",
      },
      {
        title: "Better conversion rate",
        description: "Checkout flows designed to reduce cart abandonment.",
      },
      {
        title: "Secure payments",
        description:
          "PCI-conscious integrations with trusted payment gateways.",
      },
    ],
    faq: [
      {
        question: "How long does it take to build an ecommerce store?",
        answer:
          "A standard store typically launches in 3–5 weeks, depending on catalog size and custom features.",
      },
      {
        question: "Do you provide payment gateway setup?",
        answer:
          "Yes — we handle Razorpay, Stripe, and other gateway integrations end-to-end.",
      },
    ],
  },
  {
    slug: "dashboard-development",
    eyebrow: "Enterprise Software",
    heading: "Smart dashboards for better business decisions",
    subheading:
      "Custom dashboards, CRM, and ERP builds that transform raw data into meaningful business insights — tailored to how your team works.",
    offerings: {
      title: "Dashboard Solutions",
      items: [
        "Admin dashboards",
        "CRM systems",
        "ERP dashboards",
        "Analytics platforms",
        "Inventory dashboards",
        "Sales tracking systems",
        "Finance dashboards",
      ],
    },
    features: {
      title: "Dashboard Features",
      items: [
        "Real-time data",
        "Role-based access",
        "Interactive charts",
        "Export reports",
        "API integrations",
        "Secure authentication",
      ],
    },
    techStack: ["React", "Next.js", "Node.js", "PostgreSQL"],
    whyUs: [
      {
        title: "Centralized data",
        description: "One source of truth instead of scattered spreadsheets.",
      },
      {
        title: "Better reporting",
        description:
          "Custom reports built around the metrics that matter to you.",
      },
      {
        title: "Business automation",
        description:
          "Workflow automation baked into the tools your team already uses.",
      },
    ],
    faq: [
      {
        question: "How long does dashboard development take?",
        answer:
          "Most custom dashboards ship in 2–4 weeks depending on data sources and integrations required.",
      },
      {
        question: "Can you integrate with existing systems?",
        answer:
          "Yes — we build against your existing databases and APIs rather than requiring a migration.",
      },
    ],
  },
  {
    slug: "ai-solutions",
    eyebrow: "AI Solutions",
    heading: "AI solutions that automate business growth",
    subheading:
      "Practical AI-powered systems designed for real business use cases — from AI chatbots to automation workflows and intelligent analytics.",
    offerings: {
      title: "AI Services",
      items: [
        "AI chatbot development",
        "AI automation systems",
        "Voice assistants",
        "AI-powered analytics",
        "Recommendation systems",
        "AI content solutions",
        "OCR & document processing",
        "AI integration for businesses",
      ],
    },
    features: {
      title: "Use Cases",
      items: [
        "Customer support automation",
        "Lead generation",
        "Workflow automation",
        "Business intelligence",
        "AI marketing tools",
        "Voice automation",
      ],
    },
    techStack: [
      "Python",
      "OpenAI APIs",
      "TensorFlow",
      "PyTorch",
      "LangChain",
      "Node.js",
    ],
    whyUs: [
      {
        title: "Reduce manual work",
        description: "Automate the repetitive tasks eating your team's time.",
      },
      {
        title: "24/7 automation",
        description:
          "Systems that capture and respond to leads around the clock.",
      },
      {
        title: "Faster decision making",
        description:
          "Analytics that surface what matters without manual digging.",
      },
    ],
    faq: [
      {
        question: "How long does AI development take?",
        answer:
          "A focused chatbot or automation workflow typically ships in 2–3 weeks; larger AI systems take longer.",
      },
      {
        question: "Do you provide AI maintenance?",
        answer:
          "Yes — we offer ongoing monitoring and tuning plans to keep automations accurate over time.",
      },
    ],
  },
  {
    slug: "mobile-app-development",
    eyebrow: "Mobile App Development",
    heading: "Mobile apps designed for growth & scalability",
    subheading:
      "Whether you're building a startup app, booking platform, ecommerce application, or AI-powered mobile solution — we turn your vision into a high-performing mobile product.",
    offerings: {
      title: "App Development Services",
      items: [
        "Android app development",
        "iOS app development",
        "Cross-platform apps",
        "Flutter app development",
        "React Native development",
        "AI integrated apps",
        "Ecommerce applications",
        "Real-time applications",
        "API integration",
        "Admin panels",
      ],
    },
    features: {
      title: "Features We Build",
      items: [
        "User authentication",
        "Payment gateway integration",
        "Push notifications",
        "Real-time chat",
        "GPS & maps",
        "Analytics dashboard",
        "Cloud database integration",
        "Multi-language support",
      ],
    },
    techStack: [
      "Flutter",
      "React Native",
      "Firebase",
      "Node.js",
      "MongoDB",
      "PostgreSQL",
    ],
    whyUs: [
      {
        title: "Cross-platform efficiency",
        description: "One codebase, native feel on both iOS and Android.",
      },
      {
        title: "Store-ready delivery",
        description:
          "We handle App Store and Play Store submission end-to-end.",
      },
      {
        title: "Built to scale",
        description: "Architecture that holds up as your user base grows.",
      },
    ],
    faq: [
      {
        question: "Can you publish apps on Play Store/App Store?",
        answer:
          "Yes — submission, review handling, and release management are part of every mobile build.",
      },
      {
        question: "Which is better: Flutter or Native?",
        answer:
          "Flutter/React Native cover most product needs cost-effectively; we recommend native Swift/Kotlin only when performance or platform APIs demand it.",
      },
    ],
  },
  {
    slug: "cloud",
    eyebrow: "Cloud Infrastructure",
    heading: "Cloud infrastructure that scales with demand",
    subheading:
      "Reliable cloud infrastructure and deployment pipelines so your product stays fast and available as usage grows.",
    offerings: {
      title: "What We Offer",
      items: [
        "CI/CD pipeline setup",
        "Auto-scaling infrastructure",
        "Containerization (Docker/Kubernetes)",
        "Cloud migration",
        "Monitoring & alerting",
        "Cost optimization audits",
      ],
    },
    features: {
      title: "Why It Matters",
      items: [
        "Faster, safer releases",
        "Less downtime",
        "Predictable infrastructure costs",
        "Automatic scaling under load",
        "Centralized logging",
      ],
    },
    techStack: [
      "AWS",
      "GCP",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "Terraform",
    ],
    whyUs: [
      {
        title: "Reliability first",
        description:
          "Infrastructure designed to survive traffic spikes and failures gracefully.",
      },
      {
        title: "Cost-aware",
        description:
          "We right-size infrastructure instead of over-provisioning by default.",
      },
      {
        title: "Observability built in",
        description:
          "Monitoring and alerting so issues surface before customers notice.",
      },
    ],
    faq: [
      {
        question: "Can you migrate our existing infrastructure?",
        answer:
          "Yes — we plan and execute migrations with minimal downtime, usually in staged cutovers.",
      },
      {
        question: "Do you support multi-cloud setups?",
        answer:
          "We can, though most teams get the best cost-to-reliability ratio on a single primary cloud provider.",
      },
    ],
  },
  {
    slug: "ui-ux",
    eyebrow: "UI/UX Design",
    heading: "Design that improves usability and conversion",
    subheading:
      "UI/UX consultation and design audits that improve engagement, usability, and conversion across your product.",
    offerings: {
      title: "What We Offer",
      items: [
        "UX audits",
        "Usability testing",
        "Wireframing & prototyping",
        "Design systems",
        "Conversion-focused interface design",
        "User research",
      ],
    },
    features: {
      title: "Why It Matters",
      items: [
        "Fewer support tickets from confused users",
        "Higher conversion on key flows",
        "Consistent brand experience",
        "Faster future development with a design system",
      ],
    },
    techStack: ["Figma", "Framer", "Design tokens", "User testing tools"],
    whyUs: [
      {
        title: "Research-backed",
        description:
          "Decisions grounded in real user testing, not just opinion.",
      },
      {
        title: "Systems, not one-offs",
        description: "Reusable design systems that scale with your product.",
      },
      {
        title: "Built for handoff",
        description: "Specs and components engineers can implement directly.",
      },
    ],
    faq: [
      {
        question: "Do you design and build, or just design?",
        answer:
          "Both — we can hand off polished designs to your team, or build the frontend ourselves.",
      },
      {
        question: "How long does a design system take?",
        answer:
          "A foundational design system typically takes 2–3 weeks alongside your core product screens.",
      },
    ],
  },
  {
    slug: "growth-marketing",
    eyebrow: "Growth Marketing",
    heading: "Marketing that fills your pipeline",
    subheading:
      "End-to-end growth — from brand awareness to paying customers — through paid ads, funnels, SEO, and brand building.",
    offerings: {
      title: "What We Offer",
      items: [
        "Google, Meta & LinkedIn ads",
        "Sales funnels & landing pages",
        "Email automation & A/B testing",
        "Brand identity & positioning",
        "Technical SEO audits",
        "Content strategy & calendars",
      ],
    },
    features: {
      title: "Why It Matters",
      items: [
        "ROI-focused ad management",
        "Higher-converting landing pages",
        "Consistent brand messaging",
        "Compounding organic growth",
      ],
    },
    techStack: ["Google Ads", "Meta Ads Manager", "HubSpot", "SEO tooling"],
    whyUs: [
      {
        title: "Weekly reporting",
        description: "Transparent performance reports, not a black box.",
      },
      {
        title: "Full-funnel thinking",
        description:
          "Ads, landing pages, and follow-up work together, not in isolation.",
      },
      {
        title: "Compounding SEO",
        description:
          "Content and technical SEO built for long-term organic growth.",
      },
    ],
    faq: [
      {
        question: "What's the minimum ad budget you recommend?",
        answer:
          "It depends on the market, but most campaigns need a meaningful monthly spend to gather enough data to optimize — we'll size this together during onboarding.",
      },
      {
        question: "How soon will we see results?",
        answer:
          "Paid campaigns show early signal within 2–4 weeks; SEO and content typically compound over 3+ months.",
      },
    ],
  },
];

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return SERVICE_DETAILS.find((service) => service.slug === slug);
}
