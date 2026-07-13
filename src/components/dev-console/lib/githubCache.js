// Tiny localStorage cache with a time-to-live.
// Every entry stores { value, savedAt } so we can tell the UI both
// "here is data" and "here is how stale it is".

const PREFIX = "devconsole:";

export function readCache(key) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.savedAt !== "number") return null;
    return parsed; // { value, savedAt }
  } catch {
    return null;
  }
}

export function writeCache(key, value) {
  try {
    localStorage.setItem(
      PREFIX + key,
      JSON.stringify({ value, savedAt: Date.now() })
    );
  } catch {
    // localStorage can throw in private-browsing / quota-exceeded cases.
    // Failing to cache shouldn't break the live render, so we swallow it.
  }
}

export function isFresh(savedAt, ttlMs) {
  return Date.now() - savedAt < ttlMs;
}

export function msSince(savedAt) {
  return Date.now() - savedAt;
}

// Human readable "3m ago" / "2h ago" for the "last updated" label.
export function timeAgo(savedAt) {
  const s = Math.floor(msSince(savedAt) / 1000);
  if (s < 45) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}
