import "server-only";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

export type ContactSubmission = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
};

function createClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("Missing DATABASE_URL. See .env.example.");
  }
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

// Reuse a single client across dev hot-reloads instead of opening a fresh
// pooled connection on every file change — standard Next.js + Prisma
// pattern to avoid exhausting the database's connection limit.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
const prisma = globalForPrisma.prisma ?? createClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function saveSubmission(input: {
  name: string;
  email: string;
  company: string | null;
  message: string;
}): Promise<void> {
  await prisma.contactSubmission.create({ data: input });
}

export async function getSubmissions(): Promise<ContactSubmission[]> {
  const rows = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return rows.map((row) => ({
    id: row.id,
    created_at: row.createdAt.toISOString(),
    name: row.name,
    email: row.email,
    company: row.company,
    message: row.message,
  }));
}
