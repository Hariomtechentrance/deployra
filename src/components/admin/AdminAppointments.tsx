import type { Appointment } from "@/lib/submissions";

const TYPE_LABELS: Record<string, string> = {
  website: "Website Development",
  ai: "AI Solutions",
  marketing: "Growth Marketing",
  general: "General Consultation",
};

export function AdminAppointments({
  appointments,
}: {
  appointments: Appointment[];
}) {
  if (appointments.length === 0) {
    return (
      <p className="border-glass-border bg-glass rounded-xl border px-4 py-6 text-center text-sm text-white/50">
        No appointments booked yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {appointments.map((appointment) => (
        <div
          key={appointment.id}
          className="border-glass-border bg-glass rounded-2xl border p-6 backdrop-blur-md"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-base font-semibold text-white">
              {appointment.firstName} {appointment.lastName}
              {appointment.companyName && (
                <span className="ml-2 font-normal text-white/50">
                  — {appointment.companyName}
                </span>
              )}
            </p>
            <p className="font-mono text-xs text-white/40">
              {new Date(appointment.created_at).toLocaleString()}
            </p>
          </div>
          <div className="mt-2 flex flex-wrap gap-4 text-sm text-white/75">
            <span className="text-accent">
              {TYPE_LABELS[appointment.type] ?? appointment.type}
            </span>
            <span>
              {appointment.date} at {appointment.time}
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-4 text-sm">
            <a
              href={`mailto:${appointment.email}`}
              className="text-accent hover:text-white"
            >
              {appointment.email}
            </a>
            <a
              href={`tel:${appointment.phone}`}
              className="text-accent hover:text-white"
            >
              {appointment.phone}
            </a>
          </div>
          {appointment.notes && (
            <p className="mt-3 text-sm whitespace-pre-wrap text-white/75">
              {appointment.notes}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
