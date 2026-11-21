import { useState } from "react";
import { Modal, Field, inputCls, btnPrimary, btnGhost } from "./ui";

export function NewProjectModal({ open, onClose, onCreate }) {
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const submit = () => {
    if (!name.trim()) return;
    onCreate({ name: name.trim(), dueDate: dueDate || "TBD" });
    setName("");
    setDueDate("");
  };
  return (
    <Modal open={open} title="New project" onClose={onClose}>
      <div className="space-y-4">
        <Field label="Project name">
          <input
            autoFocus
            className={inputCls}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Q1 marketing site"
          />
        </Field>
        <Field label="Due date">
          <input
            type="date"
            className={inputCls}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </Field>
        <div className="flex justify-end gap-2 pt-2">
          <button className={btnGhost} onClick={onClose}>
            Cancel
          </button>
          <button
            className={`${btnPrimary} disabled:opacity-50`}
            disabled={!name.trim()}
            onClick={submit}
          >
            Create project
          </button>
        </div>
      </div>
    </Modal>
  );
}

export function NewTaskModal({
  open,
  onClose,
  onCreate,
  projects,
  defaultProject,
}) {
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [due, setDue] = useState("Today");
  const submit = () => {
    if (!title.trim()) return;
    onCreate({
      title: title.trim(),
      project: project || defaultProject || projects[0]?.name || "General",
      priority,
      due,
    });
    setTitle("");
  };
  return (
    <Modal open={open} title="New task" onClose={onClose}>
      <div className="space-y-4">
        <Field label="Task">
          <input
            autoFocus
            className={inputCls}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
          />
        </Field>
        <Field label="Project">
          <select
            className={inputCls}
            value={project || defaultProject || ""}
            onChange={(e) => setProject(e.target.value)}
          >
            {projects.map((p) => (
              <option key={p.id}>{p.name}</option>
            ))}
          </select>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Priority">
            <select
              className={inputCls}
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              {["High", "Medium", "Low"].map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </Field>
          <Field label="Due">
            <select
              className={inputCls}
              value={due}
              onChange={(e) => setDue(e.target.value)}
            >
              {["Today", "Tomorrow", "Fri", "Mon"].map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </Field>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button className={btnGhost} onClick={onClose}>
            Cancel
          </button>
          <button
            className={`${btnPrimary} disabled:opacity-50`}
            disabled={!title.trim()}
            onClick={submit}
          >
            Add task
          </button>
        </div>
      </div>
    </Modal>
  );
}
