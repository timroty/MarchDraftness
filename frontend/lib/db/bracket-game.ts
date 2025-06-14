import { createClient, QueryData } from '@supabase/supabase-js'
import { Database } from '../types/database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

const allBracketGamesQuery = supabase.from('BracketGame').select(`
  game_number,
  year,
  team_one:Team!team_one(
    name,
    seed
  ),
  team_two:Team!team_two (
    name,
    seed
  )
`)

export type AllBracketGamesQueryResult = QueryData<typeof allBracketGamesQuery>

export async function getBracketForYear(year: number): Promise<AllBracketGamesQueryResult | null> {
  const { data, error } = await allBracketGamesQuery
    .eq('year', year)

  if (error) {
    console.error('Error fetching league year:', error)
  }

  return data
} 