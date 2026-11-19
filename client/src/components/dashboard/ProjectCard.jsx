import StatusPill from "./StatusPill";

export default function ProjectCard({ project, role }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-900">{project.name}</h3>
          <p className="text-xs text-slate-400 mt-0.5">Due {project.dueDate}</p>
        </div>
        <StatusPill status={project.status} />
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-xs text-slate-500 mb-1.5">
          <span>Progress</span>
          <span className="font-semibold text-slate-700">
            {project.progress}%
          </span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${project.progress > 60 ? "bg-emerald-500" : project.progress > 30 ? "bg-amber-500" : "bg-rose-500"}`}
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {project.members.map((m, i) => (
            <div
              key={i}
              className="w-7 h-7 rounded-full bg-slate-800 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white"
            >
              {m}
            </div>
          ))}
        </div>
        <span className="text-xs text-slate-400">
          {project.tasksDone}/{project.tasksDone + project.tasksOpen} tasks
        </span>
      </div>

      {(role === "manager" || role === "admin") && (
        <button className="w-full mt-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          Assign task →
        </button>
      )}
    </div>
  );
}
