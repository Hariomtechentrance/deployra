import type { ContactSubmission } from "@/lib/submissions";

export function AdminContacts({
  submissions,
}: {
  submissions: ContactSubmission[];
}) {
  if (submissions.length === 0) {
    return (
      <p className="border-glass-border bg-glass rounded-xl border px-4 py-6 text-center text-sm text-white/50">
        No submissions yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
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
  );
}
