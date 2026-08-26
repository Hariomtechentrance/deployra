import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, signAdminSession } from "@/lib/auth";
import { getClientIp, rateLimit } from "@/lib/rateLimit";

function timingSafeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export async function POST(request: Request) {
  if (!rateLimit(`admin-login:${getClientIp(request)}`, 5, 15 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again later." },
      { status: 429 },
    );
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json(
      { error: "Admin login is not configured." },
      { status: 500 },
    );
  }

  let password: string | undefined;
  try {
    ({ password } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!password || !timingSafeEqual(password, adminPassword)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  let token: string;
  try {
    token = await signAdminSession();
  } catch (err) {
    console.error("Admin session signing error:", err);
    return NextResponse.json(
      { error: "Admin login is not configured." },
      { status: 500 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours, matches signAdminSession's expiry
  });
  return response;
}
