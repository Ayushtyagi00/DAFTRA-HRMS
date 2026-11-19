import { Reveal } from "../../hooks/HomeHooks";

const steps = [
  {
    title: "Create or join a workspace",
    text: "Set up your organization in a minute, or join an existing one with an invitation link or code.",
    visual: (
      <div className="space-y-2.5">
        <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-400">
          Acme Technologies
        </div>
        <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-400 flex justify-between">
          Technology <span>▾</span>
        </div>
        <div className="rounded-lg bg-blue-600 px-3 py-2 text-xs text-center font-bold text-white">
          Create workspace
        </div>
      </div>
    ),
  },
  {
    title: "Invite people and set roles",
    text: "Share a code, then decide who is an admin, a manager, or an employee. Everyone lands in the right view.",
    visual: (
      <div className="space-y-2.5">
        <div className="rounded-lg border border-dashed border-blue-300 bg-blue-50 px-3 py-3 text-center font-bold tracking-[0.25em] text-blue-700 text-sm">
          DAF-4821
        </div>
        <div className="flex gap-2 text-[11px] font-bold">
          <span className="rounded-full bg-slate-900 text-white px-3 py-1">
            Manager
          </span>
          <span className="rounded-full bg-slate-100 text-slate-600 px-3 py-1">
            Employee
          </span>
        </div>
      </div>
    ),
  },
  {
    title: "Run projects together",
    text: "Assign tasks, follow progress, and keep everyone in the loop from one dashboard.",
    visual: (
      <div className="space-y-3">
        {[
          ["Design", 90, "bg-blue-500"],
          ["Build", 60, "bg-emerald-500"],
          ["Launch", 25, "bg-amber-500"],
        ].map(([n, w, c]) => (
          <div key={n}>
            <p className="text-[11px] font-bold text-slate-500 mb-1">{n}</p>
            <div className="h-2 rounded-full bg-slate-200">
              <div
                className={`h-full rounded-full ${c}`}
                style={{ width: `${w}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    ),
  },
];

export default function HomeHowItWorks() {
  return (
    <section id="how" className="py-28 px-6 bg-white scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight">
            Up and running in three steps.
          </h2>
          <p className="mt-5 text-lg text-slate-500">
            No long setup, no consultants. Most teams are working in DAFTAR the
            same day.
          </p>
        </Reveal>

        <div className="relative mt-16 grid md:grid-cols-3 gap-8">
          <div className="hidden md:block absolute top-7 left-[16%] right-[16%] border-t-2 border-dashed border-blue-200" />
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 150}>
              <div className="group relative h-full">
                <span className="relative z-10 flex w-14 h-14 items-center justify-center rounded-full bg-blue-600 text-white text-xl font-bold shadow-lg shadow-blue-600/30 ring-8 ring-white transition-transform duration-500 group-hover:scale-110">
                  {i + 1}
                </span>
                <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 hover:bg-white hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-1.5 transition-all duration-500">
                  <div className="rounded-2xl bg-slate-100 p-4 h-36 flex flex-col justify-center">
                    {s.visual}
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold text-slate-900">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-slate-500 leading-relaxed">
                    {s.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
