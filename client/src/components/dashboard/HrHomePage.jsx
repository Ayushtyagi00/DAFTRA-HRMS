import { useState } from "react";
import StatCard from "./StatCard";
import TaskRow from "./TaskRow";
import ActivityFeed from "./ActivityFeed";
import CheckInCard from "./CheckInCard";
import { Skeleton, Icon, btnGhost, focusRing } from "./ui";
import {
  Avatar,
  Counter,
  SectionCard,
  AreaChart,
  Donut,
  Funnel,
  GrowthBars,
  HR_ICONS,
  initialsOf,
  gradientBg,
} from "./hrUi";
import * as D from "../../constant/hrmsData";

const isAdmin = (r) => r === "superadmin" || r === "hradmin";

function PeopleList({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((p) => (
        <li key={p.name} className="flex items-center gap-3">
          <Avatar initials={initialsOf(p.name)} />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
              {p.name}
            </p>
            <p className="text-xs text-slate-400 truncate">{p.dept}</p>
          </div>
          <span className="text-xs text-slate-500 shrink-0">{p.when}</span>
        </li>
      ))}
    </ul>
  );
}

export default function HrHomePage({ role, user, toast }) {
  const [loading] = useState(false);
  const [todos, setTodos] = useState(D.TODOS);
  const [approvals, setApprovals] = useState(D.APPROVALS);
  const [poll, setPoll] = useState(D.POLL);
  const [voted, setVoted] = useState(null);

  const deptSlices = D.DEPARTMENTS.map((name, i) => ({
    name,
    color: D.DEPT_COLORS[i],
    v: D.EMPLOYEES.filter((e) => e.dept === name).length,
  }));
  const genderSlices = ["Female", "Male", "Other"].map((name, i) => ({
    name,
    color: ["#FB7185", "#4F46E5", "#14B8A6"][i],
    v: D.EMPLOYEES.filter((e) => e.gender === name).length,
  }));

  const decide = (a, verdict) => {
    setApprovals((l) => l.filter((x) => x.id !== a.id));
    toast(`${verdict}: ${a.who}, ${a.what.split(",")[0].toLowerCase()}`);
  };
  const vote = (id) => {
    if (voted) return;
    setVoted(id);
    setPoll((p) => ({
      ...p,
      options: p.options.map((o) =>
        o.id === id ? { ...o, votes: o.votes + 1 } : o,
      ),
    }));
    toast("Vote recorded");
  };
  const pollTotal = poll.options.reduce((s, o) => s + o.votes, 0);
  const kpis = D.KPIS[role];

  if (loading) {
    return (
      <div className="grid gap-6 lg:grid-cols-3" aria-busy="true">
        <Skeleton className="h-56" />
        <div className="lg:col-span-2 grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {kpis.map((k) => (
            <Skeleton key={k.label} className="h-28" />
          ))}
        </div>
        <Skeleton className="h-64 lg:col-span-2" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-5 lg:grid-cols-3">
        <CheckInCard name={user.name} onToast={toast} />
        <div className="lg:col-span-2 grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {kpis.map((k) => (
            <StatCard
              key={k.label}
              label={k.label}
              sub={k.sub}
              accent={k.accent}
              trend={k.trend}
              value={
                <Counter
                  value={k.value}
                  decimals={k.decimals}
                  prefix={k.prefix}
                  suffix={k.suffix}
                />
              }
            />
          ))}
        </div>
      </div>

      {/* Analytics */}
      <div className="grid gap-5 lg:grid-cols-3">
        <SectionCard title="Attendance this week" className="lg:col-span-2">
          <AreaChart data={D.ATTENDANCE_TREND} />
        </SectionCard>
        {isAdmin(role) ? (
          <SectionCard title="People by department">
            <Donut slices={deptSlices} label="Employees by department" />
          </SectionCard>
        ) : (
          <SectionCard title="Upcoming holidays">
            <ul className="space-y-3">
              {D.HOLIDAYS.map((h) => (
                <li key={h.name} className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center justify-center text-center leading-tight">
                    {h.date}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      {h.name}
                    </p>
                    <p className="text-xs text-slate-400">{h.day}</p>
                  </div>
                </li>
              ))}
            </ul>
          </SectionCard>
        )}
      </div>

      {isAdmin(role) && (
        <div className="grid gap-5 lg:grid-cols-3">
          <SectionCard title="Hiring funnel">
            <Funnel data={D.HIRING_FUNNEL} />
          </SectionCard>
          <SectionCard title="Headcount growth">
            <GrowthBars data={D.HEADCOUNT_GROWTH} />
          </SectionCard>
          <SectionCard title="Gender diversity">
            <Donut slices={genderSlices} label="Gender diversity" size={120} />
          </SectionCard>
        </div>
      )}

      {/* People moments */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <SectionCard title="Birthdays">
          <PeopleList items={D.BIRTHDAYS} />
        </SectionCard>
        <SectionCard title="Work anniversaries">
          <PeopleList items={D.ANNIVERSARIES} />
        </SectionCard>
        <SectionCard title="New joiners">
          <PeopleList items={D.NEW_JOINERS} />
        </SectionCard>
      </div>

      {/* Action area */}
      <div className="grid gap-5 lg:grid-cols-3">
        {role !== "employee" && (
          <SectionCard title={`Pending approvals (${approvals.length})`}>
            {approvals.length === 0 ? (
              <p className="text-sm text-slate-500 py-6 text-center">
                You are all caught up. New requests will show here.
              </p>
            ) : (
              <ul className="space-y-4">
                {approvals.map((a) => (
                  <li key={a.id}>
                    <div className="flex items-center gap-3">
                      <Avatar initials={a.initials} seed={a.id} />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
                          {a.who}
                        </p>
                        <p className="text-xs text-slate-400 truncate">
                          {a.what}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2.5 pl-12">
                      <button
                        onClick={() => decide(a, "Approved")}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 ${focusRing}`}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => decide(a, "Rejected")}
                        className={`${btnGhost} !px-3 !py-1.5 !text-xs`}
                      >
                        Reject
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>
        )}

        <SectionCard
          title="My to-do list"
          className={role === "employee" ? "lg:col-span-2" : ""}
        >
          {todos.map((t) => (
            <TaskRow
              key={t.id}
              task={t}
              onToggle={(id) =>
                setTodos((l) =>
                  l.map((x) => (x.id === id ? { ...x, done: !x.done } : x)),
                )
              }
              onDelete={(id) => {
                setTodos((l) => l.filter((x) => x.id !== id));
                toast("To-do removed");
              }}
            />
          ))}
          {todos.length === 0 && (
            <p className="text-sm text-slate-500 py-6 text-center">
              Nothing on your list. Enjoy the quiet.
            </p>
          )}
        </SectionCard>

        <SectionCard title="Poll">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-3">
            {poll.question}
          </p>
          <div className="space-y-2">
            {poll.options.map((o) => {
              const pct = Math.round((o.votes / pollTotal) * 100);
              return (
                <button
                  key={o.id}
                  onClick={() => vote(o.id)}
                  disabled={!!voted}
                  className={`relative w-full text-left rounded-xl border px-3.5 py-2.5 text-sm overflow-hidden ${focusRing} ${voted === o.id ? "border-indigo-500" : "border-slate-200 dark:border-[#243049]"}`}
                >
                  {voted && (
                    <span
                      className="absolute inset-y-0 left-0 bg-indigo-100 dark:bg-indigo-500/20"
                      style={{ width: `${pct}%` }}
                    />
                  )}
                  <span className="relative flex justify-between text-slate-700 dark:text-slate-200">
                    <span>{o.text}</span>
                    {voted && (
                      <span className="tabular-nums font-semibold">{pct}%</span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="text-xs text-slate-400 mt-3">{pollTotal} votes</p>
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <SectionCard title="Announcements" className="lg:col-span-2">
          <ul className="divide-y divide-slate-100 dark:divide-[#243049]">
            {D.ANNOUNCEMENTS.map((a) => (
              <li key={a.id} className="py-3 first:pt-0 last:pb-0 flex gap-3">
                <span
                  className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${a.pinned ? `${gradientBg} text-white` : "bg-slate-100 dark:bg-[#1A2340] text-slate-500"}`}
                >
                  <Icon d={HR_ICONS.megaphone} className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    {a.title}
                  </p>
                  <p className="text-xs text-slate-400">
                    {a.by}, {a.time}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
        <ActivityFeed items={D.ACTIVITY} />
      </div>
    </div>
  );
}
