import { useMemo, useState } from "react";
import { Icon } from "./ui";
import { Avatar, Badge, STATUS_TONE, HR_ICONS, SectionCard } from "./hrUi";
import { today } from "../../constant/employeesData";

// Expandable org tree. Drag a person onto another to change their manager.
export default function OrgChart({ store, canEdit, onOpen, toast }) {
  const { employees, setEmployees } = store;
  const [open, setOpen] = useState(
    () =>
      new Set([
        "E1000",
        ...employees.filter((e) => e.managerId === "E1000").map((e) => e.id),
      ]),
  );
  const [drag, setDrag] = useState(null);
  const [over, setOver] = useState(null);

  const { byId, kids } = useMemo(() => {
    const byId = Object.fromEntries(employees.map((e) => [e.id, e]));
    const kids = {};
    employees.forEach((e) => {
      if (e.managerId && byId[e.managerId])
        (kids[e.managerId] ||= []).push(e.id);
    });
    return { byId, kids };
  }, [employees]);
  const roots = employees
    .filter((e) => !e.managerId || !byId[e.managerId])
    .map((e) => e.id);

  const isBelow = (anc, id) =>
    (kids[anc] || []).some((k) => k === id || isBelow(k, id));
  const toggle = (id) =>
    setOpen((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  const reassign = (empId, mgrId) => {
    if (empId === mgrId || byId[empId].managerId === mgrId) return;
    if (isBelow(empId, mgrId))
      return toast("A manager can't report to their own team member.");
    const prev = byId[empId];
    setEmployees((l) =>
      l.map((e) =>
        e.id === empId
          ? {
              ...e,
              managerId: mgrId,
              history: [
                {
                  date: today(),
                  title: "Manager changed",
                  detail: `Now reports to ${byId[mgrId].name}`,
                },
                ...e.history,
              ],
            }
          : e,
      ),
    );
    setOpen((s) => new Set(s).add(mgrId));
    toast(`${prev.name} now reports to ${byId[mgrId].name}`, () =>
      setEmployees((l) => l.map((e) => (e.id === empId ? prev : e))),
    );
  };

  const renderNode = (id) => {
    const e = byId[id],
      c = kids[id] || [],
      isOpen = open.has(id);
    return (
      <li key={id}>
        <div
          draggable={canEdit}
          onDragStart={() => setDrag(id)}
          onDragEnd={() => {
            setDrag(null);
            setOver(null);
          }}
          onDragOver={(ev) => {
            if (drag && drag !== id) {
              ev.preventDefault();
              setOver(id);
            }
          }}
          onDragLeave={() => setOver(null)}
          onDrop={(ev) => {
            ev.preventDefault();
            if (drag) reassign(drag, id);
            setOver(null);
          }}
          className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 mb-2 bg-white dark:bg-[#131A2E] ${over === id ? "border-indigo-500 ring-2 ring-indigo-500/30" : "border-slate-200 dark:border-[#243049]"} ${canEdit ? "cursor-grab" : ""} ${drag === id ? "opacity-50" : ""}`}
        >
          {c.length > 0 ? (
            <button
              onClick={() => toggle(id)}
              aria-expanded={isOpen}
              aria-label={`${isOpen ? "Collapse" : "Expand"} ${e.name}'s team`}
              className="p-1 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-[#1A2340] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <Icon
                d={HR_ICONS.chevron}
                className={`h-4 w-4 transition-transform ${isOpen ? "rotate-90" : ""}`}
              />
            </button>
          ) : (
            <span className="w-6" />
          )}
          <Avatar initials={e.initials} size="w-8 h-8" text="text-[11px]" />
          <button
            onClick={() => onOpen(id)}
            className="min-w-0 flex-1 text-left focus:outline-none focus-visible:underline"
          >
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
              {e.name}
            </p>
            <p className="text-xs text-slate-400 truncate">{e.designation}</p>
          </button>
          <Badge tone={STATUS_TONE[e.status]}>{e.status}</Badge>
          {c.length > 0 && (
            <span className="text-xs text-slate-400 tabular-nums w-14 text-right">
              {c.length} direct
            </span>
          )}
        </div>
        {isOpen && c.length > 0 && (
          <ul className="ml-5 pl-4 border-l border-slate-200 dark:border-[#243049]">
            {c.map((k) => renderNode(k))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <SectionCard
      title="Organization chart"
      action={
        <div className="flex gap-3 text-xs font-semibold">
          <button
            className="text-indigo-600 dark:text-indigo-300 hover:underline"
            onClick={() => setOpen(new Set(employees.map((e) => e.id)))}
          >
            Expand all
          </button>
          <button
            className="text-slate-500 hover:underline"
            onClick={() => setOpen(new Set(roots))}
          >
            Collapse all
          </button>
        </div>
      }
    >
      {canEdit && (
        <p className="text-xs text-slate-500 mb-4">
          Drag a person onto another to change who they report to. You can also
          change it from their profile. Every move can be undone.
        </p>
      )}
      <ul>{roots.map((r) => renderNode(r))}</ul>
    </SectionCard>
  );
}
