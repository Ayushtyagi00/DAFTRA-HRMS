import { useState } from "react";
import { inputCls, btnPrimary } from "./ui";
import { SectionCard } from "./hrUi";

const GROUPS = [
  {
    key: "departments",
    title: "Departments",
    field: "dept",
    hint: "e.g. Legal",
  },
  {
    key: "designations",
    title: "Designations",
    field: "designation",
    hint: "e.g. Data Analyst",
  },
  {
    key: "locations",
    title: "Locations",
    field: "location",
    hint: "e.g. Pune office",
  },
  { key: "grades", title: "Grades", field: "grade", hint: "e.g. G7" },
];

function Group({ g, store, toast }) {
  const { master, setMaster, employees } = store;
  const [val, setVal] = useState("");
  const list = master[g.key];
  const used = (name) => employees.filter((e) => e[g.field] === name).length;
  const add = () => {
    const v = val.trim();
    if (!v) return;
    if (list.some((x) => x.toLowerCase() === v.toLowerCase()))
      return toast(`${v} already exists`);
    setMaster((m) => ({ ...m, [g.key]: [...m[g.key], v] }));
    setVal("");
    toast(`${v} added`);
  };
  const remove = (name) => {
    setMaster((m) => ({ ...m, [g.key]: m[g.key].filter((x) => x !== name) }));
    toast(`${name} removed`, () =>
      setMaster((m) => ({ ...m, [g.key]: [...m[g.key], name] })),
    );
  };
  return (
    <SectionCard title={g.title}>
      <ul className="divide-y divide-slate-100 dark:divide-[#243049] mb-4 max-h-64 overflow-y-auto">
        {list.map((n) => (
          <li key={n} className="py-2 flex items-center gap-3 text-sm">
            <span className="flex-1 text-slate-800 dark:text-slate-100">
              {n}
            </span>
            <span className="text-xs text-slate-400 tabular-nums">
              {used(n)} in use
            </span>
            <button
              disabled={used(n) > 0}
              onClick={() => remove(n)}
              title={used(n) ? "Reassign people before removing" : "Remove"}
              aria-label={`Remove ${n}`}
              className="text-xs font-semibold text-rose-600 disabled:text-slate-300 dark:disabled:text-slate-600 disabled:cursor-not-allowed hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="flex gap-2">
        <input
          aria-label={`New ${g.title.toLowerCase()} entry`}
          className={inputCls}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder={g.hint}
        />
        <button className={btnPrimary} onClick={add}>
          Add
        </button>
      </div>
    </SectionCard>
  );
}

export default function MasterData({ store, toast }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {GROUPS.map((g) => (
        <Group key={g.key} g={g} store={store} toast={toast} />
      ))}
    </div>
  );
}
