import { cn } from "@/lib/utils";

const RadioSelector = ({
  label,
  checked,
  onClick
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "flex h-12 items-center rounded-lg justify-center gap-3 border bg-background px-4 text-sm font-medium",
      checked ? "border-[#1DAFA6] bg-[#F1FCFB]" : "border-border-primary"
    )}
  >
    <span
      className={cn(
        "grid size-5 place-items-center rounded-full border-2",
        checked ? "border-primary" : "border-muted-foreground/50"
      )}
      aria-hidden="true"
    >
      {checked ? <span className="size-2.5 rounded-full bg-secondary" /> : null}
    </span>
    <span className="text-foreground">{label}</span>
  </button>
);

export default RadioSelector;
