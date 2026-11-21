import { useEffect, useState } from "react";
import { Icon } from "./ui";
import { HR_ICONS, gradientBg } from "./hrUi";

const pad = (n) => String(n).padStart(2, "0");
const fmt = (s) =>
  `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;

// Check-in / check-out with a live worked-time timer
export default function CheckInCard({ name, onToast }) {
  const [since, setSince] = useState(null); // timestamp when checked in
  const [elapsed, setElapsed] = useState(0);
  const [total, setTotal] = useState(0); // seconds worked earlier today

  useEffect(() => {
    if (!since) return;
    const id = setInterval(
      () => setElapsed(Math.floor((Date.now() - since) / 1000)),
      1000,
    );
    return () => clearInterval(id);
  }, [since]);

  const toggle = () => {
    if (since) {
      setTotal((t) => t + elapsed);
      setSince(null);
      setElapsed(0);
      onToast(`Checked out. ${fmt(total + elapsed)} worked today`);
    } else {
      setSince(Date.now());
      onToast("Checked in. Have a good day");
    }
  };
  const hour = new Date().getHours();
  const greet =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <section
      className={`${gradientBg} rounded-2xl p-6 text-white shadow-lg shadow-blue-500/25 relative overflow-hidden`}
    >
      <div
        className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-white/10"
        aria-hidden="true"
      />
      <p className="text-sm text-sky-100">
        {greet}, {name.split(" ")[0]}
      </p>
      <p
        className="mt-3 text-4xl font-bold tabular-nums tracking-tight"
        aria-live="off"
      >
        {fmt(total + elapsed)}
      </p>
      <p className="text-xs text-sky-100 mt-1">
        {since ? "Working now" : total ? "Checked out" : "Not checked in yet"}
      </p>
      <button
        onClick={toggle}
        className="mt-5 w-full py-2.5 rounded-xl bg-white text-blue-800 text-sm font-bold hover:bg-sky-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-700"
      >
        {since ? "Check out" : "Check in"}
      </button>
      <p className="mt-3 flex items-center gap-1.5 text-xs text-sky-100">
        <Icon d={HR_ICONS.pin} className="h-3.5 w-3.5" /> Head office, on office
        network (IP 10.0.4.21)
      </p>
    </section>
  );
}
