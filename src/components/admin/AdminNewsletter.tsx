import type { NewsletterSubscriber } from "@/lib/submissions";

export function AdminNewsletter({
  subscribers,
}: {
  subscribers: NewsletterSubscriber[];
}) {
  if (subscribers.length === 0) {
    return (
      <p className="border-glass-border bg-glass rounded-xl border px-4 py-6 text-center text-sm text-white/50">
        No subscribers yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {subscribers.map((subscriber) => (
        <div
          key={subscriber.id}
          className="border-glass-border bg-glass flex flex-wrap items-center justify-between gap-2 rounded-xl border px-5 py-4 backdrop-blur-md"
        >
          <div>
            <a
              href={`mailto:${subscriber.email}`}
              className="text-accent text-sm hover:text-white"
            >
              {subscriber.email}
            </a>
            {subscriber.name && (
              <span className="ml-2 text-sm text-white/50">
                — {subscriber.name}
              </span>
            )}
          </div>
          <p className="font-mono text-xs text-white/40">
            {new Date(subscriber.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
