import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getClubs } from "./api/clubsAPI.js";

function App() {
  const clubsQuery = useQuery({
    queryKey: ["clubs"],
    queryFn: ({ signal }) => getClubs(signal),
    staleTime: 60_000,
  });

  const [selectedClubId, setSelectedClubId] = useState(null);

  if (clubsQuery.isPending) {
    return (
      <main>
        <h1>Personalized Football Team Dashboard</h1>
        <p>Loading clubs...</p>
      </main>
    );
  }

  if (clubsQuery.isError) {
    return (
      <main>
        <h1>Personalized Football Team Dashboard</h1>
        <p>Failed to load clubs: {clubsQuery.error.message}</p>
      </main>
    );
  }

  const selectedClub =
    clubsQuery.data.find((club) => club.id === selectedClubId) ?? null;

  return (
    <main>
      <h1>Personalized Football Team Dashboard</h1>

      <section>
        <h2>Choose your club</h2>

        <select
          value={selectedClubId ?? ""}
          onChange={(event) => {
            const value = event.target.value;

            setSelectedClubId(value === "" ? null : Number(value));
          }}
        >
          <option value="">Select a club</option>

          {clubsQuery.data.map((club) => (
            <option key={club.id} value={club.id}>
              {club.name} — {club.league}
            </option>
          ))}
        </select>
        <button type="button" onClick={() => clubsQuery.refetch()}>
          Refresh clubs
        </button>
      </section>

      {selectedClub && (
        <section>
          <h2>Your Team</h2>

          <h3>{selectedClub.name}</h3>

          <p>League: {selectedClub.league}</p>

          <p>Stadium: {selectedClub.stadium}</p>
        </section>
      )}
    </main>
  );
}

export default App;
