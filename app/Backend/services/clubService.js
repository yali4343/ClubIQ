const clubs = [
  {
    id: 1,
    name: "Arsenal",
    league: "Premier League",
    stadium: "Emirates Stadium",
  },
  {
    id: 2,
    name: "Liverpool",
    league: "Premier League",
    stadium: "Anfield",
  },
  {
    id: 3,
    name: "Barcelona",
    league: "La Liga",
    stadium: "Camp Nou",
  },
  {
    id: 4,
    name: "Real Madrid",
    league: "La Liga",
    stadium: "Santiago Bernabéu",
  },
  {
    id: 5,
    name: "Inter",
    league: "Serie A",
    stadium: "San Siro",
  },
  {
    id: 6,
    name: "Milan",
    league: "Serie A",
    stadium: "San Siro",
  },
  {
    id: 7,
    name: "Bayern Munich",
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

let selectedClubId = null;

function getAllClubs() {
  return clubs;
}

function getClubById(clubId) {
  return clubs.find((club) => club.id === clubId);
}

function selectClub(clubId) {
  const club = getClubById(clubId);

  if (!club) {
    return null;
  }

  selectedClubId = clubId;

  return club;
}

export { getAllClubs, getClubById, selectClub };
