import StatusPill from "./StatusPill";
import { card } from "./ui";

export default function TeamPanel({ team }) {
  return (
    <div className={`${card} p-6`}>
      <h3 className="font-bold text-slate-900 dark:text-white mb-4">
        Team workload
      </h3>
      <div className="space-y-5">
        {team.map((m) => (
          <div key={m.id}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-800 dark:bg-slate-700 text-white text-xs font-bold flex items-center justify-center shrink-0">
                {m.initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
                  {m.name}
                </p>
                <p className="text-xs text-slate-400 truncate">{m.role}</p>
              </div>
              <StatusPill status={m.status} />
            </div>
            <div className="mt-2.5 flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className={`h-full rounded-full ${m.load > 100 ? "bg-rose-500" : m.load > 80 ? "bg-amber-500" : "bg-indigo-500"}`}
                  style={{ width: `${Math.min(m.load, 100)}%` }}
                />
              </div>
              <span className="text-xs text-slate-400 tabular-nums w-9 text-right">
                {m.load}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
