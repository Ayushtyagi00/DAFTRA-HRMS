import { useNavigate } from "react-router-dom";
import FlowLayout from "./FlowLayout";

function Choice({ icon, title, description, onClick }) {
  return (
    <button onClick={onClick} className="w-full text-left flex gap-5 items-start p-6 rounded-2xl border border-slate-200 bg-white hover:border-blue-500 hover:shadow-lg transition-all">
      <span className="w-12 h-12 shrink-0 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">{icon}</span>
      <span>
        <span className="block text-lg font-bold text-slate-900">{title}</span>
        <span className="block mt-1 text-sm text-slate-500 leading-relaxed">{description}</span>
      </span>
      <span className="ml-auto text-slate-400 text-xl">→</span>
    </button>
  );
}

export default function WorkspacePage() {
  const navigate = useNavigate();
  return (
    <FlowLayout
      eyebrow="Workspace membership"
      title="Where do you want to work?"
      description="A workspace is the secure home for your organization, teams, projects, and conversations. Select an option to continue."
      step={2}
    >
      <div className="space-y-4">
        <Choice icon="＋" title="Create a new workspace" description="Set up a workspace for your organization and invite your team members." onClick={() => navigate("/workspace/create")} />
        <Choice icon="↗" title="Join an existing workspace" description="Use an invitation link or code from your organization administrator." onClick={() => navigate("/workspace/join")} />
      </div>
      <button onClick={() => navigate(-1)} className="mt-7 text-sm font-semibold text-slate-500 hover:text-slate-800">← Go back</button>
    </FlowLayout>
  );
}
