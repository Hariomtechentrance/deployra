import { LuDownload } from "react-icons/lu";
import type { CareerApplication } from "@/lib/submissions";

export function AdminCareerApplications({
  applications,
}: {
  applications: CareerApplication[];
}) {
  if (applications.length === 0) {
    return (
      <p className="border-glass-border bg-glass rounded-xl border px-4 py-6 text-center text-sm text-white/50">
        No applications yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {applications.map((application) => (
        <div
          key={application.id}
          className="border-glass-border bg-glass rounded-2xl border p-6 backdrop-blur-md"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-base font-semibold text-white">
              {application.firstName} {application.lastName}
              <span className="ml-2 font-normal text-white/50">
                — {application.position}
              </span>
            </p>
            <p className="font-mono text-xs text-white/40">
              {new Date(application.created_at).toLocaleString()}
            </p>
          </div>
          <div className="mt-2 flex flex-wrap gap-4 text-sm">
            <a
              href={`mailto:${application.email}`}
              className="text-accent hover:text-white"
            >
              {application.email}
            </a>
            <a
              href={`tel:${application.phone}`}
              className="text-accent hover:text-white"
            >
              {application.phone}
            </a>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/60">
            <span>Experience: {application.experienceLevel}</span>
            <span>Location: {application.location}</span>
            <span>Availability: {application.availability}</span>
            {application.expectedSalary && (
              <span>Expected: {application.expectedSalary}</span>
            )}
          </div>
          {application.portfolioUrl && (
            <a
              href={application.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent mt-2 inline-block text-sm hover:text-white"
            >
              {application.portfolioUrl}
            </a>
          )}
          {application.coverLetter && (
            <p className="mt-3 text-sm whitespace-pre-wrap text-white/75">
              {application.coverLetter}
            </p>
          )}
          {application.hasResume && (
            <a
              href={`/api/admin/resume/${application.id}`}
              className="border-glass-border bg-bg text-accent mt-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium hover:text-white"
            >
              <LuDownload size={14} />
              Download Resume
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
