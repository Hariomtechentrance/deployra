import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

/**
 * File-based storage for contact submissions — a temporary stand-in until
 * a real database is wired up. `saveSubmission`/`getSubmissions` are the
 * only two functions the rest of the app touches; swapping this file for a
 * DB-backed implementation later shouldn't require changes anywhere else.
 *
 * Known limitation: this writes to the local filesystem, which is fine for
 * local dev but does NOT persist reliably on serverless hosts like Vercel
 * (read-only/ephemeral filesystem in production). Fine for now since a
 * real database is the intended next step, not a permanent choice.
 */

export type ContactSubmission = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "contact-submissions.json");

async function readAll(): Promise<ContactSubmission[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as ContactSubmission[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

async function writeAll(submissions: ContactSubmission[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(submissions, null, 2), "utf-8");
}

export async function saveSubmission(input: {
  name: string;
  email: string;
  company: string | null;
  message: string;
}): Promise<void> {
  const submissions = await readAll();
  submissions.push({
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    ...input,
  });
  await writeAll(submissions);
}

export async function getSubmissions(): Promise<ContactSubmission[]> {
  const submissions = await readAll();
  return submissions.sort((a, b) => b.created_at.localeCompare(a.created_at));
}
