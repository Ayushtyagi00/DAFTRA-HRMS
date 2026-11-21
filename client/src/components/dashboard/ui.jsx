/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";

export const card =
  "bg-white rounded-2xl border border-sky-100 shadow-sm";
export const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";
export const inputCls = `w-full rounded-xl border border-sky-100 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 ${focusRing}`;
export const btnPrimary = `px-4 py-2.5 bg-gradient-to-br from-sky-400 via-blue-600 to-blue-900 hover:from-sky-500 hover:via-blue-700 hover:to-blue-950 text-white text-sm font-semibold rounded-xl transition-colors ${focusRing}`;
export const btnGhost = `px-4 py-2.5 text-sm font-semibold text-blue-700 hover:bg-sky-50 rounded-xl transition-colors ${focusRing}`;

export function Icon({ d, className = "h-5 w-5" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

export const ICONS = {
  overview:
    "M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10-3a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1v-7z",
  projects:
    "M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z",
  tasks: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  team: "M17 20h5v-2a4 4 0 00-3-3.9M9 11a4 4 0 100-8 4 4 0 000 8zm8 0a3 3 0 100-6M2 20v-2a4 4 0 014-4h6a4 4 0 014 4v2",
  reports: "M9 19V9m4 10V5m4 14v-7M5 19h14",
  search: "M21 21l-4.3-4.3M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z",
  bell: "M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
  sun: "M12 3v2m0 14v2m9-9h-2M5 12H3m15.4-6.4l-1.4 1.4M7 17l-1.4 1.4m12.8 0L17 17M7 7L5.6 5.6M16 12a4 4 0 11-8 0 4 4 0 018 0z",
  moon: "M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z",
  menu: "M4 6h16M4 12h16M4 18h16",
  plus: "M12 5v14M5 12h14",
  trash:
    "M6 7h12m-9 0V5a1 1 0 011-1h4a1 1 0 011 1v2m-8 0l1 12a1 1 0 001 1h6a1 1 0 001-1l1-12",
  x: "M6 6l12 12M18 6L6 18",
};

export function Modal({ open, title, onClose, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
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
      <div className={`${card} relative w-full max-w-md p-6 shadow-2xl`}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className={`p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 ${focusRing}`}
          >
            <Icon d={ICONS.x} className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}

export function Toasts({ toasts }) {
  return (
    <div className="fixed bottom-5 right-5 z-[60] space-y-2" aria-live="polite">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium px-4 py-3 shadow-xl"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          {t.text}
        </div>
      ))}
    </div>
  );
}

export function Ring({ value, size = 56 }) {
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth="5"
          fill="none"
          className="stroke-slate-100 dark:stroke-slate-800"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          className="stroke-indigo-500 transition-all duration-500"
          strokeDasharray={c}
          strokeDashoffset={c - (c * value) / 100}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-800 dark:text-slate-100">
        {value}%
      </span>
    </div>
  );
}

export function Spark({ data, className = "text-indigo-500" }) {
  const max = Math.max(...data),
    min = Math.min(...data);
  const pts = data
    .map(
      (v, i) =>
        `${(i / (data.length - 1)) * 80},${26 - ((v - min) / (max - min || 1)) * 22}`,
    )
    .join(" ");
  return (
    <svg
      viewBox="0 0 80 28"
      className={`w-20 h-7 ${className}`}
      aria-hidden="true"
    >
      <polyline
        points={pts}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BarChart({ data }) {
  const max = Math.max(...data.map((x) => x.v));
  return (
    <div
      className="flex items-end gap-3 h-44"
      role="img"
      aria-label="Tasks completed per day this week"
    >
      {data.map((x) => (
        <div
          key={x.d}
          className="flex-1 flex flex-col items-center gap-2 h-full justify-end group"
        >
          <span className="text-xs font-semibold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
            {x.v}
          </span>
          <div
            className="w-full rounded-t-lg bg-indigo-500/80 group-hover:bg-indigo-600 transition-colors"
            style={{ height: `${(x.v / max) * 78}%` }}
          />
          <span className="text-xs text-slate-400">{x.d}</span>
        </div>
      ))}
    </div>
  );
}

export function Empty({ title, hint, action }) {
  return (
    <div className="text-center py-12 px-4">
      <p className="font-semibold text-slate-800 dark:text-slate-100">
        {title}
      </p>
      <p className="text-sm text-slate-500 mt-1">{hint}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-slate-200/70 dark:bg-slate-800 ${className}`}
    />
  );
}
