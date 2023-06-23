
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cgcwnuqfhsqatbznrbyn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnY3dudXFmaHNxYXRiem5yYnluIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc0MTY0NTYsImV4cCI6MjAwMjk5MjQ1Nn0.bwWZzbnYbllr-drJf59v0rs8_5KPe_A-G7DajM4w9Ig'
export const supabase = createClient(supabaseUrl, supabaseKey)