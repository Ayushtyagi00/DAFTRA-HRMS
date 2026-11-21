import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FlowLayout from "./FlowLayout";

export default function JoinWorkspacePage() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  return (
    <FlowLayout eyebrow="Join workspace" title="Enter your membership details" description="Paste the invitation link or enter the membership code provided by your administrator." step={3}>
      <form onSubmit={(event) => {
        event.preventDefault();
        const userId = localStorage.getItem("userId");
        navigate(userId ? `/dashboard/${userId}` : "/dashboard", { replace: true });
      }} className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6">
        <label className="block"><span className="field-label">Invitation link or membership code</span><input required value={code} onChange={(event) => setCode(event.target.value)} placeholder="e.g. ACME-7F92" className="field-input uppercase tracking-wider" /></label>
        <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 text-sm text-blue-800"><strong>Tip:</strong> If you don’t have a code, contact your organization administrator.</div>
        <button className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-600/20">Validate and join</button>
      </form>
    </FlowLayout>
  );
}
