import type { Metadata } from "next";
import { ContactDetail } from "@/components/contact/ContactDetail";

export const metadata: Metadata = {
  title: "Contact | Deployra",
  description:
    "Get in touch with Deployra Private Limited — email, phone, and our Nashik head office and Bengaluru branch office.",
};

export default function ContactPage() {
  return <ContactDetail />;
}
