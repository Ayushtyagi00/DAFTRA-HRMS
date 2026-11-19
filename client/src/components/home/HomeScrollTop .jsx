import { useEffect, useState } from "react";

// Top reading-progress bar + back-to-top button with progress ring
export default function HomeScrollTop() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? Math.min(window.scrollY / h, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const C = 2 * Math.PI * 20;
  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none">
        <div
          className="h-full origin-left bg-gradient-to-r from-blue-500 via-blue-400 to-amber-400"
          style={{ transform: `scaleX(${p})` }}
        />
      </div>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white shadow-xl shadow-slate-900/20 flex items-center justify-center text-slate-800 hover:-translate-y-1 hover:bg-slate-900 hover:text-white transition-all duration-500 ${p > 0.08 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"}`}
      >
        <svg
          className="absolute inset-0 -rotate-90"
          viewBox="0 0 48 48"
          fill="none"
        >
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="#2563eb"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - p)}
          />
        </svg>
        <span className="relative text-lg leading-none">↑</span>
      </button>
    </>
  );
}
