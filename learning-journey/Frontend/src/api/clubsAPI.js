const CLUBS_URL = "http://localhost:3000/clubs";

export async function getClubs(signal) {
  const response = await fetch(CLUBS_URL, {
    signal,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch clubs: ${response.status}`);
  }

  return response.json();
}
