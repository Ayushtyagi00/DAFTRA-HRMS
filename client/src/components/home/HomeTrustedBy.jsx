import { Reveal } from "../../hooks/HomeHooks";

// Placeholder names: replace with your real customers or partners
const brands = [
  { name: "Acme Technologies", style: "font-bold tracking-tight" },
  { name: "Brightloom", style: "font-display italic font-semibold" },
  { name: "Kestrel Finance", style: "font-extrabold tracking-wide" },
  { name: "Orbit Works", style: "font-semibold tracking-[0.2em]" },
  { name: "Pinecrest", style: "font-display font-semibold" },
  { name: "Veritas Group", style: "font-bold tracking-tight" },
  { name: "Lumen Labs", style: "font-semibold tracking-wider" },
  { name: "Harbor & Co", style: "font-display italic" },
];

export default function HomeTrustedBy() {
  const loop = [...brands, ...brands];
  return (
    <section className="pt-24 pb-6 bg-slate-50 overflow-hidden">
      <Reveal>
        <p className="text-center text-sm font-semibold text-slate-500 px-6">
          Trusted by teams in technology, finance, manufacturing, and services
        </p>
      </Reveal>
      <div className="relative mt-8 group">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10" />
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {loop.map((b, i) => (
            <span
              key={i}
              className={`mx-10 text-2xl text-slate-400 hover:text-blue-700 transition-colors whitespace-nowrap ${b.style}`}
            >
              {b.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
