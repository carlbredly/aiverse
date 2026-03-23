-- AIverse — Tool Submissions + Admin RLS
-- Run in Supabase SQL Editor after tool-detail.sql

-- ── 1. Tool submissions table ────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.tool_submissions (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name            text        NOT NULL,
  description     text        NOT NULL,
  category        text        NOT NULL,
  pricing_model   text        NOT NULL,
  website_url     text        NOT NULL,
  logo_url        text        NOT NULL DEFAULT '',
  company         text        NOT NULL DEFAULT '',
  founded_year    integer,
  tags            text[]      NOT NULL DEFAULT '{}',
  submitter_email text        NOT NULL DEFAULT '',
  notes           text        NOT NULL DEFAULT '',
  status          text        NOT NULL DEFAULT 'pending'
                              CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.tool_submissions ENABLE ROW LEVEL SECURITY;

-- Public can insert (submit a tool)
DROP POLICY IF EXISTS "Allow public insert submissions" ON public.tool_submissions;
CREATE POLICY "Allow public insert submissions"
  ON public.tool_submissions FOR INSERT WITH CHECK (true);

-- Only authenticated users (admin) can read and update
DROP POLICY IF EXISTS "Allow auth read submissions" ON public.tool_submissions;
CREATE POLICY "Allow auth read submissions"
  ON public.tool_submissions FOR SELECT
  USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow auth update submissions" ON public.tool_submissions;
CREATE POLICY "Allow auth update submissions"
  ON public.tool_submissions FOR UPDATE
  USING (auth.role() = 'authenticated');

-- ── 2. Admin RLS policies for ai_tools ──────────────────────────────────────

DROP POLICY IF EXISTS "Allow auth insert tools" ON public.ai_tools;
CREATE POLICY "Allow auth insert tools"
  ON public.ai_tools FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow auth update tools" ON public.ai_tools;
CREATE POLICY "Allow auth update tools"
  ON public.ai_tools FOR UPDATE
  USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow auth delete tools" ON public.ai_tools;
CREATE POLICY "Allow auth delete tools"
  ON public.ai_tools FOR DELETE
  USING (auth.role() = 'authenticated');

-- ── 3. Admin read for newsletter subscribers ─────────────────────────────────

DROP POLICY IF EXISTS "Allow auth read newsletter" ON public.newsletter_subscribers;
CREATE POLICY "Allow auth read newsletter"
  ON public.newsletter_subscribers FOR SELECT
  USING (auth.role() = 'authenticated');
