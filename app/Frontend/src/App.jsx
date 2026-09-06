import { useClubsQuery } from "./hooks/useClubsQuery.js";
import { useClubSelection } from "./hooks/useClubSelection.js";
import { useClubVisualTheme } from "./hooks/useClubVisualTheme.js";

const dashboardTitle = "Personalized Football Team Dashboard";

function StatusMessage({ children, tone = "neutral" }) {
  const toneClasses = {
    neutral: "border-[#d8ded8] bg-white/60 text-[#52605a]",
    success: "border-[#9bc7aa] bg-[#edf8ef] text-[#24613b]",
    error: "border-[#e4aaa5] bg-[#fff0ef] text-[#8b2e2b]",
  };

  return (
    <p
      className={`border-l-2 px-3 py-2 text-sm ${toneClasses[tone]}`}
      role={tone === "error" ? "alert" : "status"}
      aria-live={tone === "error" ? "assertive" : "polite"}
    >
      {children}
    </p>
  );
}

function PreviewBlock({ title, description, className = "" }) {
  return (
    <section
      className={`relative overflow-hidden border border-[#d8ded8] bg-[#fffefa] p-5 sm:p-6 ${className}`}
      aria-labelledby={`${title.toLowerCase().replaceAll(" ", "-")}-heading`}
    >
      <div className="absolute right-0 top-0 h-16 w-16 border-b border-l border-[#d8ded8] bg-[#f1f4ef]" />
      <div className="relative flex h-full min-h-32 flex-col justify-between gap-8">
        <div>
          <p className="mb-3 text-xs font-semibold tracking-[0.12em] text-[#6d7972]">
            Preview
          </p>
          <h3
            id={`${title.toLowerCase().replaceAll(" ", "-")}-heading`}
            className="font-display text-2xl leading-none text-[#17201d]"
          >
            {title}
          </h3>
        </div>
        <p className="max-w-sm text-sm leading-6 text-[#68736f]">
          {description}
        </p>
      </div>
    </section>
  );
}

function App() {
  const { clubs, isLoading, error } = useClubsQuery();

  const {
    selectedLeague,
    selectLeague,
    selectedClubId,
    setSelectedClubId,
    supportedLeagues,
    leagueClubs,
    selectedClub,
  } = useClubSelection(clubs);

  const dashboardStyle = useClubVisualTheme(selectedClub);

  if (isLoading) {
    return (
      <main className="dashboard-shell" aria-busy="true">
        <div className="dashboard-frame">
          <p className="eyebrow">Matchday dashboard</p>
          <h1 className="font-display text-5xl leading-none text-[#17201d] sm:text-7xl">
            {dashboardTitle}
          </h1>
          <StatusMessage>Loading clubs...</StatusMessage>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="dashboard-shell">
        <div className="dashboard-frame">
          <p className="eyebrow">Matchday dashboard</p>
          <h1 className="font-display text-5xl leading-none text-[#17201d] sm:text-7xl">
            {dashboardTitle}
          </h1>
          <StatusMessage tone="error">
            Failed to load clubs: {error.message}
          </StatusMessage>
        </div>
      </main>
    );
  }

  return (
    <main className="dashboard-shell" style={dashboardStyle}>
      <div className="dashboard-frame">
        <header className="flex items-start justify-between gap-6 border-b border-[#cbd4cd] pb-6">
          <div>
            <p className="eyebrow">Matchday dashboard</p>
          </div>
        </header>

        <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.55fr)]">
          <section
            className="selected-stage"
            aria-labelledby="selected-club-heading"
          >
            <div className="stadium-lines" aria-hidden="true" />
            <div className="relative flex min-h-92 flex-col justify-between gap-10 p-6 sm:p-9">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="eyebrow text-(--club-ink)">Selected club</p>

                  <p
                    className="mt-2 max-w-xs text-sm leading-6 text-[#53645c]"
                    aria-live="polite"
                  >
                    {selectedClub
                      ? `${selectedClub.name} is selected.`
                      : "No club selected yet."}
                  </p>
                </div>
              </div>

              <div>
                <h2
                  id="selected-club-heading"
                  className="font-display max-w-3xl text-6xl leading-[0.86] text-(--club-ink) sm:text-8xl"
                >
                  {selectedClub?.name ?? "Choose your club"}
                </h2>
                {selectedClub ? (
                  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#53645c]">
                    <span>{selectedClub.league}</span>
                    <span>{selectedClub.stadium}</span>
                  </div>
                ) : (
                  <p className="mt-6 max-w-md text-sm leading-6 text-[#53645c]">
                    Your club details and accent will appear here after you make
                    a selection.
                  </p>
                )}
              </div>
            </div>
          </section>

          <section
            className="selector-panel"
            aria-labelledby="club-selector-heading"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="club-selector-heading"
                  className="font-display text-3xl leading-none"
                >
                  Choose your club
                </h2>
              </div>
            </div>

            <label
              className="mt-8 block text-sm font-semibold text-[#34443b]"
              htmlFor="league-select"
            >
              League
            </label>
            <select
              id="league-select"
              className="club-select mt-2"
              value={selectedLeague}
              onChange={(event) => selectLeague(event.target.value)}
            >
              <option value="">Select a league</option>

              {supportedLeagues.map((league) => (
                <option key={league} value={league}>
                  {league}
                </option>
              ))}
            </select>

            <label
              className="mt-5 block text-sm font-semibold text-[#34443b]"
              htmlFor="club-select"
            >
              Club
            </label>
            <select
              id="club-select"
              className="club-select mt-2"
              aria-describedby={
                !selectedLeague ? "club-select-help" : undefined
              }
              disabled={!selectedLeague || leagueClubs.length === 0}
              value={selectedClubId ?? ""}
              onChange={(event) => {
                const value = event.target.value;

                setSelectedClubId(value === "" ? null : Number(value));
              }}
            >
              <option value="">Select a club</option>

              {leagueClubs.map((club) => (
                <option key={club.id} value={club.id}>
                  {club.name}
                </option>
              ))}
            </select>
            {!selectedLeague && (
              <p
                id="club-select-help"
                className="mt-2 text-sm leading-6 text-[#68736f]"
              >
                Select a league first.
              </p>
            )}
          </section>
        </div>

        <section className="mt-16" aria-labelledby="preview-heading">
          <div className="mb-5 flex items-end justify-between gap-6 border-b border-[#cbd4cd] pb-4">
            <div>
              <p className="eyebrow">The next whistle</p>
              <h2
                id="preview-heading"
                className="font-display text-4xl leading-none text-[#17201d]"
              >
                Matchday data
              </h2>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
            <PreviewBlock
              title="Upcoming Matches"
              description="Fixture information will appear here when match data is available."
              className="min-h-56"
            />
            <PreviewBlock
              title="League Position"
              description="Standings data is coming soon."
              className="min-h-56"
            />
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <PreviewBlock
              title="Recent Results"
              description="Recent match results will appear here in a future release."
            />
            <PreviewBlock
              title="Team Form"
              description="Form data will be available when the dashboard connects to match results."
            />
          </div>

          <PreviewBlock
            title="Club Overview"
            description="More club information is coming soon. This will include squad details, club history, and more."
            className="mt-5 min-h-40"
          />
        </section>
      </div>
    </main>
  );
}

export default App;
