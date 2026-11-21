// ---------- HRMS mock data (Phase 1) ----------
export const ROLES = {
  superadmin: {
    label: "Super Admin",
    user: { name: "Aarav Mehta", title: "Chief People Officer" },
  },
  hradmin: {
    label: "HR Admin",
    user: { name: "Nisha Kapoor", title: "HR Operations Lead" },
  },
  manager: {
    label: "Manager",
    user: { name: "Rohan Verma", title: "Engineering Manager" },
  },
  employee: {
    label: "Employee",
    user: { name: "Meera Iyer", title: "Product Designer" },
  },
};

export const DEPARTMENTS = [
  "Engineering",
  "Product",
  "Sales",
  "Marketing",
  "People",
  "Finance",
];
export const DEPT_COLORS = [
  "#4F46E5",
  "#7C3AED",
  "#14B8A6",
  "#FB7185",
  "#F59E0B",
  "#38BDF8",
];

const first = [
  "Aarav",
  "Meera",
  "Rohan",
  "Nisha",
  "Kabir",
  "Anaya",
  "Vihaan",
  "Isha",
  "Arjun",
  "Diya",
  "Reyansh",
  "Saanvi",
  "Ishaan",
  "Tara",
  "Dev",
  "Riya",
  "Kian",
  "Pooja",
  "Neil",
  "Zara",
  "Aditya",
  "Sneha",
  "Yash",
  "Kavya",
  "Om",
  "Lakshmi",
  "Harsh",
  "Myra",
  "Rahul",
  "Pari",
  "Sahil",
  "Naina",
  "Varun",
  "Ira",
  "Manav",
  "Alia",
  "Tejas",
  "Ritika",
  "Dhruv",
  "Simran",
  "Karan",
  "Anika",
];
const last = [
  "Mehta",
  "Iyer",
  "Verma",
  "Kapoor",
  "Singh",
  "Nair",
  "Sharma",
  "Gill",
  "Reddy",
  "Das",
];

const NAME_FIX = { 1: "Meera Iyer", 2: "Rohan Verma", 3: "Nisha Kapoor" };
// 42 employees across 6 departments, deterministic so renders are stable
export const EMPLOYEES = first.map((f, i) => ({
  id: `E${1000 + i}`,
  name: NAME_FIX[i] || `${f} ${last[(i * 7) % last.length]}`,
  initials: (NAME_FIX[i] || `${f} ${last[(i * 7) % last.length]}`)
    .split(" ")
    .map((x) => x[0])
    .join(""),
  dept: i === 2 ? "Engineering" : i === 3 ? "People" : DEPARTMENTS[i % 6],
  gender:
    i % 5 === 0 || i % 7 === 0
      ? "Female"
      : i % 3 === 0
        ? "Other"
        : i % 2
          ? "Female"
          : "Male",
}));

export const KPIS = {
  admin: [
    {
      label: "Headcount",
      value: 42,
      sub: "+3 this month",
      trend: [34, 35, 36, 36, 38, 39, 42],
    },
    {
      label: "Present today",
      value: 36,
      sub: "86% attendance",
      trend: [31, 34, 33, 35, 32, 36, 36],
    },
    {
      label: "On leave",
      value: 4,
      sub: "2 planned, 2 sick",
      accent: "text-amber-600",
      trend: [2, 3, 5, 4, 3, 6, 4],
    },
    {
      label: "Open positions",
      value: 7,
      sub: "12 interviews this week",
      accent: "text-indigo-600",
      trend: [4, 5, 5, 6, 8, 7, 7],
    },
    {
      label: "Attrition (12 mo)",
      value: 8.4,
      suffix: "%",
      decimals: 1,
      sub: "Down 1.2 pts",
      trend: [11, 10.5, 10, 9.6, 9.1, 8.8, 8.4],
    },
    {
      label: "Payroll cost",
      value: 38.6,
      prefix: "₹",
      suffix: "L",
      decimals: 1,
      sub: "Nov cycle, in draft",
      accent: "text-violet-600",
      trend: [34, 35, 35.5, 36, 37, 37.8, 38.6],
    },
  ],
  manager: [
    {
      label: "My team",
      value: 7,
      sub: "1 new joiner",
      trend: [7, 7, 8, 8, 8, 9, 9],
    },
    {
      label: "Present today",
      value: 6,
      sub: "1 on leave",
      trend: [7, 8, 8, 9, 8, 8, 8],
    },
    {
      label: "Pending approvals",
      value: 3,
      sub: "2 leave, 1 timesheet",
      accent: "text-amber-600",
      trend: [1, 2, 4, 2, 3, 5, 3],
    },
    {
      label: "Open positions",
      value: 2,
      sub: "Backend, QA",
      accent: "text-indigo-600",
      trend: [1, 1, 2, 2, 3, 2, 2],
    },
  ],
  employee: [
    {
      label: "Casual leave",
      value: 6,
      sub: "of 12 days left",
      trend: [12, 11, 10, 9, 8, 7, 6],
    },
    {
      label: "Hours this week",
      value: 31.5,
      decimals: 1,
      suffix: "h",
      sub: "Target 40h",
      accent: "text-indigo-600",
      trend: [6, 7.5, 8, 7, 8, 6.5, 8],
    },
    {
      label: "Learning progress",
      value: 64,
      suffix: "%",
      sub: "2 courses active",
      accent: "text-violet-600",
      trend: [20, 28, 35, 44, 52, 60, 64],
    },
    {
      label: "Kudos received",
      value: 11,
      sub: "3 this month",
      trend: [2, 4, 5, 6, 8, 9, 11],
    },
  ],
};
KPIS.superadmin = KPIS.hradmin = KPIS.admin;

export const ATTENDANCE_TREND = [
  { d: "Mon", v: 88 },
  { d: "Tue", v: 91 },
  { d: "Wed", v: 86 },
  { d: "Thu", v: 90 },
  { d: "Fri", v: 82 },
  { d: "Sat", v: 45 },
  { d: "Sun", v: 12 },
];
export const HIRING_FUNNEL = [
  { stage: "Applied", v: 240 },
  { stage: "Screening", v: 128 },
  { stage: "Interview", v: 54 },
  { stage: "Offer", v: 14 },
  { stage: "Hired", v: 9 },
];
export const HEADCOUNT_GROWTH = [
  { d: "Jun", v: 31 },
  { d: "Jul", v: 33 },
  { d: "Aug", v: 34 },
  { d: "Sep", v: 36 },
  { d: "Oct", v: 39 },
  { d: "Nov", v: 42 },
];

export const BIRTHDAYS = [
  { name: "Kabir Verma", when: "Today", dept: "Sales" },
  { name: "Isha Nair", when: "Tomorrow", dept: "Product" },
  { name: "Dev Gill", when: "Sat, 22 Nov", dept: "Engineering" },
];
export const ANNIVERSARIES = [
  { name: "Saanvi Reddy", when: "5 years", dept: "Finance" },
  { name: "Arjun Singh", when: "3 years", dept: "Engineering" },
];
export const NEW_JOINERS = [
  { name: "Tejas Das", when: "Joined Mon", dept: "Engineering" },
  { name: "Ritika Sharma", when: "Joined 12 Nov", dept: "Marketing" },
];
export const HOLIDAYS = [
  { name: "Guru Nanak Jayanti", date: "24 Nov", day: "Mon" },
  { name: "Christmas Day", date: "25 Dec", day: "Thu" },
  { name: "Republic Day", date: "26 Jan", day: "Tue" },
];
export const ANNOUNCEMENTS = [
  {
    id: 1,
    title: "Year-end appraisal cycle opens 1 December",
    by: "People team",
    time: "2h ago",
    pinned: true,
  },
  {
    id: 2,
    title: "Updated hybrid work policy: please acknowledge",
    by: "Nisha Kapoor",
    time: "Yesterday",
  },
  {
    id: 3,
    title: "Health insurance renewal, submit dependents by 30 Nov",
    by: "Finance",
    time: "2 days ago",
  },
];
export const POLL = {
  question: "Which day should we pick for the team offsite?",
  options: [
    { id: "a", text: "Friday, 5 Dec", votes: 14 },
    { id: "b", text: "Saturday, 6 Dec", votes: 9 },
    { id: "c", text: "Friday, 12 Dec", votes: 6 },
  ],
};
export const APPROVALS = [
  {
    id: 1,
    who: "Vihaan Singh",
    initials: "VS",
    what: "Casual leave, 24 to 25 Nov",
    kind: "Leave",
  },
  {
    id: 2,
    who: "Anaya Nair",
    initials: "AN",
    what: "Timesheet, week of 10 Nov (41.5h)",
    kind: "Timesheet",
  },
  {
    id: 3,
    who: "Dhruv Gill",
    initials: "DG",
    what: "Travel claim, ₹12,480",
    kind: "Expense",
  },
];
export const TODOS = [
  {
    id: 1,
    title: "Review Q4 headcount plan",
    project: "Workforce planning",
    priority: "High",
    due: "Today",
    done: false,
  },
  {
    id: 2,
    title: "Approve November payroll preview",
    project: "Payroll",
    priority: "High",
    due: "Tomorrow",
    done: false,
  },
  {
    id: 3,
    title: "Schedule exit interview for Pari Das",
    project: "Offboarding",
    priority: "Medium",
    due: "Fri",
    done: false,
  },
  {
    id: 4,
    title: "Upload revised offer template",
    project: "Recruitment",
    priority: "Low",
    due: "Mon",
    done: true,
  },
];
export const ACTIVITY = [
  {
    id: 1,
    text: "Tejas Das completed onboarding checklist (8/8)",
    time: "12 min ago",
  },
  { id: 2, text: "Payroll for November moved to draft", time: "1 hour ago" },
  {
    id: 3,
    text: "Backend Engineer opening received 14 new applicants",
    time: "3 hours ago",
  },
  {
    id: 4,
    text: "Kabir Verma's leave request was approved",
    time: "Yesterday",
  },
];
export const NOTIFICATIONS = [
  {
    id: 1,
    text: "3 approvals are waiting for you",
    time: "5 min ago",
    unread: true,
  },
  {
    id: 2,
    text: "Kabir Verma's birthday is today",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 3,
    text: "Compliance: PF return due in 3 days",
    time: "Yesterday",
    unread: false,
  },
];

// Navigation per role. `phase` marks what ships when.
const N = (id, label, icon, phase = 3) => ({ id, label, icon, phase });
const HOME = N("home", "Home", "home", 1);
export const NAV = {
  superadmin: [
    HOME,
    N("employees", "Employees", "team", 2),
    N("approvals", "Approvals", "tasks"),
    N("attendance", "Attendance", "clock"),
    N("leave", "Leave", "calendar"),
    N("payroll", "Payroll", "wallet"),
    N("recruitment", "Recruitment", "briefcase"),
    N("performance", "Performance", "target"),
    N("learning", "Learning", "book"),
    N("helpdesk", "Helpdesk", "headset"),
    N("expenses", "Expenses", "receipt"),
    N("assets", "Assets", "box"),
    N("hub", "Company hub", "megaphone"),
    N("reports", "Reports", "reports"),
    N("settings", "Settings", "settings"),
  ],
  hradmin: [
    HOME,
    N("employees", "Employees", "team", 2),
    N("attendance", "Attendance", "clock"),
    N("leave", "Leave", "calendar"),
    N("payroll", "Payroll", "wallet"),
    N("recruitment", "Recruitment", "briefcase"),
    N("performance", "Performance", "target"),
    N("learning", "Learning", "book"),
    N("helpdesk", "Helpdesk", "headset"),
    N("hub", "Company hub", "megaphone"),
    N("reports", "Reports", "reports"),
  ],
  manager: [
    HOME,
    N("team", "My team", "team", 2),
    N("approvals", "Approvals", "tasks"),
    N("attendance", "Attendance", "clock"),
    N("leave", "Leave", "calendar"),
    N("recruitment", "Hiring", "briefcase"),
    N("performance", "Performance", "target"),
    N("hub", "Company hub", "megaphone"),
  ],
  employee: [
    HOME,
    N("profile", "My profile", "team", 2),
    N("attendance", "Attendance", "clock"),
    N("leave", "Leave", "calendar"),
    N("payslips", "Payslips", "wallet"),
    N("learning", "Learning", "book"),
    N("expenses", "Expenses", "receipt"),
    N("helpdesk", "Helpdesk", "headset"),
    N("hub", "Company hub", "megaphone"),
  ],
};
