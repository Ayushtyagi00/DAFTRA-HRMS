export default function PriorityDot({ priority }) {
  const color =
    priority === "High"
      ? "bg-rose-500"
      : priority === "Medium"
        ? "bg-amber-500"
        : "bg-slate-300";
  return <span className={`w-2 h-2 rounded-full ${color} inline-block`} />;
}
