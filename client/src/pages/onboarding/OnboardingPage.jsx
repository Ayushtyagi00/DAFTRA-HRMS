import { Link, useNavigate } from "react-router-dom";
import FlowLayout from "./FlowLayout";

const Arrow = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
  </svg>
);

export default function OnboardingPage() {
  const navigate = useNavigate();

  return (
    <FlowLayout
      eyebrow="Welcome to DAFTAR"
      title="How would you like to continue?"
      description="Choose the path that matches your situation. You can join an existing workspace or create a new one for your organization."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <button
          onClick={() => navigate("/invitation")}
          className="group text-left bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-900/10 transition-all"
        >
          <div className="flex items-start justify-between">
            <span className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">✉</span>
            <Arrow />
          </div>
          <h3 className="mt-7 text-xl font-bold text-slate-900">I have an invitation</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">Use your invitation link or code to join an organization that has already been set up.</p>
        </button>
        <button
          onClick={() => navigate("/register")}
          className="group text-left bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-900/10 transition-all"
        >
          <div className="flex items-start justify-between">
            <span className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl">＋</span>
            <Arrow />
          </div>
          <h3 className="mt-7 text-xl font-bold text-slate-900">Create an account</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">Register your details first, then create or join a workspace to get started.</p>
        </button>
      </div>
      <div className="mt-8 p-5 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-slate-800">Already registered?</p>
          <p className="text-sm text-slate-500 mt-1">Sign in to access your existing workspaces.</p>
        </div>
        <Link to="/login" className="shrink-0 text-sm font-bold text-blue-600 hover:text-blue-700">Log in</Link>
      </div>
    </FlowLayout>
  );
}
