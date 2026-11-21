export const currentUser = { name: "Rahul Sharma", role: "admin" };

export const ROLE_LABEL = {
  admin: "Admin",
  manager: "Manager",
  employee: "Employee",
};

export const NAV = [
  {
    id: "overview",
    label: "Overview",
    roles: ["admin", "manager", "employee"],
  },
  { id: "projects", label: "Projects", roles: ["admin", "manager"] },
  { id: "tasks", label: "Tasks", roles: ["admin", "manager", "employee"] },
  { id: "team", label: "People", roles: ["admin", "manager"] },
  { id: "reports", label: "Reports", roles: ["admin", "manager"] },
];

export const projectsSeed = [
  {
    id: 1,
    name: "Website redesign",
    status: "On track",
    progress: 72,
    dueDate: "Dec 12",
    members: ["AR", "SK", "PV"],
    tasksDone: 18,
    tasksOpen: 7,
  },
  {
    id: 2,
    name: "Mobile app v2",
    status: "At risk",
    progress: 28,
    dueDate: "Nov 30",
    members: ["SK", "NG"],
    tasksDone: 9,
    tasksOpen: 24,
  },
  {
    id: 3,
    name: "Payments migration",
    status: "On track",
    progress: 51,
    dueDate: "Jan 08",
    members: ["AR", "PV", "NG", "TM"],
    tasksDone: 14,
    tasksOpen: 13,
  },
  {
    id: 4,
    name: "Customer portal",
    status: "Active",
    progress: 12,
    dueDate: "Feb 20",
    members: ["TM"],
    tasksDone: 3,
    tasksOpen: 21,
  },
];

export const myTasksSeed = [
  {
    id: 1,
    title: "Review homepage wireframes",
    project: "Website redesign",
    priority: "High",
    due: "Today",
    done: false,
  },
  {
    id: 2,
    title: "Fix login token refresh",
    project: "Mobile app v2",
    priority: "High",
    due: "Today",
    done: false,
  },
  {
    id: 3,
    title: "Write migration test plan",
    project: "Payments migration",
    priority: "Medium",
    due: "Tomorrow",
    done: false,
  },
  {
    id: 4,
    title: "Update onboarding copy",
    project: "Customer portal",
    priority: "Low",
    due: "Fri",
    done: true,
  },
  {
    id: 5,
    title: "Audit accessibility contrast",
    project: "Website redesign",
    priority: "Medium",
    due: "Mon",
    done: false,
  },
];

export const teamSeed = [
  {
    id: 1,
    name: "Aditi Rao",
    initials: "AR",
    role: "Product Engineering lead",
    status: "On track",
    load: 62,
  },
  {
    id: 2,
    name: "Sahil Khanna",
    initials: "SK",
    role: "Frontend engineer",
    status: "At risk",
    load: 88,
  },
  {
    id: 3,
    name: "Priya Verma",
    initials: "PV",
    role: "QA engineer",
    status: "Overloaded",
    load: 112,
  },
  {
    id: 4,
    name: "Neha Gupta",
    initials: "NG",
    role: "Backend engineer",
    status: "On track",
    load: 55,
  },
];

export const activitySeed = [
  {
    id: 1,
    text: "Sahil completed “Fix cart rounding bug”",
    time: "12 min ago",
  },
  { id: 2, text: "Aditi created project Customer portal", time: "1 hour ago" },
  { id: 3, text: "Priya was assigned 4 new tasks", time: "3 hours ago" },
  { id: 4, text: "Payments migration moved to 51%", time: "Yesterday" },
];

export const notificationsSeed = [
  {
    id: 1,
    text: "Mobile app v2 is now at risk",
    time: "5 min ago",
    unread: true,
  },
  { id: 2, text: "2 tasks are due today", time: "1 hour ago", unread: true },
  {
    id: 3,
    text: "Priya's workload is above 100%",
    time: "Yesterday",
    unread: false,
  },
];

export const weeklySeed = [
  { d: "Mon", v: 8 },
  { d: "Tue", v: 12 },
  { d: "Wed", v: 9 },
  { d: "Thu", v: 15 },
  { d: "Fri", v: 11 },
  { d: "Sat", v: 3 },
  { d: "Sun", v: 2 },
];

export const peopleSeed = [
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
    status: "At risk",
  },
  { name: "Priya Verma", role: "Employee", team: "QA", status: "Overloaded" },
  {
    name: "Neha Gupta",
    role: "Employee",
    team: "Platform",
    status: "On track",
  },
];
