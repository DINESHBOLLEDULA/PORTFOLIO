import { Wifi, WifiOff, DatabaseZap,LoaderCircle, } from "lucide-react";
import { useGithubConsole } from "../hooks/useGithubConsole";
import { timeAgo } from "../lib/githubCache";
import ContributionGraph from "./ContributionGraph";
import StreakGauge from "./StreakGauge";
import RepoCard from "./RepoCard";
import TerminalCard from "./TerminalCard";



const STATUS_CONFIG = {
  loading: {
    label: "Connecting",
    footer: "Synchronizing...",
    icon: LoaderCircle,
    color: {
      dark: "#38bdf8",
      light: "#0284c7",
    },
    spin: true,
  },

  live: {
    label: "Live",
    footer: null,
    icon: Wifi,
    color: {
      dark: "#34d399",
      light: "#059669",
    },
    spin: false,
  },

  cached: {
    label: "Cached",
    footer: null,
    icon: DatabaseZap,
    color: {
      dark: "#fbbf24",
      light: "#d97706",
    },
    spin: false,
  },

  demo: {
    label: "Offline",
    footer: "Using demo data",
    icon: WifiOff,
    color: {
      dark: "#f87171",
      light: "#dc2626",
    },
    spin: false,
  },
};
/**
 * Drop-in "Development Console" dashboard, styled with this project's own
 * CSS custom properties (--glass, --glass-border, --text-primary, etc. from
 * index.css) so it inherits light/dark theming automatically — no Tailwind
 * dark: config needed.
 *
 * Usage:
 *   <DevConsole username="DINESHBOLLEDULA" owner="DINESHBOLLEDULA" repo="PORTFOLIO" theme={theme} />
 *
 * - `username` — required. Whose contribution calendar to show, and whose
 *   repos are searched when `owner`/`repo` aren't given.
 * - `owner` / `repo` — optional. Pin one specific repository. Omit both and
 *   the console auto-shows whichever repo was pushed to most recently.
 * - `theme` — required. Pass the same "dark" | "light" state you pass to
 *   Navbar/Writing — used for the few swatches (heatmap levels, gauge
 *   track) that need a real color rather than a CSS variable.
 * - `token` — optional. A GitHub personal access token to authenticate
 *   requests (60/hr → 5,000/hr). Falls back to `VITE_GITHUB_TOKEN` if set.
 */
export default function DevConsole({ username, owner, repo, token, theme = "dark" }) {
  const { data, status, lastUpdated } = useGithubConsole({ username, owner, repo, token });
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.loading;
  const StatusIcon = cfg.icon;

  const statusColor =
  theme === "dark"
    ? cfg.color.dark
    : cfg.color.light;

const footerText =
  status === "live"
    ? `Updated ${timeAgo(lastUpdated)}`
    : status === "cached"
    ? `Last sync ${timeAgo(lastUpdated)}`
    : cfg.footer;

  if (!data) {
    return (
      <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass)] p-10 text-center text-sm text-[var(--text-muted)] backdrop-blur-xl">
        Loading development console…
      </div>
    );
  }

  return (
    <section
  className="px-5 sm:px-6 md:px-8 lg:px-10 py-10 md:py-10 text-[var(--text-primary)]"
>
  <div className="max-w-[1420px] mx-auto">
     
    {/* ========================= HEADER ========================= */}
<div className="mb-14">

  {/* Top Row */}
  <div className="flex items-center justify-between gap-4 mb-8">

    {/* Section Label */}
    <div className="flex items-center gap-3">

      <div
        className="w-8 h-px"
        style={{
          background:
            theme === "dark"
              ? "#52525b"
              : "#cbd5e1",
        }}
      />

      <span
        className="
          uppercase
          tracking-[0.22em]
          text-xs
          font-medium
          font-mono
        "
        style={{
          color: "var(--text-muted)",
        }}
      >
        Engineering
      </span>

    </div>

    {/* ================= Status Badge ================= */}

<div
  className="
    group
    shrink-0
    rounded-xl

    border
    border-[var(--glass-border)]

    bg-[var(--glass)]

    backdrop-blur-xl

    shadow-[var(--glass-shadow)]

    transition-all
    duration-300

    hover:shadow-lg
    hover:scale-[1.01]

    px-3
    py-2

    md:px-3.5
    md:py-2.5
  "
>
  {/* Mobile */}
  <div className="flex items-center gap-2 md:hidden">

    <StatusIcon
      className={`h-3.5 w-3.5 ${
        cfg.spin ? "animate-spin" : ""
      }`}
      style={{
        color: statusColor,
      }}
    />

    <span
      className="text-[10px] font-medium"
      style={{
        color: statusColor,
      }}
    >
      {cfg.label}
    </span>

  </div>

  {/* Tablet/Desktop */}
  <div
    className="
      hidden
      md:flex
      md:flex-col

      gap-1

      min-w-[145px]
    "
  >

    <div
      className="flex items-center gap-2"
      style={{
        color: statusColor,
      }}
    >

      <StatusIcon
        className={`h-3.5 w-3.5 ${
          cfg.spin ? "animate-spin" : ""
        }`}
      />

      <span className="text-xs font-semibold">
        {cfg.label}
      </span>

    </div>

    <div
      className="text-[10px]"
      style={{
        color: "var(--text-muted)",
      }}
    >
      {status === "live"
        ? `Updated ${timeAgo(lastUpdated)}`
        : status === "cached"
        ? `Last sync ${timeAgo(lastUpdated)}`
        : cfg.footer}
    </div>

  </div>

</div>

  </div>

  {/* ================= Heading ================= */}

  <div className="max-w-[760px]  mt-2">

    <h2
      className="
        text-[34px]
        sm:text-[42px]
        md:text-[56px]

        font-bold

        leading-[0.95]

        tracking-tight

        mb-6
      "
    >
      Development{" "}
      <span className="text-purple-500">
        Console.
      </span>
    </h2>

    <p
      className="
        text-[15px]
        sm:text-base

        leading-7
        sm:leading-8

        max-w-[720px]
      "
      style={{
        color: "var(--text-secondary)",
      }}
    >
      From machine learning experiments to production-ready applications, this dashboard highlights my development workflow through live GitHub repositories, commits, coding streaks, and contribution history.
    </p>

  </div>

</div>

      {/* Row 1: contribution graph + streak */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,3.6fr)_220px] md:grid-cols-[minmax(0,3.6fr)_220px] items-stretch lg:items-stretch ">
        <div className="min-w-0">
          <ContributionGraph
            contributions={data.contributions}
            totalThisYear={data.totalThisYear}
            theme={theme}
          />
        </div>
        <StreakGauge
          currentStreak={data.currentStreak}
          longestStreak={data.longestStreak}
          activeDaysThisYear={data.activeDaysThisYear}
        />
      </div>

      {/* Row 2: repo + terminal */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RepoCard repo={data.repo} languages={data.languages} />
        <TerminalCard commit={data.lastCommit} />
      </div>
      </div>
    </section>
  );
}
