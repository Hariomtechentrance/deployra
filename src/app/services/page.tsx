import type { Metadata } from "next";
import { ServicesDetail } from "@/components/services/ServicesDetail";

export const metadata: Metadata = {
  title: "Services | Deployra",
  description:
    "AI agent development, web and mobile apps, enterprise software, cloud infrastructure, and UI/UX — what Deployra builds and how.",
};

export default function ServicesPage() {
  return <ServicesDetail />;
}
