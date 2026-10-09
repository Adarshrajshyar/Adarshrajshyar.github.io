-- ARS starter database schema for PostgreSQL/Supabase.
-- This is a scaffold, not a production-ready permission policy set.
-- Tables have RLS enabled with no user-access policies by default (deny unless policy added).
-- Review, test and migrate in a non-production database before use.

create extension if not exists pgcrypto;

do $$ begin
  create type public.ars_role as enum ('student', 'publisher', 'admin');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.content_status as enum ('draft', 'review', 'published', 'archived');
exception when duplicate_object then null; end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  email text,
  class_level smallint check (class_level between 5 and 12),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.user_roles (
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.ars_role not null default 'student',
  granted_by uuid references auth.users(id),
  granted_at timestamptz not null default now(),
  primary key(user_id, role)
);
create table if not exists public.content_items (
  id uuid primary key default gen_random_uuid(),
  content_type text not null check (content_type in ('education','knowledge','shayari','story','poetry','biography','update','book_chapter')),
  title text not null,
  slug text not null unique,
  body text not null default '',
  class_level smallint check (class_level between 5 and 12),
  category text,
  status public.content_status not null default 'draft',
  created_by uuid references auth.users(id),
  reviewed_by uuid references auth.users(id),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.exams (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  stage text,
  target_classes smallint[] not null default '{}',
  exam_mode text not null default 'online',
  status text not null default 'draft' check (status in ('draft','scheduled','open','closed','evaluating','results_published','cancelled')),
  starts_at timestamptz,
  ends_at timestamptz,
  instructions text not null default '',
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);
create table if not exists public.exam_questions (
  id uuid primary key default gen_random_uuid(),
  exam_id uuid not null references public.exams(id) on delete cascade,
  question_text text not null,
  options jsonb not null,
  answer_key jsonb,
  explanation text,
  marks numeric(7,2) not null default 1,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);
create table if not exists public.exam_attempts (
  id uuid primary key default gen_random_uuid(),
  exam_id uuid not null references public.exams(id) on delete restrict,
  student_id uuid not null references auth.users(id) on delete restrict,
  status text not null default 'started' check(status in ('started','submitted','evaluated','voided')),
  started_at timestamptz not null default now(),
  submitted_at timestamptz,
  unique(exam_id, student_id)
);
create table if not exists public.attempt_answers (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references public.exam_attempts(id) on delete cascade,
  question_id uuid not null references public.exam_questions(id) on delete restrict,
  answer jsonb,
  saved_at timestamptz not null default now(),
  unique(attempt_id, question_id)
);
create table if not exists public.exam_results (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null unique references public.exam_attempts(id) on delete restrict,
  student_id uuid not null references auth.users(id) on delete restrict,
  score numeric(9,2),
  max_score numeric(9,2),
  status text not null default 'pending' check(status in ('pending','review','published','withheld','corrected')),
  published_at timestamptz,
  reviewed_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);
create table if not exists public.join_applications (
  id uuid primary key default gen_random_uuid(),
  applicant_id uuid references auth.users(id) on delete set null,
  reference_code text not null unique,
  requested_role text not null,
  statement text,
  status text not null default 'pending' check(status in ('pending','approved','rejected','withdrawn')),
  reviewer_id uuid references auth.users(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);
create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  certificate_code text not null unique,
  certificate_type text not null check(certificate_type in ('joining','participation','achievement','merit')),
  recipient_id uuid references auth.users(id) on delete set null,
  related_result_id uuid references public.exam_results(id) on delete set null,
  status text not null default 'draft' check(status in ('draft','valid','revoked','cancelled')),
  issued_by uuid references auth.users(id),
  issued_at timestamptz,
  revoked_at timestamptz,
  revoke_reason text
);
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  reply_email text,
  topic text,
  message text not null,
  status text not null default 'new' check(status in ('new','in_review','replied','closed')),
  created_at timestamptz not null default now()
);
create table if not exists public.sponsors (
  id uuid primary key default gen_random_uuid(),
  organisation_name text not null,
  public_display_name text,
  website_url text,
  permission_to_display boolean not null default false,
  status text not null default 'prospect' check(status in ('prospect','contacted','approved','active','ended')),
  created_at timestamptz not null default now()
);
create table if not exists public.audit_logs (
  id bigint generated always as identity primary key,
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  details jsonb not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.content_items enable row level security;
alter table public.exams enable row level security;
alter table public.exam_questions enable row level security;
alter table public.exam_attempts enable row level security;
alter table public.attempt_answers enable row level security;
alter table public.exam_results enable row level security;
alter table public.join_applications enable row level security;
alter table public.certificates enable row level security;
alter table public.contact_messages enable row level security;
alter table public.sponsors enable row level security;
alter table public.audit_logs enable row level security;

-- TODO before live use:
-- 1) Add/test restrictive RLS policies for each role and record owner.
-- 2) Ensure role grants can only be performed by a trusted server/admin process.
-- 3) Keep answer_key inaccessible to students before submission/closure.
-- 4) Add server-side transactions and idempotency for submissions/certificates.
-- 5) Review retention, backups, minors' consent, export/deletion and audit access.
