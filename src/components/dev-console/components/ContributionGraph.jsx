import { useEffect, useMemo, useRef, useState } from "react";

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const LEVEL_COLORS = {
  dark: ["bg-white/[0.06]", "bg-emerald-900/70", "bg-emerald-700", "bg-emerald-500", "bg-emerald-400"],
  light: ["bg-slate-900/[0.06]", "bg-emerald-200", "bg-emerald-400", "bg-emerald-500", "bg-emerald-700"],
};

// Layout constants — everything below is derived from these + measured container width,
// so there are no hard-coded "mobile / tablet / desktop" week counts anymore.
const CELL_GAP = 3;
const IDEAL_CELL = 12; // the cell size we *aim* for when deciding how many weeks fit
const MIN_CELL = 6;    // never shrink cells below this (still tappable/visible)
const MAX_CELL = 22;   // never blow cells up past this on very wide containers
const MAX_WEEKS = 53;  // a full year, GitHub-style
const LABEL_ROW_HEIGHT = 16;

function toISODate(date) {
  return date.toISOString().slice(0, 10);
}

function formatTooltipDate(iso) {
  // Format in UTC to match the UTC-based date math above — using the local
  // timezone here would risk the label showing a different day than the
  // cell it's attached to.
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

// All date math here uses UTC getters/setters. Contribution dates come in as
// plain "YYYY-MM-DD" strings, which Date() parses as UTC midnight. Mixing that
// with *local* getters (getDay/getMonth/setDate) as the original code did is a
// classic off-by-one-day bug for anyone outside UTC — this keeps everything on
// one consistent clock.
function buildWeeks(contributions = []) {
  if (!contributions.length) return [];

  const byDate = new Map(contributions.map((d) => [d.date, d]));

  const first = new Date(contributions[0].date);
  const last = new Date(contributions[contributions.length - 1].date);

  const start = new Date(first);
  start.setUTCDate(start.getUTCDate() - start.getUTCDay());

  const weeks = [];
  let current = new Date(start);

  while (current <= last) {
    const week = [];

    for (let i = 0; i < 7; i++) {
      const iso = toISODate(current);
      const day = byDate.get(iso);

      week.push({
        date: iso,
        month: current.getUTCMonth(),
        level: day?.level ?? 0,
        count: day?.count ?? 0,
        inRange: current >= first,
      });

      current.setUTCDate(current.getUTCDate() + 1);
    }

    weeks.push(week);
  }

  return weeks;
}

function monthMarkers(weeks) {
  const months = [];
  let lastMonth = -1;

  weeks.forEach((week, index) => {
    const month = week.find((d) => d.inRange)?.month;

    if (month !== undefined && month !== lastMonth) {
      months.push({ index, label: MONTH_LABELS[month] });
      lastMonth = month;
    }
  });

  return months;
}

function useContainerSize() {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, size];
}

export default function ContributionGraph({ contributions, totalThisYear, theme = "dark" }) {
  const allWeeks = useMemo(() => buildWeeks(contributions), [contributions]);
  const [graphRef, { width: graphWidth, height: graphHeight }] = useContainerSize();
  const gridRef = useRef(null);
  const [hovered, setHovered] = useState(null); // { day, x, y } — x/y relative to gridRef

  const handleCellEnter = (event, day) => {
    if (!day.inRange || !gridRef.current) return;
    const gridRect = gridRef.current.getBoundingClientRect();
    const cellRect = event.currentTarget.getBoundingClientRect();
    setHovered({
      day,
      x: cellRect.left - gridRect.left + cellRect.width / 2,
      y: cellRect.top - gridRect.top,
    });
  };

  const handleCellLeave = () => setHovered(null);

  // Step 1 — how many weeks *fit* at our ideal cell size? This is the piece
  // that makes the graph genuinely container-driven instead of snapping
  // between fixed breakpoints: a container 610px wide gets a different week
  // count than one 600px wide, not just whatever bucket it falls into.
  const weekCount = useMemo(() => {
    if (!allWeeks.length) return 0;
    if (!graphWidth) return Math.min(MAX_WEEKS, allWeeks.length);

    const fit = Math.floor((graphWidth + CELL_GAP) / (IDEAL_CELL + CELL_GAP));
    return Math.max(1, Math.min(fit, MAX_WEEKS, allWeeks.length));
  }, [graphWidth, allWeeks.length]);

  const weeks = useMemo(() => allWeeks.slice(-weekCount), [allWeeks, weekCount]);

  // Step 2 — now stretch/shrink the cell size so that `weekCount` columns
  // exactly fill the measured width (this is the "Apple-style" fluid part —
  // cells breathe with the container rather than staying a fixed px size).
  const cellSize = useMemo(() => {
    if (!graphWidth || weeks.length === 0) return IDEAL_CELL;

    const usableWidth = graphWidth - CELL_GAP * (weeks.length - 1);
    const widthFit = usableWidth / weeks.length;

    // Also bound by whatever height we've actually been given (7 rows + the
    // label row), so a wide-but-short card can't force cells tall enough to
    // overflow it — width alone isn't the only constraint here.
    const usableHeight = graphHeight - LABEL_ROW_HEIGHT - CELL_GAP * 6;
    const heightFit = graphHeight ? usableHeight / 7 : widthFit;

    const size = Math.min(widthFit, heightFit);

    return Math.max(MIN_CELL, Math.min(size, MAX_CELL));
  }, [graphWidth, graphHeight, weeks.length]);

  const markers = useMemo(() => monthMarkers(weeks), [weeks]);

  const year = new Date().getFullYear();
  const levelColors = LEVEL_COLORS[theme] ?? LEVEL_COLORS.dark;

  const columnTemplate = weeks.length ? `repeat(${weeks.length}, ${cellSize}px)` : undefined;

  return (
    <div
      className="
        flex h-full flex-col rounded-2xl border border-[var(--glass-border)]
        bg-[var(--glass)] p-4 sm:p-6 backdrop-blur-xl shadow-[var(--glass-shadow)]
      "
    >
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-tight text-[var(--text-primary)]">
          Contribution Graph
        </h3>
        <span className="text-[11px] text-[var(--text-muted)]">
          {weeks.length ? `Last ${weeks.length} weeks` : ""}
        </span>
      </div>

      <div ref={graphRef} className="flex flex-1 items-center justify-center">
        {weeks.length === 0 ? (
          <p className="text-[12px] text-[var(--text-muted)]">No contribution data available.</p>
        ) : (
          // Month labels and day cells live in ONE grid (instead of two grids
          // that used to disagree on column sizing — one used 1fr tracks, the
          // other implicit auto-flow columns — so labels drifted out of sync
          // with the cells beneath them). Every cell is placed explicitly by
          // gridColumn/gridRow, so alignment is guaranteed regardless of size.
          <div
            ref={gridRef}
            className="relative mx-auto grid"
            style={{
              gridTemplateColumns: columnTemplate,
              gridTemplateRows: `${LABEL_ROW_HEIGHT}px repeat(7, ${cellSize}px)`,
              gap: CELL_GAP,
            }}
          >
            {markers.map((month) => (
              <span
                key={month.index}
                className="select-none self-start text-[10px] font-medium tracking-wide text-[var(--text-muted)] md:text-[11px]"
                style={{ gridColumn: month.index + 1, gridRow: 1 }}
              >
                {month.label}
              </span>
            ))}

            {weeks.map((week, weekIndex) =>
              week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  aria-label={day.inRange ? `${day.count} contributions on ${formatTooltipDate(day.date)}` : undefined}
                  onMouseEnter={(e) => handleCellEnter(e, day)}
                  onMouseLeave={handleCellLeave}
                  className={`
                    transition-all duration-200 hover:z-10 hover:scale-110 hover:ring-1 hover:ring-white/20
                    ${day.inRange ? "cursor-pointer" : ""}
                    ${
                      day.inRange
                        ? levelColors[day.level]
                        : theme === "dark"
                        ? "bg-white/[0.04]"
                        : "bg-slate-900/[0.03]"
                    }
                  `}
                  style={{
                    gridColumn: weekIndex + 1,
                    gridRow: dayIndex + 2,
                    borderRadius: cellSize / 3,
                  }}
                />
              ))
            )}

            {/* Apple-style hover tooltip — a small dark pill that tracks the
                hovered cell, instead of the browser's plain native title tooltip. */}
            <div
              className={`
                pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-[calc(100%+8px)]
                whitespace-nowrap rounded-lg bg-[#1d1d1f] px-2.5 py-1.5 text-center
                shadow-[0_4px_16px_rgba(0,0,0,0.35)] transition-opacity duration-100
                ${hovered ? "opacity-100" : "opacity-0"}
              `}
              style={{ left: hovered?.x ?? 0, top: hovered?.y ?? 0 }}
            >
              <div className="text-[11px] font-semibold leading-tight text-white">
                {hovered?.day.count ?? 0} contribution{hovered?.day.count === 1 ? "" : "s"}
              </div>
              <div className="text-[10px] leading-tight text-white/60">
                {hovered ? formatTooltipDate(hovered.day.date) : ""}
              </div>
              <div
                className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-4 border-transparent"
                style={{ borderTopColor: "#1d1d1f" }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-4 text-[11px] text-[var(--text-muted)]">
        <span>
          {(totalThisYear ?? 0).toLocaleString()} contributions
          <span className="hidden md:inline"> in {year}</span>
        </span>
        <div className="flex items-center gap-1">
          <span>Less</span>
          {levelColors.map((c, i) => (
            <div key={i} className={`h-[10px] w-[10px] rounded-[2px] ${c}`} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}