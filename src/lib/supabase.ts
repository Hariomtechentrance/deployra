import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the service_role key — bypasses RLS,
 * so this must never be imported from client components or exposed to the
 * browser. Every call site in this app (the /api/contact write, the
 * /admin read) runs server-side only.
 */
export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. See .env.example.",
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

export type ContactSubmission = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
};
