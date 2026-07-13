import { Flame } from "lucide-react";

const SIZE = 115;
const STROKE = 8;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function StreakGauge({ currentStreak = 0, longestStreak = 0, activeDaysThisYear = 0 }) {
  const target = Math.max(longestStreak, currentStreak, 30);
  const progress = target > 0 ? Math.min(currentStreak / target, 1) : 0;
  const offset = CIRCUMFERENCE * (1 - progress);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-[var(--glass-border)] bg-[var(--glass)] p-4 backdrop-blur-xl shadow-[var(--glass-shadow)] sm:p-6">
      <h3 className="mb-4 text-sm font-medium text-[var(--text-primary)]">Streak</h3>

      <div className="flex flex-1 flex-col items-center justify-center py-2">
        <div className="relative" style={{ width: SIZE, height: SIZE }}>
          <svg width={SIZE} height={SIZE} className="-rotate-90">
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="var(--glass-border)"
              strokeWidth={STROKE}
            />
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="url(#streakGradient)"
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 700ms ease" }}
            />
            <defs>
              <linearGradient id="streakGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#4ade80" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Flame className="mb-1 h-5 w-5 text-emerald-400" />
            <span className="text-3xl font-semibold text-[var(--text-primary)]">{currentStreak}</span>
            <span className="text-[11px] text-[var(--text-muted)]">days</span>
          </div>
        </div>
        <span className="mt-3 text-xs text-[var(--text-secondary)]">Current Streak</span>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-3 border-t border-[var(--glass-border)] pt-4 text-center">
        <div>
          <div className="text-[11px] text-[var(--text-muted)]">Longest</div>
          <div className="text-sm font-medium text-[var(--text-primary)]">{longestStreak} days</div>
        </div>
        <div>
          <div className="text-[11px] text-[var(--text-muted)]">This Year</div>
          <div className="text-sm font-medium text-emerald-400">{activeDaysThisYear} days</div>
        </div>
      </div>
    </div>
  );
}
