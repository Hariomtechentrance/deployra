"use client";

import { useState } from "react";
import { LuDownload } from "react-icons/lu";
import { cn } from "@/lib/utils/cn";
import { downloadCsv } from "@/lib/utils/csv";
import type {
  ContactSubmission,
  Appointment,
  CareerApplication,
  NewsletterSubscriber,
} from "@/lib/submissions";
import { AdminContacts } from "@/components/admin/AdminContacts";
import { AdminAppointments } from "@/components/admin/AdminAppointments";
import { AdminCareerApplications } from "@/components/admin/AdminCareerApplications";
import { AdminNewsletter } from "@/components/admin/AdminNewsletter";

type Props = {
  contacts: { data: ContactSubmission[]; error: string | null };
  appointments: { data: Appointment[]; error: string | null };
  applications: { data: CareerApplication[]; error: string | null };
  subscribers: { data: NewsletterSubscriber[]; error: string | null };
};

export function AdminTabs({
  contacts,
  appointments,
  applications,
  subscribers,
}: Props) {
  const tabs = [
    { key: "contacts", label: "Contacts", count: contacts.data.length },
    {
      key: "appointments",
      label: "Appointments",
      count: appointments.data.length,
    },
    {
      key: "applications",
      label: "Career Applications",
      count: applications.data.length,
    },
    { key: "newsletter", label: "Newsletter", count: subscribers.data.length },
  ] as const;

  const [active, setActive] =
    useState<(typeof tabs)[number]["key"]>("contacts");

  const errorsByTab = {
    contacts: contacts.error,
    appointments: appointments.error,
    applications: applications.error,
    newsletter: subscribers.error,
  };
  const activeError = errorsByTab[active];

  const dataByTab: Record<(typeof tabs)[number]["key"], Record<string, unknown>[]> = {
    contacts: contacts.data,
    appointments: appointments.data,
    applications: applications.data,
    newsletter: subscribers.data,
  };
  const activeData = dataByTab[active];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-glass-border pb-4">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActive(tab.key)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active === tab.key
                  ? "bg-primary text-black"
                  : "border-glass-border bg-glass border text-white/70 hover:text-white",
              )}
            >
              {tab.label} · {tab.count}
            </button>
          ))}
        </div>
        <button
          type="button"
          disabled={activeData.length === 0}
          onClick={() =>
            downloadCsv(`deployra-${active}-${new Date().toISOString().slice(0, 10)}.csv`, activeData)
          }
          className="border-glass-border bg-glass flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium text-white/70 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          <LuDownload size={14} />
          Export CSV
        </button>
      </div>

      <div className="mt-8">
        {activeError && (
          <p className="border-glass-border bg-glass mb-6 rounded-xl border px-4 py-3 text-sm text-red-400">
            Couldn&apos;t load data: {activeError}
          </p>
        )}

        {active === "contacts" && <AdminContacts submissions={contacts.data} />}
        {active === "appointments" && (
          <AdminAppointments appointments={appointments.data} />
        )}
        {active === "applications" && (
          <AdminCareerApplications applications={applications.data} />
        )}
        {active === "newsletter" && (
          <AdminNewsletter subscribers={subscribers.data} />
        )}
      </div>
    </div>
  );
}
