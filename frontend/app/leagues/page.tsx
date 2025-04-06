import { createClient } from "@/utils/supabase/server";
import { redirect } from 'next/navigation'
import { getLeaguesByUserId } from '@/lib/db/leagues'
import Link from 'next/link'
import { ChevronRight } from "lucide-react";

export default async function LeaguesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const leagues = await getLeaguesByUserId(user.id)

  // Group leagues by year
  const leaguesByYear = leagues.reduce((acc, league) => {
    const year = league.league_year.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(league);
    return acc;
  }, {} as Record<number, typeof leagues>);

  // Sort years in descending order (newest first)
  const sortedYears = Object.keys(leaguesByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="max-w-7xl mx-auto w-full px-4">
        <h1 className="text-3xl font-bold mb-6">Your Leagues</h1>

        {leagues.length === 0 ? (
          <p className="text-gray-600">You are not part of any leagues yet.</p>
        ) : (
          <div className="space-y-8">
            {sortedYears.map((year) => (
              <div key={year}>
                <h2 className="text-2xl font-bold mb-4 pb-2 border-b">
                  {year}
                </h2>
                <div className="w-full">
                  <div className="space-y-3">
                    {leaguesByYear[year].map((league) => (
                      <Link 
                        href={`/leagues/${league.league_year.league.id}/${year}`}
                        key={league.league_year.league.id}
                        className="flex items-center justify-between p-3 hover:bg-secondary rounded"
                      >
                        <h3 className="text-xl font-semibold">
                          {league.league_year.league.name}
                        </h3>
                        <ChevronRight className="h-5 w-5 ml-2 pl-1 text-gray-500" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 