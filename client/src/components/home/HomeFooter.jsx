import { Link } from "react-router-dom";
import LogoWhite from "../../assets/images/DAFTAR_white.png";

const cols = [
  {
    title: "Product",
    links: [
      ["Features", "#features"],
      ["Roles", "#roles"],
      ["Why DAFTAR", "#compare"],
    ],
  },
  {
    title: "Get started",
    links: [
      ["Create an account", "/register"],
      ["Join with an invitation", "/invitation"],
      ["Log in", "/login"],
    ],
  },
];

export default function HomeFooter() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <img src={LogoWhite} alt="DAFTAR" className="h-12 w-auto" />
          <p className="mt-5 max-w-sm leading-relaxed">
            People, projects, and conversations together in one secure
            workspace.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <p className="font-bold text-white">{c.title}</p>
            <ul className="mt-5 space-y-3">
              {c.links.map(([label, to]) => (
                <li key={label}>
                  {to.startsWith("#") ? (
                    <a
                      href={to}
                      className="hover:text-white hover:translate-x-1 inline-block transition-all"
                    >
                      {label}
                    </a>
                  ) : (
                    <Link
                      to={to}
                      className="hover:text-white hover:translate-x-1 inline-block transition-all"
                    >
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 text-sm flex flex-col sm:flex-row justify-between gap-2">
          <p>© {new Date().getFullYear()} DAFTAR. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Your information is encrypted and protected
          </p>
        </div>
      </div>
    </footer>
  );
}
