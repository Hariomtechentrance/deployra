import type { Metadata } from "next";
import {
  getSubmissions,
  getAppointments,
  getCareerApplications,
  getNewsletterSubscribers,
} from "@/lib/submissions";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { AdminTabs } from "@/components/admin/AdminTabs";

export const metadata: Metadata = {
  title: "Admin | Deployra",
  robots: { index: false, follow: false },
};

// Always read fresh from disk — this is a private, low-traffic admin view,
// not something that should ever serve stale/cached data.
export const dynamic = "force-dynamic";

async function safely<T>(
  fn: () => Promise<T[]>,
): Promise<{ data: T[]; error: string | null }> {
  try {
    return { data: await fn(), error: null };
  } catch (err) {
    return {
      data: [],
      error: err instanceof Error ? err.message : "Failed to load data.",
    };
  }
}

export default async function AdminPage() {
  const [contacts, appointments, applications, subscribers] = await Promise.all(
    [
      safely(getSubmissions),
      safely(getAppointments),
      safely(getCareerApplications),
      safely(getNewsletterSubscribers),
    ],
  );

  const total =
    contacts.data.length +
    appointments.data.length +
    applications.data.length +
    subscribers.data.length;

  return (
    <main className="bg-bg min-h-svh px-6 pt-32 pb-24 sm:px-12">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-eyebrow text-primary font-mono font-medium tracking-[0.3em] uppercase">
              Admin
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-white">
              Dashboard
            </h1>
            <p className="mt-2 text-sm text-white/50">{total} total records</p>
          </div>
          <LogoutButton />
        </div>

        <div className="mt-8">
          <AdminTabs
            contacts={contacts}
            appointments={appointments}
            applications={applications}
            subscribers={subscribers}
          />
        </div>
      </div>
    </main>
  );
}
