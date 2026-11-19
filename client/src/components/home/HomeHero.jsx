import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { img } from "../../hooks/HomeHooks";

// Swap these images with your own brand photography
const slides = [
  {
    image: img("photo-1522071820081-009f0129c71c", 2000),
    title: "Your whole company, in one calm workspace.",
    text: "Projects, people, and conversations stop living in ten different tools and start moving together.",
  },
  {
    image: img("photo-1497366216548-37526070297c", 2000),
    title: "Managers see the work. Teams do the work.",
    text: "Clear roles for admins, managers, and employees, so everyone knows what is theirs today.",
  },
  {
    image: img("photo-1556761175-5973dc0f32e7", 2000),
    title: "Invite your team and start in minutes.",
    text: "Create a workspace, share a code, and your people are in. No training week required.",
  },
];

const DURATION = 6500;

export default function HomeHero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setI((p) => (p + 1) % slides.length), DURATION);
    return () => clearTimeout(t);
  }, [i, paused]);

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden bg-slate-950 text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Image slides with slow zoom */}
      {slides.map((s, idx) => (
        <img
          key={idx}
          src={s.image}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1400ms] ${
            idx === i ? "opacity-100 animate-kenburns" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-[100svh] grid lg:grid-cols-[1.25fr_0.75fr] gap-12 items-center pt-32 pb-40">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur px-4 py-2 text-sm font-semibold text-blue-100 animate-rise">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Built for growing organizations
          </div>

          {/* Headline swaps with each slide */}
          <div className="mt-7 relative min-h-[14rem] sm:min-h-[15rem] lg:min-h-[17rem]">
            {slides.map((s, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-all duration-1000 ${
                  idx === i
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10 pointer-events-none"
                }`}
              >
                <h1 className="font-display text-4xl sm:text-5xl lg:text-[4.25rem] leading-[1.05] font-semibold tracking-tight max-w-3xl">
                  {s.title}
                </h1>
                <p className="mt-5 text-lg text-slate-200/90 max-w-xl leading-relaxed">
                  {s.text}
                </p>
              </div>
            ))}
          </div>

          <div
            className="mt-8 flex flex-wrap gap-4 animate-rise"
            style={{ animationDelay: "200ms" }}
          >
            <Link
              to="/onboarding"
              className="btn-shine group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-amber-400 text-slate-950 font-bold shadow-xl shadow-amber-400/20 hover:bg-amber-300 hover:-translate-y-0.5 transition-all"
            >
              Start your workspace
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14m-6-6 6 6-6 6"
                />
              </svg>
            </Link>
            <Link
              to="/login"
              className="px-7 py-4 rounded-full border border-white/30 bg-white/5 backdrop-blur font-bold hover:bg-white/15 transition-colors"
            >
              Log in
            </Link>
          </div>
        </div>

        {/* Floating glass preview card */}
        <div className="hidden lg:block animate-float">
          <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Today</p>
              <span className="text-xs text-emerald-300 font-semibold">
                3 of 4 done
              </span>
            </div>
            <div className="mt-4 h-1.5 rounded-full bg-white/15 overflow-hidden">
              <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-blue-400 to-emerald-300" />
            </div>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                ["Approve Q4 roadmap", true],
                ["Review onboarding flow", true],
                ["Send team update", true],
                ["Plan sprint demo", false],
              ].map(([t, d]) => (
                <li key={t} className="flex items-center gap-3">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${d ? "bg-emerald-400 text-slate-900" : "border border-white/40"}`}
                  >
                    {d && "✓"}
                  </span>
                  <span
                    className={d ? "text-white/60 line-through" : "text-white"}
                  >
                    {t}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-3 border-t border-white/15 pt-4">
              <div className="flex -space-x-2">
                {[
                  "photo-1494790108377-be9c29b29330",
                  "photo-1507003211169-0a1dd7228f2d",
                  "photo-1573496359142-b8d87734a5a2",
                ].map((p) => (
                  <img
                    key={p}
                    src={img(p, 80)}
                    alt=""
                    className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover"
                  />
                ))}
              </div>
              <span className="text-xs text-slate-200">
                Product team is online
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Slide controls with progress */}
      <div className="absolute bottom-24 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className="group py-3 w-16 sm:w-24"
            >
              <span className="block h-1 rounded-full bg-white/25 overflow-hidden">
                <span
                  key={`${idx}-${i}-${paused}`}
                  className={`block h-full bg-white rounded-full ${idx < i ? "w-full" : idx === i ? "animate-progress" : "w-0"}`}
                  style={
                    idx === i
                      ? {
                          animationDuration: `${DURATION}ms`,
                          animationPlayState: paused ? "paused" : "running",
                        }
                      : undefined
                  }
                />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
