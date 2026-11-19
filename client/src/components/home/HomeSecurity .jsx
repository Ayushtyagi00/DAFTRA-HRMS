import { Reveal } from "../../hooks/HomeHooks";

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

const items = [
  {
    title: "Encrypted and protected",
    text: "Your organization's information is protected in transit and at rest.",
    icon: "M7 11V8a5 5 0 0 1 10 0v3M5 11h14v10H5z",
  },
  {
    title: "Role-based access",
    text: "Admins, managers, and employees each see only what their job needs.",
    icon: "M16 11a4 4 0 1 0-8 0m-4 9a8 8 0 0 1 16 0",
  },
  {
    title: "Invitation-only joining",
    text: "People join with a valid link or code from your administrator.",
    icon: "M3 7l9 6 9-6M4 5h16v14H4z",
  },
  {
    title: "Clear activity history",
    text: "See what changed, who changed it, and when, across every project.",
    icon: "M12 8v4l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  },
];

export default function HomeSecurity() {
  return (
    <section
      id="security"
      className="relative py-28 px-6 bg-slate-950 text-white overflow-hidden scroll-mt-16"
    >
      <div className="absolute -right-40 top-10 w-[34rem] h-[34rem] rounded-full bg-blue-700/20 blur-[110px]" />
      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-16 items-center">
        <Reveal>
          <div className="relative mx-auto w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="absolute inset-0 rounded-full border border-blue-400/40 animate-pulse-ring"
                style={{ animationDelay: `${i * 1.2}s` }}
              />
            ))}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-[2.5rem] bg-gradient-to-br from-blue-500 to-blue-800 flex items-center justify-center shadow-2xl shadow-blue-600/40 rotate-6 hover:rotate-0 transition-transform duration-700">
              <svg
                className="w-16 h-16 sm:w-20 sm:h-20 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold tracking-tight">
              Your company's data stays your company's.
            </h2>
            <p className="mt-5 text-lg text-slate-300 max-w-xl">
              Security is built into how DAFTAR works, from who can join to what
              each person can see.
            </p>
          </Reveal>
          <div className="mt-10 grid sm:grid-cols-2 gap-5">
            {items.map((it, i) => (
              <Reveal key={it.title} delay={i * 100}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 hover:bg-white/10 hover:border-blue-400/40 transition-colors">
                  <span className="w-11 h-11 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center">
                    <Icon d={it.icon} />
                  </span>
                  <h3 className="mt-4 font-bold">{it.title}</h3>
                  <p className="mt-1.5 text-sm text-slate-300 leading-relaxed">
                    {it.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
