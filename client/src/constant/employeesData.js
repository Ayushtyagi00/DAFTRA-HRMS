import { EMPLOYEES, DEPARTMENTS } from "./hrmsData";
import { initialsOf } from "../components/dashboard/hrUi";

export const STATUSES = ["Active", "On leave", "Probation", "Notice"];
export const ROLE_EMP = {
  superadmin: "E1000",
  hradmin: "E1003",
  manager: "E1002",
  employee: "E1001",
};

const DES = {
  Engineering: ["Software Engineer", "Senior Engineer", "QA Engineer"],
  Product: ["Product Designer", "Product Manager", "UX Researcher"],
  Sales: ["Account Executive", "Sales Manager", "SDR"],
  Marketing: ["Content Strategist", "Growth Marketer", "Brand Designer"],
  People: ["HR Executive", "Talent Partner", "HR Operations Lead"],
  Finance: ["Accountant", "Payroll Analyst", "Finance Manager"],
};
const iso = (d) => new Date(Date.now() + d * 864e5).toISOString().slice(0, 10);
export const today = () => iso(0);
export const daysUntil = (s) =>
  Math.round((new Date(s) - new Date(today())) / 864e5);
export const uid = () =>
  `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

export const MASTER_DEFAULT = {
  departments: [...DEPARTMENTS],
  designations: [...new Set(Object.values(DES).flat())],
  locations: ["Head office", "Bengaluru hub", "Remote"],
  grades: ["G1", "G2", "G3", "G4", "G5", "G6"],
};

// Full employee record with sensible defaults
export function makeEmployee(p, id) {
  return {
    id,
    name: p.name,
    initials: initialsOf(p.name),
    email: p.email,
    phone: p.phone || "",
    dept: p.dept,
    designation: p.designation,
    location: p.location || "Head office",
    grade: p.grade || "G2",
    managerId: p.managerId ?? null,
    status: p.status || "Probation",
    gender: p.gender || "Other",
    joinDate: p.joinDate || today(),
    dob: p.dob || "",
    address: p.address || "",
    bank: p.bank || { name: "", account: "", ifsc: "" },
    statutory: p.statutory || { pan: "", uan: "" },
    emergency: p.emergency || { name: "", relation: "", phone: "" },
    skills: p.skills || [],
    certs: p.certs || [],
    assets: p.assets || [],
    docs: p.docs || [],
    notes: p.notes || [],
    history: p.history || [
      {
        date: p.joinDate || today(),
        title: `Joined as ${p.designation}`,
        detail: p.dept,
      },
    ],
  };
}

const SKILLS = [
  "React",
  "Node.js",
  "SQL",
  "Figma",
  "Negotiation",
  "Excel",
  "SEO",
  "Recruiting",
  "Python",
  "Public speaking",
];
const EXPIRIES = [-10, 12, 45, 200, 400];

export function buildEmployees() {
  const heads = {};
  EMPLOYEES.forEach((e) => {
    if (!heads[e.dept]) heads[e.dept] = e.id;
  });
  return EMPLOYEES.map((e, i) => {
    const [fn, ln] = e.name.split(" ");
    const designation =
      i === 2
        ? "Engineering Manager"
        : i === 3
          ? "HR Operations Lead"
          : DES[e.dept][i % 3];
    const joinDate = `${2018 + (i % 8)}-${String(1 + ((i * 5) % 12)).padStart(2, "0")}-${String(1 + ((i * 3) % 27)).padStart(2, "0")}`;
    const grade = `G${1 + (i % 5)}`;
    const status =
      i % 11 === 3
        ? "On leave"
        : i % 13 === 5
          ? "Probation"
          : i % 17 === 9
            ? "Notice"
            : "Active";
    const history = [
      { date: joinDate, title: `Joined as ${designation}`, detail: e.dept },
    ];
    if (i % 2 === 0)
      history.unshift({
        date: iso(-200 - i * 3),
        title: `Grade revised to ${grade}`,
        detail: "Annual review",
      });
    return makeEmployee(
      {
        name: e.name,
        email: `${fn.toLowerCase()}.${ln.toLowerCase()}@pulsehr.example`,
        phone: `+91 9${String(100000000 + ((i * 7919381) % 899999999))}`,
        dept: e.dept,
        designation,
        location: MASTER_DEFAULT.locations[i % 3],
        grade,
        status,
        gender: e.gender,
        joinDate,
        managerId:
          i === 0 ? null : heads[e.dept] === e.id ? "E1000" : heads[e.dept],
        dob: `${1988 + (i % 12)}-${String(1 + ((i * 7) % 12)).padStart(2, "0")}-${String(1 + ((i * 11) % 27)).padStart(2, "0")}`,
        address: `${10 + i}, Sector ${1 + (i % 9)}, Business Park`,
        bank: {
          name: "HDFC Bank",
          account: `5010${String(1000000 + i * 4231).slice(0, 8)}`,
          ifsc: "HDFC0001234",
        },
        statutory: {
          pan: `ABCDE${1000 + i}F`,
          uan: `1010${String(10000000 + i * 977).slice(0, 8)}`,
        },
        emergency: {
          name: `${ln} Family`,
          relation: "Parent",
          phone: "+91 9811122233",
        },
        skills: [SKILLS[i % 10], SKILLS[(i + 3) % 10]],
        certs:
          i % 3 === 0
            ? [
                {
                  id: `c${i}`,
                  name: "Project Management Fundamentals",
                  issuer: "PMI",
                  year: "2023",
                },
              ]
            : [],
        assets: [
          { id: `a${i}`, tag: `LT-${2000 + i}`, name: "Laptop, 14-inch" },
          ...(i % 4 === 0
            ? [{ id: `m${i}`, tag: `MN-${3000 + i}`, name: "Monitor, 27-inch" }]
            : []),
        ],
        docs: [
          {
            id: `d${i}a`,
            name: "Aadhaar card.pdf",
            type: "Identity",
            expiry: "",
          },
          {
            id: `d${i}b`,
            name: "Passport.pdf",
            type: "Identity",
            expiry: iso(EXPIRIES[i % 5]),
          },
          {
            id: `d${i}c`,
            name: "Employment contract.pdf",
            type: "Contract",
            expiry: "",
          },
        ],
        notes:
          i % 4 === 0
            ? [
                {
                  id: `n${i}`,
                  text: "Strong delivery this quarter. Discuss growth path in the next 1:1.",
                  date: iso(-30),
                  by: "Nisha Kapoor",
                },
              ]
            : [],
        history,
      },
      e.id,
    );
  });
}
