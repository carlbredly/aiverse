import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { supabase } from '../lib/supabase'
import type { AiTool, FilterState, SortOption } from '../lib/types'
import { useDebounce } from './useDebounce'

function buildQueryKey(filters: FilterState) {
  return ['tools', filters] as const
}

async function fetchTools(filters: FilterState): Promise<AiTool[]> {
  let query = supabase.from('ai_tools').select('*')

  if (filters.search.trim()) {
    const term = filters.search.trim()
    query = query.or(
      `name.ilike.%${term}%,description.ilike.%${term}%,company.ilike.%${term}%`
    )
  }

  if (filters.categories.length > 0) {
    query = query.in('category', filters.categories)
  }

  if (filters.pricingModels.length > 0) {
    query = query.in('pricing_model', filters.pricingModels)
  }

  if (filters.tags.length > 0) {
    query = query.overlaps('tags', filters.tags)
  }

  query = applySorting(query, filters.sortBy)

  const { data, error } = await query

  if (error) throw error
  return (data as AiTool[]) ?? []
}

function applySorting(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: any,
  sortBy: SortOption
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
  switch (sortBy) {
    case 'upvotes':
      return query.order('upvotes', { ascending: false })
    case 'newest':
      return query.order('created_at', { ascending: false })
    case 'name':
      return query.order('name', { ascending: true })
    case 'price':
      return query
        .order('price_starting', { ascending: true, nullsFirst: false })
    default:
      return query.order('upvotes', { ascending: false })
  }
}

export function useTools(filters: FilterState) {
  const debouncedSearch = useDebounce(filters.search, 300)

  const debouncedFilters = useMemo(
    () => ({ ...filters, search: debouncedSearch }),
    [filters, debouncedSearch]
  )

  return useQuery({
    queryKey: buildQueryKey(debouncedFilters),
    queryFn: () => fetchTools(debouncedFilters),
    placeholderData: (prev) => prev,
  })
}

export function useAllTags() {
  return useQuery({
    queryKey: ['all-tags'],
    queryFn: async (): Promise<string[]> => {
      const { data, error } = await supabase
        .from('ai_tools')
        .select('tags')

      if (error) throw error

      const tagSet = new Set<string>()
      for (const row of data ?? []) {
        for (const tag of row.tags ?? []) {
          tagSet.add(tag)
        }
      }

      return Array.from(tagSet).sort()
    },
    staleTime: 1000 * 60 * 10,
  })
}

export function useToolsCount() {
  return useQuery({
    queryKey: ['tools-count'],
    queryFn: async (): Promise<number> => {
      const { count, error } = await supabase
        .from('ai_tools')
        .select('*', { count: 'exact', head: true })

      if (error) throw error
      return count ?? 0
    },
    staleTime: 1000 * 60 * 5,
  })
}

export function useRelatedTools(category: string, excludeId: string) {
  return useQuery({
    queryKey: ['related-tools', category, excludeId],
    queryFn: async (): Promise<AiTool[]> => {
      const { data, error } = await supabase
        .from('ai_tools')
        .select('*')
        .eq('category', category)
        .neq('id', excludeId)
        .order('upvotes', { ascending: false })
        .limit(3)

      if (error) throw error
      return (data as AiTool[]) ?? []
    },
    enabled: !!category && !!excludeId,
  })
}

/**
 * Subscribe to Supabase Realtime changes on ai_tools.
 * Any INSERT / UPDATE / DELETE invalidates the query cache automatically.
 * Requires Replication enabled for ai_tools in the Supabase dashboard:
 * Database → Replication → Source → ai_tools ✓
 */
export function useRealtimeSync() {
  const queryClient = useQueryClient()

  useEffect(() => {
    // Only subscribe if Supabase is properly configured
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) return

    let channel: ReturnType<typeof supabase.channel> | null = null

    try {
      channel = supabase
        .channel('aiverse_realtime')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'ai_tools' },
          () => {
            void queryClient.invalidateQueries({ queryKey: ['tools'] })
            void queryClient.invalidateQueries({ queryKey: ['tools-count'] })
            void queryClient.invalidateQueries({ queryKey: ['all-tags'] })
            void queryClient.invalidateQueries({ queryKey: ['globe-tools'] })
          }
        )
        .subscribe((status) => {
          if (status === 'CHANNEL_ERROR') {
            console.warn('[AIverse] Realtime subscription failed. Enable Replication in Supabase dashboard.')
          }
        })
    } catch (err) {
      console.warn('[AIverse] Realtime setup failed:', err)
    }

    return () => {
      if (channel) void supabase.removeChannel(channel)
    }
  }, [queryClient])
}

export function useGlobeTools() {
  return useQuery({
    queryKey: ['globe-tools'],
    queryFn: async (): Promise<AiTool[]> => {
      const { data, error } = await supabase
        .from('ai_tools')
        .select('id,name,category,company,is_featured,upvotes,country_code,lat,lng,pricing_model,description,logo_url,website_url,tags,long_description,price_starting,founded_year,created_at')
        .order('upvotes', { ascending: false })

      if (error) throw error
      return (data as AiTool[]) ?? []
    },
    staleTime: 1000 * 60 * 5,
  })
}

export function useURLSync(
  filters: FilterState,
  setFilters: (f: FilterState) => void
) {
  useEffect(() => {
    const params = new URLSearchParams()

    if (filters.search) params.set('q', filters.search)
    if (filters.categories.length) params.set('categories', filters.categories.join(','))
    if (filters.pricingModels.length) params.set('pricing', filters.pricingModels.join(','))
    if (filters.tags.length) params.set('tags', filters.tags.join(','))
    if (filters.sortBy !== 'upvotes') params.set('sort', filters.sortBy)

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname

    window.history.replaceState(null, '', newUrl)
  }, [filters])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlFilters: Partial<FilterState> = {}

    const q = params.get('q')
    if (q) urlFilters.search = q

    const categories = params.get('categories')
    if (categories) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      urlFilters.categories = categories.split(',') as any[]
    }

    const pricing = params.get('pricing')
    if (pricing) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      urlFilters.pricingModels = pricing.split(',') as any[]
    }

    const tags = params.get('tags')
    if (tags) urlFilters.tags = tags.split(',')

    const sort = params.get('sort')
    if (sort) urlFilters.sortBy = sort as SortOption

    if (Object.keys(urlFilters).length > 0) {
      setFilters({ ...filters, ...urlFilters })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
