function timeAgo(dateStr) {
  if (!dateStr) return "";
  const s = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export default function TerminalCard({ commit }) {
  return (
    <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass)] p-4 font-mono backdrop-blur-xl shadow-[var(--glass-shadow)] sm:p-6">
      <div className="mb-4 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
      </div>

      <p className="text-xs text-[var(--text-muted)]">$ git log -1 --oneline</p>

      <p className="mt-3 text-sm text-emerald-400">
        {commit?.sha} <span className="break-words text-[var(--text-primary)]">{commit?.message}</span>
      </p>

      <p className="mt-3 text-[11px] text-[var(--text-muted)]">
        {commit?.filesChanged != null ? `${commit.filesChanged} files changed` : ""}
        {commit?.filesChanged != null && commit?.updatedAt ? " · " : ""}
        {timeAgo(commit?.updatedAt)}
      </p>
    </div>
  );
}