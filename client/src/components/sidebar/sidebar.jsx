import { Icon, focusRing } from "../dashboard/ui";
import { HR_ICONS, gradientBg } from "../dashboard/hrUi";
import { NAV } from "../../constant/hrmsData";

export default function Sidebar({
  role,
  active,
  onSelect,
  collapsed,
  setCollapsed,
  mobileOpen,
  closeMobile,
}) {
  const items = NAV[role];
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
          onClick={closeMobile}
        />
      )}
      <aside
        aria-label="Primary"
        className={`fixed lg:sticky top-0 z-50 lg:z-20 h-screen shrink-0 flex flex-col bg-white border-r border-sky-100 transition-all duration-200
        ${collapsed ? "lg:w-[76px]" : "lg:w-64"} w-64 ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex items-center gap-3 px-5 h-[73px] border-b border-sky-100">
          <div
            className={`w-9 h-9 rounded-xl ${gradientBg} text-white font-extrabold flex items-center justify-center shrink-0`}
          >
            P
          </div>
          {!collapsed && (
            <span className="font-extrabold text-slate-900 tracking-tight">
              Pulse HR
            </span>
          )}
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {items.map((it) => {
            const on = it.id === active;
            return (
              <button
                key={it.id}
                onClick={() => {
                  onSelect(it);
                  closeMobile();
                }}
                aria-current={on ? "page" : undefined}
                title={collapsed ? it.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${focusRing}
                ${on ? `${gradientBg} text-white shadow-md shadow-blue-500/20` : "text-slate-600 hover:bg-sky-50"}`}
              >
                <Icon d={HR_ICONS[it.icon]} className="h-5 w-5 shrink-0" />
                {!collapsed && <span className="truncate">{it.label}</span>}
                {!collapsed && it.phase > 1 && !on && (
                  <span className="ml-auto text-[10px] font-semibold text-slate-400">
                    Soon
                  </span>
                )}
              </button>
            );
          })}
        </nav>
        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={`hidden lg:flex items-center gap-3 m-3 px-3 py-2.5 rounded-xl text-sm text-slate-500 hover:bg-sky-50 ${focusRing}`}
        >
          <Icon
            d={HR_ICONS.collapse}
            className={`h-5 w-5 transition-transform ${collapsed ? "rotate-180" : ""}`}
          />
          {!collapsed && "Collapse"}
        </button>
      </aside>
    </>
  );
}
