import type { Metadata } from "next";
import { CareersDetail } from "@/components/careers/CareersDetail";

export const metadata: Metadata = {
  title: "Careers | Deployra",
  description:
    "Join Deployra Private Limited — apply for open roles in engineering, design, AI, and growth marketing.",
};

export default function CareersPage() {
  return <CareersDetail />;
}
