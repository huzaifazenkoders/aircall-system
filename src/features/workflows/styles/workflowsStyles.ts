import { cn } from "@/lib/utils";

export const workflowsStyles = {
  page: cn("flex min-h-[calc(100vh-150px)] flex-1 flex-col px-4 md:px-6 py-6"),
  pageHeader: cn("flex items-center gap-6"),
  pageTitle: cn("flex-1 text-[24px] font-medium text-gray-800"),
  pageActions: cn("flex items-center gap-3"),
  filterTrigger: cn(
    "h-11 min-w-[110px] capitalize rounded-lg border-zinc-200 bg-white px-4 text-sm text-gray-800 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.08)]"
  ),
  createButton: cn("h-11 gap-2 rounded-lg px-6 text-base font-medium"),
  cardGrid: cn("mt-6 grid gap-6 xl:grid-cols-2"),
  summaryCard: cn(
    "flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.08)] outline outline-1 outline-offset-[-1px] outline-zinc-200"
  ),
  summaryHero: cn("flex items-start justify-between gap-2 px-8 py-6"),
  summaryHeroMint: cn("bg-[#F1FCFB]"),
  summaryHeroLilac: cn("bg-[#ECF0FF]"),
  summaryHeroCream: cn("bg-[#FFFAEA]"),
  summaryHeroSky: cn("bg-[#ECFDFF]"),
  summaryHeroLime: cn("bg-[#F4FFEA]"),
  summaryTitleBlock: cn("flex w-[calc(100%)] flex-col gap-1"),
  summaryTitle: cn("text-lg font-medium leading-5 text-gray-800"),
  summaryDescription: cn("text-sm leading-5 text-gray-500 line-clamp-1"),
  defaultBadge: cn(
    "inline-flex items-center rounded-md bg-teal-200 px-3 py-2 text-xs font-medium text-teal-900"
  ),
  summaryStats: cn("flex justify-between px-8 py-4"),
  summaryStat: cn("flex flex-col"),
  summaryStatLabel: cn("text-sm leading-5 text-gray-500"),
  summaryStatValue: cn("text-sm font-medium leading-5 text-gray-800"),
  summaryFooter: cn(
    "border-t border-zinc-200 px-6 py-2 text-center hover:bg-primary/5",
    "flex center",
    "text-center text-sm text-text-secondary"
  ),
  detailsPage: cn(
    "flex min-h-[calc(100vh-150px)] flex-1 flex-col px-4 md:px-6 py-6"
  ),
  backLink: cn(
    "inline-flex items-center gap-2 text-[16px] text-text-secondary"
  ),
  detailHeader: cn(
    "flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between"
  ),
  detailHeading: cn("flex flex-col"),
  detailTitleRow: cn("flex flex-wrap items-center gap-3"),
  detailTitle: cn("text-[24px] font-semibold tracking-tight text-text-primary"),
  activeBadge: cn(
    "inline-flex items-center rounded-md bg-secondary/10 px-4 py-1 text-[13px] font-medium text-secondary"
  ),
  detailDescription: cn("text-[16px] leading-6 text-text-secondary"),
  detailActions: cn("flex flex-wrap items-center gap-3"),
  addCardWrap: cn("mt-8"),
  addRuleCard: cn(
    "flex h-[118px] w-full max-w-57 flex-col gap-2 items-center justify-center rounded-[18px] border border-border bg-[#EFFCFD] px-6 py-8 text-center shadow-xs"
  ),
  addRuleIcon: cn("size-8 text-[#0891A1] shrink-0"),
  addRuleText: cn("text-[14px] font-medium text-secondary"),
  rulesGrid: cn("mt-8 grid gap-6 xl:grid-cols-3"),
  ruleCard: cn(
    "overflow-visible rounded-[18px] border border-border bg-white shadow-xs"
  ),
  ruleHead: cn(
    "flex items-center justify-between gap-4 border-b border-border p-4"
  ),
  ruleTitle: cn("text-[16px] font-semibold text-secondary"),
  menuTrigger: cn(
    "grid size-8 place-items-center rounded-[10px] border border-transparent text-text-primary transition-colors hover:border-border hover:bg-muted"
  ),
  ruleBody: cn("grid gap-6 p-4 md:grid-cols-2"),
  ruleStat: cn("flex flex-col"),
  ruleStatLabel: cn("text-[12px] leading-5 text-text-secondary"),
  ruleStatValue: cn("text-[13px] font-medium text-text-primary capitalize"),
  menuContent: cn(
    "min-w-42 rounded-lg border border-border bg-white shadow-[0_20px_40px_rgba(15,23,42,0.14)]"
  ),
  menuItem: cn("gap-3 px-3 py-1 text-sm text-text-primary cursor-pointer"),
  dialogContent: cn("max-w-[586px] rounded-[22px] p-0"),
  wideDialogContent: cn("max-w-[586px] rounded-[22px] p-0 lg:max-w-[586px]"),
  formDialogContent: cn("max-w-[586px] rounded-[22px] p-0 lg:max-w-[586px]"),
  dialogHeader: cn("items-start px-6 pt-7 pb-4"),
  dialogTitle: cn("text-[24px] font-medium text-text-primary"),
  dialogDescription: cn("mt-0 text-[14px] text-text-secondary"),
  dialogBody: cn("border-t border-border px-6 py-5 flex flex-col gap-5"),
  dialogFooter: cn("justify-end gap-2 px-6 pt-0 pb-6"),
  fieldStack: cn("flex flex-col gap-5"),
  fieldGrid: cn("grid gap-5 md:grid-cols-2"),
  field: cn("flex flex-col gap-2"),
  fieldLabel: cn("text-sm font-medium text-text-secondary"),
  selectTrigger: cn(
    "h-11 w-full rounded-lg border-border-primary bg-white px-4 text-text-primary shadow-xs data-placeholder:text-text-secondary"
  ),
  selectContent: cn(
    "max-h-76 rounded-lg border border-border bg-white py-1 shadow-[0_20px_40px_rgba(15,23,42,0.14)]"
  ),
  selectItem: cn(
    "cursor-pointer rounded-none px-3 py-2 text-text-primary text-sm capitalize"
  ),
  radioGrid: cn("grid gap-5 md:grid-cols-2"),
  radioCard: cn(
    "flex h-11 items-center gap-0 overflow-hidden rounded-lg border px-4 py-4 transition-colors data-[checked=true]:border-[#073031] data-[checked=true]:bg-[#ECFAFA] data-[checked=false]:border-zinc-200 data-[checked=false]:bg-white data-[checked=false]:shadow-[0px_1px_2px_0px_rgba(0,0,0,0.08)]"
  ),
  radioControl: cn("relative size-6 block shrink-0"),
  suffixFieldWrap: cn("relative"),
  suffixText: cn(
    "pointer-events-none absolute inset-y-0 right-0 flex items-center text-[15px] text-text-secondary"
  ),
  confirmText: cn("space-y-5 text-base text-text-secondary"),
  bulletList: cn("pl-5"),
  dangerButton: cn(
    "h-10 rounded-lg border-danger bg-danger px-5 text-[16px] font-medium text-danger-foreground hover:bg-danger/90"
  )
};

export const getWorkflowAccentClass = (accent: string) => {
  if (accent === "mint") {
    return workflowsStyles.summaryHeroMint;
  }

  if (accent === "lilac") {
    return workflowsStyles.summaryHeroLilac;
  }

  if (accent === "cream") {
    return workflowsStyles.summaryHeroCream;
  }

  if (accent === "sky") {
    return workflowsStyles.summaryHeroSky;
  }

  return workflowsStyles.summaryHeroLime;
};
