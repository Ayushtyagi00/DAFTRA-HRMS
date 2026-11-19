import { currentUser } from "../../constant/dashboardConstants";

export default function TopBar({ role }) {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-slate-100 px-6 lg:px-10 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold text-slate-900">
          {role === "admin"
            ? "Company overview"
            : role === "manager"
              ? "Team overview"
              : "My workspace"}
        </h1>
        <p className="text-sm text-slate-500">
          Welcome back, {currentUser.name.split(" ")[0]} 👋
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative p-2.5 rounded-xl hover:bg-slate-100 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-slate-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full" />
        </button>
        {(role === "manager" || role === "admin") && (
          <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-colors">
            + New Project
          </button>
        )}
      </div>
    </header>
  );
}
