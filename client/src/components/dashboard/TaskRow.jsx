import PriorityDot from "./PriorityDot";
import { Icon, ICONS, focusRing } from "./ui";

export default function TaskRow({ task, onToggle, onDelete }) {
  return (
    <div className="group flex items-center gap-4 py-3.5 border-b border-slate-100 dark:border-slate-800 last:border-0">
      <button
        onClick={() => onToggle(task.id)}
        role="checkbox"
        aria-checked={task.done}
        aria-label={`Mark “${task.title}” as ${task.done ? "not done" : "done"}`}
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${focusRing} ${task.done ? "bg-emerald-500 border-emerald-500" : "border-slate-300 dark:border-slate-600 hover:border-indigo-500"}`}
      >
        {task.done && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </button>
      <div className="min-w-0 flex-1">
        <p
          className={`text-sm font-medium truncate ${task.done ? "text-slate-400 line-through" : "text-slate-800 dark:text-slate-100"}`}
        >
          {task.title}
        </p>
        <p className="text-xs text-slate-400 truncate">{task.project}</p>
      </div>
      <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 shrink-0 w-20">
        <PriorityDot priority={task.priority} />
        {task.priority}
      </div>
      <span
        className={`text-xs w-16 text-right shrink-0 ${task.due === "Today" && !task.done ? "font-semibold text-rose-600" : "text-slate-400"}`}
      >
        {task.due}
      </span>
      <button
        onClick={() => onDelete(task.id)}
        aria-label={`Delete “${task.title}”`}
        className={`p-1.5 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 opacity-0 group-hover:opacity-100 focus:opacity-100 transition ${focusRing}`}
      >
        <Icon d={ICONS.trash} className="h-4 w-4" />
      </button>
    </div>
  );
}
