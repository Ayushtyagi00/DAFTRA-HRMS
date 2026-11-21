import { card, Spark } from "./ui";

export default function StatCard({ label, value, sub, accent, trend }) {
  return (
    <div className={`${card} min-h-[148px] p-5 sm:p-6`}>
      <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500 mb-3">
        {label}
      </p>
      <div className="flex items-end justify-between gap-3">
        <div>
          <span className="block min-h-10 text-3xl font-extrabold text-slate-950 tracking-tight tabular-nums">
            {value}
          </span>
          {sub && (
            <p className={`text-xs font-semibold mt-2 ${accent || "text-emerald-600"}`}>
              {sub}
            </p>
          )}
        </div>
        {trend && (
          <Spark data={trend} className={accent || "text-emerald-600"} />
        )}
      </div>
    </div>
  );
}
