import { useState } from "react";
import LogoDark from "../../assets/images/DAFTAR.png";
import LogoIcon from "../../assets/images/DAFTAR Favicon.png";
import { currentUser, ROLE_LABEL, initials } from "../../constant/dashboardConstants";

export default function Sidebar({ role, active, setActive }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const baseItems = [
    {
      id: "overview",
      label: "Overview",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    },
    {
      id: "tasks",
      label: role === "employee" ? "My Tasks" : "Tasks",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
    },
    {
      id: "projects",
      label: "Projects",
      icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
    },
  ];
  const managerItems = [
    {
      id: "team",
      label: "Team",
      icon: "M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4",
    },
  ];
  const adminItems = [
    {
      id: "people",
      label: "People",
      icon: "M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4",
    },
    {
      id: "settings",
      label: "Company Settings",
      icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    },
  ];

  let items = [...baseItems];
  if (role === "manager")
    items = [...baseItems.slice(0, 2), managerItems[0], baseItems[2]];
  if (role === "admin")
    items = [
      ...baseItems.slice(0, 2),
      managerItems[0],
      baseItems[2],
      ...adminItems,
    ];

  return (
    <aside className={`hidden lg:flex flex-col bg-slate-900 text-slate-300 h-screen sticky top-0 py-6 px-4 transition-all duration-300 ease-in-out relative ${isExpanded ? "w-64" : "w-20 items-center"}`}>
      {/* Toggle Button */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-8 bg-slate-800 border border-slate-700 text-slate-300 rounded-full p-1 hover:text-white hover:bg-slate-700 transition-colors z-50 flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? "rotate-0" : "rotate-180"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className={`flex items-center gap-2 mb-8 ${isExpanded ? "px-2" : "justify-center"}`}>
        <img src={isExpanded ? LogoDark : LogoIcon} alt="DAFTAR" className={`${isExpanded ? "h-8" : "h-6"} w-auto`} />
        {isExpanded && (
          <span className="text-white font-bold text-lg tracking-tight whitespace-nowrap">
            DAFTAR
          </span>
        )}
      </div>

      <nav className={`flex-1 space-y-2 ${!isExpanded && "w-full"}`}>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            title={!isExpanded ? item.label : undefined}
            className={`flex items-center gap-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isExpanded ? "w-full px-3" : "w-12 h-12 justify-center mx-auto"} ${
              active === item.id
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "hover:bg-slate-800 hover:text-white"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
            </svg>
            {isExpanded && <span className="whitespace-nowrap">{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="border-t border-slate-800 pt-4 mt-4 w-full">
        <div className={`flex items-center gap-3 ${isExpanded ? "px-2" : "justify-center"}`}>
          <div
            title={!isExpanded ? currentUser.name : undefined}
            className={`w-9 h-9 rounded-full ${currentUser.avatarColor} flex items-center justify-center text-white text-sm font-bold shrink-0`}
          >
            {initials(currentUser.name)}
          </div>
          {isExpanded && (
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                {currentUser.name}
              </p>
              <p className="text-xs text-slate-400 truncate">
                {ROLE_LABEL[role]}
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
