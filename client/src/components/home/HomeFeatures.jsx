import { useState } from "react";
import { Reveal, img } from "../../hooks/HomeHooks";

const Icon = ({ d }) => (
  <svg
    className="w-6 h-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);

const features = [
  {
    title: "Projects that stay on track",
    text: "Plan work, assign owners, and see which projects are healthy and which are slipping before the deadline does.",
    image: img("photo-1531482615713-2afd69097998", 1200),
    span: "lg:col-span-2",
    icon: "M3 7h18M3 12h18M3 17h10",
  },
  {
    title: "Tasks without the chase",
    text: "Everyone sees what is due today and checks it off. No status pings needed.",
    icon: "M5 13l4 4L19 7",
  },
  {
    title: "Roles that make sense",
    text: "Admins, managers, and employees each get a view built for their job.",
    icon: "M16 11a4 4 0 1 0-8 0m-4 9a8 8 0 0 1 16 0",
  },
  {
    title: "Team workload at a glance",
    text: "Spot who is overloaded and rebalance work before people burn out.",
    icon: "M4 20V10m6 10V4m6 16v-7m4 7H2",
  },
  {
    title: "Activity you can follow",
    text: "A live feed of what changed, who changed it, and when, across every project.",
    image: img("photo-1600880292203-757bb62b4baf", 1200),
    span: "lg:col-span-2",
    icon: "M12 8v4l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  },
];

const roles = [
  {
    id: "Admin",
    image: img("photo-1553877522-43269d4ea984", 1400),
    title: "Full control, zero friction",
    points: [
      "Invite people and assign roles",
      "Track every project across the company",
      "Keep workspace details and access secure",
    ],
  },
  {
    id: "Manager",
    image: img("photo-1519389950473-47ba0277781c", 1400),
    title: "Lead your team with clarity",
    points: [
      "See open tasks across your projects",
      "Spot overloaded teammates early",
      "Flag projects at risk in one click",
    ],
  },
  {
    id: "Employee",
    image: img("photo-1522071820081-009f0129c71c", 1400),
    title: "Know what to do next",
    points: [
      "A focused list of your own tasks",
      "See what is due today",
      "Stay in the loop on your projects",
    ],
  },
];

export default function HomeFeatures() {
  const [tab, setTab] = useState(0);

  return (
    <>
      <section id="features" className="py-28 px-6 bg-slate-50 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-slate-900 max-w-2xl tracking-tight">
              Everything your team needs to get work done together.
            </h2>
            <p className="mt-5 text-lg text-slate-500 max-w-xl">
              One workspace replaces the spreadsheets, chat threads, and
              reminders you juggle today.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-4">
            {features.map((f, idx) => (
              <Reveal key={f.title} delay={idx * 80} className={f.span || ""}>
                <article
                  className={`group h-full relative overflow-hidden rounded-3xl border border-slate-200 bg-white hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-900/10 hover:border-blue-200 transition-all duration-500 ${f.image ? "min-h-[22rem]" : "p-8"}`}
                >
                  {f.image ? (
                    <>
                      <img
                        src={f.image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-slate-950/10" />
                      <div className="relative h-full min-h-[22rem] p-8 flex flex-col justify-end text-white">
                        <span className="w-12 h-12 mb-4 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center">
                          <Icon d={f.icon} />
                        </span>
                        <h3 className="font-display text-2xl font-semibold">
                          {f.title}
                        </h3>
                        <p className="mt-2 text-slate-200 max-w-md leading-relaxed">
                          {f.text}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center transition-all duration-500 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-6">
                        <Icon d={f.icon} />
                      </span>
                      <h3 className="mt-6 font-display text-xl font-semibold text-slate-900">
                        {f.title}
                      </h3>
                      <p className="mt-2 text-slate-500 leading-relaxed">
                        {f.text}
                      </p>
                    </>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Role showcase */}
      <section id="roles" className="py-28 px-6 bg-white scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight max-w-2xl">
              One workspace, three points of view.
            </h2>
            <div
              role="tablist"
              className="mt-8 inline-flex p-1.5 rounded-full bg-slate-100"
            >
              {roles.map((r, idx) => (
                <button
                  key={r.id}
                  role="tab"
                  aria-selected={tab === idx}
                  onClick={() => setTab(idx)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${tab === idx ? "bg-slate-900 text-white shadow-lg" : "text-slate-600 hover:text-slate-900"}`}
                >
                  {r.id}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="mt-12 relative grid lg:grid-cols-2 gap-10 items-center">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/20 order-2 lg:order-1">
              {roles.map((r, idx) => (
                <img
                  key={r.id}
                  src={r.image}
                  alt={`${r.id} view`}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${tab === idx ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}
                />
              ))}
            </div>
            <div className="order-1 lg:order-2 relative min-h-[17rem]">
              {roles.map((r, idx) => (
                <div
                  key={r.id}
                  className={`transition-all duration-700 ${tab === idx ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 absolute inset-0 pointer-events-none"}`}
                >
                  <h3 className="font-display text-3xl font-semibold text-slate-900">
                    {r.title}
                  </h3>
                  <ul className="mt-7 space-y-4">
                    {r.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-3 text-lg text-slate-600"
                      >
                        <span className="mt-1 w-6 h-6 shrink-0 rounded-full bg-emerald-100 text-emerald-700 text-xs flex items-center justify-center font-bold">
                          ✓
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
