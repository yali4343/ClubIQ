import { useState } from "react";

const SUPPORTED_LEAGUES = [
  "Premier League",
  "La Liga",
  "Serie A",
  "Bundesliga",
];

export function useClubSelection(clubs) {
  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectedClubId, setSelectedClubId] = useState(null);

  function selectLeague(league) {
    setSelectedLeague(league);
    setSelectedClubId(null);
  }

  const leagueClubs = selectedLeague
    ? clubs.filter((club) => club.league === selectedLeague)
    : [];

  const selectedClub =
    clubs.find(
      (club) => club.id === selectedClubId && club.league === selectedLeague,
    ) ?? null;

  return {
    selectedLeague,
    selectLeague,
    selectedClubId,
    setSelectedClubId,
    supportedLeagues: SUPPORTED_LEAGUES,
    leagueClubs,
    selectedClub,
  };
}
