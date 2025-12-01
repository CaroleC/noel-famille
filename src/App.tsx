// src/App.tsx
import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { members, santaPairs, childWishlists } from "./data";

type TabKey = "santa" | "kids";

function getMemberName(id: string): string {
  const m = members.find((m) => m.id === id);
  return m ? m.name : id;
}

// --------- COMPTE A REBOURS NOËL ---------

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getNextChristmasEve(): Date {
  const now = new Date();
  const currentYear = now.getFullYear();
  // 24 décembre à 00:00
  const thisYearChristmasEve = new Date(currentYear, 11, 24, 0, 0, 0);

  if (now <= thisYearChristmasEve) {
    return thisYearChristmasEve;
  }
  // Si on est après le 24, on prend l'an prochain
  return new Date(currentYear + 1, 11, 24, 0, 0, 0);
}

function calculateTimeLeft(): TimeLeft {
  const target = getNextChristmasEve();
  const now = new Date().getTime();
  const diff = target.getTime() - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const { days, hours, minutes, seconds } = timeLeft;

  const isZero = days === 0 && hours === 0 && minutes === 0 && seconds === 0;

  return (
    <div style={styles.countdownWrapper}>
      {isZero ? (
        <span style={styles.countdownText}>
          🎅 C&apos;est Noël ! A nous les cadeaux ! 
        </span>
      ) : (
        <span style={styles.countdownText}>
          ⏳ Il reste{" "}
          <strong>
            {days}j {hours}h {minutes}m {seconds}s
          </strong>{" "}
          avant Noël 🎅
        </span>
      )}
    </div>
  );
}

// --------- APP PRINCIPALE ---------

function App() {
  const [activeTab, setActiveTab] = useState<TabKey>("santa");

  return (
    <div className="app" style={styles.app}>
      <header style={styles.header}>
        <h1 style={styles.title}>🎄 Noël en famille</h1>

        {/* ✅ Décompte sous le titre */}
        <Countdown />

        <p style={styles.subtitle}>
          Récap du Santa Cruz & listes du Père Noël des enfants
        </p>

        <div style={styles.tabs}>
          <button
            onClick={() => setActiveTab("santa")}
            style={{
              ...styles.tabButton,
              ...(activeTab === "santa" ? styles.tabButtonActive : {}),
            }}
          >
            🎁 Qui offre à qui ?
          </button>
          <button
            onClick={() => setActiveTab("kids")}
            style={{
              ...styles.tabButton,
              ...(activeTab === "kids" ? styles.tabButtonActive : {}),
            }}
          >
            🧸 Listes des enfants
          </button>
        </div>
      </header>

      <main style={styles.main}>
        {activeTab === "santa" ? <SantaList /> : <KidsWishlists />}
      </main>

      <footer style={styles.footer}>
        <small>Appli familiale</small>
      </footer>
    </div>
  );
}

function SantaList() {
  return (
    <section>
      <h2 style={styles.sectionTitle}>🎁 Liste Santa Cruz</h2>
      <p style={styles.text}>Voici qui offre un cadeau à qui cette année.</p>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Personne qui offre</th>
              <th style={styles.th}>Offre un cadeau à</th>
            </tr>
          </thead>
          <tbody>
            {santaPairs.map((pair) => (
              <tr key={pair.giverId + pair.receiverId}>
                <td style={styles.td}>{getMemberName(pair.giverId)}</td>
                <td style={styles.td}>{getMemberName(pair.receiverId)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={styles.helperText}>
        💡 Pensez à un budget commun (ex : 20–30 €) et à noter vos idées cadeau
        pour éviter les doublons.
      </p>
    </section>
  );
}

function KidsWishlists() {
  return (
    <section>
      <h2 style={styles.sectionTitle}>🧸 Listes du Père Noël</h2>
      <p style={styles.text}>
        Les listes des enfants pour aider chacun à choisir un cadeau.
      </p>

      <div style={styles.cards}>
        {childWishlists.map((child) => (
          <article key={child.id} style={styles.card}>
            <h3 style={styles.cardTitle}>
              {child.name}
              {child.age && <span style={styles.age}> – {child.age} ans</span>}
            </h3>

            {child.wishlistLink && (
              <p style={styles.text}>
                📎 Liste complète :{" "}
                <a href={child.wishlistLink} target="_blank" rel="noreferrer">
                  ouvrir la liste
                </a>
              </p>
            )}

            {child.ideas && child.ideas.length > 0 && (
              <>
                <p style={styles.text}>Quelques idées :</p>
                <ul>
                  {child.ideas.map((idea, idx) => (
                    <li key={idx} style={styles.listItem}>
                      {idea}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

// Styles inline pour faire simple (tu peux basculer en CSS si tu préfères)
const styles: { [key: string]: CSSProperties } = {
  app: {
    minHeight: "100vh",
    width: "100%",
    maxWidth: "100%",
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    background: "linear-gradient(180deg, #fdf6f0, #f7fafc)",
    color: "#1a202c",
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
  },
  header: {
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  title: {
    fontSize: "2rem",
    margin: 0,
  },
  subtitle: {
    margin: "0.5rem 0 1rem",
    color: "#4a5568",
  },
  countdownWrapper: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
  },
  countdownText: {
    display: "inline-block",
    padding: "0.4rem 0.8rem",
    borderRadius: "999px",
    background: "rgba(255, 255, 255, 0.8)",
    boxShadow: "0 5px 12px rgba(0,0,0,0.06)",
    fontSize: "0.9rem",
    color: "#2d3748",
  },
  tabs: {
    display: "flex",
    justifyContent: "center",
    gap: "0.5rem",
    flexWrap: "wrap",
  },
  tabButton: {
    border: "1px solid #cbd5f5",
    background: "white",
    borderRadius: "999px",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  tabButtonActive: {
    background: "#2b6cb0",
    color: "white",
    borderColor: "#2b6cb0",
    fontWeight: 600,
  },
  main: {
    flex: 1,
    maxWidth: "900px",
    width: "100%",
    margin: "0 auto",
  },
  footer: {
    textAlign: "center",
    marginTop: "1.5rem",
    fontSize: "0.8rem",
    color: "#4a5568",
  },
  sectionTitle: {
    fontSize: "1.4rem",
    marginBottom: "0.75rem",
  },
  text: {
    marginBottom: "0.75rem",
    color: "#4a5568",
  },
  helperText: {
    marginTop: "1rem",
    fontSize: "0.9rem",
    color: "#718096",
  },
  tableWrapper: {
    width: "100%",
    overflowX: "auto",
    marginTop: "0.5rem",
  },
  table: {
    width: "100%",
    minWidth: "280px",
    borderCollapse: "collapse",
    background: "white",
    borderRadius: "0.75rem",
    overflow: "hidden",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
  },
  th: {
    textAlign: "left",
    padding: "0.75rem 1rem",
    background: "#edf2f7",
    borderBottom: "1px solid #e2e8f0",
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
  td: {
    padding: "0.75rem 1rem",
    borderBottom: "1px solid #edf2f7",
    whiteSpace: "nowrap",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1rem",
    marginTop: "1rem",
  },
  card: {
    background: "white",
    borderRadius: "0.75rem",
    padding: "1rem",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
  },
  cardTitle: {
    margin: "0 0 0.5rem",
    fontSize: "1.1rem",
  },
  age: {
    fontSize: "0.9rem",
    color: "#718096",
  },
  listItem: {
    marginBottom: "0.25rem",
  },
};

export default App;
