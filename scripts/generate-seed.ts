/**
 * AIverse — Seed Generator Script
 * Generates 1000+ synthetic but realistic AI tools as SQL INSERT statements.
 *
 * Usage:
 *   npx tsx scripts/generate-seed.ts > supabase/generated-seed.sql
 *
 * Then run generated-seed.sql in Supabase SQL editor after seed.sql.
 */

// ─── Types ────────────────────────────────────────────────────────────────────
type Category =
  | 'Text Generation' | 'Image Generation' | 'Code' | 'Audio' | 'Video'
  | 'Productivity' | 'Search' | 'Data' | 'Multimodal' | 'Agent'

type PricingModel = 'Free' | 'Freemium' | 'Paid' | 'Open Source' | 'Enterprise'

interface GeoLocation {
  country_code: string
  country_name: string
  lat: number
  lng: number
}

// ─── Geographic data ──────────────────────────────────────────────────────────
const GEO_LOCATIONS: GeoLocation[] = [
  { country_code: 'US', country_name: 'United States', lat: 37.7749, lng: -122.4194 },
  { country_code: 'US', country_name: 'United States (NYC)', lat: 40.7128, lng: -74.0060 },
  { country_code: 'US', country_name: 'United States (Austin)', lat: 30.2672, lng: -97.7431 },
  { country_code: 'US', country_name: 'United States (Seattle)', lat: 47.6062, lng: -122.3321 },
  { country_code: 'US', country_name: 'United States (Boston)', lat: 42.3601, lng: -71.0589 },
  { country_code: 'GB', country_name: 'United Kingdom', lat: 51.5074, lng: -0.1278 },
  { country_code: 'FR', country_name: 'France', lat: 48.8566, lng: 2.3522 },
  { country_code: 'DE', country_name: 'Germany', lat: 52.5200, lng: 13.4050 },
  { country_code: 'CN', country_name: 'China (Beijing)', lat: 39.9042, lng: 116.4074 },
  { country_code: 'CN', country_name: 'China (Shanghai)', lat: 31.2304, lng: 121.4737 },
  { country_code: 'CN', country_name: 'China (Hangzhou)', lat: 30.2741, lng: 120.1551 },
  { country_code: 'IN', country_name: 'India', lat: 28.6139, lng: 77.2090 },
  { country_code: 'CA', country_name: 'Canada', lat: 43.6532, lng: -79.3832 },
  { country_code: 'AU', country_name: 'Australia', lat: -33.8688, lng: 151.2093 },
  { country_code: 'IL', country_name: 'Israel', lat: 32.0853, lng: 34.7818 },
  { country_code: 'SE', country_name: 'Sweden', lat: 59.3293, lng: 18.0686 },
  { country_code: 'JP', country_name: 'Japan', lat: 35.6762, lng: 139.6503 },
  { country_code: 'KR', country_name: 'South Korea', lat: 37.5665, lng: 126.9780 },
  { country_code: 'SG', country_name: 'Singapore', lat: 1.3521, lng: 103.8198 },
  { country_code: 'NL', country_name: 'Netherlands', lat: 52.3676, lng: 4.9041 },
  { country_code: 'CH', country_name: 'Switzerland', lat: 47.3769, lng: 8.5417 },
  { country_code: 'ES', country_name: 'Spain', lat: 40.4168, lng: -3.7038 },
  { country_code: 'CZ', country_name: 'Czech Republic', lat: 50.0755, lng: 14.4378 },
  { country_code: 'PL', country_name: 'Poland', lat: 52.2297, lng: 21.0122 },
  { country_code: 'BR', country_name: 'Brazil', lat: -23.5505, lng: -46.6333 },
]

// ─── Category-specific data ───────────────────────────────────────────────────
const CATEGORY_DATA: Record<Category, {
  name_prefixes: string[]
  name_suffixes: string[]
  verbs: string[]
  use_cases: string[]
  tags: string[][]
  company_suffixes: string[]
}> = {
  'Text Generation': {
    name_prefixes: ['Write','Draft','Pen','Scribe','Author','Quill','Prose','Ink','Word','Text','Copy','Article','Story','Essay','Content'],
    name_suffixes: ['AI','Bot','Gen','Studio','Lab','Pro','Plus','Craft','Mind','Brain','Flow','Sync','Hub','Forge'],
    verbs: ['writes','generates','drafts','creates','produces','composes'],
    use_cases: ['blog posts','marketing copy','essays','reports','emails','social media content','product descriptions','news articles','creative fiction'],
    tags: [
      ['writing','content creation','LLM','blog'],
      ['copywriting','marketing','brand','SEO'],
      ['creative writing','fiction','storytelling','narrative'],
      ['email','business writing','productivity','drafting'],
      ['summarization','reports','professional','enterprise'],
    ],
    company_suffixes: ['AI','Labs','Technologies','Corp','Inc','Studio','Systems','Works'],
  },
  'Image Generation': {
    name_prefixes: ['Pixel','Vision','Art','Create','Draw','Paint','Image','Visual','Render','Sketch','Canvas','Frame','Lens','Photo','Design'],
    name_suffixes: ['AI','Gen','Studio','Lab','Pro','Plus','Craft','Mind','Diffuse','Forge','Works','Magic','Dream'],
    verbs: ['generates','creates','renders','produces','synthesizes'],
    use_cases: ['marketing visuals','product mockups','concept art','social media images','logo design','illustrations','photo editing'],
    tags: [
      ['image generation','text-to-image','diffusion','art'],
      ['design','marketing','social media','graphics'],
      ['concept art','illustration','creative','professional'],
      ['photo editing','enhancement','upscaling','restoration'],
      ['logo','branding','identity','visual design'],
    ],
    company_suffixes: ['AI','Labs','Studio','Vision','Visuals','Creative','Works'],
  },
  'Code': {
    name_prefixes: ['Code','Dev','Build','Stack','Compile','Debug','Script','Logic','Algo','Function','Deploy','Ship','Launch','Push','Commit'],
    name_suffixes: ['AI','Bot','Copilot','Assist','Pro','Plus','Pilot','Mind','Helper','Buddy','Mate','Pair','Pal'],
    verbs: ['codes','generates','writes','debugs','optimizes','refactors'],
    use_cases: ['code completion','bug fixing','code review','documentation generation','unit testing','refactoring','SQL queries'],
    tags: [
      ['coding','autocomplete','IDE','developer tools'],
      ['debugging','code review','refactoring','quality'],
      ['documentation','comments','explanation','learning'],
      ['testing','unit tests','coverage','QA'],
      ['DevOps','deployment','infrastructure','automation'],
    ],
    company_suffixes: ['AI','Labs','Dev','Code','Systems','Tech','Software','Engineering'],
  },
  'Audio': {
    name_prefixes: ['Sound','Voice','Audio','Speak','Listen','Wave','Tone','Pitch','Beat','Melody','Echo','Sonic','Vocal','Tune','Rhythm'],
    name_suffixes: ['AI','Studio','Lab','Pro','Plus','Cast','Sync','Wave','Forge','Works','Magic','Gen','Mix'],
    verbs: ['generates','synthesizes','clones','transcribes','enhances'],
    use_cases: ['podcast production','voiceovers','music creation','transcription','audio cleanup','dubbing','sound effects'],
    tags: [
      ['voice synthesis','TTS','voice cloning','narration'],
      ['music generation','composition','audio','creative'],
      ['transcription','speech recognition','meetings','notes'],
      ['audio enhancement','noise removal','studio quality','mastering'],
      ['podcast','audio editing','recording','production'],
    ],
    company_suffixes: ['AI','Audio','Studios','Sound','Labs','Music','Voice','Media'],
  },
  'Video': {
    name_prefixes: ['Video','Clip','Film','Reel','Frame','Scene','Motion','Story','Cinema','Flick','Shoot','Cut','Edit','Direct','Cast'],
    name_suffixes: ['AI','Studio','Lab','Pro','Plus','Gen','Forge','Works','Magic','Flow','Sync','Craft','Edit'],
    verbs: ['generates','creates','edits','produces','renders'],
    use_cases: ['short-form video','explainer videos','product demos','training videos','social media clips','avatar videos','translations'],
    tags: [
      ['video generation','text-to-video','AI video','creative'],
      ['video editing','effects','post-production','VFX'],
      ['avatar','digital human','presenter','corporate'],
      ['social media','TikTok','reels','short-form'],
      ['training','eLearning','corporate','enterprise'],
    ],
    company_suffixes: ['AI','Studios','Media','Films','Video','Labs','Creative','Works'],
  },
  'Productivity': {
    name_prefixes: ['Work','Task','Flow','Focus','Plan','Manage','Track','Boost','Smart','Quick','Auto','Sync','Organize','Schedule','Assist'],
    name_suffixes: ['AI','Bot','Pro','Plus','Hub','Desk','Flow','Pilot','Helper','Assistant','Suite','Mate','OS'],
    verbs: ['automates','organizes','schedules','optimizes','manages'],
    use_cases: ['task management','email management','calendar scheduling','document drafting','meeting summaries','knowledge management','team communication'],
    tags: [
      ['productivity','task management','workflow','automation'],
      ['email','inbox management','communication','business'],
      ['calendar','scheduling','time management','focus'],
      ['notes','knowledge base','organization','personal'],
      ['meetings','summaries','action items','team'],
    ],
    company_suffixes: ['AI','Labs','Inc','Technologies','Software','Works','Apps','Tools'],
  },
  'Search': {
    name_prefixes: ['Search','Find','Seek','Discover','Explore','Scan','Query','Look','Browse','Index','Fetch','Retrieve','Scout','Hunt','Trace'],
    name_suffixes: ['AI','Engine','Pro','Plus','Search','Find','Seek','Scout','Bot','Assistant'],
    verbs: ['searches','finds','discovers','retrieves','indexes'],
    use_cases: ['web research','academic research','competitive intelligence','fact-checking','content discovery','semantic search','real-time information'],
    tags: [
      ['search','AI search','web','research'],
      ['semantic search','RAG','embeddings','retrieval'],
      ['academic','research','papers','citations'],
      ['real-time','news','current events','live data'],
      ['enterprise search','internal knowledge','documents','Intranet'],
    ],
    company_suffixes: ['AI','Search','Labs','Inc','Technologies','Corp'],
  },
  'Data': {
    name_prefixes: ['Data','Insight','Analyze','Query','Chart','Stats','Metric','Report','Dash','Viz','Predict','Forecast','Model','Mine','Process'],
    name_suffixes: ['AI','Analytics','Pro','Plus','Lab','Studio','Hub','Insights','Intelligence','IQ','Engine'],
    verbs: ['analyzes','visualizes','processes','transforms','predicts'],
    use_cases: ['data analysis','business intelligence','predictive analytics','data cleaning','ETL pipelines','SQL generation','dashboard creation'],
    tags: [
      ['analytics','data analysis','BI','visualization'],
      ['machine learning','AutoML','predictions','modeling'],
      ['SQL','natural language','database','query generation'],
      ['ETL','data pipeline','integration','transformation'],
      ['dashboard','reporting','KPIs','business intelligence'],
    ],
    company_suffixes: ['AI','Analytics','Data','Labs','Technologies','Intelligence','Insights'],
  },
  'Multimodal': {
    name_prefixes: ['Multi','Omni','Universal','All','Total','Complete','Unified','Hybrid','Fusion','Combined','Integrated','Cross','Trans','Meta','Ultra'],
    name_suffixes: ['AI','Model','Mind','Brain','Intelligence','Vision','Sense','Understand','Perceive','Reason'],
    verbs: ['understands','processes','analyzes','generates','interprets'],
    use_cases: ['visual question answering','document analysis','chart understanding','image captioning','multimodal chat','cross-modal reasoning'],
    tags: [
      ['multimodal','vision','text','audio'],
      ['image understanding','visual reasoning','VQA','OCR'],
      ['document analysis','PDF','charts','tables'],
      ['real-time','voice','conversation','assistant'],
      ['research','science','complex reasoning','frontier'],
    ],
    company_suffixes: ['AI','Labs','Intelligence','Research','Technologies','Systems'],
  },
  'Agent': {
    name_prefixes: ['Agent','Auto','Auto','Task','Action','Execute','Run','Operate','Delegate','Assign','Direct','Command','Instruct','Goal','Mission'],
    name_suffixes: ['AI','Agent','Bot','Pilot','Worker','Executor','Runner','Operator','GPT','Mind','Brain','Force'],
    verbs: ['executes','automates','orchestrates','plans','completes'],
    use_cases: ['autonomous task execution','web browsing','research automation','email drafting','calendar management','CRM updates','multi-step workflows'],
    tags: [
      ['autonomous agent','task automation','LLM','planning'],
      ['web browsing','research','information gathering','automation'],
      ['workflow automation','multi-step','orchestration','tools'],
      ['coding agent','software engineering','deployment','DevOps'],
      ['business automation','CRM','email','enterprise workflows'],
    ],
    company_suffixes: ['AI','Labs','Inc','Automations','Technologies','Systems','Works'],
  },
}

const PRICING_OPTIONS: { model: PricingModel; price: number | null }[] = [
  { model: 'Free', price: null },
  { model: 'Freemium', price: 9.99 },
  { model: 'Freemium', price: 14.99 },
  { model: 'Freemium', price: 19.99 },
  { model: 'Freemium', price: 29.99 },
  { model: 'Paid', price: 9.99 },
  { model: 'Paid', price: 19.99 },
  { model: 'Paid', price: 49.99 },
  { model: 'Paid', price: 99.00 },
  { model: 'Open Source', price: null },
  { model: 'Enterprise', price: null },
]

// ─── Utility functions ────────────────────────────────────────────────────────
function pick<T>(arr: T[], seed: number): T {
  return arr[Math.abs(seed) % arr.length]
}

function hashStr(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

function escSql(s: string): string {
  return s.replace(/'/g, "''")
}

function randomUpvotes(seed: number, featured: boolean): number {
  const base = (seed % 3000) + 100
  return featured ? base + 1000 : base
}

function generateToolName(category: Category, index: number): string {
  const data = CATEGORY_DATA[category]
  const seed = hashStr(category + index)
  const prefix = pick(data.name_prefixes, seed)
  const suffix = pick(data.name_suffixes, seed + 7)
  // Avoid exact duplicates by adding numeric suffix for high indexes
  if (index > data.name_prefixes.length * data.name_suffixes.length * 0.7) {
    return `${prefix}${suffix} ${(index % 9) + 2}.0`
  }
  return `${prefix}${suffix}`
}

function generateCompany(toolName: string, category: Category): string {
  const data = CATEGORY_DATA[category]
  const seed = hashStr(toolName)
  const suffix = pick(data.company_suffixes, seed)
  // Take first 2 chars or prefix as company name
  const base = toolName.replace(/[0-9.]/g, '').trim()
  return `${base} ${suffix}`
}

function generateDescription(category: Category, toolName: string, useCase: string): string {
  const data = CATEGORY_DATA[category]
  const seed = hashStr(toolName)
  const verb = pick(data.verbs, seed)
  return `${toolName} ${verb} ${useCase} using advanced AI to help teams and individuals work faster and smarter.`
}

function generateLongDescription(category: Category, toolName: string, useCase: string): string {
  const data = CATEGORY_DATA[category]
  const seed = hashStr(toolName)
  const verb = pick(data.verbs, seed + 3)
  return `${toolName} is a cutting-edge AI platform that ${verb} ${useCase}. Built on the latest foundation models, it offers enterprise-grade reliability, a developer-friendly API, and seamless integrations with popular tools in your existing workflow. Trusted by thousands of teams worldwide for its accuracy, speed, and ease of use.`
}

function pgArray(arr: string[]): string {
  return `ARRAY[${arr.map((t) => `'${escSql(t)}'`).join(',')}]`
}

// ─── Main generator ───────────────────────────────────────────────────────────
const CATEGORIES: Category[] = [
  'Text Generation', 'Image Generation', 'Code', 'Audio', 'Video',
  'Productivity', 'Search', 'Data', 'Multimodal', 'Agent',
]

// Tools per category to reach ~1000 total (excluding the 75 in seed.sql)
const TOOLS_PER_CATEGORY = 93 // 93 × 10 = 930 + 75 = 1005 total

function generateAllTools(): string {
  const lines: string[] = []
  lines.push('-- AIverse Generated Seed — ~930 additional AI tools')
  lines.push('-- Run AFTER supabase/seed.sql')
  lines.push('')
  lines.push('INSERT INTO public.ai_tools (name, description, long_description, category, tags, pricing_model, price_starting, website_url, logo_url, founded_year, company, is_featured, upvotes, country_code, lat, lng) VALUES')

  const allValues: string[] = []

  for (const category of CATEGORIES) {
    const data = CATEGORY_DATA[category]

    for (let i = 0; i < TOOLS_PER_CATEGORY; i++) {
      const toolName = generateToolName(category, i)
      const seed = hashStr(toolName + category)
      const company = generateCompany(toolName, category)
      const useCaseIdx = seed % data.use_cases.length
      const useCase = data.use_cases[useCaseIdx]
      const description = generateDescription(category, toolName, useCase)
      const longDesc = generateLongDescription(category, toolName, useCase)
      const tagsArr = data.tags[seed % data.tags.length]
      const pricingOpt = pick(PRICING_OPTIONS, seed + 5)
      const geo = pick(GEO_LOCATIONS, seed + 2)
      const foundedYear = 2018 + (seed % 7) // 2018-2024
      const isFeatured = seed % 40 === 0
      const upvotes = randomUpvotes(seed, isFeatured)
      const websiteUrl = `https://${toolName.toLowerCase().replace(/[^a-z0-9]/g, '')}.ai`
      const logoUrl = ''
      const priceStr = pricingOpt.price !== null ? pricingOpt.price.toFixed(2) : 'null'

      allValues.push(
        `('${escSql(toolName)}',` +
        `'${escSql(description)}',` +
        `'${escSql(longDesc)}',` +
        `'${escSql(category)}',` +
        `${pgArray(tagsArr)},` +
        `'${pricingOpt.model}',` +
        `${priceStr},` +
        `'${websiteUrl}',` +
        `'${logoUrl}',` +
        `${foundedYear},` +
        `'${escSql(company)}',` +
        `${isFeatured},` +
        `${upvotes},` +
        `'${geo.country_code}',` +
        `${geo.lat},` +
        `${geo.lng})`
      )
    }
  }

  lines.push(allValues.join(',\n'))
  lines.push(';')
  lines.push('')
  lines.push(`-- Generated ${allValues.length} tools across ${CATEGORIES.length} categories`)

  return lines.join('\n')
}

// ─── Output ───────────────────────────────────────────────────────────────────
process.stdout.write(generateAllTools())
