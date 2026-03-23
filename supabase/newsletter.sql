-- AIverse Newsletter Subscribers
-- Run this in Supabase SQL Editor: Dashboard → SQL Editor → New query

CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  email      text        NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert" ON public.newsletter_subscribers;
CREATE POLICY "Allow public insert"
  ON public.newsletter_subscribers
  FOR INSERT
  WITH CHECK (true);
