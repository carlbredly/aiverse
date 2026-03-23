import type { AiTool, Category, CountryCluster } from './types'

export const CATEGORY_COLORS: Record<string, string> = {
  'Text Generation': '#A78BFA',
  'Image Generation': '#F472B6',
  'Code': '#00E5FF',
  'Audio': '#FB923C',
  'Video': '#F87171',
  'Productivity': '#6EE7B7',
  'Search': '#FCD34D',
  'Data': '#818CF8',
  'Multimodal': '#FF6BA8',
  'Agent': '#2DD4BF',
}

export const COUNTRY_NAMES: Record<string, string> = {
  US: 'United States', GB: 'United Kingdom', FR: 'France', DE: 'Germany',
  CN: 'China', IN: 'India', CA: 'Canada', AU: 'Australia', IL: 'Israel',
  SE: 'Sweden', JP: 'Japan', KR: 'South Korea', SG: 'Singapore',
  NL: 'Netherlands', CH: 'Switzerland', ES: 'Spain', CZ: 'Czech Republic',
  PL: 'Poland', BR: 'Brazil', AM: 'Armenia', CY: 'Cyprus', HU: 'Hungary',
}

export function buildClusters(tools: AiTool[], selectedCategory?: Category | null): CountryCluster[] {
  const map = new Map<string, CountryCluster>()

  for (const tool of tools) {
    if (selectedCategory && tool.category !== selectedCategory) continue
    const key = tool.country_code
    if (!map.has(key)) {
      map.set(key, {
        country_code: tool.country_code,
        country_name: COUNTRY_NAMES[tool.country_code] ?? tool.country_code,
        lat: tool.lat,
        lng: tool.lng,
        tools: [],
        count: 0,
      })
    }
    const cluster = map.get(key)!
    cluster.tools.push(tool)
    cluster.count++
  }

  return Array.from(map.values()).sort((a, b) => b.count - a.count)
}
