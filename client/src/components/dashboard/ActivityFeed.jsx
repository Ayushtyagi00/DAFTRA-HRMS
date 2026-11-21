import { card } from "./ui";

export default function ActivityFeed({ items }) {
  return (
    <div className={`${card} p-6`}>
      <h3 className="font-bold text-slate-900 dark:text-white mb-4">
        Recent activity
      </h3>
      <ol className="relative space-y-5 border-l border-slate-200 dark:border-slate-800 ml-1">
        {items.map((a) => (
          <li key={a.id} className="pl-5 relative">
            <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-white dark:ring-slate-900" />
            <p className="text-sm text-slate-700 dark:text-slate-200">
              {a.text}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">{a.time}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
