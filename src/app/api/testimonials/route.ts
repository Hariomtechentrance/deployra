import { NextResponse } from "next/server";
import {
  getPublicTestimonials,
  saveTestimonial,
} from "@/lib/submissions";
import { getClientIp, rateLimit } from "@/lib/rateLimit";

type TestimonialPayload = {
  name?: string;
  role?: string;
  email?: string;
  rating?: number;
  quote?: string;
  // Honeypot: real visitors never see or fill this field (hidden via CSS).
  // Bots that blindly fill every input will populate it.
  website?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LEN = 80;
const MAX_ROLE_LEN = 100;
const MAX_QUOTE_LEN = 600;

export async function GET() {
  try {
    const testimonials = await getPublicTestimonials();
    return NextResponse.json({ testimonials });
  } catch (err) {
    console.error("Testimonials list error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  // Stricter than contact/careers: this goes live instantly with no
  // review step, so spam gets published immediately if it gets through.
  if (!rateLimit(`testimonial:${getClientIp(request)}`, 3, 30 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let body: TestimonialPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const { name, role, email, rating, quote, website } = body;

  // Honeypot tripped: pretend success so the bot doesn't learn anything,
  // but skip the actual insert.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!name?.trim() || !quote?.trim()) {
    return NextResponse.json(
      { error: "Name and feedback are required." },
      { status: 400 },
    );
  }
  if (name.trim().length > MAX_NAME_LEN) {
    return NextResponse.json({ error: "Name is too long." }, { status: 400 });
  }
  if (role && role.trim().length > MAX_ROLE_LEN) {
    return NextResponse.json(
      { error: "Role/company is too long." },
      { status: 400 },
    );
  }
  if (quote.trim().length > MAX_QUOTE_LEN) {
    return NextResponse.json(
      { error: "Feedback is too long — keep it under 600 characters." },
      { status: 400 },
    );
  }
  if (!Number.isInteger(rating) || rating! < 1 || rating! > 5) {
    return NextResponse.json(
      { error: "Rating must be between 1 and 5." },
      { status: 400 },
    );
  }
  if (email && !EMAIL_RE.test(email.trim())) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  try {
    const testimonial = await saveTestimonial({
      name: name.trim(),
      role: role?.trim() || null,
      email: email?.trim() || null,
      rating: rating!,
      quote: quote.trim(),
    });

    return NextResponse.json({ ok: true, testimonial });
  } catch (err) {
    console.error("Testimonial submission error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
