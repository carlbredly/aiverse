# AIverse

**AIverse** is a production-oriented **AI tools directory**: discover, filter, search, and explore tools on an interactive **3D globe**, with **upvotes**, **tool detail pages**, **community submissions**, and an **admin dashboard** backed by **Supabase** (PostgreSQL + Auth + Row Level Security).

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?logo=supabase&logoColor=white)

---

## Features

| Area | Description |
|------|-------------|
| **Directory** | Advanced search, multi-filter (category, pricing, tags), sort options, keyboard-friendly UI |
| **Globe 3D** | `react-globe.gl` + Three.js — country clusters, compact widget on home + full `/globe` page |
| **Tool pages** | Shareable URLs `/tool/:slug` — long description, tags, related tools, visit tracking |
| **Pre-launch** | Optional coming-soon mode with countdown & newsletter until `VITE_LAUNCH_AT` |
| **Submissions** | Public `/submit` form → `tool_submissions` table for moderation |
| **Admin** | `/admin` (Supabase Auth) — dashboard stats, CRUD tools, approve/reject submissions |
| **Newsletter** | Footer + pre-launch signup → `newsletter_subscribers` |
| **Realtime** | Optional cache invalidation when `ai_tools` changes (enable Replication in Supabase) |

---

## Tech stack

- **Frontend:** React 19, TypeScript, Vite 7, React Router 7  
- **Styling:** Tailwind CSS v4 (`@theme`), Framer Motion, Lucide icons  
- **Data:** Supabase JS v2, TanStack Query v5  
- **3D:** `react-globe.gl`, Three.js  

---

## Prerequisites

- **Node.js** 20+ (recommended)  
- A **Supabase** project ([supabase.com](https://supabase.com))  
- **npm** (or pnpm/yarn)

---

## Getting started

### 1. Clone & install

```bash
git clone https://github.com/carlbredly/aiverse.git
cd aiverse
npm install
```

### 2. Environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SUPABASE_URL` | Yes | Project URL (Settings → API) |
| `VITE_SUPABASE_ANON_KEY` | Yes | Public anon key |
| `VITE_LAUNCH_AT` | No | ISO 8601 — full site shows **from** this instant (default in code: after Mar 29 → opens Mar 30 00:00 +01:00) |
| `VITE_BYPASS_PRELAUNCH` | No | Set to `true` to always show the full app (dev) |

**Social preview:** `public/og-image.jpg` is referenced as `/og-image.jpg` in `index.html` (Open Graph / Twitter). Crawlers resolve it against your live domain.

> **Never commit `.env.local`** — it is ignored via `*.local` in `.gitignore`.

### 3. Database (Supabase)

SQL migrations and seeds are **not** in this repository (`supabase/` is gitignored).  
Apply your schema and policies directly in the **Supabase SQL Editor** (or keep a private copy of your `.sql` files locally).

Your project should define at least:

- Table **`ai_tools`** (directory fields, geo columns, `slug`, `click_count`, RLS public read)  
- RPC **`increment_upvote`**, **`increment_click`**  
- Table **`newsletter_subscribers`** (public insert)  
- Table **`tool_submissions`** + RLS for authenticated admin CRUD on tools  

**Auth (admin):** create a user under **Authentication → Users**, then sign in at `/admin`.

**Realtime (optional):** Database → **Replication** → enable `ai_tools` for live list updates.

### 4. Dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### 5. Production build

```bash
npm run build
npm run preview   # local preview of dist/
```

Deploy `dist/` to any static host (Vercel, Netlify, Cloudflare Pages, etc.). Set the same `VITE_*` variables in the host’s environment.  
> Launch / pre-launch dates are baked in at **build time** unless you externalize them later.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Typecheck + production bundle |
| `npm run preview` | Serve `dist/` locally |

**Seed generator** (optional, local only):

```bash
npx tsx scripts/generate-seed.ts
```

Writes SQL into `supabase/generated-seed.sql` (folder ignored by Git — run locally).

---

## Project structure (overview)

```
src/
  components/     # UI: Header, Globe3D, ToolCard, FilterBar, NewsletterForm, …
  hooks/          # useTools, useUpvote, useAdmin, useNewsletter, …
  lib/            # supabase client, types, slug, launch gate, globe utils
  pages/          # MainPage, GlobePage, ToolDetailPage, PrelaunchPage, SubmitToolPage
  pages/admin/    # Login, layout, dashboard, tools CRUD, submissions
public/           # Static assets
# supabase/       # (local only, gitignored) SQL migrations & seeds
```

---

## Security notes

- Use the **anon** key only in the browser; service role stays server-side only.  
- RLS policies enforce public read on tools, public insert on submissions/newsletter, and authenticated writes for admin operations (see `submissions.sql`).  
- Review policies before production traffic.

---

## Repository

- **GitHub:** [github.com/carlbredly/aiverse](https://github.com/carlbredly/aiverse)

---

## License

Specify your license in this repository (e.g. MIT) when you open-source the project.

---

<p align="center">
  Built with <strong>AIverse</strong> — <em>Every AI tool. One place.</em>
</p>
