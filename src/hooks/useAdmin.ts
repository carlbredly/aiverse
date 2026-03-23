import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { AiTool, ToolSubmission, Category, PricingModel } from '../lib/types'
import { slugify } from '../lib/slug'

// ── Auth ─────────────────────────────────────────────────────────────────────

export function useAdminAuth() {
  const [session, setSession] = useState<boolean | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(!!data.session)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(!!s)
    })
    return () => subscription.unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  const logout = async () => {
    await supabase.auth.signOut()
  }

  return { session, login, logout }
}

// ── Tool by slug ──────────────────────────────────────────────────────────────

export function useToolBySlug(slug: string) {
  return useQuery({
    queryKey: ['tool-detail', slug],
    queryFn: async (): Promise<AiTool | null> => {
      // Try DB slug column first
      const { data, error } = await supabase
        .from('ai_tools')
        .select('*')
        .eq('slug', slug)
        .maybeSingle()

      if (error) throw error

      if (data) return data as AiTool

      // Fallback: compute slug from name
      const { data: all } = await supabase.from('ai_tools').select('*')
      const match = (all ?? []).find((t: AiTool) => slugify(t.name) === slug)
      return match ?? null
    },
    enabled: !!slug,
  })
}

// ── Submit a tool (public) ───────────────────────────────────────────────────

export function useSubmitTool() {
  return useMutation({
    mutationFn: async (data: Omit<ToolSubmission, 'id' | 'status' | 'created_at'>) => {
      const { error } = await supabase.from('tool_submissions').insert(data)
      if (error) throw error
    },
  })
}

// ── Admin stats ───────────────────────────────────────────────────────────────

export interface AdminStats {
  totalTools: number
  totalUpvotes: number
  newLast7Days: number
  pendingSubmissions: number
  newsletterSubs: number
  topTools: AiTool[]
}

export function useAdminStats() {
  return useQuery<AdminStats>({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [tools, submissions, newsletter, topTools] = await Promise.all([
        supabase.from('ai_tools').select('upvotes, created_at'),
        supabase.from('tool_submissions').select('status').eq('status', 'pending'),
        supabase.from('newsletter_subscribers').select('id', { count: 'exact', head: true }),
        supabase.from('ai_tools').select('*').order('upvotes', { ascending: false }).limit(5),
      ])

      const toolsData = tools.data ?? []
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

      return {
        totalTools: toolsData.length,
        totalUpvotes: toolsData.reduce((s, t) => s + (t.upvotes ?? 0), 0),
        newLast7Days: toolsData.filter((t) => t.created_at >= sevenDaysAgo).length,
        pendingSubmissions: submissions.data?.length ?? 0,
        newsletterSubs: newsletter.count ?? 0,
        topTools: (topTools.data ?? []) as AiTool[],
      }
    },
  })
}

// ── Admin tools CRUD ─────────────────────────────────────────────────────────

export function useAdminTools(search = '') {
  return useQuery<AiTool[]>({
    queryKey: ['admin-tools', search],
    queryFn: async () => {
      let q = supabase.from('ai_tools').select('*').order('created_at', { ascending: false })
      if (search.trim()) {
        q = q.or(`name.ilike.%${search}%,company.ilike.%${search}%`)
      }
      const { data, error } = await q
      if (error) throw error
      return (data ?? []) as AiTool[]
    },
  })
}

export type ToolInput = Omit<AiTool, 'id' | 'created_at' | 'upvotes' | 'click_count'> & { slug?: string }

export function useAdminCreateTool() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (tool: ToolInput) => {
      const payload = { ...tool, slug: tool.slug || slugify(tool.name), upvotes: 0, click_count: 0 }
      const { error } = await supabase.from('ai_tools').insert(payload)
      if (error) throw error
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['admin-tools'] })
      void qc.invalidateQueries({ queryKey: ['tools'] })
      void qc.invalidateQueries({ queryKey: ['admin-stats'] })
    },
  })
}

export function useAdminUpdateTool() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, ...tool }: Partial<AiTool> & { id: string }) => {
      const { error } = await supabase.from('ai_tools').update(tool).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['admin-tools'] })
      void qc.invalidateQueries({ queryKey: ['tools'] })
    },
  })
}

export function useAdminDeleteTool() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('ai_tools').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['admin-tools'] })
      void qc.invalidateQueries({ queryKey: ['tools'] })
      void qc.invalidateQueries({ queryKey: ['admin-stats'] })
    },
  })
}

// ── Submissions ───────────────────────────────────────────────────────────────

export function useAdminSubmissions(status: 'pending' | 'approved' | 'rejected' = 'pending') {
  return useQuery<ToolSubmission[]>({
    queryKey: ['admin-submissions', status],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tool_submissions')
        .select('*')
        .eq('status', status)
        .order('created_at', { ascending: false })
      if (error) throw error
      return (data ?? []) as ToolSubmission[]
    },
  })
}

export function useApproveSubmission() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (submission: ToolSubmission) => {
      // Insert into ai_tools
      const toolData = {
        name: submission.name,
        description: submission.description,
        long_description: '',
        category: submission.category as Category,
        pricing_model: submission.pricing_model as PricingModel,
        website_url: submission.website_url,
        logo_url: submission.logo_url,
        company: submission.company,
        founded_year: submission.founded_year,
        tags: submission.tags,
        is_featured: false,
        upvotes: 0,
        click_count: 0,
        country_code: 'US',
        lat: 37.77,
        lng: -122.41,
        slug: slugify(submission.name),
      }
      const { error: insertError } = await supabase.from('ai_tools').insert(toolData)
      if (insertError) throw insertError

      // Update submission status
      const { error: updateError } = await supabase
        .from('tool_submissions')
        .update({ status: 'approved' })
        .eq('id', submission.id)
      if (updateError) throw updateError
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['admin-submissions'] })
      void qc.invalidateQueries({ queryKey: ['admin-tools'] })
      void qc.invalidateQueries({ queryKey: ['tools'] })
      void qc.invalidateQueries({ queryKey: ['admin-stats'] })
    },
  })
}

export function useRejectSubmission() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('tool_submissions')
        .update({ status: 'rejected' })
        .eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['admin-submissions'] })
      void qc.invalidateQueries({ queryKey: ['admin-stats'] })
    },
  })
}

// ── Click tracking ────────────────────────────────────────────────────────────

export async function trackToolClick(toolId: string) {
  try {
    await supabase.rpc('increment_click', { tool_id: toolId })
  } catch {
    // Non-critical, swallow error
  }
}
