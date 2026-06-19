export function Divider() {
  return (
    <div className="relative flex items-center gap-3 my-1">
      <div className="flex-1 h-px bg-zinc-200" />
      <span className="text-label-sm text-zinc-400 tracking-widest whitespace-nowrap">
        OR CONTINUE WITH
      </span>
      <div className="flex-1 h-px bg-zinc-200" />
    </div>
  );
}
