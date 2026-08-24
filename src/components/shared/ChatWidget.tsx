"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { LuMessageCircle, LuX } from "react-icons/lu";
import { CONTACT_INFO } from "@/lib/constants/contact";

const whatsappNumber = CONTACT_INFO.phones[0].replace(/\D/g, "");

const QUICK_REPLIES: { label: string; href: string; external?: boolean }[] = [
  { label: "💰 See Pricing", href: "/#pricing" },
  { label: "🛠️ Our Services", href: "/services" },
  { label: "📅 Book a Free Call", href: "/book-appointment" },
  {
    label: "💬 Talk to Us on WhatsApp",
    href: `https://wa.me/${whatsappNumber}`,
    external: true,
  },
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSelect = (reply: (typeof QUICK_REPLIES)[number]) => {
    if (reply.external) {
      window.open(reply.href, "_blank", "noopener,noreferrer");
    } else {
      router.push(reply.href);
    }
    setOpen(false);
  };

  return (
    <div className="fixed bottom-5 left-5 z-40">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="border-glass-border bg-bg/95 absolute bottom-14 left-0 w-72 rounded-2xl border shadow-2xl backdrop-blur-md"
          >
            <div className="border-glass-border flex items-center justify-between border-b px-4 py-3">
              <p className="text-sm font-semibold text-white">Hi there 👋</p>
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setOpen(false)}
                className="text-white/50 hover:text-white"
              >
                <LuX size={16} />
              </button>
            </div>
            <div className="px-4 py-3">
              <p className="text-sm text-white/60">
                What can we help you with today?
              </p>
              <div className="mt-3 flex flex-col gap-2">
                {QUICK_REPLIES.map((reply) => (
                  <button
                    key={reply.label}
                    type="button"
                    onClick={() => handleSelect(reply)}
                    className="border-glass-border bg-glass rounded-xl border px-3 py-2.5 text-left text-sm text-white/80 transition-colors hover:border-white/25 hover:text-white"
                  >
                    {reply.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        aria-label={open ? "Close chat" : "Open chat"}
        onClick={() => setOpen((v) => !v)}
        className="bg-primary hover:bg-primary/90 flex h-12 w-12 items-center justify-center rounded-full text-black shadow-lg transition-transform hover:scale-110"
      >
        {open ? <LuX size={20} /> : <LuMessageCircle size={20} />}
      </button>
    </div>
  );
}
