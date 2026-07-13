import { useEffect, useRef, useState } from "react";
import { readCache, writeCache, isFresh } from "../lib/githubCache";

const TTL_MS = 10 * 60 * 1000; // treat cached data as "fresh enough" for 10 min

const CONTRIB_URL = (user) =>
  `https://github-contributions-api.jogruber.de/v4/${user}?y=last`;
const REPO_URL = (owner, repo) => `https://api.github.com/repos/${owner}/${repo}`;
const LATEST_REPO_URL = (user) =>
  `https://api.github.com/users/${user}/repos?sort=pushed&direction=desc&per_page=1`;
const LANGS_URL = (owner, repo) =>
  `https://api.github.com/repos/${owner}/${repo}/languages`;
const COMMITS_URL = (owner, repo) =>
  `https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`;

// Picked up automatically if you don't pass a `token` prop. Vite only
// exposes env vars prefixed with VITE_, and it bakes them into the
// client bundle at build time — fine for a read-only, public-data token,
// never for one with write/private scopes. See README for details.
const ENV_TOKEN =
  typeof import.meta !== "undefined" ? import.meta.env?.VITE_GITHUB_TOKEN : undefined;

function githubHeaders(token) {
  return token ? { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" } : { Accept: "application/vnd.github+json" };
}

// Falls back to this only if there is no cache at all (first ever load, offline).
const DEMO_DATA = {
  contributions: [],
  totalThisYear: 5342,
  currentStreak: 27,
  longestStreak: 87,
  activeDaysThisYear: 194,
  repo: {
    name: "portfolio-v3",
    private: false,
    description: "Personal portfolio built with React, Framer Motion and Tailwind CSS.",
    stars: 128,
    forks: 24,
    updatedAt: new Date().toISOString(),
  },
  languages: { TypeScript: 62, JavaScript: 21, CSS: 11, Other: 6 },
  lastCommit: { sha: "a1b2c3d", message: "feat: add animated grid effect", filesChanged: 2, updatedAt: new Date().toISOString() },
};

function computeStreaks(contributions) {
  if (!contributions?.length) return { currentStreak: 0, longestStreak: 0 };
  const sorted = [...contributions].sort((a, b) => new Date(a.date) - new Date(b.date));

  let longest = 0;
  let running = 0;
  for (const day of sorted) {
    if (day.count > 0) {
      running += 1;
      longest = Math.max(longest, running);
    } else {
      running = 0;
    }
  }

  // Current streak: walk backward from the most recent day. Allow "today"
  // to have 0 contributions so far without breaking yesterday's streak.
  let current = 0;
  for (let i = sorted.length - 1; i >= 0; i -= 1) {
    const isToday = i === sorted.length - 1;
    if (sorted[i].count > 0) {
      current += 1;
    } else if (isToday) {
      continue;
    } else {
      break;
    }
  }

  return { currentStreak: current, longestStreak: longest };
}

// Count of distinct days with at least one contribution this calendar year
// (this is the "194 days" style stat, distinct from total commit count).
function computeActiveDaysThisYear(contributions) {
  const year = new Date().getUTCFullYear();
  return contributions.filter((d) => d.count > 0 && new Date(d.date).getUTCFullYear() === year).length;
}

// Sum of contribution counts restricted to the current calendar year. The
// contributions array itself is a rolling last-365-days window (see
// CONTRIB_URL's `?y=last`), so it typically spans part of last year too —
// summing the whole array would silently inflate "contributions in {year}"
// with months that aren't actually in that year. Filter first, same as
// computeActiveDaysThisYear above.
function computeTotalThisYear(contributions) {
  const year = new Date().getUTCFullYear();
  return contributions
    .filter((d) => new Date(d.date).getUTCFullYear() === year)
    .reduce((sum, d) => sum + (d.count || 0), 0);
}

function toLanguagePercents(bytesByLang) {
  const entries = Object.entries(bytesByLang || {});
  const total = entries.reduce((sum, [, v]) => sum + v, 0);
  if (!total) return {};
  const sorted = entries.sort((a, b) => b[1] - a[1]);
  const top = sorted.slice(0, 3);
  const rest = sorted.slice(3);
  const result = {};
  top.forEach(([lang, bytes]) => {
    result[lang] = Math.round((bytes / total) * 100);
  });
  const restPct = rest.reduce((sum, [, bytes]) => sum + bytes, 0);
  if (restPct > 0) result.Other = Math.round((restPct / total) * 100);
  return result;
}

// Resolves which repo to show: an explicit owner+repo if given, otherwise
// the signed-in user's most recently pushed-to repo.
async function resolveRepo({ username, owner, repo, token }) {
  const headers = githubHeaders(token);

  if (owner && repo) {
    const res = await fetch(REPO_URL(owner, repo), { headers });
    if (!res.ok) throw new Error("Repo lookup failed");
    return res.json();
  }

  const res = await fetch(LATEST_REPO_URL(username), { headers });
  if (!res.ok) throw new Error("Latest-repo lookup failed");
  const list = await res.json();
  const latest = Array.isArray(list) ? list[0] : null;
  if (!latest) throw new Error("No repositories found for user");
  return latest;
}

async function fetchLive({ username, owner, repo, token }) {
  const headers = githubHeaders(token);

  const [contribRes, repoJson] = await Promise.all([
    fetch(CONTRIB_URL(username)),
    resolveRepo({ username, owner, repo, token }),
  ]);

  if (!contribRes.ok) throw new Error("Contribution calendar request failed");

  const repoOwner = repoJson.owner?.login || owner || username;
  const repoName = repoJson.name;

  const [contribJson, langJson, commitJson] = await Promise.all([
    contribRes.json(),
    fetch(LANGS_URL(repoOwner, repoName), { headers }).then((r) => {
      if (!r.ok) throw new Error("Languages request failed");
      return r.json();
    }),
    fetch(COMMITS_URL(repoOwner, repoName), { headers }).then((r) => {
      if (!r.ok) throw new Error("Commits request failed");
      return r.json();
    }),
  ]);

  const contributions = contribJson.contributions || [];
  const { currentStreak, longestStreak } = computeStreaks(contributions);
  const activeDaysThisYear = computeActiveDaysThisYear(contributions);

  const commit = Array.isArray(commitJson) ? commitJson[0] : null;

  // NOTE: we request `?y=last` (a rolling 365-day window), so the API's own
  // `total` object is keyed by something like "lastYear", not the numeric
  // calendar year — total[currentYear] was always a miss. And the window
  // itself spans part of last year too, so a plain sum over-counts what's
  // labeled "in {year}". computeTotalThisYear filters to the calendar year
  // first, same as computeActiveDaysThisYear does for its stat.
  const totalThisYear = computeTotalThisYear(contributions);

  return {
    contributions,
    totalThisYear,
    currentStreak,
    longestStreak,
    activeDaysThisYear,
    repo: {
      name: repoJson.name,
      private: !!repoJson.private,
      description: repoJson.description || "",
      stars: repoJson.stargazers_count ?? 0,
      forks: repoJson.forks_count ?? 0,
      updatedAt: repoJson.pushed_at || repoJson.updated_at,
    },
    languages: toLanguagePercents(langJson),
    lastCommit: commit
      ? {
          sha: commit.sha?.slice(0, 7) || "",
          message: (commit.commit?.message || "").split("\n")[0],
          filesChanged: commit.files?.length ?? null,
          updatedAt: commit.commit?.author?.date || repoJson.pushed_at,
        }
      : null,
  };
}

/**
 * useGithubConsole
 * Loads live GitHub stats, caches them in localStorage, and gracefully
 * falls back to the last cached snapshot (or bundled demo data) if the
 * network request fails, rate-limits, or the user is offline.
 *
 * - Pass `owner` + `repo` to pin a specific repository, or omit both to
 *   auto-fetch whichever repo was pushed to most recently.
 * - Pass `token` (or set VITE_GITHUB_TOKEN) to authenticate GitHub REST
 *   calls, raising the rate limit from 60/hr to 5,000/hr.
 *
 * status: "live" | "cached" | "demo"
 */
export function useGithubConsole({ username, owner, repo, token, pollMs = 5 * 60 * 1000 }) {
  const authToken = token ?? ENV_TOKEN;
  const cacheKey = `${username}/${owner ?? "auto"}/${repo ?? "auto"}`;
  const [data, setData] = useState(() => {
    const cached = readCache(cacheKey);
    return cached ? cached.value : null;
  });
  const [status, setStatus] = useState("loading"); // loading | live | cached | demo
  const [lastUpdated, setLastUpdated] = useState(() => readCache(cacheKey)?.savedAt ?? null);
  const [error, setError] = useState(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    let intervalId;

    async function load() {
      try {
        const fresh = await fetchLive({ username, owner, repo, token: authToken });
        if (!mounted.current) return;
        writeCache(cacheKey, fresh);
        setData(fresh);
        setStatus("live");
        setLastUpdated(Date.now());
        setError(null);
      } catch (err) {
        if (!mounted.current) return;
        setError(err.message || "Failed to reach GitHub");
        const cached = readCache(cacheKey);
        if (cached) {
          setData(cached.value);
          setStatus("cached");
          setLastUpdated(cached.savedAt);
        } else {
          setData(DEMO_DATA);
          setStatus("demo");
          setLastUpdated(null);
        }
      }
    }

    load();
    intervalId = setInterval(load, pollMs);

    return () => {
      mounted.current = false;
      clearInterval(intervalId);
    };
  }, [cacheKey, owner, repo, username, authToken, pollMs]);

  return { data, status, lastUpdated, error, isFresh: lastUpdated ? isFresh(lastUpdated, TTL_MS) : false };
}