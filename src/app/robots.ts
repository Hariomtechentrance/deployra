import type { MetadataRoute } from "next";

// Set NEXT_PUBLIC_SITE_URL in production to your real domain once one is
// live — this placeholder only matters for the absolute sitemap URL below.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
