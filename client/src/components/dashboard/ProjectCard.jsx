import StatusPill from "./StatusPill";
import { card, focusRing } from "./ui";

export default function ProjectCard({ project, role, onAssign }) {
  const total = project.tasksDone + project.tasksOpen;
  const bar =
    project.progress > 60
      ? "bg-emerald-500"
      : project.progress > 30
        ? "bg-amber-500"
        : "bg-rose-500";
  return (
    <div className={`${card} p-6 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <h3 className="font-bold text-slate-900 dark:text-white truncate">
            {project.name}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Due {project.dueDate}</p>
        </div>
        <StatusPill status={project.status} />
      </div>
      <div className="mb-4">
        <div className="flex justify-between text-xs text-slate-500 mb-1.5">
          <span>Progress</span>
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            {project.progress}%
          </span>
        </div>
        <div
          className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={project.progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className={`h-full rounded-full transition-all duration-500 ${bar}`}
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {project.members.map((m, i) => (
            <div
              key={i}
              className="w-7 h-7 rounded-full bg-slate-800 dark:bg-slate-700 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white dark:border-slate-900"
            >
              {m}
            </div>
          ))}
        </div>
        <span className="text-xs text-slate-400 tabular-nums">
          {project.tasksDone}/{total} tasks
        </span>
      </div>
      {(role === "manager" || role === "admin") && (
        <button
          onClick={() => onAssign(project)}
          className={`w-full mt-4 py-2 text-sm font-semibold text-indigo-600 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-colors ${focusRing}`}
        >
          Assign task
        </button>
      )}
    </div>
  );
}
