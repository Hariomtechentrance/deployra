import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// This project's convention is .env.local (Next.js style), not the plain
// .env that dotenv/config loads by default.
config({ path: ".env.local" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
