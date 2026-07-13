import { Star, GitFork, TerminalSquare } from "lucide-react";

const LANG_COLORS = {
  TypeScript: "#3b82f6",
  JavaScript: "#eab308",
  CSS: "#a855f7",
  HTML: "#f97316",
  Python: "#22c55e",
  Other: "#6b7280",
};

function colorFor(lang, i) {
  return LANG_COLORS[lang] || ["#3b82f6", "#eab308", "#a855f7", "#6b7280"][i % 4];
}

function Donut({ languages }) {
  const entries = Object.entries(languages || {});
  const size = 88;
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  let acc = 0;
  return (
    <svg width={size} height={size} className="-rotate-90 shrink-0">
      {entries.length === 0 && (
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--glass-border)" strokeWidth={stroke} />
      )}
      {entries.map(([lang, pct], i) => {
        const dash = (pct / 100) * c;
        const dashArray = `${dash} ${c - dash}`;
        const offset = -((acc / 100) * c);
        acc += pct;
        return (
          <circle
            key={lang}
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={colorFor(lang, i)}
            strokeWidth={stroke}
            strokeDasharray={dashArray}
            strokeDashoffset={offset}
          />
        );
      })}
    </svg>
  );
}

export default function RepoCard({ repo, languages }) {
  const entries = Object.entries(languages || {});
  const updated = repo?.updatedAt ? new Date(repo.updatedAt) : null;
  const updatedLabel = updated ? timeAgo(updated) : "";

  return (
    <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass)] p-4 backdrop-blur-xl shadow-[var(--glass-shadow)] sm:p-6">
      <h3 className="mb-4 text-sm font-semibold tracking-tight text-[var(--text-primary)]">Current Repository</h3>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
            <TerminalSquare className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="truncate font-semibold text-[var(--text-primary)]">{repo?.name}</span>
              <span className="shrink-0 rounded-full border border-[var(--glass-border)] px-2 py-0.5 text-[10px] text-[var(--text-secondary)]">
                {repo?.private ? "Private" : "Public"}
              </span>
            </div>
            <p className="mt-1 max-w-xs text-xs leading-relaxed text-[var(--text-secondary)]">
              {repo?.description}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3 self-start">
          <Donut languages={languages} />
          <div className="flex flex-col gap-1">
            {entries.map(([lang, pct], i) => (
              <div key={lang} className="flex items-center gap-1.5 text-[10px] text-[var(--text-secondary)]">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colorFor(lang, i) }} />
                <span className="whitespace-nowrap">{lang}</span>
                <span className="text-[var(--text-muted)]">{pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-[var(--glass-border)] pt-4 text-xs text-[var(--text-secondary)]">
        {entries[0] && (
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: colorFor(entries[0][0], 0) }} />
            {entries[0][0]}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5" /> {repo?.stars ?? 0}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="h-3.5 w-3.5" /> {repo?.forks ?? 0}
        </span>
        {updatedLabel && <span className="ml-auto">Updated {updatedLabel}</span>}
      </div>
    </div>
  );
}

function timeAgo(date) {
  const s = Math.floor((Date.now() - date.getTime()) / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}