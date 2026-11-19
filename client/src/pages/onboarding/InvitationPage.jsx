import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoWhite from "../../assets/images/DAFTAR_white.png";
import bgImage from "../../assets/images/login_bg.png";

export default function InvitationPage() {
  const [code, setCode] = useState("");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <section className="relative hidden md:flex md:w-1/2 min-h-screen overflow-hidden bg-slate-950">
        <img src={bgImage} alt="Team collaborating in an organization" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 via-blue-900/55 to-slate-950/90" />
        <div className="relative z-10 flex flex-col justify-between p-8 lg:p-14 w-full">
          <Link to="/">
            <img src={LogoWhite} alt="DAFTAR" className="h-12 w-auto" />
          </Link>
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100 backdrop-blur-sm">
              <span className="text-base">✉</span>
              You&apos;ve been invited
            </div>
            <h1 className="mt-6 text-4xl lg:text-5xl font-bold leading-tight text-white">
              Your next chapter starts with the right team.
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-blue-100/85">
              Join your organization on DAFTAR and keep your people, communication, and everyday work connected in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/85">
              <span className="rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">Secure workspace</span>
              <span className="rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">One team, one place</span>
            </div>
          </div>
          <p className="text-sm text-blue-100/70">A simpler way to work together.</p>
        </div>
      </section>

      <main className="w-full md:w-1/2 min-h-screen overflow-y-auto">
        <div className="max-w-xl mx-auto px-6 py-8 md:px-10 lg:px-16 lg:py-12">
          <div className="flex items-center justify-between mb-16">
            <Link to="/" className="md:hidden">
              <img src={LogoWhite} alt="DAFTAR" className="h-9 w-auto brightness-0" />
            </Link>
            <div className="ml-auto flex items-center gap-3 text-xs font-bold text-slate-500">
              <span>Step 1 of 4</span>
              <div className="w-28 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full w-1/4 bg-blue-600 rounded-full" />
              </div>
            </div>
          </div>
          <div className="mb-9">
            <p className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-3">Invitation</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">Join your organization</h2>
            <p className="mt-3 text-lg text-slate-500 leading-relaxed">
              Enter the invitation link or access code shared by your organization administrator. We&apos;ll validate it before showing your workspace details.
            </p>
          </div>
          <form onSubmit={(event) => { event.preventDefault(); setValidated(true); }} className="space-y-6">
            <label className="block">
              <span className="block text-sm font-bold text-slate-700 mb-2">Invitation link or code</span>
              <input
                required
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder="Paste link or enter code (e.g. DAF-4821)"
                className="w-full px-4 py-4 rounded-xl border border-slate-300 bg-white text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </label>
            {validated && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                <p className="font-bold text-emerald-800">Invitation found</p>
                <p className="mt-1 text-sm text-emerald-700">You&apos;ve been invited to join Acme Technologies as an Employee.</p>
              </div>
            )}
            <button type={validated ? "button" : "submit"} onClick={validated ? () => navigate("/workspace") : undefined} className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-600/20 transition-colors">
              {validated ? "Continue to workspace" : "Validate invitation"}
            </button>
          </form>
          <Link to="/onboarding" className="inline-block mt-6 text-sm font-semibold text-slate-500 hover:text-slate-800">← Back to options</Link>
        </div>
      </main>
    </div>
  );
}
