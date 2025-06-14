

import { IRoundProps, ISeedProps } from 'react-brackets';
import { AllBracketGamesQueryResult } from '../db/bracket-game';
import { gameNumberMap } from './backing';

const getQuadOrder = (gameNumber: number) => {
  if (gameNumber >= gameNumberMap.Quad1.Round2.Min && gameNumber <= gameNumberMap.Quad1.Round2.Max) return 1;
  if (gameNumber >= gameNumberMap.Quad2.Round2.Min && gameNumber <= gameNumberMap.Quad2.Round2.Max) return 3;
  if (gameNumber >= gameNumberMap.Quad3.Round2.Min && gameNumber <= gameNumberMap.Quad3.Round2.Max) return 4;
  if (gameNumber >= gameNumberMap.Quad4.Round2.Min && gameNumber <= gameNumberMap.Quad4.Round2.Max) return 2;
  return 4
}

export function createRoundsAndSeeds(games: AllBracketGamesQueryResult): IRoundProps[] {
  let rounds: IRoundProps[] = [];

  // Round of 64
  let roundOf64 :IRoundProps = {
    title: 'Round of 64',
    seeds: [],
  }

  const roundOf64Seeds: ISeedProps[] = games
  .filter(item => 
    (item.game_number >= gameNumberMap.Quad1.Round1.Min && item.game_number <= gameNumberMap.Quad1.Round1.Max)
    || (item.game_number >= gameNumberMap.Quad2.Round1.Min && item.game_number <= gameNumberMap.Quad2.Round1.Max)
    || (item.game_number >= gameNumberMap.Quad3.Round1.Min && item.game_number <= gameNumberMap.Quad3.Round1.Max)
    || (item.game_number >= gameNumberMap.Quad4.Round1.Min && item.game_number <= gameNumberMap.Quad4.Round1.Max)
  )
  //.sort((a, b) => a.game_number - b.game_number)
  .sort((a, b) => {
    const quadA = getQuadOrder(a.game_number);
    const quadB = getQuadOrder(b.game_number);
  
    if (quadA === quadB) {
      return a.game_number - b.game_number;
    }

    return quadA - quadB;
  })
  .map(item => ({
    id: item.game_number,
    key: `key_${item.game_number}`,
    teams: [ { name: item.team_one?.name }, { name: item.team_two?.name } ],
  }));

  roundOf64.seeds = roundOf64Seeds;
  rounds.push(roundOf64);

  // Round of 32
  let roundOf32 :IRoundProps = {
    title: 'Round of 32',
    seeds: [],
  }

  const roundOf32Seeds: ISeedProps[] = games
  .filter(item => 
    (item.game_number >= gameNumberMap.Quad1.Round2.Min && item.game_number <= gameNumberMap.Quad1.Round2.Max)
    || (item.game_number >= gameNumberMap.Quad2.Round2.Min && item.game_number <= gameNumberMap.Quad2.Round2.Max)
    || (item.game_number >= gameNumberMap.Quad3.Round2.Min && item.game_number <= gameNumberMap.Quad3.Round2.Max)
    || (item.game_number >= gameNumberMap.Quad4.Round2.Min && item.game_number <= gameNumberMap.Quad4.Round2.Max)
  )
  //.sort((a, b) => a.game_number - b.game_number)
  .sort((a, b) => {
    const quadA = getQuadOrder(a.game_number);
    const quadB = getQuadOrder(b.game_number);
  
    if (quadA === quadB) {
      return a.game_number - b.game_number;
    }

    return quadA - quadB;
  })
  .map(item => ({
    id: item.game_number,
    key: `key_${item.game_number}`,
    teams: [ { name: item.team_one?.name }, { name: item.team_two?.name } ]
  }));

  roundOf32.seeds = roundOf32Seeds;
  rounds.push(roundOf32);

  // Sweet 16
  let roundOf16 :IRoundProps = {
    title: 'Sweet 16',
    seeds: [],
  }

  const roundOf16Seeds: ISeedProps[] = games
  .filter(item => 
    (item.game_number >= gameNumberMap.Quad1.Round3.Min && item.game_number <= gameNumberMap.Quad1.Round3.Max)
    || (item.game_number >= gameNumberMap.Quad2.Round3.Min && item.game_number <= gameNumberMap.Quad2.Round3.Max)
    || (item.game_number >= gameNumberMap.Quad3.Round3.Min && item.game_number <= gameNumberMap.Quad3.Round3.Max)
    || (item.game_number >= gameNumberMap.Quad4.Round3.Min && item.game_number <= gameNumberMap.Quad4.Round3.Max)
  )
  //.sort((a, b) => a.game_number - b.game_number)
  .sort((a, b) => {
    const quadA = getQuadOrder(a.game_number);
    const quadB = getQuadOrder(b.game_number);
  
    if (quadA === quadB) {
      return a.game_number - b.game_number;
    }

    return quadA - quadB;
  })
  .map(item => ({
    id: item.game_number,
    key: `key_${item.game_number}`,
    teams: [ { name: item.team_one?.name }, { name: item.team_two?.name } ]
  }));

  roundOf16.seeds = roundOf16Seeds;
  rounds.push(roundOf16);

  // Elite 8
  let roundOf8 :IRoundProps = {
    title: 'Elite 8',
    seeds: [],
  }

  const roundOf8Seeds: ISeedProps[] = games
  .filter(item => 
    (item.game_number >= gameNumberMap.Quad1.Round4.Min && item.game_number <= gameNumberMap.Quad1.Round4.Max)
    || (item.game_number >= gameNumberMap.Quad2.Round4.Min && item.game_number <= gameNumberMap.Quad2.Round4.Max)
    || (item.game_number >= gameNumberMap.Quad3.Round4.Min && item.game_number <= gameNumberMap.Quad3.Round4.Max)
    || (item.game_number >= gameNumberMap.Quad4.Round4.Min && item.game_number <= gameNumberMap.Quad4.Round4.Max)
  )
  //.sort((a, b) => a.game_number - b.game_number)
  .sort((a, b) => {
    const quadA = getQuadOrder(a.game_number);
    const quadB = getQuadOrder(b.game_number);
  
    if (quadA === quadB) {
      return a.game_number - b.game_number;
    }

    return quadA - quadB;
  })
  .map(item => ({
    id: item.game_number,
    key: `key_${item.game_number}`,
    teams: [ { name: item.team_one?.name }, { name: item.team_two?.name } ]
  }));

  roundOf8.seeds = roundOf8Seeds;
  rounds.push(roundOf8);

  // Final 4
  let roundOf4 :IRoundProps = {
    title: 'Final 4',
    seeds: [],
  }

  const roundOf4Seeds: ISeedProps[] = games
  .filter(item => 
    (item.game_number == 61) || (item.game_number == 62)
  )
  .sort((a, b) => a.game_number - b.game_number)
  .map(item => ({
    id: item.game_number,
    key: `key_${item.game_number}`,
    teams: [ { name: item.team_one?.name }, { name: item.team_two?.name } ]
  }));

  roundOf4.seeds = roundOf4Seeds;
  rounds.push(roundOf4);

  // National Championship
  let roundOf2 :IRoundProps = {
    title: 'National Championship',
    seeds: [],
  }

  const roundOf2Seeds: ISeedProps[] = games
  .filter(item => (item.game_number == 63))
  .sort((a, b) => a.game_number - b.game_number)
  .map(item => ({
    id: item.game_number,
    key: `key_${item.game_number}`,
    teams: [ { name: item.team_one?.name }, { name: item.team_two?.name } ]
  }));

  roundOf2.seeds = roundOf2Seeds;
  rounds.push(roundOf2);

  return rounds;
}