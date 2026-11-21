import { useEffect, useMemo, useRef, useState } from "react";
import { Icon, card, focusRing } from "./ui";
import { HR_ICONS } from "./hrUi";

// Ctrl/Cmd+K palette. `commands` = [{ id, label, hint, icon, run }]
export default function CommandPalette({ open, onClose, commands }) {
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const ref = useRef(null);
  const list = useMemo(
    () =>
      commands.filter((c) => c.label.toLowerCase().includes(q.toLowerCase())),
    [commands, q],
  );
  useEffect(() => {
    if (!open) return undefined;
    const timer = setTimeout(() => {
      setQ("");
      setIdx(0);
      ref.current?.focus();
    }, 0);
    return () => clearTimeout(timer);
  }, [open]);
  if (!open) return null;
  const go = (c) => {
    if (c) {
      c.run();
      onClose();
    }
  };
  const onKey = (e) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIdx((i) => Math.min(i + 1, list.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setIdx((i) => Math.max(i - 1, 0));
    }
    if (e.key === "Enter") go(list[idx]);
  };
  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center pt-[15vh] p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`${card} dark:bg-[#131A2E] relative w-full max-w-lg overflow-hidden shadow-2xl`}
      >
        <input
          ref={ref}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setIdx(0);
          }}
          onKeyDown={onKey}
          placeholder="Jump to a page or run an action"
          aria-label="Search commands"
          className="w-full px-5 py-4 text-sm bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 border-b border-slate-200 dark:border-[#243049] focus:outline-none"
        />
        <ul className="max-h-80 overflow-y-auto p-2" role="listbox">
          {list.length === 0 && (
            <li className="px-4 py-6 text-sm text-slate-500">
              No match. Try “leave” or “payroll”.
            </li>
          )}
          {list.map((c, i) => (
            <li key={c.id} role="option" aria-selected={i === idx}>
              <button
                onClick={() => go(c)}
                onMouseEnter={() => setIdx(i)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left ${focusRing} ${i === idx ? "bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-200" : "text-slate-700 dark:text-slate-200"}`}
              >
                <Icon
                  d={HR_ICONS[c.icon] || HR_ICONS.chevron}
                  className="h-4 w-4"
                />
                {c.label}
                <span className="ml-auto text-xs text-slate-400">{c.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
