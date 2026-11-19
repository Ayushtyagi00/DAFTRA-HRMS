import { useEffect, useState } from "react";
import { Reveal, img } from "../../hooks/HomeHooks";

// Replace with real customer quotes and photos
const items = [
  {
    quote:
      "We stopped asking for status updates. The dashboard answers before anyone has to ask.",
    name: "Aditi Rao",
    role: "Engineering Manager",
    photo: "photo-1494790108377-be9c29b29330",
  },
  {
    quote:
      "Onboarding 30 people took an afternoon. They joined with a code and knew exactly where to look.",
    name: "Rohan Mehta",
    role: "Operations Head",
    photo: "photo-1507003211169-0a1dd7228f2d",
  },
  {
    quote:
      "I finally see who on my team is stretched thin, and I can fix it the same day.",
    name: "Priya Verma",
    role: "QA Lead",
    photo: "photo-1573496359142-b8d87734a5a2",
  },
];

export default function HomeTestimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = (n) => setI((n + items.length) % items.length);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((p) => (p + 1) % items.length), 7000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section
      id="stories"
      className="py-28 px-6 bg-white scroll-mt-16 overflow-hidden"
    >
      <div
        className="max-w-4xl mx-auto"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <Reveal>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight text-center">
            What teams say after the first month.
          </h2>
        </Reveal>

        <div className="mt-14 overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${i * 100}%)` }}
          >
            {items.map((t) => (
              <figure key={t.name} className="w-full shrink-0 px-2">
                <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-blue-50/50 p-8 sm:p-12 shadow-xl shadow-slate-900/5">
                  <blockquote className="font-display text-2xl sm:text-3xl leading-snug text-slate-900">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-4">
                    <img
                      src={img(t.photo, 120)}
                      alt={t.name}
                      className="w-14 h-14 rounded-full object-cover ring-4 ring-white shadow"
                    />
                    <div>
                      <p className="font-bold text-slate-900">{t.name}</p>
                      <p className="text-sm text-slate-500">{t.role}</p>
                    </div>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => go(i - 1)}
            aria-label="Previous"
            className="w-11 h-11 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors"
          >
            ‹
          </button>
          <div className="flex gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Testimonial ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-500 ${idx === i ? "w-8 bg-blue-600" : "w-2 bg-slate-300"}`}
              />
            ))}
          </div>
          <button
            onClick={() => go(i + 1)}
            aria-label="Next"
            className="w-11 h-11 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
