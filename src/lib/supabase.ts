import { createClient } from '@supabase/supabase-js'
import type { AiTool } from './types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase environment variables are missing. ' +
    'Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env.local file.'
  )
}

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '')

export type Database = {
  public: {
    Tables: {
      ai_tools: {
        Row: AiTool
        Insert: Omit<AiTool, 'id' | 'created_at' | 'upvotes'>
        Update: Partial<AiTool>
      }
    }
  }
}
