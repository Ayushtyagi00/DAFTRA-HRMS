import { useState, useMemo } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import TopBar from "../../components/dashboard/TopBar";
import StatCard from "../../components/dashboard/StatCard";
import ProjectCard from "../../components/dashboard/ProjectCard";
import TaskRow from "../../components/dashboard/TaskRow";
import TeamPanel from "../../components/dashboard/TeamPanel";
import ActivityFeed from "../../components/dashboard/ActivityFeed";
import StatusPill from "../../components/dashboard/StatusPill";

import {
  currentUser,
  ROLE_LABEL,
  projectsSeed,
  myTasksSeed,
  teamSeed,
  activitySeed,
} from "../../constant/dashboardConstants";

export default function DashboardPage() {
  const [role] = useState(currentUser.role); // drive from auth/session in production
  const [active, setActive] = useState("overview");
  const [tasks, setTasks] = useState(myTasksSeed);

  const toggleTask = (id) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );

  const stats = useMemo(() => {
    if (role === "employee") {
      const done = tasks.filter((t) => t.done).length;
      return [
        {
          label: "Assigned tasks",
          value: tasks.length,
          sub: `${done} done`,
          accent: "text-emerald-600",
        },
        {
          label: "Due today",
          value: tasks.filter((t) => t.due === "Today").length,
          sub: "Focus",
          accent: "text-amber-600",
        },
        {
          label: "Projects involved",
          value: 3,
          sub: "Active",
          accent: "text-slate-500",
        },
      ];
    }
    if (role === "manager") {
      return [
        {
          label: "Active projects",
          value: projectsSeed.length,
          sub: "1 at risk",
          accent: "text-amber-600",
        },
        {
          label: "Open tasks",
          value: projectsSeed.reduce((a, p) => a + p.tasksOpen, 0),
          sub: "Across team",
          accent: "text-slate-500",
        },
        {
          label: "Team members",
          value: teamSeed.length,
          sub: "1 overloaded",
          accent: "text-rose-600",
        },
      ];
    }
    return [
      {
        label: "Total projects",
        value: 12,
        sub: "+2 this month",
        accent: "text-emerald-600",
      },
      {
        label: "Employees",
        value: 48,
        sub: "3 pending invites",
        accent: "text-amber-600",
      },
      {
        label: "Managers",
        value: 6,
        sub: "Across 4 teams",
        accent: "text-slate-500",
      },
    ];
  }, [role, tasks]);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <Sidebar role={role} active={active} setActive={setActive} />

      <div className="flex-1 min-w-0">
        <TopBar role={role} />

        <main className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto">
          {/* Role banner */}
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 rounded-full px-3 py-1.5 w-fit">
            Signed in as {ROLE_LABEL[role]}
            {role === "admin" && " — full access"}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {stats.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left / main column */}
            <div className="lg:col-span-2 space-y-8">
              {role === "employee" ? (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-slate-900">My tasks</h3>
                    <span className="text-xs text-slate-400">
                      {tasks.filter((t) => !t.done).length} remaining
                    </span>
                  </div>
                  <div>
                    {tasks.map((t) => (
                      <TaskRow key={t.id} task={t} onToggle={toggleTask} />
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-900">
                      {role === "admin"
                        ? "All projects"
                        : "Your team's projects"}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {projectsSeed.map((p) => (
                      <ProjectCard key={p.id} project={p} role={role} />
                    ))}
                  </div>
                </div>
              )}

              {role === "admin" && (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                  <h3 className="font-bold text-slate-900 mb-4">
                    People &amp; roles
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-slate-400 text-xs uppercase tracking-wide border-b border-slate-100">
                          <th className="pb-3 font-semibold">Name</th>
                          <th className="pb-3 font-semibold">Role</th>
                          <th className="pb-3 font-semibold">Team</th>
                          <th className="pb-3 font-semibold">Status</th>
                          <th className="pb-3 font-semibold text-right">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            name: "Aditi Rao",
                            role: "Manager",
                            team: "Product Engineering",
                            status: "Active",
                          },
                          {
                            name: "Sahil Khanna",
                            role: "Employee",
                            team: "Product Engineering",
                            status: "Active",
                          },
                          {
                            name: "Priya Verma",
                            role: "Employee",
                            team: "QA",
                            status: "Overloaded",
                          },
                        ].map((p, i) => (
                          <tr
                            key={i}
                            className="border-b border-slate-50 last:border-0"
                          >
                            <td className="py-3 font-medium text-slate-800">
                              {p.name}
                            </td>
                            <td className="py-3 text-slate-500">{p.role}</td>
                            <td className="py-3 text-slate-500">{p.team}</td>
                            <td className="py-3">
                              <StatusPill status={p.status} />
                            </td>
                            <td className="py-3 text-right">
                              <button className="text-blue-600 text-xs font-semibold hover:underline">
                                Manage
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Right column */}
            <div className="space-y-8">
              {(role === "manager" || role === "admin") && (
                <TeamPanel team={teamSeed} />
              )}
              <ActivityFeed items={activitySeed} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
