import { NextResponse } from "next/server";
import { saveSubmission } from "@/lib/submissions";
import { getClientIp, rateLimit } from "@/lib/rateLimit";

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  // Honeypot: real visitors never see or fill this field (hidden via CSS).
  // Bots that blindly fill every input will populate it.
  website?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  if (!rateLimit(`contact:${getClientIp(request)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, company, message, website } = body;

  // Honeypot tripped: pretend success so the bot doesn't learn anything,
  // but skip the actual insert.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  try {
    await saveSubmission({
      name: name.trim(),
      email: email.trim(),
      company: company?.trim() || null,
      message: message.trim(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form submission error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
