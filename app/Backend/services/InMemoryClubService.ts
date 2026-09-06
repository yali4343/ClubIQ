import { injectable } from "tsyringe";
import type { Club, ClubService } from "./ClubService.js";

const clubs: Club[] = [
  {
    id: 1,
    name: "Arsenal FC",
    league: "Premier League",
    stadium: "Emirates Stadium",
  },
  {
    id: 2,
    name: "FC Liverpool",
    league: "Premier League",
    stadium: "Anfield",
  },
  {
    id: 3,
    name: "FC Barcelona",
    league: "La Liga",
    stadium: "Camp Nou",
  },
  {
    id: 4,
    name: "Real Madrid CF",
    league: "La Liga",
    stadium: "Santiago Bernabéu",
  },
  {
    id: 5,
    name: "FC Inter",
    league: "Serie A",
    stadium: "San Siro",
  },
  {
    id: 6,
    name: "AC Milan",
    league: "Serie A",
    stadium: "San Siro",
  },
  {
    id: 7,
    name: "FC Bayern Munich",
    league: "Bundesliga",
    stadium: "Allianz Arena",
  },
  {
    id: 8,
    name: "Borussia Dortmund",
    league: "Bundesliga",
    stadium: "Signal Iduna Park",
  },
];

@injectable()
export class InMemoryClubService implements ClubService {
  private selectedClubId: number | null = null;

  getAllClubs(): Club[] {
    return clubs;
  }

  getClubById(clubId: number): Club | undefined {
    return clubs.find((club) => club.id === clubId);
  }

  selectClub(clubId: number): Club | null {
    const club = this.getClubById(clubId);

    if (!club) {
      return null;
    }

    this.selectedClubId = clubId;

    return club;
  }
}
