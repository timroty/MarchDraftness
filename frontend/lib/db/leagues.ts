import { createClient, QueryData } from '@supabase/supabase-js'
import { Database } from '../types/database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

const leaguesQuery = supabase.from('LeagueYearPlayer').select(`
  league_year:LeagueYear (
    year,
    league:League (
      id,
      name
    )
  )
`)

type LeagueQueryResult = QueryData<typeof leaguesQuery>

export async function getLeaguesByUserId(userId: string): Promise<LeagueQueryResult> {
  const { data, error } = await leaguesQuery.eq('user_id', userId)

  if (error) {
    console.error('Error fetching leagues:', error)
    return []
  }

  return data
} 