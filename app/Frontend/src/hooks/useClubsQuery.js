import { useQuery } from "@tanstack/react-query";
import { getClubs } from "../api/clubsAPI.js";

export function useClubsQuery() {
  return useQuery({
    queryKey: ["clubs"],
    queryFn: ({ signal }) => getClubs(signal),
    staleTime: 60_000,
  });
}
