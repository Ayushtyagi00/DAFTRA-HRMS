import StatusPill from "./StatusPill";

export default function TeamPanel({ team }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <h3 className="font-bold text-slate-900 mb-4">Team workload</h3>
      <div className="space-y-4">
        {team.map((member) => (
          <div key={member.id} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-800 text-white text-xs font-bold flex items-center justify-center shrink-0">
              {member.initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-800 truncate">
                {member.name}
              </p>
              <p className="text-xs text-slate-400">{member.role}</p>
            </div>
            <StatusPill status={member.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
