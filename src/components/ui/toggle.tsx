import { cn } from "@/lib/utils";

const Toggle = ({ active }: { active: boolean }) => (
  <div className="flex items-center">
    <div
      className={cn(
        "w-10 h-4 rounded-[120px]",
        active ? "bg-Brand-300" : "bg-gray-100"
      )}
    />
    <div
      className={cn(
        "size-6 rounded-full shadow-[0px_1.2px_6px_0px_rgba(0,0,0,0.08)] -ml-3",
        active ? "bg-Brand-700" : "bg-gray-400"
      )}
    />
  </div>
);

export default Toggle;
