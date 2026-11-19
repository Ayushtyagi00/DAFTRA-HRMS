import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FlowLayout from "./FlowLayout";

export default function CreateWorkspacePage() {
  const [form, setForm] = useState({ name: "", industry: "", size: "" });
  const navigate = useNavigate();
  const update = (key) => (event) => setForm({ ...form, [key]: event.target.value });

  return (
    <FlowLayout
      eyebrow="New workspace"
      title="Set up your workspace"
      description="Tell us a little about your organization. You can refine these details and invite your team after setup."
      step={3}
    >
      <form onSubmit={(event) => { event.preventDefault(); navigate("/dashboard"); }} className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-5">
        <label className="block"><span className="field-label">Workspace name</span><input required value={form.name} onChange={update("name")} placeholder="e.g. Acme Technologies" className="field-input" /></label>
        <label className="block"><span className="field-label">Industry</span><select required value={form.industry} onChange={update("industry")} className="field-input"><option value="">Select an industry</option><option>Technology</option><option>Financial services</option><option>Manufacturing</option><option>Professional services</option><option>Other</option></select></label>
        <label className="block"><span className="field-label">Team size</span><select required value={form.size} onChange={update("size")} className="field-input"><option value="">Select team size</option><option>1–10 employees</option><option>11–50 employees</option><option>51–200 employees</option><option>201+ employees</option></select></label>
        <button className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-600/20">Create workspace</button>
      </form>
    </FlowLayout>
  );
}
