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

export type Appointment = {
  id: string;
  created_at: string;
  type: string;
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string | null;
  notes: string | null;
};

export async function saveAppointment(input: {
  type: string;
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string | null;
  notes: string | null;
}): Promise<void> {
  await prisma.appointment.create({ data: input });
}

export async function getAppointments(): Promise<Appointment[]> {
  const rows = await prisma.appointment.findMany({
    orderBy: { createdAt: "desc" },
  });

  return rows.map((row) => ({
    id: row.id,
    created_at: row.createdAt.toISOString(),
    type: row.type,
    date: row.date,
    time: row.time,
    firstName: row.firstName,
    lastName: row.lastName,
    email: row.email,
    phone: row.phone,
    companyName: row.companyName,
    notes: row.notes,
  }));
}

export type CareerApplication = {
  id: string;
  created_at: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentPosition: string;
  experienceLevel: string;
  position: string;
  location: string;
  portfolioUrl: string | null;
  coverLetter: string | null;
  availability: string;
  expectedSalary: string | null;
  hasResume: boolean;
};

export async function saveCareerApplication(input: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentPosition: string;
  experienceLevel: string;
  position: string;
  location: string;
  portfolioUrl: string | null;
  coverLetter: string | null;
  availability: string;
  expectedSalary: string | null;
  resumeFileName: string | null;
  resumeMimeType: string | null;
  resumeData: Buffer | null;
}): Promise<void> {
  const { resumeData, ...rest } = input;
  await prisma.careerApplication.create({
    data: {
      ...rest,
      resumeData: resumeData ? new Uint8Array(resumeData) : null,
    },
  });
}

export async function getCareerApplications(): Promise<CareerApplication[]> {
  const rows = await prisma.careerApplication.findMany({
    orderBy: { createdAt: "desc" },
    omit: { resumeData: true },
  });

  return rows.map((row) => ({
    id: row.id,
    created_at: row.createdAt.toISOString(),
    firstName: row.firstName,
    lastName: row.lastName,
    email: row.email,
    phone: row.phone,
    currentPosition: row.currentPosition,
    experienceLevel: row.experienceLevel,
    position: row.position,
    location: row.location,
    portfolioUrl: row.portfolioUrl,
    coverLetter: row.coverLetter,
    availability: row.availability,
    expectedSalary: row.expectedSalary,
    hasResume: row.resumeFileName != null,
  }));
}

export async function getResumeById(id: string): Promise<{
  fileName: string;
  mimeType: string;
  data: Buffer;
} | null> {
  const row = await prisma.careerApplication.findUnique({
    where: { id },
    select: { resumeFileName: true, resumeMimeType: true, resumeData: true },
  });

  if (!row?.resumeData || !row.resumeFileName || !row.resumeMimeType) {
    return null;
  }

  return {
    fileName: row.resumeFileName,
    mimeType: row.resumeMimeType,
    data: Buffer.from(row.resumeData),
  };
}

export type NewsletterSubscriber = {
  id: string;
  created_at: string;
  email: string;
  name: string | null;
};

export async function saveNewsletterSubscriber(input: {
  email: string;
  name: string | null;
}): Promise<{ alreadySubscribed: boolean }> {
  try {
    await prisma.newsletterSubscriber.create({ data: input });
    return { alreadySubscribed: false };
  } catch (err) {
    const isUniqueViolation =
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code?: string }).code === "P2002";
    if (isUniqueViolation) {
      return { alreadySubscribed: true };
    }
    throw err;
  }
}

export async function getNewsletterSubscribers(): Promise<
  NewsletterSubscriber[]
> {
  const rows = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  return rows.map((row) => ({
    id: row.id,
    created_at: row.createdAt.toISOString(),
    email: row.email,
    name: row.name,
  }));
}
