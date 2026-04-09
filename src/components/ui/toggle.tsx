import { cn } from "@/lib/utils";

const Toggle = ({ active }: { active: boolean }) => (
  <div
    className={cn(
      "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out",
      active ? "bg-Brand-700" : "bg-gray-300"
    )}
  >
    <span
      className={cn(
        "pointer-events-none inline-block size-5 rounded-full bg-white shadow-[0px_1px_4px_rgba(0,0,0,0.15)] transition-transform duration-200 ease-in-out",
        active ? "translate-x-5" : "translate-x-0"
      )}
    />
  </div>
);

export default Toggle;
