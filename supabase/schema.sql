-- Run this once in Supabase: Dashboard -> SQL Editor -> New query -> paste -> Run.
-- Not executed automatically by the app; this file is documentation of the
-- schema the app code (src/lib/supabase.ts, src/app/api/contact/route.ts,
-- src/app/admin/page.tsx) expects to exist.

create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  company text,
  message text not null
);

create index if not exists contact_submissions_created_at_idx
  on contact_submissions (created_at desc);

-- Row Level Security is enabled by default on new Supabase projects. This
-- app only ever talks to the table via the service_role key (server-side
-- only), which bypasses RLS entirely, so no policies are required here.
alter table contact_submissions enable row level security;
