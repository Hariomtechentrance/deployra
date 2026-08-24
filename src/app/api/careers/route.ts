import { NextResponse } from "next/server";
import { saveCareerApplication } from "@/lib/submissions";
import { getClientIp, rateLimit } from "@/lib/rateLimit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function textField(formData: FormData, key: string): string | null {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : null;
}

export async function POST(request: Request) {
  if (!rateLimit(`careers:${getClientIp(request)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  // Honeypot — see src/app/api/contact/route.ts for why this exists.
  if (textField(formData, "website")) {
    return NextResponse.json({ ok: true });
  }

  const firstName = textField(formData, "first_name");
  const lastName = textField(formData, "last_name");
  const email = textField(formData, "email");
  const phone = textField(formData, "phone");
  const currentPosition = textField(formData, "current_position");
  const experienceLevel = textField(formData, "experience_level");
  const position = textField(formData, "position");
  const location = textField(formData, "location");
  const portfolioUrl = textField(formData, "portfolio_url");
  const coverLetter = textField(formData, "cover_letter");
  const availability = textField(formData, "availability");
  const expectedSalary = textField(formData, "expected_salary");

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !currentPosition ||
    !experienceLevel ||
    !position ||
    !location ||
    !availability
  ) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  let resumeFileName: string | null = null;
  let resumeMimeType: string | null = null;
  let resumeData: Buffer | null = null;

  const resumeEntry = formData.get("resume");
  if (resumeEntry instanceof File && resumeEntry.size > 0) {
    if (resumeEntry.size > MAX_RESUME_BYTES) {
      return NextResponse.json(
        { error: "Resume must be smaller than 5MB." },
        { status: 400 },
      );
    }
    if (!ALLOWED_RESUME_TYPES.includes(resumeEntry.type)) {
      return NextResponse.json(
        { error: "Resume must be a PDF, DOC, or DOCX file." },
        { status: 400 },
      );
    }
    resumeFileName = resumeEntry.name;
    resumeMimeType = resumeEntry.type;
    resumeData = Buffer.from(await resumeEntry.arrayBuffer());
  }

  try {
    await saveCareerApplication({
      firstName,
      lastName,
      email,
      phone,
      currentPosition,
      experienceLevel,
      position,
      location,
      portfolioUrl,
      coverLetter,
      availability,
      expectedSalary,
      resumeFileName,
      resumeMimeType,
      resumeData,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Career application submission error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
