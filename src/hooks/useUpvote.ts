import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import type { AiTool } from '../lib/types'

const UPVOTED_KEY = 'aiverse_upvoted_tools'

function getUpvotedTools(): Set<string> {
  try {
    const stored = localStorage.getItem(UPVOTED_KEY)
    return stored ? new Set(JSON.parse(stored) as string[]) : new Set()
  } catch {
    return new Set()
  }
}

function saveUpvotedTools(set: Set<string>): void {
  try {
    localStorage.setItem(UPVOTED_KEY, JSON.stringify(Array.from(set)))
  } catch {
    // ignore
  }
}

export function useUpvote() {
  const queryClient = useQueryClient()

  const hasUpvoted = (toolId: string): boolean => {
    return getUpvotedTools().has(toolId)
  }

  const mutation = useMutation({
    mutationFn: async (toolId: string) => {
      const upvoted = getUpvotedTools()
      if (upvoted.has(toolId)) {
        throw new Error('Already upvoted')
      }

      const { error } = await supabase.rpc('increment_upvote', {
        tool_id: toolId,
      })
      if (error) throw error

      upvoted.add(toolId)
      saveUpvotedTools(upvoted)
      return toolId
    },
    onMutate: async (toolId: string) => {
      await queryClient.cancelQueries({ queryKey: ['tools'] })

      const previousQueries = queryClient.getQueriesData<AiTool[]>({ queryKey: ['tools'] })

      queryClient.setQueriesData<AiTool[]>({ queryKey: ['tools'] }, (old) => {
        if (!old) return old
        return old.map((tool) =>
          tool.id === toolId ? { ...tool, upvotes: tool.upvotes + 1 } : tool
        )
      })

      return { previousQueries }
    },
    onError: (_err, _toolId, context) => {
      if (context?.previousQueries) {
        for (const [queryKey, data] of context.previousQueries) {
          queryClient.setQueryData(queryKey, data)
        }
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ['tools'] })
    },
  })

  return {
    upvote: mutation.mutate,
    hasUpvoted,
    isPending: mutation.isPending,
  }
}
