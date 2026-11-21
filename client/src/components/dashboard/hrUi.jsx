/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import { Icon, ICONS, card } from "./ui";

// Extra icons that sit beside the ones in ui.jsx (same single-path format)
export const HR_ICONS = {
  ...ICONS,
  home: "M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10",
  clock: "M12 7v5l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z",
  calendar:
    "M8 3v3m8-3v3M4 9h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z",
  wallet:
    "M3 7a2 2 0 012-2h13v3M3 7v11a2 2 0 002 2h14a1 1 0 001-1v-9a1 1 0 00-1-1H5a2 2 0 01-2-2zM16 14h2",
  briefcase:
    "M4 8h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1zm5 0V5a1 1 0 011-1h4a1 1 0 011 1v3",
  target: "M12 21a9 9 0 100-18 9 9 0 000 18zm0-5a4 4 0 100-8 4 4 0 000 8z",
  book: "M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2V5zm2 14h13",
  headset:
    "M5 14v-2a7 7 0 1114 0v2M5 14h2v4H5a1 1 0 01-1-1v-2a1 1 0 011-1zm14 0h-2v4h2a1 1 0 001-1v-2a1 1 0 00-1-1z",
  receipt: "M6 3h12v18l-3-2-3 2-3-2-3 2V3zm3 5h6m-6 4h6",
  box: "M21 8l-9-5-9 5v8l9 5 9-5V8zM3 8l9 5m0 0l9-8m-9 8v8",
  megaphone:
    "M3 11v2a1 1 0 001 1h2l5 4V6L6 10H4a1 1 0 00-1 1zm13-3a5 5 0 010 8",
  settings:
    "M12 15a3 3 0 100-6 3 3 0 000 6zM4 12h2m12 0h2M12 4v2m0 12v2M6.3 6.3l1.4 1.4m8.6 8.6l1.4 1.4m0-11.4l-1.4 1.4M7.7 16.3l-1.4 1.4",
  chevron: "M9 6l6 6-6 6",
  check: "M5 13l4 4L19 7",
  sparkle: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z",
  gift: "M20 12v8H4v-8M3 8h18v4H3V8zm9 0v12m0-12S10 3 8 4s0 4 4 4m0 0s2-5 4-4 0 4-4 4",
  pin: "M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12zm0-9a3 3 0 100-6 3 3 0 000 6z",
  collapse: "M11 7l-5 5 5 5m7-10l-5 5 5 5",
};

export const gradientBg =
  "bg-gradient-to-br from-sky-400 via-blue-600 to-blue-900";
export const surface = `${card} bg-white border-sky-100`;

const AVATAR_TONES = [
  "bg-indigo-600",
  "bg-violet-600",
  "bg-teal-600",
  "bg-rose-500",
  "bg-amber-500",
  "bg-sky-600",
];
export function Avatar({
  initials,
  size = "w-9 h-9",
  text = "text-xs",
  seed = 0,
}) {
  const tone =
    AVATAR_TONES[
      (initials.charCodeAt(0) + initials.charCodeAt(1) + seed) %
        AVATAR_TONES.length
    ];
  return (
    <div
      className={`${size} ${tone} ${text} rounded-full text-white font-bold flex items-center justify-center shrink-0`}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

export const initialsOf = (name) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

// Number that counts up once on mount. Honors prefers-reduced-motion.
export function Counter({ value, decimals = 0, prefix = "", suffix = "" }) {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const [n, setN] = useState(reducedMotion ? value : 0);
  useEffect(() => {
    if (reducedMotion) return undefined;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / 700, 1);
      setN(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion, value]);
  return (
    <>
      {prefix}
      {(reducedMotion ? value : n).toFixed(decimals)}
      {suffix}
    </>
  );
}

export function SectionCard({ title, action, children, className = "" }) {
  return (
    <section className={`${surface} p-6 ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold tracking-tight text-slate-900">{title}</h3>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function AreaChart({ data, height = 180 }) {
  const w = 520,
    h = height,
    pad = 24;
  const max = 100;
  const x = (i) => pad + (i / (data.length - 1)) * (w - pad * 2);
  const y = (v) => h - 24 - (v / max) * (h - 44);
  const line = data
    .map((p, i) => `${i ? "L" : "M"}${x(i)},${y(p.v)}`)
    .join(" ");
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full"
      role="img"
      aria-label="Attendance percentage by day this week"
    >
      <defs>
        <linearGradient id="att" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#2563EB" stopOpacity=".3" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 50, 100].map((g) => (
        <g key={g}>
          <line
            x1={pad}
            x2={w - pad}
            y1={y(g)}
            y2={y(g)}
            className="stroke-slate-200 dark:stroke-[#243049]"
            strokeDasharray="3 4"
          />
          <text x={0} y={y(g) + 4} className="fill-slate-400" fontSize="10">
            {g}
          </text>
        </g>
      ))}
      <path
        d={`${line} L${x(data.length - 1)},${y(0)} L${x(0)},${y(0)} Z`}
        fill="url(#att)"
      />
      <path
        d={line}
        fill="none"
        stroke="#2563EB"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {data.map((p, i) => (
        <g key={p.d}>
          <circle
            cx={x(i)}
            cy={y(p.v)}
            r="3.5"
            className="fill-white dark:fill-[#131A2E]"
            stroke="#2563EB"
            strokeWidth="2"
          />
          <text
            x={x(i)}
            y={h - 6}
            textAnchor="middle"
            className="fill-slate-400"
            fontSize="11"
          >
            {p.d}
          </text>
          <title>{`${p.d}: ${p.v}%`}</title>
        </g>
      ))}
    </svg>
  );
}

export function Donut({ slices, size = 140, label }) {
  const total = slices.reduce((s, x) => s + x.v, 0);
  const r = 52,
    c = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-6 flex-wrap">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg
          viewBox="0 0 140 140"
          width={size}
          height={size}
          className="-rotate-90"
          role="img"
          aria-label={label}
        >
          {slices.map((s, index) => {
            const len = (s.v / total) * c;
            const offset = slices
              .slice(0, index)
              .reduce((sum, slice) => sum + (slice.v / total) * c, 0);
            const el = (
              <circle
                key={s.name}
                cx="70"
                cy="70"
                r={r}
                fill="none"
                stroke={s.color}
                strokeWidth="16"
                strokeDasharray={`${len - 2} ${c - len + 2}`}
                strokeDashoffset={-offset}
              />
            );
            return el;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
            {total}
          </span>
          <span className="text-xs text-slate-400">people</span>
        </div>
      </div>
      <ul className="space-y-1.5 text-sm min-w-0">
        {slices.map((s) => (
          <li key={s.name} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-sm shrink-0"
              style={{ background: s.color }}
            />
            <span className="text-slate-600 dark:text-slate-300 truncate">
              {s.name}
            </span>
            <span className="ml-auto pl-3 tabular-nums text-slate-400">
              {s.v}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Funnel({ data }) {
  const max = data[0].v;
  return (
    <div className="space-y-2.5" role="img" aria-label="Hiring funnel by stage">
      {data.map((s, i) => (
        <div key={s.stage} className="flex items-center gap-3">
          <span className="w-20 text-xs text-slate-500 shrink-0">
            {s.stage}
          </span>
          <div className="flex-1 h-7 rounded-lg bg-slate-100 dark:bg-[#0B1020] overflow-hidden">
            <div
              className={`h-full rounded-lg ${gradientBg} flex items-center justify-end pr-2 text-xs font-semibold text-white tabular-nums`}
              style={{
                width: `${Math.max((s.v / max) * 100, 8)}%`,
                opacity: 1 - i * 0.14,
              }}
            >
              {s.v}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function GrowthBars({ data }) {
  const max = Math.max(...data.map((x) => x.v));
  return (
    <div
      className="flex items-end gap-3 h-40"
      role="img"
      aria-label="Headcount by month"
    >
      {data.map((x, i) => (
        <div
          key={x.d}
          className="flex-1 h-full flex flex-col items-center justify-end gap-1.5 group"
        >
          <span className="text-xs font-semibold text-slate-500 tabular-nums">
            {x.v}
          </span>
          <div
            className={`w-full rounded-t-lg ${i === data.length - 1 ? gradientBg : "bg-indigo-200 dark:bg-indigo-500/30"} group-hover:opacity-80 transition-opacity`}
            style={{ height: `${(x.v / max) * 72}%` }}
          />
          <span className="text-xs text-slate-400">{x.d}</span>
        </div>
      ))}
    </div>
  );
}

export { Icon };

// ---------- Phase 2 shared pieces ----------
const BADGE = {
  green:
    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20",
  amber:
    "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20",
  rose: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-500/20",
  sky: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:border-sky-500/20",
  indigo:
    "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-500/20",
  slate:
    "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
};
export const STATUS_TONE = {
  Active: "green",
  "On leave": "amber",
  Probation: "sky",
  Notice: "rose",
};
export function Badge({ tone = "slate", children }) {
  return (
    <span
      className={`text-xs font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap ${BADGE[tone]}`}
    >
      {children}
    </span>
  );
}

function useEscape(open, onClose) {
  useEffect(() => {
    if (!open) return;
    const k = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, onClose]);
}

export function Dialog({ open, title, onClose, children, size = "max-w-md" }) {
  useEscape(open, onClose);
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`${surface} relative w-full ${size} max-h-[90vh] overflow-y-auto p-6 shadow-2xl`}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1A2340] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <Icon d={ICONS.x} className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Drawer({ open, title, onClose, children }) {
  useEscape(open, onClose);
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white dark:bg-[#0F1527] border-l border-slate-200 dark:border-[#243049] shadow-2xl overflow-y-auto">
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white/90 dark:bg-[#0F1527]/90 backdrop-blur border-b border-slate-200 dark:border-[#243049]">
          <h2 className="font-bold text-slate-900 dark:text-white">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1A2340] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <Icon d={ICONS.x} className="h-4 w-4" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// Toasts with an optional Undo action (global undo for destructive changes)
export function ToastHost({ toasts, dismiss }) {
  return (
    <div className="fixed bottom-5 right-5 z-[80] space-y-2" aria-live="polite">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium pl-4 pr-3 py-3 shadow-xl"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>{t.text}</span>
          {t.undo && (
            <button
              onClick={() => {
                t.undo();
                dismiss(t.id);
              }}
              className="ml-1 px-2.5 py-1 rounded-lg bg-white/15 dark:bg-slate-900/10 text-xs font-bold hover:bg-white/25 dark:hover:bg-slate-900/20"
            >
              Undo
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export function downloadCsv(filename, header, rows) {
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const csv = [header, ...rows].map((r) => r.map(esc).join(",")).join("\n");
  const url = URL.createObjectURL(
    new Blob([csv], { type: "text/csv;charset=utf-8" }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
