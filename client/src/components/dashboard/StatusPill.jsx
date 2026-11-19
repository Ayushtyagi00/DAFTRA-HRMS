export default function StatusPill({ status }) {
  const styles = {
    "On track": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "At risk": "bg-amber-50 text-amber-700 border-amber-200",
    Overloaded: "bg-rose-50 text-rose-700 border-rose-200",
    Active: "bg-slate-100 text-slate-600 border-slate-200",
  };
  return (
    <span
      className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${styles[status] || styles["Active"]}`}
    >
      {status}
    </span>
  );
}
