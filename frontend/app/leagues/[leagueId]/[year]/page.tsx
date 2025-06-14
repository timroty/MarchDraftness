import { createClient } from "@/utils/supabase/server";
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getLeagueYearByUserId } from "@/lib/db/league-year-player";
import SingleElimination from "@/components/bracketother";
import GameBracket from "@/components/bracket";
import { getBracketForYear } from "@/lib/db/bracket-game";
import { createRoundsAndSeeds } from "@/lib/bracket/utils";

export default async function LeagueYearPage({ 
  params 
}: { 
  params: { 
    leagueId: string;
    year: string;
  } 
}) {
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  if (!user) {
    return redirect("/sign-in");
  }

  var resolvedParams = await params;

  const year = Number(resolvedParams.year)
  const leagueId = Number(resolvedParams.leagueId)
  
  const leagueYear = (await getLeagueYearByUserId(user.id, leagueId, year))?.league_year

  if (!leagueYear) {
    return redirect("/leagues");
  }

  const leagueName = leagueYear.league.name;

  const bracketForYear = await getBracketForYear(2025);
  const rounds = createRoundsAndSeeds(bracketForYear ?? []);

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="max-w-screen mx-auto w-full px-4">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/leagues" className="text-blue-600 hover:underline">
            Leagues
          </Link>
          <span>/</span>
          <Link href={`/leagues/${leagueId}/year`} className="text-blue-600 hover:underline">
            {leagueName}
          </Link>
          <span>/</span>
          <h1 className="text-3xl font-bold">{year}</h1>
        </div>
        
        <div className="shadow p-6 w-full">
          <h2 className="text-2xl font-semibold mb-4">{leagueName} - {year}</h2>
          
          {/* Add your league year content here */}
          <div className="space-y-4">
            <p className="text-gray-600">
              This is the league year page for {leagueName} in {year}.
            </p>
            
            {/* Example sections you might want to add */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Your Teams</h3>
              <p className="text-gray-600">You don't have any teams in this league year yet.</p>
            </div>
            
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">League Standings</h3>
              <p className="text-gray-600">Standings will be available once the tournament begins.</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto max-w-md md:max-w-2xl lg:max-w-5xl xl:max-w-6xl">
          <GameBracket rounds={rounds}></GameBracket>
        </div>
      </div>
    </div>
  );
} 