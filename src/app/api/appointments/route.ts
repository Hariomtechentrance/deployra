import { NextResponse } from "next/server";
import { saveAppointment } from "@/lib/submissions";
import { getClientIp, rateLimit } from "@/lib/rateLimit";

type AppointmentPayload = {
  type?: string;
  date?: string;
  time?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  notes?: string;
  // Honeypot — see src/app/api/contact/route.ts for why this exists.
  website?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_TYPES = ["website", "ai", "marketing", "general"];

export async function POST(request: Request) {
  if (!rateLimit(`appointments:${getClientIp(request)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let body: AppointmentPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const {
    type,
    date,
    time,
    firstName,
    lastName,
    email,
    phone,
    companyName,
    notes,
    website,
  } = body;

  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (
    !type?.trim() ||
    !VALID_TYPES.includes(type.trim()) ||
    !date?.trim() ||
    !time?.trim() ||
    !firstName?.trim() ||
    !lastName?.trim() ||
    !email?.trim() ||
    !phone?.trim()
  ) {
    return NextResponse.json(
      {
        error:
          "Please fill in the appointment type, date, time, and contact details.",
      },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email.trim())) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  try {
    await saveAppointment({
      type: type.trim(),
      date: date.trim(),
      time: time.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      companyName: companyName?.trim() || null,
      notes: notes?.trim() || null,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Appointment submission error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
