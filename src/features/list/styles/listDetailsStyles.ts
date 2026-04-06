import { cn } from "@/lib/utils";

export const listDetailsStyles = {
  topRow: cn("flex flex-wrap items-start justify-between gap-6"),
  backLink: cn(
    "inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
  ),
  title: cn("mt-2 text-[34px] font-semibold tracking-tight"),
  headerActions: cn("flex items-center gap-3"),

  grid: cn("mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[420px_1fr]"),
  card: cn("overflow-hidden rounded-2xl bg-card shadow-xs ring-1 ring-border"),
  cardHeader: cn(
    "flex items-center justify-between gap-4 border-b border-border px-6 py-5"
  ),
  cardTitle: cn("text-lg font-medium"),

  kvList: cn("grid grid-cols-[140px_1fr] gap-y-6 px-6 py-6 text-sm"),
  kvKey: cn("text-muted-foreground"),
  kvVal: cn("font-medium text-foreground"),

  assignmentList: cn("flex flex-col gap-2"),
  assignmentRow: cn(
    "flex items-center justify-between gap-4 rounded-xl px-4 py-3 hover:bg-muted/40"
  ),
  assignmentMeta: cn("flex items-center gap-3"),
  avatar: cn(
    "grid size-11 place-items-center overflow-hidden rounded-full bg-muted text-sm font-semibold text-foreground"
  ),
  assignmentName: cn("text-sm font-semibold"),
  assignmentEmail: cn("text-sm text-muted-foreground"),

  leadOverviewWrap: cn(
    "overflow-hidden rounded-2xl bg-[linear-gradient(90deg,rgba(47,191,155,0.16)_0%,rgba(47,191,155,0.06)_100%)] px-6 py-5"
  ),
  leadOverviewTitle: cn("text-base font-semibold"),
  statGrid: cn("mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3"),
  statCard: cn(
    "rounded-2xl bg-white/60 px-5 py-4 ring-1 ring-white/70 backdrop-blur-sm"
  ),
  statLabel: cn("text-sm text-muted-foreground"),
  statValue: cn("mt-2 text-[24px] font-medium text-[#15706D]"),

  leadTableWrap: cn(
    "mt-6 overflow-hidden rounded-2xl bg-card shadow-xs ring-1 ring-border"
  ),
  leadToolbar: cn(
    "flex flex-wrap items-center justify-between gap-4 border-b border-border px-6 py-4"
  ),
  leadFilters: cn("flex flex-wrap items-center gap-3"),
  filterTrigger: cn(
    "h-11 rounded-lg border border-border-primary bg-white px-4 text-sm font-medium text-foreground shadow-xs"
  )
};
