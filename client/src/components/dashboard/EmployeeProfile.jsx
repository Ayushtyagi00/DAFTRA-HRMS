import { useState } from "react";
import { Field, inputCls, btnPrimary, btnGhost, Icon } from "./ui";
import { Avatar, Badge, STATUS_TONE, HR_ICONS } from "./hrUi";
import { STATUSES, daysUntil, today, uid } from "../../constant/employeesData";

const TABS = [
  "Overview",
  "Job history",
  "Documents",
  "Assets",
  "Skills",
  "Notes",
  "Timeline",
];
const fmtDate = (s) =>
  s
    ? new Date(s).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Not set";

function ExpiryBadge({ expiry }) {
  if (!expiry) return <Badge>No expiry</Badge>;
  const d = daysUntil(expiry);
  if (d < 0) return <Badge tone="rose">Expired {Math.abs(d)}d ago</Badge>;
  if (d <= 30) return <Badge tone="amber">Expires in {d}d</Badge>;
  return <Badge tone="green">Valid to {fmtDate(expiry)}</Badge>;
}

const Row = ({ k, v }) => (
  <div>
    <dt className="text-xs text-slate-400">{k}</dt>
    <dd className="text-sm font-medium text-slate-800 dark:text-slate-100 break-words">
      {v || "Not set"}
    </dd>
  </div>
);

// perm = { job: bool, personal: bool }, isSelf hides manager-only notes
export default function EmployeeProfile({ emp, store, perm, isSelf, toast }) {
  const { employees, setEmployees, master } = store;
  const [tab, setTab] = useState("Overview");
  const [edit, setEdit] = useState(false);
  const [draft, setDraft] = useState(emp);
  const [doc, setDoc] = useState({ type: "Identity", expiry: "", file: "" });
  const [asset, setAsset] = useState({ name: "", tag: "" });
  const [skill, setSkill] = useState("");
  const [cert, setCert] = useState({ name: "", issuer: "", year: "" });
  const [note, setNote] = useState("");
  const [err, setErr] = useState("");
  const manager = employees.find((e) => e.id === emp.managerId);
  const tabs = TABS.filter((t) => !(isSelf && t === "Notes"));

  const patch = (fn) =>
    setEmployees((l) => l.map((e) => (e.id === emp.id ? fn(e) : e)));
  const withUndo = (fn, msg) => {
    const before = emp;
    patch(fn);
    toast(msg, () =>
      setEmployees((l) => l.map((e) => (e.id === before.id ? before : e))),
    );
  };

  const save = () => {
    if (!/^\+?[0-9 ]{10,14}$/.test(draft.phone.trim()))
      return setErr("Enter a valid phone number, 10 to 14 digits.");
    const changes = ["designation", "dept", "grade", "location", "status"]
      .filter((k) => draft[k] !== emp[k])
      .map((k) => `${k}: ${emp[k]} to ${draft[k]}`);
    patch((e) => ({
      ...e,
      ...draft,
      history: changes.length
        ? [
            {
              date: today(),
              title: "Role details updated",
              detail: changes.join(", "),
            },
            ...e.history,
          ]
        : e.history,
    }));
    setEdit(false);
    setErr("");
    toast("Profile updated");
  };
  const sel = (k, opts) => (
    <select
      className={inputCls}
      value={draft[k]}
      onChange={(e) => setDraft({ ...draft, [k]: e.target.value })}
    >
      {opts.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );

  const timeline = [
    ...emp.history.map((h) => ({ ...h, kind: "Job" })),
    ...(isSelf
      ? []
      : emp.notes.map((n) => ({
          date: n.date,
          title: "Note added",
          detail: n.text,
          kind: "Note",
        }))),
    ...emp.docs
      .filter((d) => d.addedOn)
      .map((d) => ({
        date: d.addedOn,
        title: `Document uploaded: ${d.name}`,
        detail: d.type,
        kind: "Doc",
      })),
  ].sort((a, b) => (a.date < b.date ? 1 : -1));
  const expiring = emp.docs.filter(
    (d) => d.expiry && daysUntil(d.expiry) <= 30,
  );

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Avatar initials={emp.initials} size="w-16 h-16" text="text-xl" />
        <div className="min-w-0">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white truncate">
            {emp.name}
          </h3>
          <p className="text-sm text-slate-500 truncate">
            {emp.designation}, {emp.dept}
          </p>
          <div className="mt-1.5 flex gap-2 items-center">
            <Badge tone={STATUS_TONE[emp.status]}>{emp.status}</Badge>
            <span className="text-xs text-slate-400">{emp.id}</span>
          </div>
        </div>
      </div>

      <div
        role="tablist"
        className="flex gap-1 overflow-x-auto border-b border-slate-200 dark:border-[#243049] mb-6"
      >
        {tabs.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`px-3.5 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 -mb-px focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-t-lg ${tab === t ? "border-indigo-600 text-indigo-700 dark:text-indigo-300" : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"}`}
          >
            {t}
            {t === "Documents" && expiring.length > 0 && (
              <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-amber-500 align-middle" />
            )}
          </button>
        ))}
      </div>

      {tab === "Overview" && (
        <div>
          {!edit ? (
            <>
              <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
                <Row k="Email" v={emp.email} />
                <Row k="Phone" v={emp.phone} />
                <Row k="Reports to" v={manager?.name || "None"} />
                <Row k="Location" v={emp.location} />
                <Row k="Grade" v={emp.grade} />
                <Row k="Joined" v={fmtDate(emp.joinDate)} />
                <Row k="Date of birth" v={fmtDate(emp.dob)} />
                <Row k="Gender" v={emp.gender} />
                <Row k="Address" v={emp.address} />
                <Row
                  k="Emergency contact"
                  v={
                    emp.emergency.name &&
                    `${emp.emergency.name} (${emp.emergency.relation}), ${emp.emergency.phone}`
                  }
                />
                <Row
                  k="Bank"
                  v={
                    emp.bank.name &&
                    `${emp.bank.name}, ${emp.bank.account.replace(/.(?=.{4})/g, "•")}`
                  }
                />
                <Row
                  k="PAN / UAN"
                  v={
                    emp.statutory.pan &&
                    `${emp.statutory.pan} / ${emp.statutory.uan || "n/a"}`
                  }
                />
              </dl>
              {(perm.job || perm.personal) && (
                <button
                  className={`${btnGhost} mt-6 border border-slate-200 dark:border-[#243049]`}
                  onClick={() => {
                    setDraft(emp);
                    setEdit(true);
                  }}
                >
                  Edit details
                </button>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Phone">
                  <input
                    className={inputCls}
                    value={draft.phone}
                    onChange={(e) =>
                      setDraft({ ...draft, phone: e.target.value })
                    }
                  />
                </Field>
                <Field label="Address">
                  <input
                    className={inputCls}
                    value={draft.address}
                    onChange={(e) =>
                      setDraft({ ...draft, address: e.target.value })
                    }
                  />
                </Field>
                {perm.job && (
                  <>
                    <Field label="Department">
                      {sel("dept", master.departments)}
                    </Field>
                    <Field label="Designation">
                      {sel("designation", master.designations)}
                    </Field>
                    <Field label="Location">
                      {sel("location", master.locations)}
                    </Field>
                    <Field label="Grade">{sel("grade", master.grades)}</Field>
                    <Field label="Status">{sel("status", STATUSES)}</Field>
                    <Field label="Reports to">
                      <select
                        className={inputCls}
                        value={draft.managerId || ""}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            managerId: e.target.value || null,
                          })
                        }
                      >
                        <option value="">None</option>
                        {employees
                          .filter((e) => e.id !== emp.id)
                          .map((e) => (
                            <option key={e.id} value={e.id}>
                              {e.name}
                            </option>
                          ))}
                      </select>
                    </Field>
                  </>
                )}
              </div>
              {err && (
                <p role="alert" className="text-sm text-rose-600">
                  {err}
                </p>
              )}
              <div className="flex gap-2">
                <button className={btnPrimary} onClick={save}>
                  Save changes
                </button>
                <button
                  className={btnGhost}
                  onClick={() => {
                    setEdit(false);
                    setErr("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "Job history" && (
        <ol className="space-y-4 border-l border-slate-200 dark:border-[#243049] ml-1">
          {emp.history.map((h, i) => (
            <li key={i} className="pl-5 relative">
              <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-500" />
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                {h.title}
              </p>
              <p className="text-xs text-slate-400">
                {fmtDate(h.date)}
                {h.detail ? `, ${h.detail}` : ""}
              </p>
            </li>
          ))}
        </ol>
      )}

      {tab === "Documents" && (
        <div className="space-y-5">
          {expiring.length > 0 && (
            <p
              role="alert"
              className="text-sm rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-200 px-4 py-3"
            >
              {expiring.length} document{expiring.length > 1 ? "s" : ""} expired
              or expiring within 30 days. Ask for a renewed copy.
            </p>
          )}
          <ul className="divide-y divide-slate-100 dark:divide-[#243049]">
            {emp.docs.map((d) => (
              <li key={d.id} className="py-3 flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
                    {d.name}
                  </p>
                  <p className="text-xs text-slate-400">{d.type}</p>
                </div>
                <ExpiryBadge expiry={d.expiry} />
                {perm.personal && (
                  <button
                    aria-label={`Remove ${d.name}`}
                    onClick={() =>
                      withUndo(
                        (e) => ({
                          ...e,
                          docs: e.docs.filter((x) => x.id !== d.id),
                        }),
                        "Document removed",
                      )
                    }
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500"
                  >
                    <Icon d={HR_ICONS.trash} className="h-4 w-4" />
                  </button>
                )}
              </li>
            ))}
            {emp.docs.length === 0 && (
              <li className="py-6 text-sm text-slate-500 text-center">
                No documents yet. Upload one below.
              </li>
            )}
          </ul>
          {perm.personal && (
            <div className="rounded-xl border border-dashed border-slate-300 dark:border-[#243049] p-4 space-y-3">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Upload a document
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                <select
                  aria-label="Document type"
                  className={inputCls}
                  value={doc.type}
                  onChange={(e) => setDoc({ ...doc, type: e.target.value })}
                >
                  {[
                    "Identity",
                    "Contract",
                    "Education",
                    "Certificate",
                    "Other",
                  ].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                <input
                  aria-label="Expiry date"
                  type="date"
                  className={inputCls}
                  value={doc.expiry}
                  onChange={(e) => setDoc({ ...doc, expiry: e.target.value })}
                />
                <input
                  aria-label="File"
                  type="file"
                  className="text-sm text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-indigo-700 file:font-semibold"
                  onChange={(e) =>
                    setDoc({ ...doc, file: e.target.files[0]?.name || "" })
                  }
                />
              </div>
              <button
                className={`${btnPrimary} disabled:opacity-50`}
                disabled={!doc.file}
                onClick={() => {
                  patch((e) => ({
                    ...e,
                    docs: [
                      ...e.docs,
                      {
                        id: uid(),
                        name: doc.file,
                        type: doc.type,
                        expiry: doc.expiry,
                        addedOn: today(),
                      },
                    ],
                  }));
                  setDoc({ type: "Identity", expiry: "", file: "" });
                  toast("Document uploaded");
                }}
              >
                Upload
              </button>
            </div>
          )}
        </div>
      )}

      {tab === "Assets" && (
        <div className="space-y-5">
          <ul className="divide-y divide-slate-100 dark:divide-[#243049]">
            {emp.assets.map((a) => (
              <li key={a.id} className="py-3 flex items-center gap-3">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    {a.name}
                  </p>
                  <p className="text-xs text-slate-400">Tag {a.tag}</p>
                </div>
                {perm.job && (
                  <button
                    className={`${btnGhost} !py-1.5 !text-xs border border-slate-200 dark:border-[#243049]`}
                    onClick={() =>
                      withUndo(
                        (e) => ({
                          ...e,
                          assets: e.assets.filter((x) => x.id !== a.id),
                          history: [
                            {
                              date: today(),
                              title: `Returned ${a.name}`,
                              detail: a.tag,
                            },
                            ...e.history,
                          ],
                        }),
                        "Asset marked as returned",
                      )
                    }
                  >
                    Mark returned
                  </button>
                )}
              </li>
            ))}
            {emp.assets.length === 0 && (
              <li className="py-6 text-sm text-slate-500 text-center">
                No assets assigned.
              </li>
            )}
          </ul>
          {perm.job && (
            <div className="grid sm:grid-cols-3 gap-3 items-end">
              <Field label="Asset">
                <input
                  className={inputCls}
                  value={asset.name}
                  onChange={(e) => setAsset({ ...asset, name: e.target.value })}
                  placeholder="e.g. Access card"
                />
              </Field>
              <Field label="Tag">
                <input
                  className={inputCls}
                  value={asset.tag}
                  onChange={(e) => setAsset({ ...asset, tag: e.target.value })}
                  placeholder="AC-1042"
                />
              </Field>
              <button
                className={`${btnPrimary} disabled:opacity-50`}
                disabled={!asset.name.trim() || !asset.tag.trim()}
                onClick={() => {
                  patch((e) => ({
                    ...e,
                    assets: [...e.assets, { id: uid(), ...asset }],
                    history: [
                      {
                        date: today(),
                        title: `Assigned ${asset.name}`,
                        detail: asset.tag,
                      },
                      ...e.history,
                    ],
                  }));
                  setAsset({ name: "", tag: "" });
                  toast("Asset assigned");
                }}
              >
                Assign
              </button>
            </div>
          )}
        </div>
      )}

      {tab === "Skills" && (
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
              Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {emp.skills.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300"
                >
                  {s}
                  {perm.personal && (
                    <button
                      aria-label={`Remove ${s}`}
                      onClick={() =>
                        patch((e) => ({
                          ...e,
                          skills: e.skills.filter((x) => x !== s),
                        }))
                      }
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
              {emp.skills.length === 0 && (
                <span className="text-sm text-slate-500">No skills added.</span>
              )}
            </div>
            {perm.personal && (
              <div className="flex gap-2 mt-3">
                <input
                  aria-label="New skill"
                  className={inputCls}
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  placeholder="Add a skill"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && skill.trim()) {
                      patch((x) => ({
                        ...x,
                        skills: [...new Set([...x.skills, skill.trim()])],
                      }));
                      setSkill("");
                    }
                  }}
                />
                <button
                  className={btnPrimary}
                  disabled={!skill.trim()}
                  onClick={() => {
                    patch((x) => ({
                      ...x,
                      skills: [...new Set([...x.skills, skill.trim()])],
                    }));
                    setSkill("");
                  }}
                >
                  Add
                </button>
              </div>
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
              Certifications
            </p>
            <ul className="space-y-2">
              {emp.certs.map((c) => (
                <li key={c.id} className="flex items-center gap-3 text-sm">
                  <span className="flex-1 text-slate-800 dark:text-slate-100">
                    {c.name}
                    <span className="text-xs text-slate-400">
                      , {c.issuer} {c.year}
                    </span>
                  </span>
                  {perm.personal && (
                    <button
                      aria-label={`Remove ${c.name}`}
                      className="text-slate-400 hover:text-rose-500"
                      onClick={() =>
                        patch((e) => ({
                          ...e,
                          certs: e.certs.filter((x) => x.id !== c.id),
                        }))
                      }
                    >
                      Remove
                    </button>
                  )}
                </li>
              ))}
              {emp.certs.length === 0 && (
                <li className="text-sm text-slate-500">
                  No certifications yet.
                </li>
              )}
            </ul>
            {perm.personal && (
              <div className="grid sm:grid-cols-4 gap-2 mt-3">
                <input
                  aria-label="Certification"
                  className={`${inputCls} sm:col-span-2`}
                  placeholder="Certification name"
                  value={cert.name}
                  onChange={(e) => setCert({ ...cert, name: e.target.value })}
                />
                <input
                  aria-label="Issuer"
                  className={inputCls}
                  placeholder="Issuer"
                  value={cert.issuer}
                  onChange={(e) => setCert({ ...cert, issuer: e.target.value })}
                />
                <input
                  aria-label="Year"
                  className={inputCls}
                  placeholder="Year"
                  value={cert.year}
                  onChange={(e) =>
                    setCert({
                      ...cert,
                      year: e.target.value.replace(/\D/g, "").slice(0, 4),
                    })
                  }
                />
                <button
                  className={`${btnPrimary} sm:col-span-4 disabled:opacity-50`}
                  disabled={!cert.name.trim()}
                  onClick={() => {
                    patch((e) => ({
                      ...e,
                      certs: [...e.certs, { id: uid(), ...cert }],
                    }));
                    setCert({ name: "", issuer: "", year: "" });
                    toast("Certification added");
                  }}
                >
                  Add certification
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === "Notes" && (
        <div className="space-y-4">
          <textarea
            aria-label="New note"
            rows={3}
            className={inputCls}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a private note visible to HR and managers"
          />
          <button
            className={`${btnPrimary} disabled:opacity-50`}
            disabled={!note.trim()}
            onClick={() => {
              patch((e) => ({
                ...e,
                notes: [
                  { id: uid(), text: note.trim(), date: today(), by: "You" },
                  ...e.notes,
                ],
              }));
              setNote("");
              toast("Note saved");
            }}
          >
            Save note
          </button>
          <ul className="space-y-3">
            {emp.notes.map((n) => (
              <li
                key={n.id}
                className="rounded-xl bg-slate-50 dark:bg-[#131A2E] p-4"
              >
                <p className="text-sm text-slate-700 dark:text-slate-200">
                  {n.text}
                </p>
                <div className="flex justify-between mt-2 text-xs text-slate-400">
                  <span>
                    {n.by}, {fmtDate(n.date)}
                  </span>
                  <button
                    className="hover:text-rose-500"
                    onClick={() =>
                      withUndo(
                        (e) => ({
                          ...e,
                          notes: e.notes.filter((x) => x.id !== n.id),
                        }),
                        "Note deleted",
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
            {emp.notes.length === 0 && (
              <li className="text-sm text-slate-500 text-center py-4">
                No notes yet.
              </li>
            )}
          </ul>
        </div>
      )}

      {tab === "Timeline" && (
        <ol className="space-y-5 border-l border-slate-200 dark:border-[#243049] ml-1">
          {timeline.map((t, i) => (
            <li key={i} className="pl-5 relative">
              <span
                className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ${t.kind === "Job" ? "bg-indigo-500" : t.kind === "Note" ? "bg-amber-500" : "bg-teal-500"}`}
              />
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                {t.title}
              </p>
              <p className="text-xs text-slate-500">{t.detail}</p>
              <p className="text-xs text-slate-400">{fmtDate(t.date)}</p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
