import type { Metadata } from "next";
import { getSubmissions as loadSubmissions } from "@/lib/submissions";
import { LogoutButton } from "@/components/admin/LogoutButton";
import type { ContactSubmission } from "@/lib/submissions";

export const metadata: Metadata = {
  title: "Admin | Deployra",
  robots: { index: false, follow: false },
};

// Always read fresh from disk — this is a private, low-traffic admin view,
// not something that should ever serve stale/cached data.
export const dynamic = "force-dynamic";

async function getSubmissionsSafely(): Promise<{
  submissions: ContactSubmission[];
  error: string | null;
}> {
  try {
    const submissions = await loadSubmissions();
    return { submissions, error: null };
  } catch (err) {
    return {
      submissions: [],
      error: err instanceof Error ? err.message : "Failed to load submissions.",
    };
  }
}

export default async function AdminPage() {
  const { submissions, error } = await getSubmissionsSafely();

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
