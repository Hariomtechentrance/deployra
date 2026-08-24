"use client";

import { LuPhone, LuMail, LuCalendar } from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa";
import { CONTACT_INFO } from "@/lib/constants/contact";
import { SmartLink } from "@/components/shared/SmartLink";

const whatsappNumber = CONTACT_INFO.phones[0].replace(/\D/g, "");

const buttonClass =
  "border-glass-border bg-glass text-accent flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-transform hover:scale-110 hover:text-white";

export function FloatingContactBar() {
  return (
    <div className="fixed right-5 bottom-5 z-40 flex flex-col gap-3">
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        title="WhatsApp"
        aria-label="Chat on WhatsApp"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
      >
        <FaWhatsapp size={20} />
      </a>
      <SmartLink href="/book-appointment" className={buttonClass}>
        <span title="Book Appointment" aria-label="Book Appointment">
          <LuCalendar size={18} />
        </span>
      </SmartLink>
      <a
        href={`mailto:${CONTACT_INFO.email}`}
        title="Email Us"
        aria-label="Email Us"
        className={buttonClass}
      >
        <LuMail size={18} />
      </a>
      <a
        href={`tel:${whatsappNumber}`}
        title="Call Us"
        aria-label="Call Us"
        className={buttonClass}
      >
        <LuPhone size={18} />
      </a>
    </div>
  );
}
