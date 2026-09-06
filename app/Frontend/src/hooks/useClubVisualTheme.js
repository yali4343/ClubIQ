import { getClubVisual, neutralClubVisual } from "../clubVisuals.js";

export function useClubVisualTheme(selectedClub) {
  const visual = selectedClub
    ? getClubVisual(selectedClub.id)
    : neutralClubVisual;

  return {
    "--club-primary": visual.primary,
    "--club-secondary": visual.secondary,
    "--club-ink": visual.ink,
    "--club-wash": visual.wash,
  };
}
