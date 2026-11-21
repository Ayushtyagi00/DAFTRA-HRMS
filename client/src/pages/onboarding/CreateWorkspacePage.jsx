import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import FlowLayout from "./FlowLayout";
import { workspaceAPI } from "../../server/workspaceApi";

export default function CreateWorkspacePage() {
  const workspaceNameRef = useRef(null);
  const industryTypeRef = useRef(null);
  const teamSizeRef = useRef(null);

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = localStorage.getItem("userId");
    const workspaceName = workspaceNameRef.current.value;
    const industryType = industryTypeRef.current.value;
    const teamSize = teamSizeRef.current.value;
    const response = await workspaceAPI.createWorkspace(
      workspaceName,
      industryType,
      teamSize,
      userId,
    );
    if (response.success) {
      const userId = localStorage.getItem("userId");
      navigate(userId ? `/dashboard/${userId}` : "/dashboard", {
        replace: true,
      });
    }
  };

  return (
    <FlowLayout
      eyebrow="New workspace"
      title="Set up your workspace"
      description="Tell us a little about your organization. You can refine these details and invite your team after setup."
      step={3}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-5"
      >
        <label className="block">
          <span className="field-label">Workspace name</span>
          <input
            required
            ref={workspaceNameRef}
            // value={form.name}
            placeholder="e.g. Acme Technologies"
            className="field-input"
          />
        </label>
        <label className="block">
          <span className="field-label">Industry</span>
          <select
            required
            ref={industryTypeRef}
            // value={form.industry}
            className="field-input"
          >
            <option value="">Select an industry</option>
            <option value="technology">Technology</option>
            <option value="financial-services">Financial services</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="professional-services">Professional services</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label className="block">
          <span className="field-label">Team size</span>
          <select
            required
            ref={teamSizeRef}
            // value={form.size}
            className="field-input"
          >
            <option value="">Select team size</option>
            <option value="1-10">1–10 employees</option>
            <option value="11-50">11–50 employees</option>
            <option value="51-200">51–200 employees</option>
            <option value="201+">201+ employees</option>
          </select>
        </label>
        <button className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-600/20">
          Create workspace
        </button>
      </form>
    </FlowLayout>
  );
}
