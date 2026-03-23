export type PricingModel = 'Free' | 'Freemium' | 'Paid' | 'Open Source' | 'Enterprise'

export type Category =
  | 'Text Generation'
  | 'Image Generation'
  | 'Code'
  | 'Audio'
  | 'Video'
  | 'Productivity'
  | 'Search'
  | 'Data'
  | 'Multimodal'
  | 'Agent'

export type SortOption = 'upvotes' | 'newest' | 'name' | 'price'

export interface AiTool {
  id: string
  name: string
  slug?: string
  description: string
  long_description: string
  category: Category
  tags: string[]
  pricing_model: PricingModel
  price_starting: number | null
  website_url: string
  logo_url: string
  founded_year: number | null
  company: string
  is_featured: boolean
  upvotes: number
  click_count?: number
  created_at: string
  country_code: string
  lat: number
  lng: number
}

export interface ToolSubmission {
  id: string
  name: string
  description: string
  category: Category
  pricing_model: PricingModel
  website_url: string
  logo_url: string
  company: string
  founded_year: number | null
  tags: string[]
  submitter_email: string
  notes: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

export interface GlobePoint {
  lat: number
  lng: number
  label: string
  color: string
  size: number
  tool: AiTool
}

export interface CountryCluster {
  country_code: string
  country_name: string
  lat: number
  lng: number
  tools: AiTool[]
  count: number
}

export interface FilterState {
  search: string
  categories: Category[]
  pricingModels: PricingModel[]
  tags: string[]
  sortBy: SortOption
}

export const CATEGORIES: Category[] = [
  'Text Generation',
  'Image Generation',
  'Code',
  'Audio',
  'Video',
  'Productivity',
  'Search',
  'Data',
  'Multimodal',
  'Agent',
]

export const PRICING_MODELS: PricingModel[] = [
  'Free',
  'Freemium',
  'Paid',
  'Open Source',
  'Enterprise',
]

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'upvotes', label: 'Most Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'name', label: 'Name A–Z' },
  { value: 'price', label: 'Price Low–High' },
]
