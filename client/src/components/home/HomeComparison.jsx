import { Reveal } from "../../hooks/HomeHooks";

const rows = [
  [
    "Tasks scattered across chats and sheets",
    "Every task in one place, with an owner",
  ],
  ["Status updates need a meeting", "Progress is visible without asking"],
  [
    "Nobody knows who is overloaded",
    "Workload shows up before it becomes a problem",
  ],
  [
    "New joiners wait days for access",
    "Join with a code and start the same day",
  ],
  ["Everyone sees everything, or nothing", "Each role sees what it needs"],
];

export default function HomeComparison() {
  return (
    <section id="compare" className="py-28 px-6 bg-slate-50 scroll-mt-16">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight text-center">
            Work, before and after DAFTAR.
          </h2>
        </Reveal>
        <div className="mt-14 grid md:grid-cols-2 gap-6 items-stretch">
          <Reveal>
            <div className="h-full rounded-3xl border border-slate-200 bg-white/60 p-8">
              <p className="font-bold text-slate-400">Without DAFTAR</p>
              <ul className="mt-6 space-y-5">
                {rows.map(([bad]) => (
                  <li key={bad} className="flex gap-3 text-slate-500">
                    <span className="mt-0.5 w-6 h-6 shrink-0 rounded-full bg-slate-200 text-slate-500 text-xs flex items-center justify-center">
                      ✕
                    </span>
                    {bad}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="h-full relative rounded-3xl bg-gradient-to-br from-blue-700 via-blue-800 to-slate-950 p-8 text-white shadow-2xl shadow-blue-900/30 md:-translate-y-4 hover:md:-translate-y-6 transition-transform duration-500">
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-amber-400/20 blur-3xl" />
              <p className="relative font-bold text-amber-300">With DAFTAR</p>
              <ul className="relative mt-6 space-y-5">
                {rows.map(([, good]) => (
                  <li key={good} className="flex gap-3">
                    <span className="mt-0.5 w-6 h-6 shrink-0 rounded-full bg-emerald-400 text-slate-900 text-xs font-bold flex items-center justify-center">
                      ✓
                    </span>
                    {good}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
