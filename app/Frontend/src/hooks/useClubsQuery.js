import { useQuery } from "@tanstack/react-query";
import { getClubs } from "../api/clubsAPI.js";

export function useClubsQuery() {
  const { data, isPending, error } = useQuery({
    queryKey: ["clubs"],
    queryFn: ({ signal }) => getClubs(signal),
    staleTime: 60_000,
  });

  return {
    clubs: data ?? [],
    isLoading: isPending,
    error,
  };
}
