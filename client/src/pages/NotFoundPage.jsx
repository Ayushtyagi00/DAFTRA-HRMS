import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/DAFTAR_white.png";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const authenticated = Boolean(localStorage.getItem("token"));

  const goHome = () => {
    if (authenticated) {
      navigate(userId ? `/dashboard/${userId}` : "/dashboard", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-6 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.22),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.14),_transparent_32%)]" />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col">
        <header className="flex h-24 items-center">
          <button
            type="button"
            onClick={goHome}
            aria-label="Go to DAFTAR home"
            className="rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <img src={Logo} alt="DAFTAR" className="h-10 w-auto" />
          </button>
        </header>

        <section className="flex flex-1 items-center justify-center pb-24">
          <div className="max-w-xl text-center">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.35em] text-blue-400">
              Error 404
            </p>
            <h1 className="text-7xl font-extrabold tracking-tight sm:text-8xl">
              404
            </h1>
            <h2 className="mt-5 text-2xl font-bold sm:text-3xl">
              This page could not be found
            </h2>
            <p className="mx-auto mt-4 max-w-lg leading-7 text-slate-400">
              The link may be incorrect, outdated, or the page may no longer be
              available. Check the address and try again.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={goHome}
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                {authenticated ? "Back to dashboard" : "Back to homepage"}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="rounded-xl border border-slate-700 bg-white/5 px-6 py-3 text-sm font-bold text-slate-200 transition hover:border-slate-600 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                Go back
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
