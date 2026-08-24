import type { Metadata } from "next";
import { CaseStudiesDetail } from "@/components/case-studies/CaseStudiesDetail";

export const metadata: Metadata = {
  title: "Case Studies | Deployra",
  description:
    "Real outcomes from AI automation, websites, and growth systems — see what's realistic for your business.",
};

export default function CaseStudiesPage() {
  return <CaseStudiesDetail />;
}
