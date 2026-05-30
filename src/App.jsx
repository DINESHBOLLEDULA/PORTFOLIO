import { useEffect, useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";
import {
  ArrowRight,
  Download,
  Mail,
} from "lucide-react";

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
      <div className="relative z-10 px-10 pt-28">
       <div
  className="
    inline-flex
    items-center
    gap-2
    rounded-full
    border
    border-[var(--glass-border)]
    bg-[var(--badge-bg)]
    px-4
    py-2
    backdrop-blur-xl
    shadow-[var(--glass-shadow)]
    mb-6
  "
>
  <span
    className="
      h-2
      w-2
      rounded-full
      bg-emerald-400
      animate-pulse
    "
  />

  <span
    className="
      text-[10px]
      tracking-[0.18em]
      uppercase
      text-[var(--text-primary)]
      font-medium
    "
  >
    Building AI Products • Ex-ASE @ Accenture
  </span>
</div>
        <h1
          className="
            text-[90px]
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
    mt-7
    max-w-[680px]
    text-[22px]
    leading-[1.7]
    tracking-[-0.02em]
    text-[var(--text-secondary)]
  "
>
  AI Engineer focused on building practical AI products
  using LLMs, RAG systems, AI agents, and modern AI
  workflows.
</p>
      
<div
  className="
    mt-8
    flex
    flex-wrap
    items-center
    gap-3
  "
>
<button
  className="
    group
    inline-flex
    items-center
    gap-2
    rounded-full
    px-7
    py-4
    text-[15px]
    font-semibold
    transition-all
    duration-300
    hover:-translate-y-[2px]
    hover:shadow-lg
  "
  style={{
    background:
      theme === "dark"
        ? "#ffffff"
        : "#000000",

    color:
      theme === "dark"
        ? "#000000"
        : "#ffffff",

    border: `1px solid ${
      theme === "dark"
        ? "#ffffff"
        : "#000000"
    }`,
  }}
>
  View Projects

  <ArrowRight
    size={17}
    className="
      transition-transform
      duration-300
      group-hover:translate-x-1
    "
  />
</button>
<button
  className="
    group
    inline-flex
    items-center
    gap-2
    rounded-full
    px-7
    py-4
    text-[15px]
    font-medium
    transition-all
    duration-300
    hover:-translate-y-[1px]
  "
  style={{
    background:
      theme === "dark"
        ? "#18181b" // zinc-900
        : "#f1f5f9", // slate-100

    color:
      theme === "dark"
        ? "#e4e4e7"
        : "#334155", // slate-700

    border: `1px solid ${
      theme === "dark"
        ? "#3f3f46"
        : "#cbd5e1" // slate-300
    }`,
  }}
>
  <Download size={16} />
  Download Resume
</button>


  {/* CONTACT ME */}
  <button
    className="
      group
      inline-flex
      items-center
      gap-2
      rounded-full
      px-6
      py-4
      text-[15px]
      font-medium

      text-zinc-500
      bg-transparent
      border
      border-transparent

      dark:text-zinc-300

      transition-all
      duration-300

      hover:-translate-y-[1px]

      hover:bg-zinc-100
      hover:text-black

      dark:hover:bg-white/10
      dark:hover:text-white

      rounded-full
    "
  >
    <Mail
      size={16}
      className="
        opacity-80
        group-hover:opacity-100
      "
    />

    Contact Me
  </button>
</div>

      </div>
    </section>

  </main>
);
}

export default App;