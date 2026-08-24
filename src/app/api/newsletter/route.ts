import { NextResponse } from "next/server";
import { saveNewsletterSubscriber } from "@/lib/submissions";
import { getClientIp, rateLimit } from "@/lib/rateLimit";

type NewsletterPayload = {
  email?: string;
  name?: string;
  // Honeypot — see src/app/api/contact/route.ts for why this exists.
  website?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  if (!rateLimit(`newsletter:${getClientIp(request)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let body: NewsletterPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const { email, name, website } = body;

  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!email?.trim() || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  try {
    const { alreadySubscribed } = await saveNewsletterSubscriber({
      email: email.trim(),
      name: name?.trim() || null,
    });

    return NextResponse.json({ ok: true, alreadySubscribed });
  } catch (err) {
    console.error("Newsletter subscription error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
