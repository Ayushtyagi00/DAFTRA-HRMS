import PriorityDot from "./PriorityDot";

export default function TaskRow({ task, onToggle }) {
  return (
    <div className="flex items-center gap-4 py-3.5 border-b border-slate-50 last:border-0">
      <button
        onClick={() => onToggle(task.id)}
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
          task.done
            ? "bg-emerald-500 border-emerald-500"
            : "border-slate-300 hover:border-blue-500"
        }`}
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
          className={`text-sm font-medium truncate ${task.done ? "text-slate-400 line-through" : "text-slate-800"}`}
        >
          {task.title}
        </p>
        <p className="text-xs text-slate-400">{task.project}</p>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-slate-500 shrink-0">
        <PriorityDot priority={task.priority} />
        {task.priority}
      </div>
      <span className="text-xs text-slate-400 w-16 text-right shrink-0">
        {task.due}
      </span>
    </div>
  );
}
