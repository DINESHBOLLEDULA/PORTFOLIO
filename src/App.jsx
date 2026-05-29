import { useEffect, useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";

function App() {
  const [loading, setLoading] =
    useState(true);

  const [theme, setTheme] =
    useState(() => {
      return (
        localStorage.getItem(
          "theme"
        ) || "dark"
      );
    });

  useEffect(() => {
    document.documentElement.classList.remove(
      "light",
      "dark"
    );

    document.documentElement.classList.add(
      theme
    );

    localStorage.setItem(
      "theme",
      theme
    );
  }, [theme]);

  if (loading) {
    return (
      <Preloader
        onComplete={() =>
          setLoading(false)
        }
      />
    );
  }

  return (
  <main
    className="
      min-h-screen
      bg-[var(--bg)]
      text-[var(--text-primary)]
      transition-colors
      duration-500
    "
  >
    <Navbar
      theme={theme}
      setTheme={setTheme}
    />

    {/* HERO SECTION */}
    <section
      className="
        relative
        min-h-screen
        overflow-hidden
      "
    >
      {/* GRID BACKGROUND */}
      <div
        className="
          absolute
          inset-0
          pointer-events-none
          z-0
        "
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(120,120,120,0.08) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(120,120,120,0.08) 1px,
                transparent 1px
              )
            `,
            backgroundSize:
              "64px 64px",

            /* fade grid downward */
            maskImage:
              "linear-gradient(to bottom, black 40%, transparent 100%)",

            WebkitMaskImage:
              "linear-gradient(to bottom, black 40%, transparent 100%)",
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 px-10 pt-40">
        <h1
          className="
            text-[92px]
            leading-[0.95]
            tracking-[-0.06em]
            font-light
          "
        >
          Building{" "}
          <span className="italic text-blue-500">
            neural
          </span>
          <br />
          systems that
          <br />
          <span className="text-purple-500">
            think,
          </span>
          <br />
          <span className="text-[var(--text-muted)]">
            reason, and ship.
          </span>
        </h1>

        <p
          className="
            mt-10
            max-w-[850px]
            text-[22px]
            leading-[1.7]
            tracking-[-0.02em]
            text-[var(--text-secondary)]
          "
        >
          I’m Dinesh Kumar —
          an AI Engineer focused on
          building practical AI
          products using LLMs,
          RAG systems, and
          modern AI workflows.
        </p>
      </div>
    </section>

  </main>
);
}

export default App;