import { useEffect, useMemo, useRef, useState } from "react";
import { Icon, Empty, inputCls, btnPrimary, btnGhost, focusRing } from "./ui";
import {
  Avatar,
  Badge,
  STATUS_TONE,
  HR_ICONS,
  SectionCard,
  Drawer,
  Dialog,
  downloadCsv,
  gradientBg,
} from "./hrUi";
import { STATUSES, makeEmployee } from "../../constant/employeesData";
import EmployeeProfile from "./EmployeeProfile";
import AddEmployeeWizard from "./AddEmployeeWizard";
import OrgChart from "./OrgChart";
import MasterData from "./MasterData";

const PAGE = 12;
const COLS = [
  ["id", "ID"],
  ["name", "Name"],
  ["email", "Email"],
  ["dept", "Department"],
  ["designation", "Designation"],
  ["location", "Location"],
  ["grade", "Grade"],
  ["status", "Status"],
  ["joinDate", "Join date"],
];
const SORTS = {
  name: (a, b) => a.name.localeCompare(b.name),
  joined: (a, b) => (a.joinDate < b.joinDate ? 1 : -1),
  dept: (a, b) => a.dept.localeCompare(b.dept) || a.name.localeCompare(b.name),
};
const splitCsv = (l) =>
  l
    .split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/)
    .map((c) => c.trim().replace(/^"|"$/g, "").replace(/""/g, '"'));

export default function EmployeesPage({ store, role, toast, scope }) {
  const { employees, setEmployees, master } = store;
  const admin = role === "superadmin" || role === "hradmin";
  const [tab, setTab] = useState("Directory");
  const [input, setInput] = useState("");
  const [q, setQ] = useState("");
  const [f, setF] = useState({ dept: "All", status: "All", location: "All" });
  const [sort, setSort] = useState("name");
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);
  const [sel, setSel] = useState(new Set());
  const [openId, setOpenId] = useState(null);
  const [wizard, setWizard] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [importMsg, setImportMsg] = useState("");
  const fileRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setQ(input.trim().toLowerCase());
      setPage(1);
    }, 250);
    return () => clearTimeout(t);
  }, [input]);

  const base = useMemo(
    () => (scope ? employees.filter(scope) : employees),
    [employees, scope],
  );
  const rows = useMemo(
    () =>
      base
        .filter(
          (e) =>
            (f.dept === "All" || e.dept === f.dept) &&
            (f.status === "All" || e.status === f.status) &&
            (f.location === "All" || e.location === f.location),
        )
        .filter(
          (e) =>
            !q ||
            [e.name, e.email, e.id, e.designation, e.dept].some((v) =>
              v.toLowerCase().includes(q),
            ),
        )
        .sort(SORTS[sort]),
    [base, f, q, sort],
  );
  const pages = Math.max(1, Math.ceil(rows.length / PAGE));
  const cur = Math.min(page, pages);
  const slice = rows.slice((cur - 1) * PAGE, cur * PAGE);
  const open = employees.find((e) => e.id === openId);
  const filtersOn =
    q || f.dept !== "All" || f.status !== "All" || f.location !== "All";

  const setFilter = (k, v) => {
    setF({ ...f, [k]: v });
    setPage(1);
  };
  const toggle = (id) =>
    setSel((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  const allOnPage = slice.length > 0 && slice.every((e) => sel.has(e.id));
  const togglePage = () =>
    setSel((s) => {
      const n = new Set(s);
      slice.forEach((e) => (allOnPage ? n.delete(e.id) : n.add(e.id)));
      return n;
    });

  const exportRows = (list, name) => {
    downloadCsv(
      name,
      COLS.map((c) => c[1]),
      list.map((e) => COLS.map(([k]) => e[k])),
    );
    toast(`Exported ${list.length} employee${list.length === 1 ? "" : "s"}`);
  };
  const chosen = employees.filter((e) => sel.has(e.id));
  const bulkDelete = () => {
    const snap = employees;
    setEmployees((l) => l.filter((e) => !sel.has(e.id)));
    toast(
      `${chosen.length} employee${chosen.length > 1 ? "s" : ""} removed`,
      () => setEmployees(snap),
    );
    setSel(new Set());
  };
  const bulkMove = (dept) => {
    if (!dept) return;
    const snap = employees;
    setEmployees((l) => l.map((e) => (sel.has(e.id) ? { ...e, dept } : e)));
    toast(`${chosen.length} moved to ${dept}`, () => setEmployees(snap));
    setSel(new Set());
  };

  const onImport = async (file) => {
    if (!file) return;
    const lines = (await file.text()).split(/\r?\n/).filter(Boolean);
    const head = splitCsv(lines[0]).map((h) => h.toLowerCase());
    const col = (n) => head.indexOf(n);
    if (col("name") < 0 || col("email") < 0)
      return setImportMsg("The first row must include name and email columns.");
    let n = Math.max(...employees.map((e) => +e.id.slice(1))),
      added = [],
      skipped = 0;
    const emails = new Set(employees.map((e) => e.email.toLowerCase()));
    lines.slice(1).forEach((line) => {
      const c = splitCsv(line),
        get = (k) => (col(k) >= 0 ? c[col(k)] : "");
      const email = get("email");
      if (
        !get("name") ||
        !/^\S+@\S+\.\S+$/.test(email) ||
        emails.has(email.toLowerCase())
      )
        return skipped++;
      emails.add(email.toLowerCase());
      added.push(
        makeEmployee(
          {
            name: get("name"),
            email,
            dept: master.departments.includes(get("dept"))
              ? get("dept")
              : master.departments[0],
            designation: get("designation") || master.designations[0],
            location: master.locations.includes(get("location"))
              ? get("location")
              : master.locations[0],
          },
          `E${++n}`,
        ),
      );
    });
    if (!added.length)
      return setImportMsg(
        `No rows imported. ${skipped} skipped (missing name, bad email or duplicate).`,
      );
    const ids = new Set(added.map((e) => e.id));
    setEmployees((l) => [...l, ...added]);
    toast(
      `Imported ${added.length}${skipped ? `, skipped ${skipped}` : ""}`,
      () => setEmployees((l) => l.filter((e) => !ids.has(e.id))),
    );
    setImportOpen(false);
    setImportMsg("");
  };

  const tabs = ["Directory", "Org chart", ...(admin ? ["Master data"] : [])];
  const sm = `${inputCls} !w-auto !py-2`;

  return (
    <div className="space-y-6">
      <div
        role="tablist"
        className="flex gap-1 border-b border-slate-200 dark:border-[#243049]"
      >
        {tabs.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px rounded-t-lg ${focusRing} ${tab === t ? "border-indigo-600 text-indigo-700 dark:text-indigo-300" : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Directory" && (
        <>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[220px] max-w-sm">
              <Icon
                d={HR_ICONS.search}
                className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                aria-label="Search employees"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search name, email, ID or role"
                className={`${inputCls} pl-9`}
              />
            </div>
            <select
              aria-label="Department"
              className={sm}
              value={f.dept}
              onChange={(e) => setFilter("dept", e.target.value)}
            >
              <option>All</option>
              {master.departments.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
            <select
              aria-label="Status"
              className={sm}
              value={f.status}
              onChange={(e) => setFilter("status", e.target.value)}
            >
              <option>All</option>
              {STATUSES.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
            <select
              aria-label="Location"
              className={sm}
              value={f.location}
              onChange={(e) => setFilter("location", e.target.value)}
            >
              <option>All</option>
              {master.locations.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
            <select
              aria-label="Sort by"
              className={sm}
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="name">Sort: Name</option>
              <option value="joined">Sort: Newest joiners</option>
              <option value="dept">Sort: Department</option>
            </select>
            <div
              className="flex rounded-xl border border-slate-200 dark:border-[#243049] overflow-hidden"
              role="group"
              aria-label="View"
            >
              {["grid", "list"].map((v) => (
                <button
                  key={v}
                  aria-pressed={view === v}
                  onClick={() => setView(v)}
                  className={`px-3 py-2 text-sm font-semibold capitalize ${focusRing} ${view === v ? `${gradientBg} text-white` : "text-slate-500"}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm text-slate-500 mr-auto" aria-live="polite">
              {rows.length} employee{rows.length === 1 ? "" : "s"}
              {filtersOn && " match"}
            </p>
            {filtersOn && (
              <button
                className={btnGhost}
                onClick={() => {
                  setInput("");
                  setF({ dept: "All", status: "All", location: "All" });
                }}
              >
                Clear filters
              </button>
            )}
            <button
              className={`${btnGhost} border border-slate-200 dark:border-[#243049]`}
              onClick={() => exportRows(rows, "employees.csv")}
            >
              Export CSV
            </button>
            {admin && (
              <button
                className={`${btnGhost} border border-slate-200 dark:border-[#243049]`}
                onClick={() => setImportOpen(true)}
              >
                Import CSV
              </button>
            )}
            {admin && (
              <button
                className={`px-4 py-2.5 text-white text-sm font-semibold rounded-xl hover:opacity-90 ${gradientBg} ${focusRing}`}
                onClick={() => setWizard(true)}
              >
                Add employee
              </button>
            )}
          </div>

          {sel.size > 0 && (
            <div
              className="flex flex-wrap items-center gap-3 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 px-4 py-3"
              role="region"
              aria-label="Bulk actions"
            >
              <span className="text-sm font-semibold text-indigo-800 dark:text-indigo-200 mr-auto">
                {sel.size} selected
              </span>
              <button
                className={btnGhost}
                onClick={() => exportRows(chosen, "selected-employees.csv")}
              >
                Export selected
              </button>
              {admin && (
                <>
                  <select
                    aria-label="Move selected to department"
                    className={sm}
                    value=""
                    onChange={(e) => bulkMove(e.target.value)}
                  >
                    <option value="">Move to department…</option>
                    {master.departments.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                  <button
                    className="px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl"
                    onClick={bulkDelete}
                  >
                    Remove
                  </button>
                </>
              )}
              <button className={btnGhost} onClick={() => setSel(new Set())}>
                Clear
              </button>
            </div>
          )}

          {rows.length === 0 ? (
            <SectionCard>
              <Empty
                title="No employees match"
                hint="Try a different search or clear the filters."
                action={
                  <button
                    className={btnPrimary}
                    onClick={() => {
                      setInput("");
                      setF({ dept: "All", status: "All", location: "All" });
                    }}
                  >
                    Clear filters
                  </button>
                }
              />
            </SectionCard>
          ) : view === "grid" ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {slice.map((e) => (
                <div
                  key={e.id}
                  className="relative rounded-2xl border border-slate-200/70 dark:border-[#243049] bg-white dark:bg-[#131A2E] p-5 hover:shadow-md transition-shadow"
                >
                  <input
                    type="checkbox"
                    aria-label={`Select ${e.name}`}
                    checked={sel.has(e.id)}
                    onChange={() => toggle(e.id)}
                    className="absolute top-4 left-4 h-4 w-4 accent-indigo-600"
                  />
                  <button
                    onClick={() => setOpenId(e.id)}
                    className={`w-full text-center rounded-xl ${focusRing}`}
                  >
                    <div className="flex justify-center mb-3">
                      <Avatar
                        initials={e.initials}
                        size="w-14 h-14"
                        text="text-lg"
                      />
                    </div>
                    <p className="font-bold text-slate-900 dark:text-white truncate">
                      {e.name}
                    </p>
                    <p className="text-sm text-slate-500 truncate">
                      {e.designation}
                    </p>
                    <div className="mt-3 flex justify-center gap-2 flex-wrap">
                      <Badge tone="indigo">{e.dept}</Badge>
                      <Badge tone={STATUS_TONE[e.status]}>{e.status}</Badge>
                    </div>
                    <p className="mt-3 text-xs text-slate-400 truncate">
                      {e.location}, {e.email}
                    </p>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200/70 dark:border-[#243049] bg-white dark:bg-[#131A2E] overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-500 border-b border-slate-200 dark:border-[#243049]">
                    <th className="p-4 w-10">
                      <input
                        type="checkbox"
                        aria-label="Select all on this page"
                        checked={allOnPage}
                        onChange={togglePage}
                        className="h-4 w-4 accent-indigo-600"
                      />
                    </th>
                    <th className="p-4">Employee</th>
                    <th className="p-4">Department</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {slice.map((e) => (
                    <tr
                      key={e.id}
                      className="border-b last:border-0 border-slate-100 dark:border-[#243049] hover:bg-slate-50 dark:hover:bg-[#1A2340]"
                    >
                      <td className="p-4">
                        <input
                          type="checkbox"
                          aria-label={`Select ${e.name}`}
                          checked={sel.has(e.id)}
                          onChange={() => toggle(e.id)}
                          className="h-4 w-4 accent-indigo-600"
                        />
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => setOpenId(e.id)}
                          className={`flex items-center gap-3 text-left rounded-lg ${focusRing}`}
                        >
                          <Avatar
                            initials={e.initials}
                            size="w-8 h-8"
                            text="text-[11px]"
                          />
                          <span>
                            <span className="block font-semibold text-slate-800 dark:text-slate-100">
                              {e.name}
                            </span>
                            <span className="block text-xs text-slate-400">
                              {e.designation}, {e.id}
                            </span>
                          </span>
                        </button>
                      </td>
                      <td className="p-4 text-slate-600 dark:text-slate-300">
                        {e.dept}
                      </td>
                      <td className="p-4 text-slate-600 dark:text-slate-300">
                        {e.location}
                      </td>
                      <td className="p-4">
                        <Badge tone={STATUS_TONE[e.status]}>{e.status}</Badge>
                      </td>
                      <td className="p-4 text-slate-500 tabular-nums">
                        {e.joinDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {rows.length > PAGE && (
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span className="tabular-nums">
                {(cur - 1) * PAGE + 1} to {Math.min(cur * PAGE, rows.length)} of{" "}
                {rows.length}
              </span>
              <div className="flex gap-2">
                <button
                  className={`${btnGhost} border border-slate-200 dark:border-[#243049] disabled:opacity-40`}
                  disabled={cur === 1}
                  onClick={() => setPage(cur - 1)}
                >
                  Previous
                </button>
                <button
                  className={`${btnGhost} border border-slate-200 dark:border-[#243049] disabled:opacity-40`}
                  disabled={cur === pages}
                  onClick={() => setPage(cur + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {tab === "Org chart" && (
        <OrgChart
          store={store}
          canEdit={admin}
          onOpen={setOpenId}
          toast={toast}
        />
      )}
      {tab === "Master data" && admin && (
        <MasterData store={store} toast={toast} />
      )}

      <Drawer
        open={!!open}
        onClose={() => setOpenId(null)}
        title="Employee profile"
      >
        {open && (
          <EmployeeProfile
            key={open.id}
            emp={open}
            store={store}
            perm={{ job: admin, personal: admin }}
            isSelf={false}
            toast={toast}
          />
        )}
      </Drawer>
      <AddEmployeeWizard
        open={wizard}
        onClose={() => setWizard(false)}
        store={store}
        toast={toast}
      />

      <Dialog
        open={importOpen}
        onClose={() => {
          setImportOpen(false);
          setImportMsg("");
        }}
        title="Import employees"
      >
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
          Upload a CSV with the columns{" "}
          <b>name, email, dept, designation, location</b>. Name and email are
          required. Duplicate emails are skipped.
        </p>
        <button
          className="text-sm font-semibold text-indigo-600 dark:text-indigo-300 hover:underline mb-4"
          onClick={() =>
            downloadCsv(
              "employee-import-template.csv",
              ["name", "email", "dept", "designation", "location"],
              [
                [
                  "Jane Doe",
                  "jane.doe@pulsehr.example",
                  master.departments[0],
                  master.designations[0],
                  master.locations[0],
                ],
              ],
            )
          }
        >
          Download template
        </button>
        <input
          ref={fileRef}
          type="file"
          accept=".csv,text/csv"
          aria-label="CSV file"
          onChange={(e) => onImport(e.target.files[0])}
          className="block w-full text-sm text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-indigo-700 file:font-semibold"
        />
        {importMsg && (
          <p role="alert" className="mt-3 text-sm text-rose-600">
            {importMsg}
          </p>
        )}
      </Dialog>
    </div>
  );
}
