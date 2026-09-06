import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSelectedClub, selectClub } from "../api/clubsAPI.js";

const SUPPORTED_LEAGUES = [
  "Premier League",
  "La Liga",
  "Serie A",
  "Bundesliga",
];

export function useClubSelection(clubs) {
  const queryClient = useQueryClient();
  const [selectedLeague, setSelectedLeague] = useState("");

  const { data: selectedClub = null } = useQuery({
    queryKey: ["selection"],
    queryFn: ({ signal }) => getSelectedClub(signal),
    staleTime: 60_000,
  });

  const {
    mutate: selectClubById,
    isPending: isSelecting,
    error: selectionError,
  } = useMutation({
    mutationFn: selectClub,
    onSuccess: (club) => {
      queryClient.setQueryData(["selection"], club);
    },
  });

  function selectLeague(league) {
    setSelectedLeague(league);
  }

  const leagueClubs = selectedLeague
    ? clubs.filter((club) => club.league === selectedLeague)
    : [];

  return {
    selectedLeague,
    selectLeague,
    selectClubById,
    isSelecting,
    selectionError,
    supportedLeagues: SUPPORTED_LEAGUES,
    leagueClubs,
    selectedClub,
  };
}
