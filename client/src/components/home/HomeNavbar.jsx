import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoWhite from "../../assets/images/DAFTAR_white.png";

const links = [
  ["Features", "#features"],
  ["Roles", "#roles"],
  ["Why DAFTAR", "#compare"],
  ["Stories", "#stories"],
];

export default function HomeNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-white/85 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(10,23,48,0.25)]"
          : "bg-transparent"
      }`}
    >
      <nav
        className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-500 ${solid ? "h-16" : "h-24"}`}
      >
        <Link to="/" aria-label="DAFTAR home">
          <img
            src={LogoWhite}
            alt="DAFTAR"
            className={`w-auto transition-all duration-500 ${solid ? "h-9 brightness-0" : "h-12"}`}
          />
        </Link>

        <ul className="hidden md:flex items-center gap-9">
          {links.map(([label, href]) => (
            <li key={label}>
              <a
                href={href}
                className={`group relative text-sm font-semibold transition-colors ${solid ? "text-slate-700 hover:text-blue-600" : "text-white/85 hover:text-white"}`}
              >
                {label}
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-amber-400 transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className={`px-4 py-2 text-sm font-bold rounded-full transition-colors ${solid ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10"}`}
          >
            Log in
          </Link>
          <Link
            to="/onboarding"
            className="btn-shine px-5 py-2.5 text-sm font-bold rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 hover:-translate-y-0.5 transition-all"
          >
            Get started
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className={`md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-full ${solid ? "text-slate-800" : "text-white"}`}
        >
          <span
            className={`h-0.5 w-5 bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-5 bg-current transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-5 bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${open ? "max-h-96 border-t border-slate-200" : "max-h-0"}`}
      >
        <div className="px-6 py-5 flex flex-col gap-4">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="text-base font-semibold text-slate-800"
            >
              {label}
            </a>
          ))}
          <div className="flex gap-3 pt-2">
            <Link
              to="/login"
              className="flex-1 text-center py-3 rounded-xl border border-slate-300 font-bold text-slate-800"
            >
              Log in
            </Link>
            <Link
              to="/onboarding"
              className="flex-1 text-center py-3 rounded-xl bg-blue-600 font-bold text-white"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
