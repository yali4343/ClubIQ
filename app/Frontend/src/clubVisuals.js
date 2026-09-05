const neutralClubVisual = {
  primary: "#2f6651",
  secondary: "#b7d2c1",
  ink: "#17352a",
  wash: "#e4eee8",
  initials: "FC",
};

const clubVisuals = {
  1: {
    primary: "#d64545",
    secondary: "#f2c7c7",
    ink: "#5d171b",
    wash: "#fae9e9",
    initials: "A",
  },
  2: {
    primary: "#c9343c",
    secondary: "#f1c3c5",
    ink: "#5b161c",
    wash: "#fae7e8",
    initials: "L",
  },
  3: {
    primary: "#2876b8",
    secondary: "#efbd3c",
    ink: "#123c61",
    wash: "#e7f0f8",
    initials: "B",
  },
  4: {
    primary: "#2d5ea8",
    secondary: "#d8b342",
    ink: "#173767",
    wash: "#e8eef8",
    initials: "RM",
  },
  5: {
    primary: "#1d4f9a",
    secondary: "#c7d2e8",
    ink: "#15366b",
    wash: "#e7edf8",
    initials: "I",
  },
  6: {
    primary: "#b52f3b",
    secondary: "#233b78",
    ink: "#5c1720",
    wash: "#f9e7e9",
    initials: "M",
  },
  7: {
    primary: "#c92935",
    secondary: "#d8b43f",
    ink: "#5b141c",
    wash: "#fae7e8",
    initials: "BM",
  },
  8: {
    primary: "#e4c72c",
    secondary: "#191919",
    ink: "#4f4610",
    wash: "#fbf6d7",
    initials: "BVB",
  },
};

export function getClubVisual(clubId) {
  return clubVisuals[clubId] ?? neutralClubVisual;
}

export { neutralClubVisual };
