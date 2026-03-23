import { useMutation } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'

type SubscribeStatus = 'idle' | 'loading' | 'success' | 'already' | 'error'

interface SubscribeResult {
  status: SubscribeStatus
  message: string
}

async function insertSubscriber(email: string): Promise<SubscribeResult> {
  const { error } = await supabase
    .from('newsletter_subscribers')
    .insert({ email: email.trim().toLowerCase() })

  if (!error) {
    return { status: 'success', message: "You're in! Welcome to the AIverse newsletter." }
  }

  // PostgreSQL unique-violation error code
  if (error.code === '23505') {
    return { status: 'already', message: 'This email is already subscribed.' }
  }

  return { status: 'error', message: 'Something went wrong. Please try again.' }
}

export function useNewsletter() {
  const mutation = useMutation<SubscribeResult, Error, string>({
    mutationFn: insertSubscriber,
  })

  return {
    subscribe: mutation.mutate,
    isPending: mutation.isPending,
    result: mutation.data ?? null,
    reset: mutation.reset,
  }
}
