import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Add your Supabase URL and anon key
const supabaseUrl: string = 'https://mrsiladtylktyicvoedi.supabase.co'
const supabaseAnonKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yc2lsYWR0eWxrdHlpY3ZvZWRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0NDQ0NzAsImV4cCI6MjA3NDAyMDQ3MH0.bFzUlXZvg5sXllyhqGfo2rkIl1zJvDHGDh6oCbR3exI'

// Export the client
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)
