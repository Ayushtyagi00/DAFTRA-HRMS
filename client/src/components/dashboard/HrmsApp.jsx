import { useCallback, useEffect, useMemo, useState } from "react";
import Sidebar from "./hrSidebar";
import HrTopBar from "./HrTopBar";
import HrHomePage from "./HrHomePage";
import EmployeesPage from "./EmployeesPage";
import EmployeeProfile from "./EmployeeProfile";
import CommandPalette from "./CommandPalette";
import { Empty } from "./ui";
import { ToastHost, SectionCard } from "./hrUi";
import { ROLES, NAV, NOTIFICATIONS } from "../../constant/hrmsData";
import {
  buildEmployees,
  MASTER_DEFAULT,
  ROLE_EMP,
} from "../../constant/employeesData";

export default function HrmsApp() {
  const storedRole = localStorage.getItem("role");
  const allowedRoles = ["superadmin", "hradmin", "manager", "employee"];
  const [role, setRole] = useState(
    allowedRoles.includes(storedRole) ? storedRole : "hradmin",
  );
  const [active, setActive] = useState("home");
  const [collapsed, setCollapsed] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [palette, setPalette] = useState(false);
  const [notes, setNotes] = useState(NOTIFICATIONS);
  const [toasts, setToasts] = useState([]);

  // Shared data store, lifted here so every module sees the same people
  const [employees, setEmployees] = useState(buildEmployees);
  const [master, setMaster] = useState(MASTER_DEFAULT);
  const store = useMemo(
    () => ({ employees, setEmployees, master, setMaster }),
    [employees, master],
  );

  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  const dismiss = useCallback(
    (id) => setToasts((t) => t.filter((x) => x.id !== id)),
    [],
  );
  // toast(text) or toast(text, undoFn). Undoable toasts stay a little longer.
  const toast = useCallback(
    (text, undo) => {
      const id = Date.now() + Math.random();
      setToasts((t) => [...t, { id, text, undo }]);
      setTimeout(() => dismiss(id), undo ? 6500 : 3200);
    },
    [dismiss],
  );

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const changeRole = useCallback(
    (r) => {
      setRole(r);
      localStorage.setItem("role", r);
      setActive("home");
      toast(`Viewing as ${ROLES[r].label}`);
    },
    [toast],
  );
  const page = NAV[role].find((n) => n.id === active) || NAV[role][0];
  const me = employees.find((e) => e.id === ROLE_EMP[role]);

  const commands = useMemo(
    () => [
      ...NAV[role].map((n) => ({
        id: n.id,
        label: `Go to ${n.label}`,
        hint: "Page",
        icon: n.icon,
        run: () => setActive(n.id),
      })),
      ...Object.entries(ROLES).map(([k, r]) => ({
        id: `role-${k}`,
        label: `View as ${r.label}`,
        hint: "Role",
        icon: "team",
        run: () => changeRole(k),
      })),
    ],
    [role, changeRole],
  );

  let body;
  if (page.id === "home")
    body = <HrHomePage role={role} user={ROLES[role].user} toast={toast} />;
  else if (page.id === "employees")
    body = <EmployeesPage key={role} store={store} role={role} toast={toast} />;
  else if (page.id === "team")
    body = (
      <EmployeesPage
        key={role}
        store={store}
        role={role}
        toast={toast}
        scope={(e) => e.dept === me.dept && e.id !== me.id}
      />
    );
  else if (page.id === "profile" && me)
    body = (
      <SectionCard>
        <EmployeeProfile
          emp={me}
          store={store}
          perm={{ job: false, personal: true }}
          isSelf
          toast={toast}
        />
      </SectionCard>
    );
  else
    body = (
      <Empty
        title={`${page.label} is next in the build`}
        hint="Say “next” and this module gets built with full working features."
      />
    );

  return (
    <div className="dashboard-light flex min-h-screen bg-[#dde4f6] font-['Plus_Jakarta_Sans',Inter,system-ui,sans-serif]">
      <Sidebar
        role={role}
        active={page.id}
        onSelect={(it) => setActive(it.id)}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobile}
        closeMobile={() => setMobile(false)}
      />
      <div className="flex-1 min-w-0">
        <HrTopBar
          role={role}
          setRole={changeRole}
          pageTitle={page.label}
          notifications={notes}
          onReadAll={() =>
            setNotes((n) => n.map((x) => ({ ...x, unread: false })))
          }
          onMenu={() => setMobile(true)}
          onSearch={() => setPalette(true)}
          onLogout={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("userId");
            window.location.assign("/login");
          }}
          onQuickAdd={() => {
            if (role === "superadmin" || role === "hradmin") {
              setActive("employees");
              toast("Open Employees, then choose Add employee");
            } else toast("Quick add opens with more modules");
          }}
        />
        <main className="px-4 sm:px-6 lg:px-10 py-8 max-w-[1500px]">
          {body}
        </main>
      </div>
      <CommandPalette
        open={palette}
        onClose={() => setPalette(false)}
        commands={commands}
      />
      <ToastHost toasts={toasts} dismiss={dismiss} />
    </div>
  );
}
