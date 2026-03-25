import { cn } from "@/lib/utils";

export const usersStyles = {
  page: cn("flex min-h-[calc(100vh-140px)] flex-1 flex-col"),
  heading: cn("px-4 text-[34px] font-semibold tracking-tight text-text-primary md:px-6"),
  contentWrap: cn("mt-8 px-4 md:px-6"),
  card: cn("overflow-hidden rounded-[30px] border border-border bg-white shadow-xs"),
  toolbar: cn("border-b border-border px-5 py-5"),
  searchField: cn(
    "flex h-13 max-w-[560px] items-center gap-4 rounded-[16px] border border-border bg-white px-4 shadow-xs"
  ),
  searchInput: cn(
    "w-full border-none bg-transparent text-[18px] text-text-primary outline-none placeholder:text-panel-muted"
  ),
  tableHead: cn("px-5 py-5 text-[16px] font-medium text-panel-muted"),
  tableCell: cn("px-5 py-7 text-[18px] text-text-primary"),
  tableRow: cn("cursor-pointer border-border hover:bg-[#FBFCFD]"),
  overlay: cn("fixed inset-0 z-40 bg-overlay-strong"),
  sheetWrap: cn("fixed inset-y-5 right-5 z-50 flex w-[680px] max-w-[calc(100vw-24px)]"),
  sheet: cn("flex h-full w-full flex-col overflow-hidden rounded-[30px] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.16)]"),
  sheetHeader: cn("border-b border-border px-8 pt-7 pb-6"),
  sheetTopRow: cn("flex items-start justify-between gap-4"),
  sheetTitleRow: cn("flex items-start gap-4"),
  sheetTitle: cn("text-[30px] font-semibold tracking-tight text-text-primary"),
  statusPill: cn("rounded-2xl bg-success-soft px-5 py-2 text-[16px] font-medium text-success-fg"),
  createdText: cn("pl-[52px] pt-2 text-[16px] text-panel-muted"),
  iconButton: cn(
    "grid size-14 place-items-center rounded-[14px] border border-border bg-white text-secondary shadow-xs transition-colors hover:bg-muted"
  ),
  statsGrid: cn("grid grid-cols-2 gap-5 px-8 pt-8"),
  statCard: cn("rounded-[20px] bg-stat-card-bg px-5 py-4"),
  statLabel: cn("text-[18px] text-[#1795A1]"),
  statValue: cn("mt-3 text-[32px] font-medium leading-none text-secondary"),
  contactGrid: cn("grid grid-cols-2 gap-6 border-b border-border px-8 py-8"),
  contactItem: cn("flex items-center gap-4"),
  contactLabel: cn("text-[16px] text-panel-muted"),
  contactValue: cn("mt-1 text-[18px] text-text-primary"),
  assignmentsArea: cn("flex flex-1 flex-col px-8 pt-8"),
  assignmentsTitle: cn("text-[18px] font-semibold tracking-wide text-text-primary"),
  tabsList: cn("mt-6 gap-8 border-b border-transparent p-0"),
  tabsTrigger: cn(
    "relative h-auto flex-none rounded-none px-0 pb-4 text-[18px] font-medium text-panel-muted data-[active]:text-secondary"
  ),
  tabsUnderline: cn("data-[active]:after:absolute data-[active]:after:right-0 data-[active]:after:bottom-0 data-[active]:after:left-0 data-[active]:after:h-1 data-[active]:after:rounded-full data-[active]:after:bg-secondary"),
  countBadge: cn("ml-2 rounded-xl bg-muted px-3 py-1 text-[14px] text-text-primary"),
  assignmentList: cn("flex flex-col"),
  assignmentRow: cn("grid grid-cols-[1fr_auto] items-center gap-4 border-b border-border py-5"),
  assignmentTitle: cn("text-[18px] font-medium text-text-primary"),
  assignmentMeta: cn("mt-1 text-[16px] text-panel-muted"),
  footer: cn("mt-auto grid grid-cols-2 gap-5 border-t border-transparent px-8 py-8"),
  secondaryButton: cn("h-14 rounded-2xl border-secondary px-8 text-[18px] font-medium text-secondary"),
  primaryButton: cn("h-14 rounded-2xl px-8 text-[18px] font-medium"),
  menuContent: cn("w-auto min-w-[214px] rounded-[18px] border border-border bg-white p-2 shadow-[0_20px_50px_rgba(15,23,42,0.12)]"),
  menuItem: cn("gap-3 rounded-[14px] px-4 py-3 text-[18px] text-text-primary"),
  modalContent: cn("max-w-[790px] rounded-[30px] p-0"),
  modalHeader: cn("items-start px-8 pt-9 pb-5"),
  modalTitle: cn("text-[32px] font-semibold tracking-tight text-text-primary"),
  modalSubtitle: cn("mt-2 text-[18px] leading-7 text-panel-muted"),
  modalBody: cn("px-8 pt-7 pb-0"),
  sectionLabel: cn("mb-3 text-[18px] font-medium text-[#475467]"),
  triggerField: cn(
    "flex h-14 w-full items-center justify-between rounded-2xl border border-secondary bg-white px-4 text-[16px] text-panel-muted shadow-xs"
  ),
  menuPanel: cn(
    "mt-3 overflow-hidden rounded-3xl border border-border bg-white shadow-[0_20px_40px_rgba(15,23,42,0.08)]"
  ),
  menuList: cn("max-h-[168px] overflow-y-auto py-1"),
  optionRow: cn("flex items-center gap-4 px-4 py-4 text-[18px] text-text-primary"),
  optionMuted: cn("text-panel-muted"),
  menuItemMuted: cn("text-panel-muted"),
  cooldownGrid: cn("mt-8 grid grid-cols-1 gap-4 md:grid-cols-2"),
  timeField: cn(
    "flex h-14 items-center justify-between rounded-2xl border border-border bg-white px-4 shadow-xs"
  ),
  timeValue: cn("text-[18px] text-text-primary"),
  timeUnit: cn("text-[18px] text-panel-muted"),
  helperText: cn("mt-3 text-[16px] text-panel-muted"),
  modalFooter: cn("justify-end gap-4 px-8 pt-10 pb-8"),
  cancelButton: cn("h-14 rounded-2xl border-secondary px-8 text-[18px] font-medium text-secondary"),
  submitButton: cn("h-14 rounded-2xl px-8 text-[18px] font-medium"),
  dangerButton: cn("h-14 rounded-2xl border-danger bg-danger px-8 text-[18px] font-medium text-danger-foreground hover:bg-danger/90"),
};
