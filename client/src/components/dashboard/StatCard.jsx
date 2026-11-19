export default function StatCard({ label, value, sub, accent }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <p className="text-sm font-medium text-slate-500 mb-2">{label}</p>
      <div className="flex items-end justify-between">
        <span className="text-3xl font-bold text-slate-900 tracking-tight">
          {value}
        </span>
        {sub && (
          <span
            className={`text-xs font-semibold ${accent || "text-emerald-600"}`}
          >
            {sub}
          </span>
        )}
      </div>
    </div>
  );
}
