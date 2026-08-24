import type { MetadataRoute } from "next";
import { SERVICE_DETAILS } from "@/lib/constants/serviceDetails";

// Set NEXT_PUBLIC_SITE_URL in production to your real domain once one is
// live — this placeholder only matters for building absolute URLs below.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

const STATIC_ROUTES = [
  "",
  "/services",
  "/about",
  "/case-studies",
  "/careers",
  "/book-appointment",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));

  const serviceEntries = SERVICE_DETAILS.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified: new Date(),
  }));

  return [...staticEntries, ...serviceEntries];
}
