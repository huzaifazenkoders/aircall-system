import { cn } from "@/lib/utils";

export const groupsStyles = {
  page: cn("flex min-h-[calc(100vh-140px)] flex-1 flex-col"),
  pageInner: cn("flex flex-1 flex-col gap-8 px-4 md:px-6"),
  pageHeader: cn("flex flex-col gap-4 md:flex-row md:items-center md:justify-between"),
  title: cn("text-[34px] font-semibold tracking-tight text-text-primary"),
  createButton: cn("h-14 rounded-[16px] px-7 text-[18px] font-medium"),
  emptyWrap: cn("flex flex-1 items-center justify-center px-4 py-10"),
  emptyCard: cn("flex max-w-[620px] flex-col items-center text-center"),
  emptyIllustration: cn("w-full max-w-[500px]"),
  emptyTitle: cn("mt-8 text-[34px] font-semibold tracking-tight text-text-primary"),
  emptyDescription: cn("mt-4 max-w-[520px] text-[18px] leading-8 text-text-secondary"),
  emptyAction: cn("mt-10 h-14 rounded-[16px] px-8 text-[18px] font-medium"),
  successBanner: cn(
    "mx-auto flex w-full max-w-[640px] items-start gap-4 rounded-[18px] bg-success-soft px-6 py-5 text-success-fg shadow-xs"
  ),
  successTitle: cn("text-[18px] font-semibold"),
  successText: cn("mt-1 text-[16px]"),
  tableCard: cn("overflow-hidden rounded-[30px] border border-border bg-white shadow-xs"),
  toolbar: cn(
    "flex flex-col gap-4 border-b border-border px-5 py-5 xl:flex-row xl:items-center xl:justify-between"
  ),
  searchField: cn(
    "flex h-13 w-full max-w-[560px] items-center gap-4 rounded-[16px] border border-border bg-white px-4 shadow-xs"
  ),
  searchInput: cn(
    "w-full border-none bg-transparent text-[18px] text-text-primary outline-none placeholder:text-panel-muted"
  ),
  filterRow: cn("flex flex-wrap items-center gap-4"),
  filterButton: cn(
    "flex h-12 items-center gap-3 rounded-[16px] border border-secondary bg-white px-5 text-[16px] text-text-primary shadow-xs"
  ),
  tableWrap: cn("overflow-x-auto"),
  table: cn("min-w-[980px]"),
  headCell: cn("px-5 py-5 text-[16px] font-medium text-panel-muted"),
  bodyCell: cn("px-5 py-5 text-[18px] text-text-primary"),
  row: cn("border-border"),
  statusCell: cn("w-[180px]"),
  statusBadge: cn("inline-flex rounded-2xl px-5 py-2 text-[16px] font-medium"),
  statusActive: cn("bg-status-active-bg text-status-active-fg"),
  statusInactive: cn("bg-status-invalid-bg text-status-invalid-fg"),
  iconActionButton: cn(
    "grid size-11 place-items-center rounded-[14px] border border-border bg-white text-text-primary shadow-xs transition-colors hover:bg-muted"
  ),
  menuContent: cn(
    "min-w-[226px] rounded-[18px] border border-border bg-white p-2 shadow-[0_20px_50px_rgba(15,23,42,0.12)]"
  ),
  menuItem: cn("gap-3 rounded-[14px] px-4 py-3 text-[18px] text-text-primary"),
  footer: cn("flex flex-col gap-4 border-t border-border px-5 py-5 md:flex-row md:items-center md:justify-end"),
  footerMeta: cn("text-[16px] text-panel-muted"),
  footerPager: cn("flex items-center gap-5 text-[16px] text-text-primary"),
  pagerButton: cn("grid size-9 place-items-center rounded-full text-panel-muted transition-colors hover:bg-muted"),
  overlay: cn("fixed inset-0 z-40 bg-overlay-strong"),
  sheetWrap: cn("fixed inset-y-5 right-5 z-50 flex w-[700px] max-w-[calc(100vw-24px)]"),
  sheet: cn(
    "flex h-full w-full flex-col overflow-hidden rounded-[30px] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.16)]"
  ),
  sheetHeader: cn("border-b border-border px-8 pt-8 pb-7"),
  sheetHeaderTop: cn("flex items-start justify-between gap-4"),
  backRow: cn("flex items-center gap-4"),
  backButton: cn("grid size-11 place-items-center rounded-full text-panel-muted transition-colors hover:bg-muted"),
  sheetTitle: cn("text-[30px] font-semibold tracking-tight text-text-primary"),
  sheetLeadRow: cn("mt-8 flex items-start justify-between gap-4"),
  sheetGroupName: cn("text-[24px] font-semibold text-text-primary"),
  sheetDescription: cn("mt-2 text-[18px] text-text-secondary"),
  sheetStatus: cn("rounded-2xl bg-success-soft px-5 py-2 text-[16px] font-medium text-success-fg"),
  tabsWrap: cn("border-b border-border px-8 pt-6"),
  tabsList: cn("gap-8 border-b border-transparent p-0"),
  tabsTrigger: cn(
    "relative h-auto flex-none rounded-none px-0 pb-4 text-[18px] font-medium text-panel-muted data-[active]:text-secondary"
  ),
  tabsUnderline: cn(
    "data-[active]:after:absolute data-[active]:after:right-0 data-[active]:after:bottom-0 data-[active]:after:left-0 data-[active]:after:h-1 data-[active]:after:rounded-full data-[active]:after:bg-secondary"
  ),
  countBadge: cn("ml-2 rounded-xl bg-muted px-3 py-1 text-[14px] text-text-primary"),
  sheetBody: cn("flex flex-1 flex-col px-8 pt-5"),
  assignmentList: cn("flex flex-col"),
  assignmentRow: cn("grid grid-cols-[1fr_auto] items-center gap-4 border-b border-border py-5"),
  assignmentTitle: cn("text-[18px] font-medium text-text-primary"),
  assignmentMeta: cn("mt-1 text-[16px] text-panel-muted"),
  memberMetaRow: cn("flex items-center gap-4"),
  memberButton: cn("h-12 rounded-[14px] border-border px-5 text-[16px] font-medium text-text-primary"),
  footerActions: cn("mt-auto grid grid-cols-2 gap-5 py-8"),
  secondaryButton: cn("h-14 rounded-[16px] border-secondary px-8 text-[18px] font-medium text-secondary"),
  primaryButton: cn("h-14 rounded-[16px] px-8 text-[18px] font-medium"),
  dialogContent: cn("max-w-[790px] rounded-[30px] p-0"),
  selectionDialogContent: cn("max-w-[790px] rounded-[30px] p-0"),
  dialogHeader: cn("items-start px-8 pt-8 pb-5"),
  dialogTitle: cn("text-[32px] font-semibold tracking-tight text-text-primary"),
  dialogSubtitle: cn("mt-2 text-[18px] leading-7 text-panel-muted"),
  dialogBody: cn("border-t border-border px-8 py-7"),
  formGrid: cn("flex flex-col gap-7"),
  fieldGroup: cn("flex flex-col gap-3"),
  fieldLabel: cn("text-[18px] font-medium text-[#475467]"),
  input: cn(
    "h-14 rounded-[16px] border border-border bg-white px-4 text-[16px] text-text-primary shadow-xs outline-none placeholder:text-panel-muted"
  ),
  textarea: cn(
    "min-h-[118px] rounded-[16px] border border-border bg-white px-4 py-4 text-[16px] text-text-primary shadow-xs outline-none placeholder:text-panel-muted"
  ),
  memberTrigger: cn(
    "flex h-14 items-center justify-between rounded-[16px] border border-secondary bg-white px-4 text-[16px] text-panel-muted shadow-xs"
  ),
  memberPanel: cn(
    "overflow-hidden rounded-[20px] border border-border bg-white shadow-[0_20px_40px_rgba(15,23,42,0.08)]"
  ),
  memberSearchField: cn(
    "mx-4 mt-4 flex h-12 items-center gap-3 rounded-[14px] border border-border bg-white px-4 shadow-xs"
  ),
  memberSearchInput: cn(
    "w-full border-none bg-transparent text-[16px] text-text-primary outline-none placeholder:text-panel-muted"
  ),
  memberList: cn("max-h-[360px] overflow-y-auto px-4 py-4"),
  memberRow: cn("grid grid-cols-[auto_auto_1fr] items-center gap-4 py-4"),
  selectionRow: cn("grid grid-cols-[auto_auto_1fr] items-center gap-4 py-4"),
  listCheckboxSpacer: cn("size-11"),
  selectionEmptyState: cn("flex min-h-[430px] flex-col items-center justify-center px-8 py-12 text-center"),
  selectionEmptyIconWrap: cn("grid size-20 place-items-center rounded-full bg-[#EEFBFB]"),
  selectionEmptyTitle: cn("mt-6 text-[28px] font-semibold tracking-tight text-text-primary"),
  selectionEmptyDescription: cn("mt-4 max-w-[360px] text-[18px] leading-8 text-text-secondary"),
  avatar: cn("grid size-11 place-items-center overflow-hidden rounded-full text-[16px] font-semibold"),
  dialogFooter: cn("justify-end gap-4 px-8 pt-0 pb-8"),
  cancelButton: cn("h-14 rounded-[16px] border-secondary px-8 text-[18px] font-medium text-secondary"),
  submitButton: cn("h-14 rounded-[16px] px-8 text-[18px] font-medium"),
  confirmDialogContent: cn("max-w-[780px] rounded-[30px] p-0"),
  confirmDialogHeader: cn("items-start border-none px-8 pt-8 pb-0"),
  confirmDialogTitle: cn("text-[28px] font-semibold tracking-tight text-text-primary"),
  confirmDialogSubtitle: cn("mt-4 text-[18px] leading-8 text-text-secondary"),
  confirmDialogBody: cn("px-8 py-8"),
  confirmDialogPrompt: cn("text-[18px] text-text-secondary"),
  confirmDialogFooter: cn("justify-end gap-4 px-8 pt-0 pb-8"),
  confirmCancelButton: cn("h-14 rounded-[16px] px-8 text-[18px] font-medium"),
  dangerButton: cn("h-14 rounded-[16px] border-danger bg-danger px-8 text-[18px] font-medium text-danger-foreground hover:bg-danger/90"),
};
