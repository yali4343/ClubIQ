import { useState } from "react";

const SUPPORTED_LEAGUES = [
  "Premier League",
  "La Liga",
  "Serie A",
  "Bundesliga",
];

export function useClubSelection() {
  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectedClubId, setSelectedClubId] = useState(null);

  function selectLeague(league) {
    setSelectedLeague(league);
    setSelectedClubId(null);
  }

  return {
    selectedLeague,
    selectLeague,
    selectedClubId,
    setSelectedClubId,
    supportedLeagues: SUPPORTED_LEAGUES,
  };
}
