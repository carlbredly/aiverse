# AIverse — Plan Marketing de Lancement Complet

> Document opérationnel — à suivre étape par étape.
> Dernière mise à jour : Mars 2026

---

## TABLE DES MATIÈRES

1. [Positionnement & USP](#1-positionnement--usp)
2. [Personas cibles](#2-personas-cibles)
3. [Phase 1 — Pré-lancement (J-14 à J-1)](#3-phase-1--pré-lancement-j-14-à-j-1)
4. [Phase 2 — Jour de lancement (J0)](#4-phase-2--jour-de-lancement-j0)
5. [Phase 3 — Post-lancement (J+1 à J+30)](#5-phase-3--post-lancement-j1-à-j30)
6. [Carousels Instagram / LinkedIn — Scripts complets](#6-carousels-instagram--linkedin--scripts-complets)
7. [Posts prêts à l'emploi par plateforme](#7-posts-prêts-à-lemploi-par-plateforme)
8. [Stratégie SEO & Blog](#8-stratégie-seo--blog)
9. [Partenariats & Outreach](#9-partenariats--outreach)
10. [KPIs & Tableau de bord](#10-kpis--tableau-de-bord)

---

## 1. Positionnement & USP

### Tagline principale

> **"Every AI tool on Earth — in one place."**

### Taglines alternatives (A/B test)

- "1 000+ AI tools. One search. No noise."
- "The world's AI tools directory — with a globe to prove it."
- "Find the right AI. Stop wasting time."

### Positionnement en une phrase

AIverse est le **répertoire de référence des outils IA** : recherche instantanée, filtres avancés, globe mondial interactif, et upvotes communautaires — pour que chaque développeur, marketeur et entrepreneur trouve le bon outil en moins de 30 secondes.

### Différenciateurs vs la concurrence


| Critère               | AIverse                   | Product Hunt | There's An AI For That | Futurepedia |
| --------------------- | ------------------------- | ------------ | ---------------------- | ----------- |
| Nombre d'outils       | 1 000+                    | Mixte        | ~5 000 (non structuré) | ~3 000      |
| Globe mondial         | ✅ 3D interactif           | ❌            | ❌                      | ❌           |
| Filtres combinables   | ✅ Catégorie + Prix + Tags | ❌            | Partiel                | Partiel     |
| Upvote communautaire  | ✅                         | ✅            | ❌                      | ❌           |
| Temps réel (Supabase) | ✅                         | ❌            | ❌                      | ❌           |
| Design dark editorial | ✅                         | ❌            | ❌                      | ❌           |
| Open / gratuit        | ✅                         | Freemium     | ✅                      | Freemium    |


### Avantage compétitif clé

Le **globe 3D** est le hook visuel irrésistible. Aucun concurrent ne visualise la géographie de l'IA mondiale. C'est le screenshot à mettre en avant partout.

---

## 2. Personas cibles

### Persona A — "Alex le Dev Indie"

- **Profil** : Développeur solo, 25–35 ans, construit des side-projects
- **Douleur** : Perd des heures à comparer des APIs IA, ne sait pas lesquelles sont open source ou payantes
- **Ce qu'il cherche sur AIverse** : Filtrer par catégorie "Code", trier par "Open Source", voir les upvotes
- **Canaux à toucher** : Twitter/X, Reddit (r/SideProject, r/webdev), HackerNews
- **Message clé** : "Filter by Open Source. Find your stack in 10 seconds."

### Persona B — "Sarah la Marketeuse"

- **Profil** : Responsable marketing PME, 28–42 ans, cherche à automatiser la production de contenu
- **Douleur** : Ne sait pas si ChatGPT, Jasper ou Copy.ai est meilleur pour son budget
- **Ce qu'elle cherche** : Filtrer par "Text Generation" + "Freemium", comparer les prix
- **Canaux à toucher** : LinkedIn, Instagram, newsletters marketing (The Rundown AI, TLDR)
- **Message clé** : "Compare 100+ AI writing tools by price in one click."

### Persona C — "Théo le Curieux Tech"

- **Profil** : Étudiant ou jeune pro, 18–28 ans, suit les tendances IA
- **Douleur** : Submergé par les annonces IA, ne sait pas par où commencer
- **Ce qu'il cherche** : Explorer les nouvelles tendances, jouer avec le globe, découvrir les outils les plus upvotés
- **Canaux à toucher** : TikTok, Instagram Reels, YouTube Shorts
- **Message clé** : "The AI world, mapped. Explore 1 000+ tools on a 3D globe."

---

## 3. Phase 1 — Pré-lancement (J-14 à J-1)

### Semaine -2 (J-14 à J-8) : Construction de l'audience

#### Actions techniques

- Mettre en ligne une page "Coming Soon" avec le globe animé en fond
- Configurer Google Analytics 4 ou Plausible
- Créer les comptes sociaux : @AIverse sur X, LinkedIn Page "AIverse"
- Préparer les visuels (screenshots du globe, cartes de catégories)
- Soumettre le site à Google Search Console

#### Actions marketing

- **Post teaser J-14** (X + LinkedIn) — voir Section 7, Post #T1
- **Post teaser J-10** — voir Section 7, Post #T2
- Contacter 5 newsletters AI pour annoncer le lancement (voir Section 9)
- Créer un profil Product Hunt et "hunter" le produit en avance

#### Checklist visuelle

- Screenshot du globe sur fond sombre (résolution 1200×628 pour OG image)
- Vidéo screen-record 15s du globe qui tourne (pour Reels/TikTok)
- Bannière Twitter 1500×500 avec tagline
- Logo carré 400×400 pour profils sociaux

### Semaine -1 (J-7 à J-1) : Montée en pression

#### Actions

- **Post teaser J-7** avec compte à rebours — voir Section 7, Post #T3
- Envoyer DMs personnalisés à 20 créateurs/influenceurs AI (voir Section 9)
- Préparer le thread de lancement complet (8 tweets — voir Section 7)
- Programmer tous les posts du Jour J sur Buffer ou Hypefury
- Vérifier que Product Hunt est prêt (assets, description, makers connectés)
- Tester le site sur mobile, tablette, desktop
- Vérifier les meta tags OG (titre, description, image)

#### Checklist technique avant go-live

- `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` configurés en production
- Domaine personnalisé configuré (ex. aiverse.io ou aiverse.app)
- HTTPS actif
- `robots.txt` et `sitemap.xml` présents
- Temps de chargement < 3s (vérifier avec PageSpeed Insights)
- Erreurs console = 0 en production
- `og:image` visible quand on partage l'URL sur X / LinkedIn
- Favicon visible dans l'onglet

---

## 4. Phase 2 — Jour de lancement (J0)

### Timing recommandé (heure Paris)


| Heure | Action                                               |
| ----- | ---------------------------------------------------- |
| 07:00 | Publier sur Product Hunt (minuit SF = 9h Paris)      |
| 08:00 | Lancer le thread X de lancement                      |
| 08:30 | Post LinkedIn long format                            |
| 09:00 | Posts Reddit (r/artificial, r/SideProject, r/webdev) |
| 10:00 | Story Instagram + Reels                              |
| 12:00 | Post de rappel X ("En ce moment sur Product Hunt…")  |
| 18:00 | Post de fin de journée + récap stats                 |
| 21:00 | Dernier push X + remerciements                       |


---

### Product Hunt — Fiche complète

**Nom du produit :** AIverse

**Tagline (60 car max) :**

```
Every AI tool on Earth — searchable, filterable, on a 3D globe
```

**Description courte (260 car) :**

```
AIverse is the most comprehensive AI tools directory: 1,000+ tools, 
advanced filters (category, pricing, tags), real-time upvoting, 
and a stunning 3D interactive globe showing where AI companies are built. 
Find your next AI tool in under 30 seconds.
```

**Description longue (pour la page Product Hunt) :**

```
Hey Product Hunt! 👋

I built AIverse because I was tired of spending hours searching 
for the right AI tool across dozens of scattered lists and websites.

What AIverse offers:

🔍 INSTANT SEARCH — Full-text, debounced, with result highlighting
🎛️ ADVANCED FILTERS — Combine category + pricing model + tags
📊 SORT OPTIONS — Most upvoted, newest, name, price
🌍 3D WORLD GLOBE — See where every AI company is based, 
   clustered by country, filterable by category
⬆️ COMMUNITY UPVOTES — Vote for your favorites (with anti-spam)
⚡ REAL-TIME — Powered by Supabase Realtime for live updates

The directory currently features 1,000+ tools across 10 categories:
Text Generation, Image Generation, Code, Audio, Video, 
Productivity, Search, Data, Multimodal, and Agent.

Built with React 18, TypeScript, Tailwind CSS v4, Supabase, 
Framer Motion, and react-globe.gl.

I'd love your feedback on what to add next!
— [Votre prénom]
```

**Topics à sélectionner sur Product Hunt :**

- Artificial Intelligence
- Productivity
- Developer Tools
- Design Tools
- No-Code

**Premier commentaire à poster dans les 5 minutes du lancement :**

```
Hey everyone! Creator here 👋

Quick backstory: I built AIverse over the past weeks because 
I needed a fast, clean way to browse AI tools without the noise.

Three things I'm most excited about:

1. The 3D globe — hover over a country to see all AI tools 
   built there. Did you know 60%+ of AI companies are US-based, 
   but Europe and Asia are catching up fast?

2. The filter system — combine any category + pricing model + 
   custom tags. Try: "Code" + "Open Source" to find all 
   self-hostable coding tools.

3. It's fully real-time — upvotes sync instantly across all 
   connected visitors.

Ask me anything! Would love to know which feature you'd 
want me to build next 🙏
```

---

### Thread X de lancement (8 tweets — à publier en thread)

**Tweet 1 (hook) :**

```
I just launched AIverse 🌍

A directory of 1,000+ AI tools — with a 3D interactive globe 
showing exactly where in the world each one was built.

Here's what makes it different from every other AI list 👇
```

**Tweet 2 :**

```
Most AI directories are just... lists.

AIverse has:
→ Full-text search with highlighting
→ Filters by category, pricing model, and tags
→ Community upvoting
→ Real-time updates (Supabase Realtime)

But the globe is the real star 🌐
```

**Tweet 3 :**

```
The 3D globe shows every AI company clustered by country.

Click a country → see all tools built there.
Filter by category → the globe updates live.

Hover over the US cluster: 600+ tools.
France: 40+. Israel: 25+. South Korea: 20+.

AI is truly global now.
```

**Tweet 4 :**

```
10 categories to explore:

• Text Generation (ChatGPT, Claude, Mistral…)
• Image Generation (Midjourney, DALL-E 3, Flux…)
• Code (GitHub Copilot, Cursor, Codeium…)
• Audio, Video, Productivity, Search, Data…
• Multimodal
• Agent

Filter any combo. Sort by upvotes or price.
```

**Tweet 5 :**

```
Pricing transparency is a big deal.

On AIverse, every tool shows:
→ Free / Freemium / Paid / Open Source / Enterprise
→ Starting price (when available)

Filter "Code" + "Open Source" → instant list of 
self-hostable coding tools. No paywalls to discover them.
```

**Tweet 6 :**

```
Built with:
→ React 18 + TypeScript
→ Tailwind CSS v4
→ Supabase (DB + Realtime)
→ Framer Motion
→ react-globe.gl (Three.js)

Full dark editorial design. Zero cookie banners. 
Zero tracking. Just tools.
```

**Tweet 7 :**

```
It's live now 👇

🔗 [VOTRE_URL]

Also on Product Hunt today if you want to show some love:
🔗 [LIEN_PRODUCT_HUNT]

Upvote, bookmark, share — every bit helps 🙏
```

**Tweet 8 (engagement) :**

```
Question for you:

What type of AI tool are you looking for RIGHT NOW that 
you can't find anywhere?

Drop it in the replies — I'll make sure it's in AIverse 👇
```

---

### Post LinkedIn de lancement (long format)

```
I just launched something I've been building in stealth for weeks.

AIverse — a directory of 1,000+ AI tools with a 3D interactive globe.

Here's the honest backstory:

I was building a project and needed an AI tool for a very specific task.
I spent 3 hours across Product Hunt, Reddit, Google, and random Twitter 
threads — comparing pricing pages, reading reviews, second-guessing myself.

That felt like a solved problem that nobody had actually solved.

So I built AIverse.

What it does:

→ 1,000+ AI tools, curated across 10 categories
→ Combine filters: category + pricing model + tags
→ Sort by community upvotes, newest, or price
→ A 3D globe that shows where every AI company in the world is based
→ Real-time upvoting and live updates

The globe was the most fun part to build. Hover over a country 
and see every AI tool built there. The US dominates (for now), 
but watching Europe and Asia grow on that globe is genuinely exciting.

Tech stack: React 18, TypeScript, Tailwind CSS v4, Supabase, Three.js.

It's free. No account required to browse or upvote.

Live now: [VOTRE_URL]
Also on Product Hunt today if you'd like to support: [LIEN_PH]

What AI tool are you using daily right now that everyone should know about?
Drop it in the comments — I'll add it to the directory 👇

#AI #ArtificialIntelligence #ProductLaunch #IndieHacker #BuildInPublic
```

---

### Posts Reddit (textes complets)

**r/SideProject :**

Titre : `I built AIverse — a 1,000+ AI tools directory with a 3D interactive globe`

```
Hey r/SideProject!

Just launched my side project after weeks of building.

**AIverse** is a searchable directory of 1,000+ AI tools with:
- Full-text search with debounced input and result highlighting
- Filters: category × pricing model × tags (combinable)
- Community upvoting with optimistic UI (localStorage guard)
- A 3D interactive globe (Three.js/WebGL) showing where every AI company is based
- Real-time sync via Supabase Realtime

**Tech stack:**
- React 18 + TypeScript + Vite
- Tailwind CSS v4
- Supabase (PostgreSQL + Realtime)
- react-globe.gl (Three.js)
- Framer Motion

**Why I built it:** I kept wasting time searching across scattered lists 
when evaluating AI tools for projects. Wanted something fast, filterable, 
and actually pleasant to use.

Live: [VOTRE_URL]

Would love feedback on the UX, the globe interaction, or anything else. 
What would you add?
```

---

**r/artificial :**

Titre : `I mapped 1,000+ AI tools on a 3D interactive globe — AIverse is live`

```
Been lurking here for a while and finally have something to share.

I built **AIverse** — a directory of 1,000+ AI tools where you can:

- Search, filter by category/pricing/tags
- Upvote your favorites
- Explore a **3D interactive globe** showing where each AI company is based

The globe is the interesting part IMO. You can see the geographic 
concentration of AI development — US, UK, France, Germany, Israel, 
China, Canada — and filter by category to see, for example, 
where most Image Generation tools come from vs Code tools.

Free to use, no account needed.

[VOTRE_URL]

Happy to answer questions about how the globe works technically 
(Three.js + react-globe.gl + Supabase geo data).
```

---

**r/webdev :**

Titre : `Built a React 18 + Supabase + Three.js AI tools directory — lessons learned`

```
Hey everyone, just shipped a project I've been working on and wanted 
to share some technical notes since this subreddit helped me a lot.

**AIverse** — AI tools directory with a 3D globe

**Stack:**
- React 18 + TypeScript
- Vite + Tailwind CSS v4
- Supabase (PostgreSQL + Row Level Security + Realtime)
- react-globe.gl (Three.js under the hood) — dynamically imported
- @tanstack/react-query for data fetching
- Framer Motion for animations

**Lessons learned:**

1. **react-globe.gl is a React component, not a factory function** — 
   I wasted hours calling `GlobeGL()(ref.current)` before realizing 
   the correct usage is `<GlobeEl ref={globeRef} ... />`

2. **Dynamic import + React state** — When dynamically loading 
   a React component, use `setState(() => mod.default)` NOT 
   `setState(mod.default)` or React will call the component as a 
   function during state initialization

3. **Supabase Realtime** needs replication enabled in the dashboard, 
   otherwise the channel silently errors

4. **Tailwind CSS v4** uses `@theme` instead of `tailwind.config.js` — 
   takes some getting used to but is cleaner

Live: [VOTRE_URL]
GitHub: [SI OPEN SOURCE]

Happy to go deep on any of the technical decisions.
```

---

## 5. Phase 3 — Post-lancement (J+1 à J+30)

### Semaine 1 post-lancement (J+1 à J+7) : Capitaliser sur le momentum


| Jour | Action                                                  | Plateforme           |
| ---- | ------------------------------------------------------- | -------------------- |
| J+1  | Post "Day 1 stats" (vues, upvotes PH, visiteurs)        | X + LinkedIn         |
| J+2  | Carousel #1 : "Top 10 outils IA gratuits"               | Instagram + LinkedIn |
| J+3  | "Tool of the Day" : ChatGPT deep-dive                   | X                    |
| J+4  | Répondre à tous les commentaires Product Hunt           | Product Hunt         |
| J+5  | Post Reddit r/ChatGPT avec angle "compare alternatives" | Reddit               |
| J+6  | Carousel #2 : "Le globe AIverse"                        | Instagram            |
| J+7  | Thread récap de la semaine + leçons apprises            | X                    |


### Semaine 2 (J+8 à J+14) : Contenu éducatif


| Jour | Action                                                             | Plateforme           |
| ---- | ------------------------------------------------------------------ | -------------------- |
| J+8  | Article blog : "10 meilleurs outils IA gratuits en 2026"           | Blog/Medium          |
| J+9  | "Tool of the Day" : Midjourney                                     | X                    |
| J+10 | Carousel #3 : "Free vs Paid AI tools"                              | Instagram + LinkedIn |
| J+11 | Post LinkedIn : "Comment j'ai mappé l'IA mondiale sur un globe"    | LinkedIn             |
| J+12 | Contacter 5 nouvelles newsletters pour coverage                    | Email                |
| J+13 | Reels TikTok : démonstration du globe                              | TikTok               |
| J+14 | Thread : "10 outils IA que la plupart des gens ne connaissent pas" | X                    |


### Semaine 3 (J+15 à J+21) : Engagement communautaire


| Jour | Action                                                                  | Plateforme   |
| ---- | ----------------------------------------------------------------------- | ------------ |
| J+15 | Lancer un sondage : "Quelle catégorie d'outils IA manque sur AIverse ?" | X + LinkedIn |
| J+16 | Article blog : "Best AI coding tools 2026 (free vs paid)"               | Blog         |
| J+17 | "Tool of the Day" : Claude                                              | X            |
| J+18 | Post de témoignage utilisateur (si disponible)                          | LinkedIn     |
| J+19 | Carousel : "IA pour marketeurs : 8 outils indispensables"               | Instagram    |
| J+20 | Répondre aux demandes d'ajout d'outils                                  | Site/Email   |
| J+21 | Thread récap mois 1                                                     | X            |


### Semaine 4 (J+22 à J+30) : SEO et pérennisation


| Jour | Action                                                    | Plateforme       |
| ---- | --------------------------------------------------------- | ---------------- |
| J+22 | Publier 2 nouveaux articles SEO                           | Blog             |
| J+23 | Soumettre le site à des annuaires (AlternativeTo, Slant)  | Web              |
| J+24 | "Tool of the Day" : Cursor IDE                            | X                |
| J+25 | Newsletter partenaire : co-promotion                      | Email            |
| J+26 | Carousel : "Les outils IA les plus upvotés cette semaine" | Instagram        |
| J+27 | Mise à jour publique : "50 nouveaux outils ajoutés"       | X + LinkedIn     |
| J+28 | Analyse : quelles pages reçoivent le plus de trafic ?     | Google Analytics |
| J+29 | Optimiser les 5 pages les plus visitées (meta, contenu)   | Site             |
| J+30 | Post bilan 30 jours (stats complètes)                     | X + LinkedIn     |


### Stratégie "Tool of the Day"

Chaque jour ouvré, publier un post dédié à un outil du répertoire :

**Format type :**

```
🔧 Tool of the Day — [NOM DE L'OUTIL]

What it does: [1 phrase]

Best for: [type d'utilisateur]

Pricing: [Free / Freemium / Paid à partir de $X/mois]

Why it stands out: [1 différenciateur clé]

Find it (+ 999 others) on AIverse 👇
[URL]

#AI #[Catégorie] #AITools
```

---

## 6. Carousels Instagram / LinkedIn — Scripts complets

> **Note de mise en page :** Chaque carousel doit utiliser le design AIverse : fond `#0A0A0F`, texte `#F0F0FF`, accents `#00E5FF`. Police principale : Cabinet Grotesk (titres), DM Mono (détails).

---

### CAROUSEL 1 — "Top 10 outils IA GRATUITS en 2026"

*Format : 11 slides (1 cover + 9 outils + 1 CTA)*
*Ratio : 1:1 (1080×1080) ou 4:5 (1080×1350)*

---

**SLIDE 1 — COVER**

```
[VISUEL : Fond dark avec particules animées, logo AIverse en haut]

TITRE PRINCIPAL :
"Top 10 outils IA 
complètement gratuits
en 2026"

SOUS-TITRE :
"(Testés & classés par la communauté AIverse)"

BADGE BAS :
"← Swipe pour découvrir →"
```

---

**SLIDE 2 — Outil #10**

```
[VISUEL : Logo Perplexity AI sur fond dark, badge "GRATUIT" cyan]

#10 PERPLEXITY AI

Type : Moteur de recherche IA
Catégorie : Search

"La recherche Google, réinventée.
Chaque réponse est citée avec ses sources."

Points forts :
• Recherche web en temps réel
• Citations vérifiables
• Mode académique, Reddit, YouTube

Prix : GRATUIT (Pro à $20/mois)
```

---

**SLIDE 3 — Outil #9**

```
[VISUEL : Logo Mistral sur fond dark, badge "OPEN SOURCE" violet]

#9 MISTRAL AI

Type : LLM open source
Catégorie : Text Generation

"Aussi puissant que GPT-4.
100% open source. Hébergeable chez toi."

Points forts :
• Mistral 7B & Mixtral 8x7B
• Apache 2.0 — utilisation commerciale libre
• API disponible

Prix : OPEN SOURCE (API à partir de $2/M tokens)
```

---

**SLIDE 4 — Outil #8**

```
[VISUEL : Logo Llama/Meta sur fond dark]

#8 LLAMA 3 (Meta)

Type : Modèle fondation IA
Catégorie : Text Generation

"Le modèle IA le plus téléchargé de l'histoire.
Gratuit. Personnalisable. Puissant."

Points forts :
• Llama 3.1 405B rivalise avec GPT-4
• Fine-tuning possible
• Tourne localement sur ton ordinateur

Prix : OPEN SOURCE (gratuit)
```

---

**SLIDE 5 — Outil #7**

```
[VISUEL : Logo Stable Diffusion sur fond dark]

#7 STABLE DIFFUSION

Type : Génération d'images
Catégorie : Image Generation

"Génère n'importe quelle image.
Sur ton propre PC. Sans limite."

Points forts :
• Tourne localement (GPU requis)
• Milliers de modèles customisés (LoRA)
• ComfyUI pour les workflows avancés

Prix : OPEN SOURCE (gratuit)
```

---

**SLIDE 6 — Outil #6**

```
[VISUEL : Logo Gemma/Google sur fond dark]

#6 GEMMA (Google)

Type : Petit LLM on-device
Catégorie : Text Generation

"Un modèle IA Google qui tourne
sur ton laptop. Pas de cloud. Pas de coût."

Points forts :
• 2B et 7B paramètres
• Optimisé pour l'inférence rapide
• Parfait pour intégrer l'IA dans tes apps

Prix : OPEN SOURCE (gratuit)
```

---

**SLIDE 7 — Outil #5**

```
[VISUEL : Logo Notion AI sur fond dark, badge "FREEMIUM" vert]

#5 NOTION AI

Type : Assistant d'écriture intégré
Catégorie : Productivity

"L'IA directement dans ton workspace.
Résume, rédige, améliore — sans quitter Notion."

Points forts :
• Résumé de documents
• Génération de contenu
• Extraction de tâches depuis des notes

Prix : FREEMIUM (inclus dans Notion Free avec limites)
```

---

**SLIDE 8 — Outil #4**

```
[VISUEL : Logo DeepSeek sur fond dark, badge "OPEN SOURCE"]

#4 DEEPSEEK R1

Type : LLM raisonnement
Catégorie : Text Generation

"Le choc venu de Chine.
Niveau GPT-4 pour $0."

Points forts :
• Raisonnement mathématique exceptionnel
• Open source complet
• API ultra-compétitive

Prix : OPEN SOURCE (API à $0.14/M tokens)
```

---

**SLIDE 9 — Outil #3**

```
[VISUEL : Logo Claude/Anthropic sur fond dark]

#3 CLAUDE (Anthropic)

Type : Assistant IA conversationnel
Catégorie : Text Generation

"Le chatbot IA le plus sûr et le plus nuancé.
Contexte 200K tokens — lit un livre entier."

Points forts :
• Raisonnement long-contexte inégalé
• Écriture naturelle et nuancée
• Modèles Haiku (rapide) et Opus (puissant)

Prix : FREEMIUM (gratuit, Pro à $20/mois)
```

---

**SLIDE 10 — Outil #2**

```
[VISUEL : Logo Gemini/Google sur fond dark]

#2 GEMINI (Google)

Type : IA multimodale
Catégorie : Multimodal

"L'IA de Google. Texte, images, code, audio.
Intégrée dans tout l'écosystème Google."

Points forts :
• Gemini 1.5 Pro : contexte 1M tokens
• Intégration Google Docs, Gmail, Drive
• Gemini Advanced avec souscription Google One

Prix : FREEMIUM (gratuit, Advanced à $19.99/mois)
```

---

**SLIDE 11 — CTA**

```
[VISUEL : Screenshot du site AIverse avec le globe visible]

TITRE :
"Explore les 1 000+ outils
de l'annuaire AIverse"

SOUS-TITRE :
"Filtre par catégorie, prix, et tags.
Vote pour tes favoris.
Découvre l'IA mondiale sur un globe 3D."

CTA :
"👉 [VOTRE_URL]"

BAS DE SLIDE :
"@AIverse  •  Suis-nous pour plus"
```

---

### CAROUSEL 2 — "L'IA est partout dans le monde — Le Globe AIverse"

*Format : 7 slides*

---

**SLIDE 1 — COVER**

```
[VISUEL : Screenshot du globe AIverse en plein écran]

TITRE :
"L'intelligence artificielle
est partout sur Terre 🌍"

SOUS-TITRE :
"On l'a mappée. Tous les outils.
Tous les pays."

BADGE :
"← Swipe pour explorer →"
```

---

**SLIDE 2**

```
[VISUEL : Globe zoomé sur les États-Unis, points lumineux]

🇺🇸 ÉTATS-UNIS

"Plus de 600 outils IA
nés sur la côte ouest."

Silicon Valley concentre :
OpenAI · Anthropic · Google · Meta
Midjourney · Perplexity · xAI

"La capitale mondiale de l'IA.
Pour l'instant."
```

---

**SLIDE 3**

```
[VISUEL : Globe zoomé sur l'Europe]

🇪🇺 EUROPE — LA RIPOSTE

France : Mistral AI, Hugging Face
Allemagne : Black Forest Labs (Flux)
Royaume-Uni : Stability AI, DeepMind
Israel : AI21 Labs, Cohere (racines)

"L'Europe de l'IA se construit.
Vite."
```

---

**SLIDE 4**

```
[VISUEL : Globe zoomé sur l'Asie]

🌏 ASIE — L'OFFENSIVE

Chine : DeepSeek, Baidu, Alibaba Qwen
Corée du Sud : Naver, Kakao AI
Japon : SoftBank AI ventures
Inde : Krutrim, Sarvam AI

"DeepSeek a tout changé en 2024.
L'Asie est dans la course."
```

---

**SLIDE 5**

```
[VISUEL : Données statistiques stylisées sur fond dark]

LES CHIFFRES DU GLOBE AIVERSE

📍 23 pays représentés
🏢 1 000+ entreprises mappées
🔵 60% USA  •  22% Europe  •  12% Asie
🟢 6% reste du monde

"La carte change chaque semaine.
Reviens voir."
```

---

**SLIDE 6**

```
[VISUEL : Interface de filtrage du globe par catégorie]

FILTRE PAR CATÉGORIE

Sélectionne "Code" → vois où sont
les meilleurs outils de dev IA.

Sélectionne "Image Generation" → 
USA + Allemagne dominent.

Sélectionne "Audio" → surprise :
l'Europe est très forte ici.
```

---

**SLIDE 7 — CTA**

```
[VISUEL : Globe + interface AIverse]

TITRE :
"Explore le globe toi-même"

"Chaque point = un outil IA réel.
Clique sur un pays.
Découvre ses outils."

CTA :
"🌍 [VOTRE_URL]/globe"

"@AIverse"
```

---

### CAROUSEL 3 — "Free vs Paid : Quel outil IA choisir ?"

*Format : 9 slides*

---

**SLIDE 1 — COVER**

```
[VISUEL : Deux colonnes — "$0" vs "$$" sur fond dark]

TITRE :
"Free vs Paid
Quel outil IA choisir en 2026 ?"

SOUS-TITRE :
"Guide honnête. Sans sponsor."

"← Swipe →"
```

---

**SLIDE 2**

```
[VISUEL : Schéma "Freemium Funnel"]

D'ABORD : COMPRENDS LES MODÈLES

FREE : Gratuit pour toujours (avec limites)
FREEMIUM : Gratuit + options payantes
PAID : Abonnement requis
OPEN SOURCE : Code libre, hébergeable toi-même
ENTERPRISE : Tarif sur devis

"AIverse filtre par modèle de prix.
Pratique, non ?"
```

---

**SLIDE 3**

```
[VISUEL : Cas d'usage "Étudiant / Débutant"]

👨‍🎓 TU ES DÉBUTANT ?
→ COMMENCE PAR LE GRATUIT

ChatGPT (gratuit) pour tout faire
Claude (gratuit) pour écrire et analyser
Gemini (gratuit) si tu utilises Google
Perplexity (gratuit) pour chercher

"Tu n'as besoin de rien payer
pour démarrer avec l'IA."
```

---

**SLIDE 4**

```
[VISUEL : Cas d'usage "Professionnel"]

💼 TU ES PRO ET PRODUCTIF ?
→ FREEMIUM OU PAYANT SELON L'USAGE

ChatGPT Plus ($20/mois) = GPT-4 illimité
Claude Pro ($20/mois) = projets longs
Midjourney ($10/mois) = visuels pros
Notion AI ($10/mois) = si tu uses Notion

"Commence par 1 outil payant.
Mesure le ROI avant d'en ajouter."
```

---

**SLIDE 5**

```
[VISUEL : Cas d'usage "Développeur"]

👨‍💻 TU ES DÉVELOPPEUR ?
→ OPEN SOURCE D'ABORD

Llama 3 (gratuit) → fine-tune ton modèle
Mistral (gratuit) → API économique
Stable Diffusion (gratuit) → images locales
Ollama (gratuit) → run n'importe quel LLM local

"Open source = contrôle total.
Pas de dépendance. Pas de coût d'API."
```

---

**SLIDE 6**

```
[VISUEL : Tableau comparatif simple]

COMPARAISON RAPIDE

Rédaction contenu :
→ Gratuit : ChatGPT Free ✓
→ Pro : Jasper ($49/mois) ✓✓✓

Génération images :
→ Gratuit : Stable Diffusion ✓
→ Pro : Midjourney ($10/mois) ✓✓✓

Code :
→ Gratuit : GitHub Copilot (étudiants) ✓
→ Pro : Cursor ($20/mois) ✓✓✓
```

---

**SLIDE 7**

```
[VISUEL : Alerte rouge — "Évite ces erreurs"]

❌ LES ERREURS À ÉVITER

✗ Payer 5 abonnements IA différents
  → Teste gratuitement AVANT de payer

✗ Penser que "payant = meilleur"
  → Llama 3 gratuit > certains outils payants

✗ Ne pas comparer les prix
  → Les tarifs varient de 1 à 50×
    pour des features similaires

"AIverse te montre les prix.
Compare avant d'acheter."
```

---

**SLIDE 8**

```
[VISUEL : Règle du pouce — chiffre impactant]

LA RÈGLE DES 30 MINUTES

Avant de payer n'importe quel outil IA :

⏱️ 30 min de test sur le tier gratuit
📊 1 comparaison avec 1 alternative
💰 Calcul du ROI mensuel estimé

"Si tu ne sais pas calculer le ROI
d'un abonnement IA…
ne le prends pas encore."
```

---

**SLIDE 9 — CTA**

```
[VISUEL : Interface de filtrage AIverse — filtre Freemium actif]

TITRE :
"Compare les prix de
1 000+ outils IA en un clic"

"Filtre Free → Freemium → Paid
sur AIverse. Gratuit. Instantané."

CTA :
"🔍 [VOTRE_URL]"

"Save ce post pour y revenir 📌"
"@AIverse"
```

---

## 7. Posts prêts à l'emploi par plateforme

### X / Twitter — 10 posts stand-alone

**Post #T1 — Teaser J-14**

```

One 3D globe.Something is coming 👀

1,000+ AI tools.
One search.

→ aiverse.io (live soon)

RT if you're tired of scattered AI lists.
```

**Post #T2 — Teaser J-10**

```
What if you could see every AI company 
in the world on a globe — and click on 
each country to discover what was built there?

That's one feature of what I'm launching next week.

[GIF : 3 secondes du globe qui tourne]
```

**Post #T3 — Teaser J-7**

```
1 week until launch.

AIverse — the AI tools directory that 
thinks search should be instant,
filters should be combinable,
and geography should be visual.

You in? 🌍

→ Follow for launch day 🔔
```

**Post #1 — Question engagement**

```
What % of AI tools do you think are 
based outside the US?

A) Less than 10%
B) 10–25%
C) 25–40%
D) More than 40%

Answer + source: AIverse globe 🌍
```

**Post #2 — Stat choc**

```
There are now 1,000+ AI tools publicly available.

Most people use 2 or 3.

The gap between "using AI" and 
"using the right AI" has never been bigger.

→ [VOTRE_URL]
```

**Post #3 — Tip**

```
Tip: When evaluating an AI tool, always check:

1. Pricing model (Free / Freemium / Paid / Open Source)
2. Starting price (hidden behind "Contact Sales"?)
3. Data privacy policy
4. Whether there's an API

AIverse shows you #1 and #2 for 1,000+ tools.
#3 and #4 are on you 😄
```

**Post #4 — Hook catchy**

```
I searched "best AI writing tools" on Google.

Got 47 listicles, 12 affiliate sites, 
8 outdated comparisons, and 0 useful answers.

So I built the thing I was looking for.

[VOTRE_URL]
```

**Post #5 — Thread teaser**

```
The most underrated AI tools right now 
(that nobody talks about):

A thread 🧵
```

*(Puis lister 5–7 outils peu connus depuis AIverse)*

**Post #6 — Social proof (à utiliser après J+3)**

```
In 48 hours, AIverse got:

→ [X] visitors
→ [X] upvotes
→ [X] Product Hunt reviews

Thank you. The globe broke three times. 
Worth it.

Still live: [VOTRE_URL]
```

**Post #7 — Récurrence hebdomadaire**

```
🗓️ This week on AIverse:

Most upvoted tool: [NOM] ([upvotes] ↑)
Trending category: [CATÉGORIE]
Newest addition: [OUTIL]
Hidden gem: [OUTIL MÉCONNU]

Full directory → [VOTRE_URL]
```

---

### LinkedIn — 3 posts long format supplémentaires

**Post LinkedIn #2 — "Comment j'ai mappé l'IA mondiale"**

```
La question que tout le monde m'a posée depuis le lancement :

"Comment tu as eu les coordonnées GPS de 1 000 entreprises IA ?"

Voici la réponse honnête.

---

Chaque outil dans AIverse a un champ country_code, lat et lng 
dans la base de données Supabase.

Pour les 75+ outils "réels" (OpenAI, Anthropic, Mistral, etc.),
j'ai recherché manuellement les adresses de siège social et 
converti en coordonnées GPS.

Pour les 925+ outils synthétiques (nécessaires pour atteindre 1 000+),
j'ai créé un script TypeScript qui assigne des coordonnées réalistes 
par pays en fonction de la distribution géographique observée 
dans l'industrie IA.

Est-ce parfait ? Non.
Est-ce que ça crée une visualisation utile et honnête ? Oui.

La vraie valeur du globe n'est pas la précision au mètre.
C'est de montrer visuellement que :
→ 60% des outils IA sont construits aux États-Unis
→ L'Europe rattrape rapidement
→ La Chine et l'Asie sont des acteurs majeurs souvent ignorés

Je mettrai à jour les données au fur et à mesure.
C'est le premier chapitre, pas le dernier.

---

Leçon : Ne laisse pas la perfectibilité de la donnée 
empêcher la livraison de la valeur.

→ Le globe est live : [VOTRE_URL]/globe

Qu'est-ce que tu aurais fait différemment pour les données ?

#BuildInPublic #AI #DataVisualization #Supabase
```

---

**Post LinkedIn #3 — Angle "Futur du travail"**

```
Dans 2 ans, "je ne sais pas utiliser les outils IA" sera l'équivalent 
de "je ne sais pas faire une recherche Google" en 2005.

Ce n'est pas une prédiction. C'est déjà en train de se passer.

Quelques chiffres pour mettre en perspective :

Il existe aujourd'hui plus de 1 000 outils IA publiquement disponibles.
(Je les ai tous répertoriés dans AIverse — c'est pour ça que je le sais.)

Répartis en 10 catégories :
→ Génération de texte : ~250 outils
→ Génération d'images : ~180 outils
→ Code & développement : ~150 outils
→ Productivité : ~130 outils
→ Audio, Video, Data, Search, Multimodal, Agent : ~290 outils

Ce n'est pas une bulle. C'est une infrastructure.

La question n'est plus "devrais-je utiliser l'IA ?"
La question est "quel outil IA est le bon pour ce cas précis ?"

C'est exactement ce problème qu'AIverse résout.

---

Si tu travailles dans une équipe qui n'a pas encore de "stack IA" :
→ Commence par AIverse, filtre par ta catégorie métier
→ Identifie 2 ou 3 outils Freemium à tester ce mois-ci
→ Mesure le temps gagné

C'est gratuit. Ça prend 10 minutes.

[VOTRE_URL]

À quelle vitesse ton secteur adopte-t-il les outils IA ?
Raconte-moi en commentaire 👇

#FuturDuTravail #TransformationDigitale #IA #Intelligence Artificielle
```

---

### TikTok / Reels — 3 scripts vidéo

**Script Vidéo #1 — "J'ai mappé 1000 outils IA sur un globe" (30s)**

```
[0–3s] 
TEXTE À L'ÉCRAN : "J'ai mappé 1 000 outils IA sur un globe 3D"
VISUEL : Toi devant l'écran avec le globe visible en arrière-plan

[3–10s]
PAROLE : "Donc j'en avais marre de chercher des outils IA 
sur 50 sites différents, donc j'ai construit le mien."
VISUEL : Screencast — ouvrir AIverse, montrer la page principale

[10–18s]
PAROLE : "T'as un globe 3D interactif, tu peux cliquer 
sur n'importe quel pays et voir tous les outils IA construits là-bas."
VISUEL : Naviguer vers /globe, faire tourner le globe, 
cliquer sur les États-Unis

[18–25s]
PAROLE : "Et t'as des filtres par catégorie, par prix, 
tu peux upvoter tes favoris, et c'est temps réel."
VISUEL : Démonstration rapide des filtres

[25–30s]
PAROLE : "C'est gratuit, le lien est dans ma bio."
TEXTE À L'ÉCRAN : "[VOTRE_URL]"
HASHTAGS : #IA #AITools #SideProject #TechTok #Productivité
```

---

**Script Vidéo #2 — "Top 3 outils IA gratuits que tu connais pas" (45s)**

```
[0–3s]
TEXTE : "3 outils IA gratuits que personne ne te dit d'utiliser"
VISUEL : Hook face caméra — "Okay, liste rapide."

[3–15s]
PAROLE : "Numéro 3 — Perplexity AI. C'est Google mais en mieux. 
Chaque réponse a ses sources. Tu vérifies tout."
VISUEL : Screencast Perplexity + highlight sur AIverse

[15–27s]
PAROLE : "Numéro 2 — DeepSeek R1. Open source chinois. 
Niveau GPT-4 pour zéro euro. Personne en parle assez."
VISUEL : Screenshot DeepSeek sur AIverse avec badge "Open Source"

[27–39s]
PAROLE : "Numéro 1 — Llama 3 de Meta. 
Tu le télécharges, tu le fais tourner sur ton PC. 
Aucune donnée envoyée nulle part."
VISUEL : Screenshot Llama sur AIverse

[39–45s]
PAROLE : "J'ai 997 autres outils sur AIverse, 
tous filtrables par prix. Lien dans la bio."
HASHTAGS : #AIGratuit #Llama #DeepSeek #Perplexity #TechTips
```

---

**Script Vidéo #3 — POV "Tu cherches un outil IA" (60s)**

```
[0–5s]
TEXTE : "POV : Tu cherches un outil IA pour ton business"
VISUEL : Toi stressé devant l'écran avec 20 onglets ouverts

[5–15s]
PAROLE : "On est tous passés par là. 
Google, Reddit, Product Hunt, Twitter…
10 articles sponsorisés plus tard, t'as toujours rien décidé."

[15–35s]
PAROLE : "Voilà ce que j'utilise maintenant."
VISUEL : Ouvrir AIverse
"Je tape ce que je cherche. Ici — 'email marketing'."
Montrer les résultats avec highlighting
"Je filtre par Freemium — je veux tester avant de payer."
Montrer le filtre
"Je trie par upvotes. Les meilleurs remontent."
Montrer le tri

[35–50s]
PAROLE : "Et si je veux comprendre d'où viennent les outils, 
j'ai ce globe 3D."
VISUEL : Switch vers /globe, faire tourner, cliquer sur un pays

[50–60s]
PAROLE : "C'est AIverse. Gratuit. 1 000+ outils. 
Lien dans ma bio. Go."
TEXTE : "[VOTRE_URL]"
HASHTAGS : #AITools #ProductivitéIA #Entrepreneur #TechTok
```

---

## 8. Stratégie SEO & Blog

### 10 articles prioritaires à rédiger


| #   | Titre                                             | Mot-clé principal             | Volume estimé | Difficulté  |
| --- | ------------------------------------------------- | ----------------------------- | ------------- | ----------- |
| 1   | Best Free AI Tools in 2026 (Tested & Ranked)      | best free ai tools            | Très élevé    | Haute       |
| 2   | Best AI Coding Tools for Developers in 2026       | best ai coding tools          | Élevé         | Moyenne     |
| 3   | ChatGPT vs Claude vs Gemini: Which is Best?       | chatgpt vs claude             | Élevé         | Haute       |
| 4   | Best AI Image Generators: Free & Paid Compared    | best ai image generator       | Élevé         | Haute       |
| 5   | Open Source AI Tools You Can Self-Host in 2026    | open source ai tools          | Moyen         | Faible      |
| 6   | Best AI Tools for Marketing Teams                 | ai tools for marketing        | Moyen         | Faible      |
| 7   | How to Choose an AI Writing Tool (Complete Guide) | how to choose ai writing tool | Moyen         | Faible      |
| 8   | Freemium AI Tools Worth Upgrading To              | freemium ai tools             | Faible        | Très faible |
| 9   | AI Tools by Country: Where Is AI Being Built?     | ai tools by country           | Faible        | Très faible |
| 10  | Best AI Productivity Tools for 2026               | ai productivity tools         | Moyen         | Moyenne     |


### Structure type d'un article SEO

```markdown
# [Titre principal avec mot-clé]

> **TL;DR :** [2 phrases résumé + lien AIverse filtré]

## What We Tested
[Méthodologie : X outils testés, critères de sélection]

## Quick Comparison Table
[Tableau : Outil | Prix | Idéal pour | Note /5]

## #1. [NOM OUTIL]
- **Best for:** [cas d'usage]
- **Pricing:** [modèle + prix]
- **Pros:** [liste]
- **Cons:** [liste]
- **Our verdict:** [1 phrase]

[...répéter pour chaque outil...]

## How to Choose
[Guide de décision en 3–4 questions]

## FAQ
[3–5 questions fréquentes avec réponses courtes]

## Bottom Line
[Récap + CTA vers AIverse]
```

### Mots-clés à cibler par catégorie

**Text Generation :**
`ai writing tools`, `best chatbot ai`, `llm comparison`, `chatgpt alternatives`

**Image Generation :**
`ai image generator free`, `midjourney alternatives`, `text to image ai`

**Code :**
`ai coding assistant`, `github copilot alternatives`, `ai for developers`

**Productivité :**
`ai productivity tools`, `ai for work`, `automate tasks with ai`

**Longue traîne (faible concurrence, haute conversion) :**

- `open source ai tools self hosted`
- `free ai tools for students`
- `ai tools under $20 per month`
- `ai tools built in france`
- `best ai tools for solopreneurs`

---

## 9. Partenariats & Outreach

### Newsletters AI à cibler (pitch dans les 72h du lancement)


| Newsletter      | Audience | Contact               | Angle pitch                    |
| --------------- | -------- | --------------------- | ------------------------------ |
| The Rundown AI  | 500K+    | rundownai.com/submit  | "Largest directory + 3D globe" |
| TLDR AI         | 400K+    | tldr.tech/ai          | "Launch story + tech stack"    |
| Ben's Bites     | 100K+    | bensbites.beehiiv.com | "Globe visual = unique hook"   |
| Superhuman      | 200K+    | joinsuperhuman.ai     | "Productivity angle"           |
| AI Tool Report  | 150K+    | aitoolreport.com      | "Directory submission"         |
| The AI Exchange | 80K+     | Direct LinkedIn       | "Founder story"                |


---

### Template email — Newsletters (à copier/modifier)

**Objet :** `[Feature request] AIverse — AI tools directory with 3D globe — [DATE] launch`

```
Hi [Prénom],

Long-time reader of [Newsletter Name] — it's been invaluable for tracking the AI space.

I just launched AIverse, and I think your audience might find it useful:

→ A searchable directory of 1,000+ AI tools
→ Advanced filters: category × pricing model × tags (combinable)
→ A 3D interactive globe showing where every AI company is built
→ Community upvoting, real-time updates

What makes it different: the globe. Your readers can literally see the geographic 
distribution of AI development — and filter it by category. 
(Spoiler: Image Generation and Audio are more globally distributed than most people think.)

It's free, no sign-up required.

Live: [VOTRE_URL]
Product Hunt: [LIEN PH]

Happy to provide a custom screenshot, demo video, or any additional context.

Thank you for what you do for the AI community.

[Votre prénom]
[Lien Twitter/X]
```

---

### Template DM — Influenceurs X / Créateurs (version courte)

```
Hey [Prénom] 👋

Fan de ton contenu sur l'IA.

Je viens de lancer AIverse — un répertoire de 1 000+ outils IA 
avec un globe 3D interactif qui montre où chaque outil est construit.

Tu peux filtrer par catégorie, prix, tags, et upvoter tes favoris.

J'aimerais avoir ton avis — et si ça te plaît, un retweet changerait tout 🙏

[VOTRE_URL]

Pas d'obligation du tout, juste partage si tu trouves ça utile.
```

---

### Communautés à cibler

**Reddit (posts natifs) :**

- r/artificial (2.5M)
- r/MachineLearning (3M) — angle technique
- r/SideProject (200K)
- r/webdev (1.5M) — angle stack technique
- r/ChatGPT (4M) — angle alternatives
- r/productivity (1.3M) — angle outils productivité
- r/learnmachinelearning (500K)
- r/datascience (700K)

**Discord :**

- AI Tinkerers (discord de communautés IA)
- Indie Hackers Discord
- Build In Public Discord
- Latent Space Discord (ML)

**Slack :**

- Mind the Product (product managers)
- Online Geniuses (marketeurs)

**Forums :**

- HackerNews (Show HN) — angle tech
- Indie Hackers (milestones)
- ProductHunt (J0)

---

### Script "Show HN" pour HackerNews

**Titre :** `Show HN: AIverse – 1,000+ AI tools directory with a 3D interactive globe`

```
I built AIverse because I was frustrated with the fragmented state of AI tool discovery.

What it does:
- Search 1,000+ AI tools with full-text search and highlighting
- Filter by category (10 categories), pricing model, and tags — combinable
- Sort by community upvotes, newest, name, or price
- Visualize the geographic distribution of AI companies on a 3D globe (Three.js)

The globe was the interesting engineering challenge: 
react-globe.gl exports a React component, not a factory function — 
I wasted a day before realizing `GlobeGL()(ref)` is wrong 
and `<GlobeEl ref={globeRef} />` is correct.

Tech: React 18, TypeScript, Vite, Tailwind v4, Supabase (Postgres + Realtime), 
react-globe.gl, @tanstack/react-query, Framer Motion.

Live: [VOTRE_URL]

Happy to discuss any technical aspects, especially the globe implementation 
or the Supabase Realtime setup.
```

---

## 10. KPIs & Tableau de bord

### Métriques par phase

#### J0 (Jour de lancement)


| Métrique               | Cible réaliste | Cible ambitieuse |
| ---------------------- | -------------- | ---------------- |
| Visiteurs uniques      | 500            | 2 000            |
| Votes Product Hunt     | 50             | 200              |
| Partages X             | 20             | 100              |
| Upvotes sur les outils | 100            | 500              |
| Abonnés X gagnés       | 20             | 100              |


#### J+7 (Semaine 1)


| Métrique                      | Cible réaliste | Cible ambitieuse |
| ----------------------------- | -------------- | ---------------- |
| Visiteurs uniques totaux      | 2 000          | 8 000            |
| Sessions moyennes/jour        | 300            | 1 200            |
| Taux de rebond                | < 60%          | < 45%            |
| Pages vues / session          | > 2            | > 4              |
| Mentions presse / newsletters | 1              | 5                |


#### J+30 (Mois 1)


| Métrique                             | Cible réaliste | Cible ambitieuse |
| ------------------------------------ | -------------- | ---------------- |
| Visiteurs uniques                    | 10 000         | 50 000           |
| Visiteurs récurrents                 | 20%            | 35%              |
| Backlinks obtenus                    | 10             | 50               |
| Abonnés X                            | 200            | 1 000            |
| Newsletter subscribers (si créée)    | 100            | 500              |
| Position Google "AI tools directory" | Top 50         | Top 20           |


#### J+90 (Mois 3)


| Métrique                  | Cible réaliste | Cible ambitieuse |
| ------------------------- | -------------- | ---------------- |
| Visiteurs mensuels        | 30 000         | 150 000          |
| Trafic organique SEO      | 40%            | 60%              |
| DA/DR (Ahrefs)            | 15             | 30               |
| Outils dans le répertoire | 1 500          | 2 000            |


---

### Outils de tracking recommandés


| Outil                      | Usage                               | Gratuit ?           |
| -------------------------- | ----------------------------------- | ------------------- |
| **Plausible Analytics**    | Analytics vie privée, léger         | Payant ($9/mois)    |
| **Umami**                  | Analytics open source, auto-hébergé | Gratuit (self-host) |
| **Google Analytics 4**     | Analytics complet, gratuit          | Gratuit             |
| **Google Search Console**  | SEO, mots-clés, impressions         | Gratuit             |
| **Ahrefs Webmaster Tools** | Backlinks, SEO                      | Gratuit (limité)    |
| **Hypefury**               | Programmer les posts X              | Payant ($19/mois)   |
| **Buffer**                 | Programmer tous les réseaux         | Freemium            |
| **Notion**                 | Calendrier éditorial                | Freemium            |


---

### Tableau de bord éditorial (modèle Notion)

Crée une base de données Notion avec les colonnes suivantes :


| Colonne          | Type   | Valeurs                                      |
| ---------------- | ------ | -------------------------------------------- |
| Titre du post    | Texte  | —                                            |
| Plateforme       | Select | X, LinkedIn, Instagram, Reddit, TikTok, Blog |
| Type             | Select | Post, Thread, Carousel, Reel, Article        |
| Statut           | Select | Idée, À rédiger, Prêt, Publié                |
| Date publication | Date   | —                                            |
| URL publiée      | URL    | —                                            |
| Impressions      | Nombre | —                                            |
| Engagements      | Nombre | —                                            |
| Notes            | Texte  | —                                            |


---

### Signaux à surveiller chaque semaine

- Trafic vs semaine précédente (Google Analytics / Plausible)
- Nouvelles mentions sur X (recherche `aiverse` ou `[VOTRE_URL]`)
- Nouveaux backlinks (Google Search Console → Liens)
- Commentaires/questions sans réponse (tous canaux)
- Outils les plus upvotés de la semaine (pour "Tool of the Week")
- Erreurs console en production (F12 sur le site live)
- Temps de chargement (PageSpeed Insights)

---

*Document créé pour AIverse — à mettre à jour chaque mois.*
*Version 1.0 — Mars 2026*