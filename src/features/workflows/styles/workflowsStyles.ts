import { cn } from "@/lib/utils";

export const workflowsStyles = {
  page: cn("flex min-h-[calc(100vh-140px)] flex-1 flex-col px-4 md:px-6"),
  pageHeader: cn(
    "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
  ),
  pageTitle: cn("text-[30px] font-semibold tracking-tight text-text-primary md:text-[34px]"),
  pageActions: cn("flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end"),
  filterTrigger: cn(
    "h-11 w-full min-w-40 rounded-[14px] border-border bg-white px-4 text-[16px] text-text-primary shadow-xs sm:w-auto"
  ),
  createButton: cn("h-11 rounded-[14px] px-5 text-[14px] font-medium md:px-6 md:text-[16px]"),
  cardGrid: cn("mt-8 grid gap-6 xl:grid-cols-2"),
  summaryCard: cn("overflow-hidden rounded-[18px] border border-border bg-white shadow-xs"),
  summaryHero: cn("flex min-h-24 items-start justify-between gap-4 px-8 py-6"),
  summaryHeroMint: cn("bg-workflow-card-mint"),
  summaryHeroLilac: cn("bg-workflow-card-lilac"),
  summaryHeroCream: cn("bg-workflow-card-cream"),
  summaryHeroSky: cn("bg-workflow-card-sky"),
  summaryHeroLime: cn("bg-workflow-card-lime"),
  summaryTitleBlock: cn("flex flex-col gap-2"),
  summaryTitle: cn("text-[20px] font-medium leading-8 text-text-primary"),
  summaryDescription: cn("text-[15px] leading-6 text-text-secondary"),
  defaultBadge: cn(
    "inline-flex items-center rounded-xl bg-workflow-badge-default px-4 py-2 text-[14px] font-medium text-workflow-badge-default-fg"
  ),
  summaryStats: cn("grid grid-cols-2 gap-6 border-t border-border px-8 py-5 md:grid-cols-4"),
  summaryStat: cn("flex flex-col gap-1.5"),
  summaryStatLabel: cn("text-[15px] leading-6 text-text-secondary"),
  summaryStatValue: cn("text-[16px] font-medium leading-6 text-text-primary"),
  summaryFooter: cn("border-t border-border px-8 py-3 text-center"),
  detailLink: cn("text-[16px] font-medium text-secondary"),
  detailsPage: cn("flex min-h-[calc(100vh-140px)] flex-1 flex-col px-4 md:px-6"),
  backLink: cn("inline-flex items-center gap-2 text-[16px] text-text-secondary"),
  detailHeader: cn("mt-5 flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between"),
  detailHeading: cn("flex flex-col gap-3"),
  detailTitleRow: cn("flex flex-wrap items-center gap-3"),
  detailTitle: cn("text-[34px] font-semibold tracking-tight text-text-primary"),
  activeBadge: cn(
    "inline-flex items-center rounded-xl bg-workflow-badge-default px-4 py-2 text-[14px] font-medium text-workflow-badge-default-fg"
  ),
  detailDescription: cn("text-[18px] leading-8 text-text-secondary"),
  detailActions: cn("flex flex-wrap items-center gap-3"),
  outlineAction: cn(
    "h-12 rounded-[14px] border-secondary bg-white px-6 text-[16px] font-medium text-secondary"
  ),
  mutedAction: cn(
    "h-12 rounded-[14px] border-workflow-button-muted bg-workflow-button-muted px-6 text-[16px] font-medium text-workflow-button-muted-fg hover:bg-workflow-button-muted"
  ),
  primaryAction: cn("h-12 rounded-[14px] px-6 text-[16px] font-medium"),
  addCardWrap: cn("mt-8"),
  addRuleCard: cn(
    "flex min-h-29 w-full max-w-57 flex-col items-center justify-center gap-4 rounded-[18px] border border-border bg-[#EFFCFD] px-6 py-8 text-center shadow-xs"
  ),
  addRuleIcon: cn("size-8 text-[#0891A1]"),
  addRuleText: cn("text-[18px] font-medium text-secondary"),
  rulesGrid: cn("mt-8 grid gap-6 xl:grid-cols-3"),
  ruleCard: cn("overflow-visible rounded-[18px] border border-border bg-white shadow-xs"),
  ruleHead: cn("flex items-start justify-between gap-4 border-b border-border px-6 py-4"),
  ruleTitle: cn("text-[18px] font-semibold text-secondary"),
  menuTrigger: cn(
    "grid size-8 place-items-center rounded-[10px] border border-transparent text-text-primary transition-colors hover:border-border hover:bg-muted"
  ),
  ruleBody: cn("grid gap-6 px-6 py-6 md:grid-cols-2"),
  ruleStat: cn("flex flex-col gap-1"),
  ruleStatLabel: cn("text-[14px] leading-5 text-text-secondary"),
  ruleStatValue: cn("text-[16px] font-medium text-text-primary"),
  tagRow: cn("flex flex-wrap gap-2 px-6 pb-6"),
  tag: cn(
    "inline-flex items-center rounded-xl bg-workflow-tag px-2.5 py-1 text-[14px] font-medium text-workflow-tag-fg"
  ),
  tagOverflow: cn("text-[14px] font-medium text-[#0891A1]"),
  menuContent: cn(
    "min-w-42 rounded-[16px] border border-border bg-white p-2 shadow-[0_20px_40px_rgba(15,23,42,0.14)]"
  ),
  menuItem: cn("gap-3 rounded-[12px] px-3 py-3 text-[16px] text-text-primary"),
  dialogContent: cn("max-w-[586px] rounded-[22px] p-0"),
  wideDialogContent: cn("max-w-[586px] rounded-[22px] p-0 lg:max-w-[586px]"),
  formDialogContent: cn("max-w-[586px] rounded-[22px] p-0 lg:max-w-[586px]"),
  dialogHeader: cn("items-start px-6 pt-7 pb-4"),
  dialogTitle: cn("text-[28px] font-semibold tracking-tight text-text-primary"),
  dialogDescription: cn("mt-2 text-[16px] leading-7 text-text-secondary"),
  dialogBody: cn("border-t border-border px-6 py-5"),
  dialogFooter: cn("justify-end gap-4 px-6 pt-0 pb-6"),
  fieldStack: cn("flex flex-col gap-5"),
  fieldGrid: cn("grid gap-5 md:grid-cols-2"),
  field: cn("flex flex-col gap-2"),
  fieldLabel: cn("text-[16px] font-medium text-[#475467]"),
  textInput: cn(
    "h-11 rounded-[12px] border border-border bg-white px-4 text-[15px] text-text-primary shadow-xs outline-none placeholder:text-text-secondary"
  ),
  textarea: cn(
    "min-h-20 rounded-[12px] border border-border bg-white px-4 py-3 text-[15px] text-text-primary shadow-xs outline-none placeholder:text-text-secondary"
  ),
  selectTrigger: cn(
    "h-11 w-full rounded-[12px] border-secondary bg-white px-4 text-[15px] text-text-primary shadow-xs data-placeholder:text-text-secondary"
  ),
  selectContent: cn(
    "max-h-76 rounded-[14px] border border-border bg-white p-2 shadow-[0_20px_40px_rgba(15,23,42,0.14)]"
  ),
  selectItem: cn("rounded-[10px] px-3 py-3 text-[16px] text-text-primary"),
  radioGrid: cn("grid gap-4 md:grid-cols-2"),
  radioCard: cn(
    "flex items-center gap-3 rounded-[12px] border border-border bg-white px-5 py-4 text-[16px] text-text-primary transition-colors data-[checked=true]:border-brand-accent data-[checked=true]:bg-[#EFFCFD]"
  ),
  radioControl: cn(
    "size-6 border-[#667085] data-checked:border-primary data-checked:bg-primary"
  ),
  suffixFieldWrap: cn("relative"),
  suffixText: cn("pointer-events-none absolute inset-y-0 right-4 flex items-center text-[15px] text-text-secondary"),
  confirmText: cn("space-y-5 text-[16px] leading-8 text-text-secondary"),
  bulletList: cn("space-y-1 pl-5"),
  cancelButton: cn(
    "h-10 rounded-[12px] border-secondary bg-white px-5 text-[16px] font-medium text-secondary"
  ),
  saveButton: cn("h-10 rounded-[12px] px-6 text-[16px] font-medium"),
  dangerButton: cn(
    "h-10 rounded-[12px] border-danger bg-danger px-5 text-[16px] font-medium text-danger-foreground hover:bg-danger/90"
  ),
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
