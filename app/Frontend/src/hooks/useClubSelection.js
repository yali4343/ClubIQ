import { useState } from "react";

export function useClubSelection() {
  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectedClubId, setSelectedClubId] = useState(null);

  return {
    selectedLeague,
    setSelectedLeague,
    selectedClubId,
    setSelectedClubId,
  };
}
