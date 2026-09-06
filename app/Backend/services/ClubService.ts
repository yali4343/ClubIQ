export interface Club {
  id: number;
  name: string;
  league: string;
  stadium: string;
}

export interface ClubService {
  getAllClubs(): Club[];
  getClubById(clubId: number): Club | undefined;
  selectClub(clubId: number): Club | null;
  getSelectedClub(): Club | null;
}
