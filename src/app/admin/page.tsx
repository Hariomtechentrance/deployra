import type { Metadata } from "next";
import { getSupabaseAdmin, type ContactSubmission } from "@/lib/supabase";
import { LogoutButton } from "@/components/admin/LogoutButton";

export const metadata: Metadata = {
  title: "Admin | Deployra",
  robots: { index: false, follow: false },
};

// Always hit Supabase fresh — this is a private, low-traffic admin view,
// not something that should ever serve stale/cached data.
export const dynamic = "force-dynamic";

async function getSubmissions(): Promise<{
  submissions: ContactSubmission[];
  error: string | null;
}> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return { submissions: [], error: error.message };
    return { submissions: data ?? [], error: null };
  } catch (err) {
    return {
      submissions: [],
      error: err instanceof Error ? err.message : "Failed to load submissions.",
    };
  }
}

export default async function AdminPage() {
  const { submissions, error } = await getSubmissions();

  return (
    <main className="bg-bg min-h-svh px-6 pt-32 pb-24 sm:px-12">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-eyebrow text-primary font-mono font-medium tracking-[0.3em] uppercase">
              Admin
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-white">
              Contact Submissions
            </h1>
            <p className="mt-2 text-sm text-white/50">
              {submissions.length} total
            </p>
          </div>
          <LogoutButton />
        </div>

        {error && (
          <p className="border-glass-border bg-glass mt-8 rounded-xl border px-4 py-3 text-sm text-red-400">
            Couldn&apos;t load submissions: {error}
          </p>
        )}

        {!error && submissions.length === 0 && (
          <p className="border-glass-border bg-glass mt-8 rounded-xl border px-4 py-6 text-center text-sm text-white/50">
            No submissions yet.
          </p>
        )}

        <div className="mt-8 flex flex-col gap-4">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className="border-glass-border bg-glass rounded-2xl border p-6 backdrop-blur-md"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-base font-semibold text-white">
                  {submission.name}
                  {submission.company && (
                    <span className="ml-2 font-normal text-white/50">
                      — {submission.company}
                    </span>
                  )}
                </p>
                <p className="font-mono text-xs text-white/40">
                  {new Date(submission.created_at).toLocaleString()}
                </p>
              </div>
              <a
                href={`mailto:${submission.email}`}
                className="text-accent mt-1 inline-block text-sm hover:text-white"
              >
                {submission.email}
              </a>
              <p className="mt-3 text-sm whitespace-pre-wrap text-white/75">
                {submission.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
