-- AIverse Database Schema
-- Run this in your Supabase SQL editor

-- Create the ai_tools table
CREATE TABLE IF NOT EXISTS public.ai_tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  long_description text NOT NULL DEFAULT '',
  category text NOT NULL,
  tags text[] NOT NULL DEFAULT '{}',
  pricing_model text NOT NULL CHECK (pricing_model IN ('Free', 'Freemium', 'Paid', 'Open Source', 'Enterprise')),
  price_starting numeric,
  website_url text NOT NULL,
  logo_url text NOT NULL DEFAULT '',
  founded_year integer,
  company text NOT NULL DEFAULT '',
  is_featured boolean NOT NULL DEFAULT false,
  upvotes integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.ai_tools ENABLE ROW LEVEL SECURITY;

-- Public read policy
CREATE POLICY "Allow public read" ON public.ai_tools
  FOR SELECT USING (true);

-- Create RPC function for incrementing upvotes (accessible without auth)
CREATE OR REPLACE FUNCTION public.increment_upvote(tool_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.ai_tools
  SET upvotes = upvotes + 1
  WHERE id = tool_id;
END;
$$;

-- Grant execute to anonymous users
GRANT EXECUTE ON FUNCTION public.increment_upvote(uuid) TO anon;

-- Add geographic columns for Globe 3D
ALTER TABLE public.ai_tools
  ADD COLUMN IF NOT EXISTS country_code text NOT NULL DEFAULT 'US',
  ADD COLUMN IF NOT EXISTS lat numeric NOT NULL DEFAULT 37.77,
  ADD COLUMN IF NOT EXISTS lng numeric NOT NULL DEFAULT -122.41;

-- Create index for search performance
CREATE INDEX IF NOT EXISTS ai_tools_name_idx ON public.ai_tools USING gin(to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS ai_tools_description_idx ON public.ai_tools USING gin(to_tsvector('english', description));
CREATE INDEX IF NOT EXISTS ai_tools_category_idx ON public.ai_tools (category);
CREATE INDEX IF NOT EXISTS ai_tools_pricing_model_idx ON public.ai_tools (pricing_model);
CREATE INDEX IF NOT EXISTS ai_tools_upvotes_idx ON public.ai_tools (upvotes DESC);
CREATE INDEX IF NOT EXISTS ai_tools_created_at_idx ON public.ai_tools (created_at DESC);
CREATE INDEX IF NOT EXISTS ai_tools_tags_idx ON public.ai_tools USING gin(tags);
