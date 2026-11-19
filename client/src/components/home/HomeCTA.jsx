import { Link } from "react-router-dom";
import { Reveal, img } from "../../hooks/HomeHooks";

export default function HomeCTA() {
  return (
    <section className="px-6 pb-24 bg-white">
      <Reveal className="max-w-7xl mx-auto">
        <div className="group relative overflow-hidden rounded-[2rem] bg-slate-950 text-white">
          <img
            src={img("photo-1600880292203-757bb62b4baf", 2000)}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-40 transition-transform duration-[1600ms] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-950/80 to-transparent" />
          <div className="relative px-8 py-20 sm:px-16 sm:py-28 max-w-2xl">
            <h2 className="font-display text-4xl sm:text-5xl font-semibold leading-tight tracking-tight">
              Give your team one place to work.
            </h2>
            <p className="mt-5 text-lg text-blue-100/85">
              Create a workspace in a few minutes, or join one with an
              invitation code.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/onboarding"
                className="btn-shine px-8 py-4 rounded-full bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 hover:-translate-y-0.5 shadow-xl shadow-amber-400/20 transition-all"
              >
                Get started free
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 rounded-full border border-white/30 font-bold hover:bg-white/10 transition-colors"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
