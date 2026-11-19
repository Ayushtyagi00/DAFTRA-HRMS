import { CountUp, Reveal } from "../../hooks/HomeHooks";

const stats = [
  { to: 2400, suffix: "+", label: "Organizations onboarded" },
  { to: 86000, suffix: "+", label: "People working in DAFTAR" },
  { to: 40, suffix: "%", label: "Fewer status meetings" },
  { to: 99, suffix: ".9%", label: "Uptime, every month" },
];

export default function HomeStats() {
  return (
    <section className="relative z-20 -mt-16 px-6">
      <Reveal className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 rounded-3xl bg-white shadow-2xl shadow-slate-900/10 border border-slate-100 overflow-hidden">
          {stats.map((s, idx) => (
            <div
              key={s.label}
              className={`p-7 lg:p-9 hover:bg-blue-50/60 transition-colors ${idx % 2 === 1 ? "border-l" : ""} ${idx > 1 ? "border-t lg:border-t-0" : ""} ${idx > 0 ? "lg:border-l" : ""} border-slate-100`}
            >
              <p className="font-display text-4xl lg:text-5xl font-semibold text-slate-900">
                <CountUp to={s.to} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm text-slate-500 font-medium">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
