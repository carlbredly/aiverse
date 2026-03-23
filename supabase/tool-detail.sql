-- AIverse — Tool Detail: slug column + auto-trigger
-- Run in Supabase SQL Editor: Dashboard → SQL Editor → New query

-- 1. Add slug column
ALTER TABLE public.ai_tools
  ADD COLUMN IF NOT EXISTS slug text;

-- 2. Populate slugs for all existing tools
UPDATE public.ai_tools
SET slug = lower(
  regexp_replace(
    regexp_replace(name, '[^a-zA-Z0-9\s]', '', 'g'),
    '\s+', '-', 'g'
  )
)
WHERE slug IS NULL OR slug = '';

-- 3. Index for fast lookups
CREATE INDEX IF NOT EXISTS ai_tools_slug_idx ON public.ai_tools (slug);

-- 4. Function to auto-generate slug on INSERT
CREATE OR REPLACE FUNCTION generate_tool_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := lower(
      regexp_replace(
        regexp_replace(NEW.name, '[^a-zA-Z0-9\s]', '', 'g'),
        '\s+', '-', 'g'
      )
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tool_slug_trigger ON public.ai_tools;
CREATE TRIGGER tool_slug_trigger
  BEFORE INSERT ON public.ai_tools
  FOR EACH ROW EXECUTE FUNCTION generate_tool_slug();

-- 5. click_count column for tracking popular tools
ALTER TABLE public.ai_tools
  ADD COLUMN IF NOT EXISTS click_count integer NOT NULL DEFAULT 0;

CREATE INDEX IF NOT EXISTS ai_tools_click_count_idx ON public.ai_tools (click_count DESC);

-- 6. RPC to increment click count
CREATE OR REPLACE FUNCTION public.increment_click(tool_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.ai_tools SET click_count = click_count + 1 WHERE id = tool_id;
END;
$$;
GRANT EXECUTE ON FUNCTION public.increment_click(uuid) TO anon;
