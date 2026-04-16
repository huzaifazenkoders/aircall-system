import { cn } from "@/lib/utils";

export const assignedLeadStyles = {
  page: cn("mx-auto w-full max-w-[1500px]"),

  shell: cn("grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]"),
  mainColumn: cn("min-w-0"),
  sideColumn: cn("min-w-0"),

  dialerPanel: cn("sticky top-6"),
  dialerFrame: cn(
    "overflow-hidden rounded-[24px] border border-border-primary"
  ),
  dialerFrameInner: cn("h-[640px] w-full"),

  callBar: cn(
    "flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-aircall-callbar px-8 py-6 text-white"
  ),
  callBarLeft: cn("flex min-w-0 items-center gap-4"),
  callAvatar: cn(
    "grid size-12 place-items-center rounded-full bg-white/20 text-sm font-semibold"
  ),
  callMeta: cn("min-w-0"),
  callName: cn("truncate text-xl font-semibold tracking-tight"),
  callTimer: cn("mt-1 text-sm font-medium text-brand-accent"),

  callActions: cn("flex flex-wrap items-center gap-8"),
  callAction: cn("flex flex-col items-center gap-2"),
  callActionButton: cn(
    "grid size-12 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/10 transition-colors hover:bg-white/15"
  ),
  callActionLabel: cn("text-xs font-medium text-text-inverse-muted"),
  callActionDanger: cn(
    "grid size-12 place-items-center rounded-full bg-destructive text-white shadow-sm transition-colors hover:bg-destructive/90"
  ),

  card: cn(
    "overflow-hidden rounded-[32px] bg-card shadow-[0_16px_60px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/80"
  ),
  cardHeader: cn(
    "flex flex-wrap items-center justify-between gap-4 border-b border-border px-8 py-7 lg:px-10"
  ),
  cardTitle: cn("text-2xl font-semibold tracking-tight text-foreground"),
  cardLink: cn(
    "inline-flex items-center gap-2 text-sm font-semibold text-secondary"
  ),

  contentGrid: cn("grid gap-10 px-8 py-8 lg:px-10 grid-cols-1"),

  sectionTitle: cn("text-xs font-semibold tracking-wider text-foreground"),
  infoGrid3: cn(
    "mt-6 grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-2 2xl:grid-cols-3"
  ),
  infoGrid2: cn("mt-6 grid grid-cols-1 gap-x-10 gap-y-6  2xl:grid-cols-2"),
  divider: cn("my-10 h-px bg-border"),

  infoLabel: cn("text-sm text-muted-foreground"),
  infoValue: cn("mt-2 text-sm font-medium text-foreground"),

  statusBadge: cn(
    "mt-3 uppercase inline-flex rounded-lg bg-status-cooldown-bg px-4 py-1 text-xs font-medium text-status-cooldown-fg"
  ),

  purchaseCard: cn(
    "mt-12 overflow-hidden rounded-[24px] bg-muted/30 shadow-sm ring-1 ring-border"
  ),
  purchaseHeader: cn(
    "flex items-center justify-between gap-4 border-b border-border px-6 py-5"
  ),
  purchaseTitle: cn("text-lg font-semibold tracking-tight text-foreground"),
  purchaseTotal: cn("text-sm font-semibold text-muted-foreground"),
  purchaseTotalAmount: cn("ml-2 text-lg font-semibold text-secondary"),

  timelineTitle: cn("text-xs font-semibold tracking-wider text-foreground"),
  timelineWrap: cn(
    "mt-6 rounded-[24px] border border-border/70 bg-white/70 p-6"
  ),
  timelineList: cn("relative pl-10"),
  timelineLine: cn("absolute bottom-0 left-4.5 top-0 w-px bg-border"),
  timelineItems: cn("flex flex-col gap-8"),
  timelineDotWrap: cn(
    "absolute left-[-40px] top-0.5 grid size-10 place-items-center rounded-full bg-status-active-bg text-status-active-fg ring-4 ring-white"
  ),
  timelineDot: cn("size-2.5 rounded-full bg-secondary"),
  timelineItemTitle: cn("text-base font-semibold text-foreground"),
  timelineItemSubtitle: cn("mt-1 text-sm leading-7 text-muted-foreground"),

  emptyWrap: cn(
    "flex flex-1 flex-col items-center justify-center py-20 text-center"
  ),
  emptyTitle: cn("mt-10 text-2xl font-semibold tracking-tight text-foreground"),
  emptySubtitle: cn("mt-4 max-w-xl text-sm leading-6 text-muted-foreground"),
  emptyButton: cn("mt-8 h-11 rounded-xl px-6 text-sm font-medium")
};
