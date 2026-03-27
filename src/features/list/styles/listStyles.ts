import { cn } from "@/lib/utils";

export const listStyles = {
  pageHeader: cn("flex items-start justify-between gap-6"),
  pageTitle: cn("text-[34px] font-semibold tracking-tight"),
  primaryCta: cn("h-11 rounded-xl px-6 text-sm font-medium"),

  card: cn(
    "mt-5 overflow-hidden rounded-2xl bg-card shadow-xs ring-1 ring-border"
  ),
  cardHeader: cn("border-b border-border"),
  tabsWrap: cn("flex items-end gap-10 px-6 pt-2 h-auto"),
  tabTrigger: cn(
    "border-b-2",
    "gap-2 px-2 pb-2 text-sm font-medium text-muted-foreground shadow-none h-10 rounded-none"
  ),
  tabActive: cn("text-secondary data-[state=active]:shadow-none"),

  toolbar: cn(
    "flex flex-wrap items-center justify-between gap-4 border-b border-border px-6 py-4"
  ),
  searchInput: cn(
    "h-6 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
  ),
  dateBtn: cn(
    "h-10 rounded-lg border border-border-primary bg-transparent px-4 text-sm font-medium text-foreground"
  ),

  tableWrap: cn("w-full overflow-x-auto")
};
