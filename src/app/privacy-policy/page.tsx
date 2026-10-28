import type { Metadata } from "next";
import { PrivacyPolicyDetail } from "@/components/legal/PrivacyPolicyDetail";

export const metadata: Metadata = {
  title: "Privacy Policy | Deployra",
  description:
    "How Deployra Private Limited collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyDetail />;
}
