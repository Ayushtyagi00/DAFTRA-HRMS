import { Link } from "react-router-dom";
import LogoWhite from "../../assets/images/DAFTAR_white.png";
import bgImage from "../../assets/images/login_bg.png";

export default function FlowLayout({
  eyebrow = "Workspace setup",
  title,
  description,
  step,
  totalSteps = 4,
  children,
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <aside className="hidden lg:flex lg:w-[36%] xl:w-[32%] relative overflow-hidden bg-slate-950 p-12 flex-col justify-between">
        <div className="absolute inset-0">
          <img src={bgImage} alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 via-slate-950/95 to-slate-950" />
        </div>
        <div className="relative z-10">
          <Link to="/">
            <img src={LogoWhite} alt="DAFTAR" className="h-14 w-auto" />
          </Link>
          <div className="mt-24 max-w-sm">
            <p className="text-blue-300 text-sm font-bold uppercase tracking-[0.18em] mb-5">
              {eyebrow}
            </p>
            <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight">
              Build a better way to work.
            </h1>
            <p className="mt-6 text-slate-300 text-lg leading-relaxed">
              Bring your people, processes, and workplace communication together in one secure workspace.
            </p>
          </div>
        </div>
        <div className="relative z-10 text-sm text-slate-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          Your information is encrypted and protected
        </div>
      </aside>

      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-8 md:px-12 lg:px-20 lg:py-12">
          <div className="flex items-center justify-between mb-10">
            <Link to="/" className="lg:hidden">
              <img src={LogoWhite} alt="DAFTAR" className="h-9 w-auto brightness-0" />
            </Link>
            {step && (
              <div className="ml-auto flex items-center gap-3 text-xs font-bold text-slate-500">
                <span>Step {step} of {totalSteps}</span>
                <div className="w-28 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${(step / totalSteps) * 100}%` }} />
                </div>
              </div>
            )}
          </div>
          <div className="mb-9">
            <p className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-3">{eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">{title}</h2>
            <p className="mt-3 text-lg text-slate-500 leading-relaxed max-w-2xl">{description}</p>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
