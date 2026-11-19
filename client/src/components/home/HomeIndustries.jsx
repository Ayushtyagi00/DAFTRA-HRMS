import { Reveal, img } from "../../hooks/HomeHooks";

// Swap with your own photography
const items = [
  {
    title: "Technology",
    image: "photo-1518770660439-4636190af475",
    text: "Ship faster with clear owners, sprint-ready task lists, and managers who see blockers early.",
    tags: ["Product teams", "Engineering", "QA"],
  },
  {
    title: "Financial services",
    image: "photo-1554224155-6726b3ff858f",
    text: "Keep approvals, reviews, and reporting work organized, with access that follows each person's role.",
    tags: ["Compliance", "Operations", "Reporting"],
  },
  {
    title: "Manufacturing",
    image: "photo-1565793298595-6a879b1d9492",
    text: "Coordinate plants, planners, and supervisors without chasing updates on the shop floor.",
    tags: ["Planning", "Supply chain", "Quality"],
  },
  {
    title: "Professional services",
    image: "photo-1521737604893-d14cc237f11d",
    text: "Balance client projects across consultants and see who has room for the next engagement.",
    tags: ["Consulting", "Legal", "Agencies"],
  },
];

export default function HomeIndustries() {
  return (
    <section id="industries" className="py-28 px-6 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight">
            Made for the way your industry works.
          </h2>
          <p className="mt-5 text-lg text-slate-500">
            Whatever you do, DAFTAR adapts to your teams, not the other way
            around.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-14 flex flex-col lg:flex-row gap-4 lg:h-[30rem]">
            {items.map((it) => (
              <article
                key={it.title}
                className="group relative overflow-hidden rounded-3xl min-h-[20rem] lg:min-h-0 lg:flex-1 lg:hover:flex-[2.4] transition-[flex] duration-700 ease-out"
              >
                <img
                  src={img(it.image, 1000)}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/10" />
                <div className="relative h-full p-7 flex flex-col justify-end text-white">
                  <h3 className="font-display text-2xl font-semibold">
                    {it.title}
                  </h3>
                  <div className="lg:max-h-0 lg:opacity-0 lg:group-hover:max-h-60 lg:group-hover:opacity-100 overflow-hidden transition-all duration-700">
                    <p className="mt-3 text-slate-200 leading-relaxed max-w-sm">
                      {it.text}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {it.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-semibold"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
