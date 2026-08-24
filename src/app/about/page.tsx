import type { Metadata } from "next";
import { AboutDetail } from "@/components/about/AboutDetail";

export const metadata: Metadata = {
  title: "About | Deployra",
  description:
    "Deployra Private Limited helps businesses grow using AI automation and modern technology — our mission, values, and track record.",
};

export default function AboutPage() {
  return <AboutDetail />;
}
