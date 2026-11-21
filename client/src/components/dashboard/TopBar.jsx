import { useEffect, useRef, useState } from "react";
import { currentUser } from "../../constant/dashboardConstants";
import { Icon, ICONS, card, focusRing, btnPrimary } from "./ui";

const TITLES = {
  overview: {
    admin: "Company overview",
    manager: "Team overview",
    employee: "My workspace",
  },
  projects: "Projects",
  tasks: "Tasks",
  team: "People",
  reports: "Reports",
};

export default function TopBar({
  role,
  active,
  query,
  setQuery,
  dark,
  setDark,
  notifications,
  onReadAll,
  onMenu,
  onNewProject,
}) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  const unread = notifications.filter((n) => n.unread).length;
  const title = active === "overview" ? TITLES.overview[role] : TITLES[active];

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const iconBtn = `relative p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${focusRing}`;

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-950/80 backdrop-blur border-b border-slate-200/70 dark:border-slate-800 px-4 sm:px-6 lg:px-10 py-4 flex items-center gap-4">
      <button
        onClick={onMenu}
        aria-label="Open navigation"
        className={`lg:hidden ${iconBtn}`}
      >
        <Icon d={ICONS.menu} />
      </button>
      <div className="min-w-0 mr-auto">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white truncate">
          {title}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
          Welcome back, {currentUser.name.split(" ")[0]}
        </p>
      </div>

      <div className="relative hidden md:block w-72">
        <Icon
          d={ICONS.search}
          className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects and tasks"
          aria-label="Search projects and tasks"
          className={`w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 pl-9 pr-12 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 ${focusRing}`}
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-slate-400 border border-slate-200 dark:border-slate-700 rounded px-1.5 py-0.5">
          Ctrl K
        </kbd>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => setDark(!dark)}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          className={iconBtn}
        >
          <Icon d={dark ? ICONS.sun : ICONS.moon} />
        </button>
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            aria-label={`Notifications, ${unread} unread`}
            aria-expanded={open}
            className={iconBtn}
          >
            <Icon d={ICONS.bell} />
            {unread > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full" />
            )}
          </button>
          {open && (
            <div className={`${card} absolute right-0 mt-2 w-80 p-2 shadow-xl`}>
              <div className="flex items-center justify-between px-3 py-2">
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  Notifications
                </p>
                <button
                  onClick={onReadAll}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:underline"
                >
                  Mark all as read
                </button>
              </div>
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="flex gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <span
                    className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${n.unread ? "bg-indigo-500" : "bg-transparent"}`}
                  />
                  <div>
                    <p className="text-sm text-slate-700 dark:text-slate-200">
                      {n.text}
                    </p>
                    <p className="text-xs text-slate-400">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {(role === "manager" || role === "admin") && (
          <button
            onClick={onNewProject}
            className={`${btnPrimary} ml-1 hidden sm:inline-flex items-center gap-1.5`}
          >
            <Icon d={ICONS.plus} className="h-4 w-4" /> New project
          </button>
        )}
      </div>
    </header>
  );
}
