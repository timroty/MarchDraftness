import { createClient, QueryData } from '@supabase/supabase-js'
import { Database } from '../types/database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

const leagueYearPlayerQuery = supabase.from('LeagueYearPlayer').select(`
  league_year:LeagueYear (
    id,
    year,
    league:League (
      id,
      name
    )
  )
`)

type LeagueYearPlayerQueryResult = QueryData<typeof leagueYearPlayerQuery>[0]

export async function getLeagueYearByUserId(userId: string, leagueId: number, year: number): Promise<LeagueYearPlayerQueryResult | null> {
  const { data, error } = await leagueYearPlayerQuery
    .eq('user_id', userId)
    .eq('league_year.league.id', leagueId)
    .eq('league_year.year', year)
    .limit(1)
    .single()

  if (error) {
    console.error('Error fetching league year:', error)
    
  }

  return data
} 