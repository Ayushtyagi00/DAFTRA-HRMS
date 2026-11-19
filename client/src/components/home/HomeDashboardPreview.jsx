import { useState } from "react";
import { Reveal, useInView, CountUp } from "../../hooks/HomeHooks";

const projects = [
  {
    name: "Mobile app relaunch",
    team: "Product Engineering",
    pct: 78,
    tone: "bg-emerald-500",
    tag: "On track",
    tagTone: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Payroll integration",
    team: "Finance Systems",
    pct: 46,
    tone: "bg-amber-500",
    tag: "At risk",
    tagTone: "bg-amber-100 text-amber-700",
  },
  {
    name: "Customer portal v2",
    team: "Design",
    pct: 91,
    tone: "bg-blue-500",
    tag: "Almost done",
    tagTone: "bg-blue-100 text-blue-700",
  },
];
const bars = [38, 62, 45, 80, 58, 92, 70];

export default function HomeDashboardPreview() {
  const [ref, seen] = useInView(0.25);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((e.clientY - r.top) / r.height - 0.5) * -5,
      y: ((e.clientX - r.left) / r.width - 0.5) * 7,
    });
  };

  return (
    <section className="relative py-28 px-6 bg-slate-950 text-white overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[60rem] h-[30rem] rounded-full bg-blue-600/25 blur-[120px]" />
      <div className="relative max-w-6xl mx-auto">
        <Reveal className="text-center max-w-3xl mx-auto">
          <h2 className="font-display text-4xl lg:text-5xl font-semibold tracking-tight">
            A dashboard that answers before you ask.
          </h2>
          <p className="mt-5 text-lg text-slate-300">
            Open DAFTAR and see what is moving, what is stuck, and who needs
            help, all on one screen.
          </p>
        </Reveal>

        <div
          ref={ref}
          className="mt-16 [perspective:1600px]"
          onMouseMove={onMove}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        >
          <div
            className="relative transition-transform duration-300 ease-out"
            style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
          >
            {/* Browser frame */}
            <div className="rounded-3xl overflow-hidden bg-slate-50 text-slate-900 shadow-[0_40px_120px_-20px_rgba(37,99,235,0.45)] ring-1 ring-white/20">
              <div className="flex items-center gap-2 px-5 py-3 bg-slate-100 border-b border-slate-200">
                <span className="w-3 h-3 rounded-full bg-rose-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="ml-4 flex-1 max-w-sm rounded-full bg-white px-4 py-1 text-xs text-slate-400 truncate">
                  daftar.app/dashboard
                </span>
              </div>
              <div className="flex">
                <aside className="hidden md:flex w-16 flex-col items-center gap-4 py-6 bg-slate-950">
                  {["▦", "☰", "☺", "✉"].map((s, i) => (
                    <span
                      key={i}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm ${i === 0 ? "bg-blue-600 text-white" : "text-slate-500"}`}
                    >
                      {s}
                    </span>
                  ))}
                </aside>
                <div className="flex-1 p-5 sm:p-8 space-y-6 min-w-0">
                  <div className="grid grid-cols-3 gap-3 sm:gap-5">
                    {[
                      [
                        "Total projects",
                        12,
                        "+2 this month",
                        "text-emerald-600",
                      ],
                      ["Employees", 48, "3 pending invites", "text-amber-600"],
                      ["Managers", 6, "Across 4 teams", "text-slate-500"],
                    ].map(([l, v, s, c]) => (
                      <div
                        key={l}
                        className="rounded-2xl bg-white border border-slate-100 p-3 sm:p-5 shadow-sm"
                      >
                        <p className="text-[11px] sm:text-xs text-slate-400 font-semibold">
                          {l}
                        </p>
                        <p className="mt-1 text-2xl sm:text-3xl font-bold">
                          {seen ? <CountUp to={v} duration={1200} /> : 0}
                        </p>
                        <p
                          className={`mt-1 text-[11px] sm:text-xs font-semibold ${c}`}
                        >
                          {s}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="grid lg:grid-cols-5 gap-5">
                    <div className="lg:col-span-3 space-y-3">
                      {projects.map((p) => (
                        <div
                          key={p.name}
                          className="rounded-2xl bg-white border border-slate-100 p-4 shadow-sm"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="min-w-0">
                              <p className="font-bold text-sm truncate">
                                {p.name}
                              </p>
                              <p className="text-xs text-slate-400">{p.team}</p>
                            </div>
                            <span
                              className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-bold ${p.tagTone}`}
                            >
                              {p.tag}
                            </span>
                          </div>
                          <div className="mt-3 h-2 rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${p.tone} transition-all duration-[1600ms] ease-out`}
                              style={{ width: seen ? `${p.pct}%` : "0%" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-100 p-5 shadow-sm">
                      <p className="font-bold text-sm">
                        Tasks completed this week
                      </p>
                      <div className="mt-6 h-32 flex items-end gap-2">
                        {bars.map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-t-lg bg-gradient-to-t from-blue-600 to-blue-400 transition-all duration-[1400ms] ease-out"
                            style={{
                              height: seen ? `${h}%` : "4%",
                              transitionDelay: `${i * 90}ms`,
                            }}
                          />
                        ))}
                      </div>
                      <div className="mt-2 flex justify-between text-[10px] text-slate-400 font-semibold">
                        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                          <span key={i} className="flex-1 text-center">
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating notifications */}
            <div className="hidden md:flex absolute -left-6 top-40 items-center gap-3 rounded-2xl bg-white text-slate-900 px-4 py-3 shadow-2xl animate-float">
              <span className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                ✓
              </span>
              <div>
                <p className="text-sm font-bold">QA sign-off done</p>
                <p className="text-xs text-slate-400">Priya Verma, just now</p>
              </div>
            </div>
            <div className="hidden md:flex absolute -right-6 bottom-24 items-center gap-3 rounded-2xl bg-white text-slate-900 px-4 py-3 shadow-2xl animate-float [animation-delay:1.5s]">
              <span className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                !
              </span>
              <div>
                <p className="text-sm font-bold">Workload high</p>
                <p className="text-xs text-slate-400">1 teammate overloaded</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
