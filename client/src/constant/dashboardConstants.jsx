export const currentUser = {
  name: "Aditi Rao",
  role: "manager", // "employee" | "manager" | "admin"
  avatarColor: "bg-blue-600",
  team: "Product Engineering",
};

export const ROLE_LABEL = {
  employee: "Employee",
  manager: "Manager",
  admin: "Admin",
};

export const projectsSeed = [
  {
    id: "p1",
    name: "Client Portal Revamp",
    status: "On track",
    progress: 62,
    dueDate: "Sep 18",
    members: ["AR", "SK", "MJ"],
    tasksOpen: 9,
    tasksDone: 14,
  },
  {
    id: "p2",
    name: "Mobile Attendance App",
    status: "At risk",
    progress: 31,
    dueDate: "Sep 25",
    members: ["SK", "PV"],
    tasksOpen: 12,
    tasksDone: 5,
  },
  {
    id: "p3",
    name: "Payroll Automation",
    status: "On track",
    progress: 88,
    dueDate: "Sep 10",
    members: ["MJ", "AR", "PV", "SK"],
    tasksOpen: 2,
    tasksDone: 21,
  },
];

export const myTasksSeed = [
  {
    id: "t1",
    title: "Fix OTP resend timer on onboarding",
    project: "Client Portal Revamp",
    due: "Today",
    priority: "High",
    done: false,
  },
  {
    id: "t2",
    title: "Review GSTIN validation regex",
    project: "Client Portal Revamp",
    due: "Tomorrow",
    priority: "Medium",
    done: false,
  },
  {
    id: "t3",
    title: "Write test cases for shift swap",
    project: "Mobile Attendance App",
    due: "Sep 12",
    priority: "Low",
    done: false,
  },
  {
    id: "t4",
    title: "Sync payroll export with Tally",
    project: "Payroll Automation",
    due: "Sep 9",
    priority: "High",
    done: true,
  },
];

export const teamSeed = [
  {
    id: "u1",
    name: "Sahil Khanna",
    initials: "SK",
    role: "Frontend Engineer",
    load: 5,
    status: "Active",
  },
  {
    id: "u2",
    name: "Manav Joshi",
    initials: "MJ",
    role: "Backend Engineer",
    load: 3,
    status: "Active",
  },
  {
    id: "u3",
    name: "Priya Verma",
    initials: "PV",
    role: "QA Engineer",
    load: 7,
    status: "Overloaded",
  },
];

export const activitySeed = [
  {
    id: "a1",
    text: 'Priya moved "Shift swap API" to In Review',
    time: "12m ago",
  },
  {
    id: "a2",
    text: "Manav closed 3 tasks in Payroll Automation",
    time: "1h ago",
  },
  {
    id: "a3",
    text: "New member Sahil Khanna joined Product Engineering",
    time: "Yesterday",
  },
];

export function initials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
