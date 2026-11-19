import { useState } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "../../hooks/HomeHooks";

const faqs = [
  [
    "What is a workspace?",
    "A workspace is the secure home for your organization. It holds your people, teams, projects, and conversations in one place.",
  ],
  [
    "How do I join an existing workspace?",
    "Ask your administrator for an invitation link or access code. Enter it on the invitation page and we will confirm the workspace before you continue.",
  ],
  [
    "Who can see what?",
    "Access follows roles. Admins have full access, managers see their teams and projects, and employees see their own tasks and the projects they are part of.",
  ],
  [
    "Can I invite my team after setup?",
    "Yes. Create your workspace first, then invite people and assign roles whenever you are ready.",
  ],
  [
    "How long does setup take?",
    "Creating a workspace takes about a minute. Add your name, industry, and team size, and you are in.",
  ],
  [
    "Is my organization's information protected?",
    "Yes. Information is encrypted and protected, and role-based access keeps each person's view limited to what they need.",
  ],
];

export default function HomeFAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="py-28 px-6 bg-slate-50 scroll-mt-16">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-14">
        <Reveal>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight">
            Questions, answered.
          </h2>
          <p className="mt-5 text-lg text-slate-500">
            Cannot find what you need? Your organization administrator or our
            team can help.
          </p>
          <Link
            to="/onboarding"
            className="btn-shine inline-flex mt-8 px-7 py-3.5 rounded-full bg-slate-900 text-white font-bold hover:bg-blue-700 hover:-translate-y-0.5 transition-all"
          >
            Get started
          </Link>
        </Reveal>

        <Reveal delay={100}>
          <div className="space-y-3">
            {faqs.map(([q, a], i) => {
              const isOpen = open === i;
              return (
                <div
                  key={q}
                  className={`rounded-2xl border bg-white transition-all duration-300 ${isOpen ? "border-blue-300 shadow-xl shadow-blue-900/5" : "border-slate-200 hover:border-slate-300"}`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
                  >
                    <span className="font-bold text-slate-900">{q}</span>
                    <span
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${isOpen ? "bg-blue-600 text-white rotate-45" : "bg-slate-100 text-slate-600"}`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-500 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-slate-500 leading-relaxed">
                        {a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
