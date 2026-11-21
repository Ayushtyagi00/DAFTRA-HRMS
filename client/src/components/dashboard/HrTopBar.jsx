import { useEffect, useRef, useState } from "react";
import { Icon, card, focusRing } from "./ui";
import { Avatar, HR_ICONS, initialsOf, gradientBg } from "./hrUi";
import { ROLES } from "../../constant/hrmsData";

export default function HrTopBar({
  role,
  setRole,
  pageTitle,
  notifications,
  onReadAll,
  onMenu,
  onSearch,
  onQuickAdd,
}) {
  const [bell, setBell] = useState(false);
  const [menu, setMenu] = useState(false);
  const wrap = useRef(null);
  const user = ROLES[role].user;
  const unread = notifications.filter((n) => n.unread).length;

  // close popovers on outside click or Escape
  useEffect(() => {
    const down = (e) => {
      if (wrap.current && !wrap.current.contains(e.target)) {
        setBell(false);
        setMenu(false);
      }
    };
    const key = (e) => e.key === "Escape" && (setBell(false), setMenu(false));
    document.addEventListener("mousedown", down);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("mousedown", down);
      document.removeEventListener("keydown", key);
    };
  }, []);

  const iconBtn = `relative p-2.5 rounded-xl text-slate-500 hover:bg-sky-50 transition-colors ${focusRing}`;
  const pop = `${card} absolute right-0 mt-2 shadow-xl`;

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-sky-100 px-4 sm:px-6 lg:px-10 py-4 flex items-center gap-4">
      <button
        onClick={onMenu}
        aria-label="Open navigation"
        className={`lg:hidden ${iconBtn}`}
      >
        <Icon d={HR_ICONS.menu} />
      </button>
      <div className="min-w-0 mr-auto">
        <nav
          aria-label="Breadcrumb"
          className="text-xs text-slate-400 flex items-center gap-1"
        >
          <span>{ROLES[role].label}</span>
          <Icon d={HR_ICONS.chevron} className="h-3 w-3" />
          <span className="text-slate-500">
            {pageTitle}
          </span>
        </nav>
        <h1 className="text-xl font-bold text-slate-900 truncate">
          {pageTitle}
        </h1>
      </div>

      <button
        onClick={onSearch}
        className={`hidden md:flex items-center gap-2 w-64 rounded-xl border border-sky-100 bg-sky-50/60 px-3 py-2.5 text-sm text-slate-400 ${focusRing}`}
      >
        <Icon d={HR_ICONS.search} className="h-4 w-4" /> Search or jump to…
        <kbd className="ml-auto text-[10px] font-semibold border border-sky-200 rounded px-1.5 py-0.5">
          Ctrl K
        </kbd>
      </button>

      <div className="flex items-center gap-1.5" ref={wrap}>
        <div className="relative">
          <button
            onClick={() => {
              setBell(!bell);
              setMenu(false);
            }}
            aria-label={`Notifications, ${unread} unread`}
            aria-expanded={bell}
            className={iconBtn}
          >
            <Icon d={HR_ICONS.bell} />
            {unread > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full" />
            )}
          </button>
          {bell && (
            <div className={`${pop} w-80 p-2`}>
              <div className="flex items-center justify-between px-3 py-2">
                <p className="text-sm font-bold text-slate-900">
                  Notifications
                </p>
                <button
                  onClick={onReadAll}
                  className="text-xs font-semibold text-blue-700 hover:underline"
                >
                  Mark all as read
                </button>
              </div>
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="flex gap-3 px-3 py-2.5 rounded-xl hover:bg-sky-50"
                >
                  <span
                    className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${n.unread ? "bg-indigo-500" : "bg-transparent"}`}
                  />
                  <div>
                    <p className="text-sm text-slate-700">
                      {n.text}
                    </p>
                    <p className="text-xs text-slate-400">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={onQuickAdd}
          className={`px-4 py-2.5 text-white text-sm font-semibold rounded-xl transition-opacity ${gradientBg} hover:opacity-90 ${focusRing} ml-1 hidden sm:inline-flex items-center gap-1.5`}
        >
          <Icon d={HR_ICONS.plus} className="h-4 w-4" /> Quick add
        </button>

        <div className="relative ml-1">
          <button
            onClick={() => {
              setMenu(!menu);
              setBell(false);
            }}
            aria-label="Account and role menu"
            aria-expanded={menu}
            className={`rounded-full ${focusRing}`}
          >
            <Avatar initials={initialsOf(user.name)} />
          </button>
          {menu && (
            <div className={`${pop} w-64 p-2`}>
              <div className="px-3 py-2">
                <p className="text-sm font-bold text-slate-900">
                  {user.name}
                </p>
                <p className="text-xs text-slate-400">{user.title}</p>
              </div>
              <p className="px-3 pt-2 pb-1 text-xs font-semibold text-slate-400">
                View as
              </p>
              {Object.entries(ROLES).map(([key, r]) => (
                <button
                  key={key}
                  onClick={() => {
                    setRole(key);
                    setMenu(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm hover:bg-sky-50 text-slate-700 ${focusRing}`}
                >
                  {r.label}
                  {key === role && (
                    <Icon
                      d={HR_ICONS.check}
                      className="h-4 w-4 text-indigo-600"
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
