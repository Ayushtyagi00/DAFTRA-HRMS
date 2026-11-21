import { useState } from "react";
import { Field, inputCls, btnPrimary, btnGhost } from "./ui";
import { Dialog, gradientBg } from "./hrUi";
import { makeEmployee, today, uid } from "../../constant/employeesData";

const STEPS = [
  "Personal",
  "Job",
  "Bank",
  "Statutory",
  "Documents",
  "Emergency",
];
const REQUIRED_DOCS = [
  "Aadhaar card",
  "PAN card",
  "Education certificate",
  "Signed offer letter",
];
const blank = (master) => ({
  name: "",
  email: "",
  phone: "",
  dob: "",
  gender: "Female",
  address: "",
  dept: master.departments[0],
  designation: master.designations[0],
  location: master.locations[0],
  grade: master.grades[1],
  managerId: "",
  joinDate: today(),
  status: "Probation",
  bank: { name: "", account: "", ifsc: "" },
  statutory: { pan: "", uan: "" },
  files: {},
  emergency: { name: "", relation: "", phone: "" },
});

export default function AddEmployeeWizard({ open, onClose, store, toast }) {
  const { employees, setEmployees, master } = store;
  const [step, setStep] = useState(0);
  const [f, setF] = useState(() => blank(master));
  const [errors, setErrors] = useState({});
  const set = (k, v) => setF((x) => ({ ...x, [k]: v }));
  const nest = (g, k, v) => setF((x) => ({ ...x, [g]: { ...x[g], [k]: v } }));

  const validate = (s) => {
    const e = {};
    if (s === 0) {
      if (!f.name.trim()) e.name = "Enter the full name.";
      if (!/^\S+@\S+\.\S+$/.test(f.email))
        e.email = "Enter a valid work email.";
      else if (
        employees.some((x) => x.email.toLowerCase() === f.email.toLowerCase())
      )
        e.email = "This email already belongs to another employee.";
      if (f.phone && !/^\+?[0-9 ]{10,14}$/.test(f.phone))
        e.phone = "Use 10 to 14 digits.";
    }
    if (s === 1 && !f.joinDate) e.joinDate = "Pick a joining date.";
    if (s === 2 && f.bank.ifsc && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(f.bank.ifsc))
      e.ifsc = "IFSC looks like HDFC0001234.";
    if (s === 3) {
      if (f.statutory.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(f.statutory.pan))
        e.pan = "PAN looks like ABCDE1234F.";
      if (f.statutory.uan && !/^\d{12}$/.test(f.statutory.uan))
        e.uan = "UAN has 12 digits.";
    }
    if (
      s === 5 &&
      f.emergency.phone &&
      !/^\+?[0-9 ]{10,14}$/.test(f.emergency.phone)
    )
      e.ephone = "Use 10 to 14 digits.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const next = () => validate(step) && setStep(step + 1);
  const close = () => {
    onClose();
    setStep(0);
    setErrors({});
    setF(blank(master));
  };

  const submit = () => {
    if (!validate(5)) return;
    const n = Math.max(...employees.map((e) => +e.id.slice(1))) + 1;
    const docs = Object.entries(f.files)
      .filter(([, v]) => v)
      .map(([type, name]) => ({
        id: uid(),
        name,
        type,
        expiry: "",
        addedOn: today(),
      }));
    const emp = makeEmployee(
      { ...f, managerId: f.managerId || null, docs },
      `E${n}`,
    );
    setEmployees((l) => [...l, emp]);
    toast(`${emp.name} added to ${emp.dept}`, () =>
      setEmployees((l) => l.filter((e) => e.id !== emp.id)),
    );
    close();
  };

  const err = (k) =>
    errors[k] && (
      <span role="alert" className="block text-xs text-rose-600 mt-1">
        {errors[k]}
      </span>
    );
  const sel = (k, opts) => (
    <select
      className={inputCls}
      value={f[k]}
      onChange={(e) => set(k, e.target.value)}
    >
      {opts.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );

  return (
    <Dialog open={open} onClose={close} title="Add employee" size="max-w-2xl">
      <ol className="flex gap-1.5 mb-6" aria-label="Progress">
        {STEPS.map((s, i) => (
          <li
            key={s}
            className="flex-1"
            aria-current={i === step ? "step" : undefined}
          >
            <div
              className={`h-1.5 rounded-full ${i <= step ? gradientBg : "bg-slate-200 dark:bg-[#243049]"}`}
            />
            <p
              className={`mt-1.5 text-xs hidden sm:block ${i === step ? "font-bold text-indigo-700 dark:text-indigo-300" : "text-slate-400"}`}
            >
              {s}
            </p>
          </li>
        ))}
      </ol>
      <p className="text-xs text-slate-400 sm:hidden mb-3">
        Step {step + 1} of {STEPS.length}: {STEPS[step]}
      </p>

      <div className="grid sm:grid-cols-2 gap-4 min-h-[250px] content-start">
        {step === 0 && (
          <>
            <Field label="Full name">
              <input
                autoFocus
                className={inputCls}
                value={f.name}
                onChange={(e) => set("name", e.target.value)}
              />
              {err("name")}
            </Field>
            <Field label="Work email">
              <input
                type="email"
                className={inputCls}
                value={f.email}
                onChange={(e) => set("email", e.target.value)}
              />
              {err("email")}
            </Field>
            <Field label="Phone">
              <input
                className={inputCls}
                value={f.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="+91 98765 43210"
              />
              {err("phone")}
            </Field>
            <Field label="Date of birth">
              <input
                type="date"
                className={inputCls}
                value={f.dob}
                onChange={(e) => set("dob", e.target.value)}
              />
            </Field>
            <Field label="Gender">
              {sel("gender", ["Female", "Male", "Other"])}
            </Field>
            <Field label="Address">
              <input
                className={inputCls}
                value={f.address}
                onChange={(e) => set("address", e.target.value)}
              />
            </Field>
          </>
        )}
        {step === 1 && (
          <>
            <Field label="Department">{sel("dept", master.departments)}</Field>
            <Field label="Designation">
              {sel("designation", master.designations)}
            </Field>
            <Field label="Location">{sel("location", master.locations)}</Field>
            <Field label="Grade">{sel("grade", master.grades)}</Field>
            <Field label="Reports to">
              <select
                className={inputCls}
                value={f.managerId}
                onChange={(e) => set("managerId", e.target.value)}
              >
                <option value="">None</option>
                {employees.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}, {e.designation}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Joining date">
              <input
                type="date"
                className={inputCls}
                value={f.joinDate}
                onChange={(e) => set("joinDate", e.target.value)}
              />
              {err("joinDate")}
            </Field>
          </>
        )}
        {step === 2 && (
          <>
            <Field label="Bank name">
              <input
                className={inputCls}
                value={f.bank.name}
                onChange={(e) => nest("bank", "name", e.target.value)}
              />
            </Field>
            <Field label="Account number">
              <input
                inputMode="numeric"
                className={inputCls}
                value={f.bank.account}
                onChange={(e) =>
                  nest("bank", "account", e.target.value.replace(/\D/g, ""))
                }
              />
            </Field>
            <Field label="IFSC">
              <input
                className={inputCls}
                value={f.bank.ifsc}
                onChange={(e) =>
                  nest("bank", "ifsc", e.target.value.toUpperCase())
                }
              />
              {err("ifsc")}
            </Field>
            <p className="text-xs text-slate-500 self-end pb-2">
              Bank details are used for payroll in a later phase. You can skip
              this now.
            </p>
          </>
        )}
        {step === 3 && (
          <>
            <Field label="PAN">
              <input
                className={inputCls}
                value={f.statutory.pan}
                onChange={(e) =>
                  nest("statutory", "pan", e.target.value.toUpperCase())
                }
                maxLength={10}
              />
              {err("pan")}
            </Field>
            <Field label="UAN (provident fund)">
              <input
                inputMode="numeric"
                className={inputCls}
                value={f.statutory.uan}
                onChange={(e) =>
                  nest("statutory", "uan", e.target.value.replace(/\D/g, ""))
                }
                maxLength={12}
              />
              {err("uan")}
            </Field>
          </>
        )}
        {step === 4 && (
          <div className="sm:col-span-2 space-y-3">
            {REQUIRED_DOCS.map((d) => (
              <div
                key={d}
                className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-[#243049] px-4 py-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    {d}
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    {f.files[d] || "Not uploaded"}
                  </p>
                </div>
                <label className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 cursor-pointer hover:underline">
                  {f.files[d] ? "Replace" : "Choose file"}
                  <input
                    type="file"
                    className="sr-only"
                    onChange={(e) =>
                      setF((x) => ({
                        ...x,
                        files: {
                          ...x.files,
                          [d]: e.target.files[0]?.name || "",
                        },
                      }))
                    }
                  />
                </label>
              </div>
            ))}
          </div>
        )}
        {step === 5 && (
          <>
            <Field label="Contact name">
              <input
                className={inputCls}
                value={f.emergency.name}
                onChange={(e) => nest("emergency", "name", e.target.value)}
              />
            </Field>
            <Field label="Relationship">
              <input
                className={inputCls}
                value={f.emergency.relation}
                onChange={(e) => nest("emergency", "relation", e.target.value)}
              />
            </Field>
            <Field label="Phone">
              <input
                className={inputCls}
                value={f.emergency.phone}
                onChange={(e) => nest("emergency", "phone", e.target.value)}
              />
              {err("ephone")}
            </Field>
          </>
        )}
      </div>

      <div className="flex justify-between pt-6">
        <button
          className={btnGhost}
          onClick={step === 0 ? close : () => setStep(step - 1)}
        >
          {step === 0 ? "Cancel" : "Back"}
        </button>
        {step < STEPS.length - 1 ? (
          <button className={btnPrimary} onClick={next}>
            Continue
          </button>
        ) : (
          <button className={btnPrimary} onClick={submit}>
            Add employee
          </button>
        )}
      </div>
    </Dialog>
  );
}
