import { SignJWT, jwtVerify } from "jose";

export const ADMIN_SESSION_COOKIE = "deployra_admin_session";
const SESSION_DURATION = "8h";

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("Missing SESSION_SECRET. See .env.example.");
  }
  return new TextEncoder().encode(secret);
}

export async function signAdminSession() {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(getSecretKey());
}

export async function verifyAdminSession(token: string | undefined | null) {
  if (!token) return false;
  try {
    await jwtVerify(token, getSecretKey());
    return true;
  } catch {
    return false;
  }
}
