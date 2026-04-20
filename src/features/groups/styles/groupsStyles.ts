import { cn } from "@/lib/utils";

export const groupsStyles = {
  page: cn("flex min-h-[calc(100vh-150px)] flex-1 flex-col py-6"),
  pageInner: cn("flex flex-1 flex-col gap-6 px-4 md:px-6"),
  pageHeader: cn("flex items-center gap-6"),
  title: cn("flex-1 text-2xl font-medium text-gray-800"),
  createButton: cn("h-11 rounded-lg px-6 text-base font-medium"),
  emptyWrap: cn("flex flex-1 items-center justify-center px-4 py-10"),
  emptyCard: cn("flex max-w-[620px] flex-col items-center text-center gap-2"),
  emptyTitle: cn("mt-4 text-[24px] font-medium text-text-primary"),
  emptyDescription: cn(
    "max-w-[460px] text-[16px] leading-8 text-text-secondary"
  ),
  successBanner: cn(
    "mx-auto flex w-full max-w-[640px] items-start gap-4 rounded-lg bg-success-soft px-6 py-5 text-success-fg shadow-xs"
  ),
  successTitle: cn("text-[18px] font-semibold"),
  successText: cn("mt-1 text-[16px]"),
  tableCard: cn(
    "overflow-hidden rounded-lg bg-white shadow-[0px_5px_22px_0px_rgba(0,0,0,0.04),0px_0px_0px_1px_rgba(0,0,0,0.06)]"
  ),
  toolbar: cn("flex flex-wrap items-center gap-3 border-b border-zinc-200 px-6 py-4"),
  filterRow: cn("flex flex-wrap items-center gap-3"),
  filterButton: cn(
    "flex min-h-11 items-center gap-4 rounded-lg bg-white px-4 py-1.5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.08)] outline outline-1 outline-offset-[-1px] outline-zinc-200 text-sm text-gray-800"
  ),
  tableWrap: cn("overflow-x-auto"),
  table: cn("w-full"),
  headCell: cn("flex-1 px-4 py-4 text-sm font-medium text-gray-500"),
  bodyCell: cn("flex-1 px-4 py-3.5 text-sm text-gray-800"),
  row: cn("border-zinc-200"),
  statusCell: cn(""),
  statusBadge: cn("inline-flex rounded-lg px-2.5 py-1 text-xs font-medium"),
  statusActive: cn("bg-teal-100 text-teal-600"),
  statusInactive: cn("bg-gray-100 text-gray-500"),
  iconActionButton: cn(
    "flex size-8 items-center justify-center rounded-lg bg-white outline outline-1 outline-offset-[-1px] outline-gray-800/20"
  ),
  menuContent: cn(
    "w-40 rounded-lg border border-zinc-200 bg-white py-1 shadow-[0_3px_14px_0px_rgba(0,0,0,0.08)]"
  ),
  menuItem: cn(
    "gap-3 rounded-none px-2 py-1.5 text-sm font-medium text-text-primary cursor-pointer"
  ),
  footer: cn("flex items-center justify-end gap-6 py-2 pr-4"),
  footerMeta: cn("flex items-center gap-2 text-xs text-gray-500"),
  footerPager: cn("flex items-center gap-6 text-xs text-gray-800"),
  pagerButton: cn(
    "rounded-lg p-2 text-gray-500 transition-colors hover:bg-muted"
  ),
  overlay: cn("fixed inset-0 z-40 bg-overlay-strong"),
  sheetWrap: cn(
    "fixed inset-y-2 right-2 z-50 flex w-[700px] max-w-[calc(100vw-24px)]"
  ),
  sheet: cn(
    "flex h-full w-full flex-col overflow-hidden rounded-xl bg-white shadow-[0_24px_70px_rgba(15,23,42,0.16)]"
  ),
  sheetHeader: cn("border-b border-border px-6 pt-6 pb-5"),
  sheetHeaderTop: cn("flex items-start justify-between gap-4"),
  backRow: cn("flex items-center gap-4"),
  backButton: cn(
    "grid size-10 place-items-center rounded-full text-panel-muted transition-colors hover:bg-muted"
  ),
  sheetTitle: cn("text-[24px] font-medium text-text-primary"),
  sheetLeadRow: cn("mt-6 flex items-start justify-between gap-4 px-6"),
  sheetGroupName: cn("text-[18px] font-medium text-text-primary"),
  sheetDescription: cn("mt-0 text-[16px] text-text-secondary"),
  sheetStatus: cn(
    "rounded-lg bg-success-soft px-3 py-2 text-sm font-medium text-success-fg"
  ),
  tabsWrap: cn("border-b border-border px-6 pt-4 h-full"),
  tabsList: cn("gap-4 border-b border-transparent p-0"),
  tabsTrigger: cn(
    "relative h-auto flex-none rounded-none px-0 pb-4 text-sm font-medium text-panel-muted data-[active]:text-secondary"
  ),
  tabsUnderline: cn(
    "data-[active]:after:absolute data-[active]:after:right-0 data-[active]:after:bottom-0 data-[active]:after:left-0 data-[active]:after:h-1 data-[active]:after:rounded-full data-[active]:after:bg-secondary"
  ),
  countBadge: cn(
    "ml-2 rounded-xl bg-muted px-3 py-1 text-[14px] text-text-primary"
  ),
  sheetBody: cn("flex flex-1 flex-col"),
  assignmentList: cn("flex flex-col"),
  assignmentRow: cn(
    "grid grid-cols-[1fr_auto] items-center gap-4 border-b border-border py-2.5"
  ),
  assignmentTitle: cn("font-medium text-text-primary"),
  assignmentMeta: cn("mt-0 text-sm text-panel-muted"),
  memberMetaRow: cn("flex items-center gap-4"),
  footerActions: cn("mt-auto grid grid-cols-1 sm:grid-cols-2 gap-5 py-6 px-6"),
  dialogContent: cn("max-w-[790px] rounded-lg p-0"),
  selectionDialogContent: cn("max-w-[790px] rounded-lg p-0"),
  dialogHeader: cn("items-start p-4 px-6"),
  dialogTitle: cn("mt-0 text-[18px] font-medium text-text-primary"),
  dialogSubtitle: cn("mt-0 text-[14px] leading-7 text-panel-muted"),
  dialogBody: cn("border-t border-border px-6 py-4"),
  formGrid: cn("flex flex-col gap-4"),
  fieldGroup: cn("flex flex-col gap-3"),
  fieldLabel: cn("text-[14px] font-medium text-[#475467]"),
  memberTrigger: cn(
    "flex h-11 items-center justify-between rounded-lg border border-border-primary bg-white px-4 text-[16px] text-panel-muted shadow-xs"
  ),
  memberPanel: cn(
    "overflow-hidden rounded-lg border border-border bg-white shadow-[0_20px_40px_rgba(15,23,42,0.08)]"
  ),
  memberList: cn("max-h-[260px] overflow-y-auto custom-scrollbar px-4 pb-4"),
  memberRow: cn("grid grid-cols-[auto_auto_1fr] items-center gap-4 pt-4"),
  selectionRow: cn("grid grid-cols-[auto_auto_1fr] items-center gap-4 py-2"),
  listCheckboxSpacer: cn("size-11"),
  selectionEmptyState: cn(
    "flex min-h-[260px] flex-col items-center justify-center px-8 py-12 text-center"
  ),
  selectionEmptyIconWrap: cn(
    "grid size-20 place-items-center rounded-full bg-[#EEFBFB]"
  ),
  selectionEmptyTitle: cn("mt-6 text-[24px] font-medium text-text-primary"),
  selectionEmptyDescription: cn(
    "mt-0 max-w-[360px] text-sm leading-8 text-text-secondary"
  ),
  avatar: cn(
    "grid size-11 place-items-center overflow-hidden rounded-full text-[16px] font-semibold"
  ),
  dialogFooter: cn("justify-end gap-4 px-6 pt-0 pb-6"),
  confirmDialogContent: cn("max-w-[780px] rounded-lg p-0"),
  confirmDialogHeader: cn("items-start border-none px-6 pt-6 pb-0"),
  confirmDialogTitle: cn("text-[24px] font-medium text-text-primary"),
  confirmDialogSubtitle: cn("mt-2 text-text-secondary"),
  confirmDialogBody: cn("px-6 py-6"),
  confirmDialogPrompt: cn("text-text-secondary text-[14px]"),
  confirmDialogFooter: cn("justify-end gap-4 px-6 pt-0 pb-6")
};
