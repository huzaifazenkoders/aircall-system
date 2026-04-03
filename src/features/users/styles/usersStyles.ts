import { cn } from "@/lib/utils";

export const usersStyles = {
  page: cn("flex min-h-[calc(100vh-140px)] flex-1 flex-col"),
  heading: cn("px-4 text-[24px] font-medium text-text-primary md:px-6"),
  contentWrap: cn("mt-5 px-4 md:px-6"),
  card: cn(
    "overflow-hidden rounded-lg border border-border bg-white shadow-xs"
  ),
  tableHead: cn("px-5 py-5 text-[16px] font-medium text-panel-muted"),
  tableCell: cn("px-5 py-7 text-[18px] text-text-primary"),
  tableRow: cn("cursor-pointer border-border hover:bg-[#FBFCFD]"),
  overlay: cn("fixed inset-0 z-40 bg-overlay-strong"),
  sheetWrap: cn(
    "fixed inset-y-2 right-2 z-50 flex w-[680px] max-w-[calc(100vw-24px)]"
  ),
  sheet: cn(
    "flex h-full w-full flex-col overflow-hidden rounded-lg bg-white shadow-[0_24px_70px_rgba(15,23,42,0.16)]"
  ),
  sheetHeader: cn("border-b border-border px-6 pt-5 pb-4"),
  sheetTopRow: cn("flex items-start justify-between gap-4"),
  sheetTitleRow: cn("flex items-start gap-4"),
  sheetTitle: cn("text-[24px] font-medium text-text-primary"),
  statusPill: cn(
    "rounded-2xl bg-success-soft px-3 py-1 text-sm text-success-fg"
  ),
  createdText: cn("pl-[52px] mt-0 text-sm text-panel-muted"),
  iconButton: cn(
    "grid size-10 place-items-center rounded-lg border border-border bg-white text-secondary shadow-xs transition-colors hover:bg-muted"
  ),
  statsGrid: cn("grid grid-cols-2 gap-3 px-6 pt-6"),
  statCard: cn("rounded-lg bg-stat-card-bg px-5 py-4"),
  statLabel: cn("text-[14px] text-[#219D9D]"),
  statValue: cn("mt-3 text-[24px] font-medium leading-none text-[#15706D]"),
  contactGrid: cn("grid grid-cols-2 gap-6 border-b border-border px-6 py-6"),
  contactItem: cn("flex gap-4"),
  contactLabel: cn("text-sm text-panel-muted"),
  contactValue: cn("mt-0 text-base text-text-primary"),
  assignmentsArea: cn("flex flex-1 flex-col px-6 pt-6"),
  assignmentsTitle: cn(
    "text-[14px] font-medium tracking-wide text-text-primary"
  ),
  tabsList: cn("mt-6 gap-4 border-b border-transparent p-0"),
  tabsTrigger: cn(
    "relative h-auto flex-none rounded-none px-0 pb-4 text-[14px] font-medium text-panel-muted data-[active]:text-secondary"
  ),
  tabsUnderline: cn(
    "data-[active]:after:absolute data-[active]:after:right-0 data-[active]:after:bottom-0 data-[active]:after:left-0 data-[active]:after:h-1 data-[active]:after:rounded-full data-[active]:after:bg-secondary"
  ),
  countBadge: cn(
    "ml-1 rounded-xl bg-muted px-3 py-1 text-[14px] text-text-primary"
  ),
  assignmentList: cn("flex flex-col"),
  assignmentRow: cn(
    "grid grid-cols-[1fr_auto] items-center gap-4 border-b border-border py-2.5"
  ),
  assignmentTitle: cn("text-sm font-medium text-text-primary"),
  assignmentMeta: cn("ms-1 text-sm text-panel-muted"),
  footer: cn(
    "mt-auto grid grid-cols-2 gap-5 border-t border-transparent px-6 py-6"
  ),
  menuContent: cn(
    "w-auto min-w-[200px] rounded-lg border border-border bg-white py-2 px-0 shadow-[0_20px_50px_rgba(15,23,42,0.12)]"
  ),
  menuItem: cn("gap-3 px-3 py-2 text-sm text-text-primary"),
  modalContent: cn("max-w-[790px] rounded-lg p-0"),
  modalHeader: cn("items-start p-6"),
  modalTitle: cn("text-[24px] font-medium text-text-primary"),
  modalSubtitle: cn("text-[14px] leading-2 text-panel-muted"),
  modalBody: cn("px-6 pt-6 pb-0"),
  sectionLabel: cn("text-sm font-medium text-[#475467]"),
  triggerField: cn(
    "mt-3 flex h-11 w-full items-center justify-between rounded-lg border border-border-primary bg-white px-4 text-[16px] text-panel-muted shadow-xs"
  ),
  menuPanel: cn(
    "mt-3 overflow-hidden rounded-lg border border-border bg-white shadow-[0_20px_40px_rgba(15,23,42,0.08)]"
  ),
  menuList: cn("max-h-[168px] overflow-y-auto py-1"),
  optionRow: cn("flex items-center gap-4 px-4 py-2 text-sm text-text-primary"),
  optionMuted: cn("text-panel-muted"),
  menuItemMuted: cn("text-panel-muted"),
  cooldownGrid: cn("mt-3 grid grid-cols-1 gap-4 md:grid-cols-2"),
  timeField: cn(
    "flex h-11 items-center justify-between rounded-lg border border-border bg-white px-4 shadow-xs"
  ),
  timeValue: cn("text-sm text-text-primary"),
  timeUnit: cn("text-sm text-panel-muted"),
  helperText: cn("mt-3 text-sm text-panel-muted"),
  modalFooter: cn("justify-end gap-4 px-8 pt-10 pb-8"),
  groupMembersModalContent: cn("max-w-[1180px] rounded-[36px] p-0"),
  groupMembersModalHeader: cn("items-start border-b border-border px-10 pt-10 pb-8"),
  groupMembersModalTitle: cn("text-[46px] leading-none font-medium text-[#273043]"),
  groupMembersModalSubtitle: cn("mt-6 text-[28px] leading-none text-[#667085]"),
  groupMembersModalBody: cn("px-0 py-0"),
  groupMembersSearch: cn("h-[72px] rounded-[18px] border-border px-6 text-[24px] text-[#667085] shadow-[0_3px_12px_rgba(16,24,40,0.10)]"),
  groupMembersList: cn("max-h-[520px] overflow-y-auto px-10 py-8"),
  groupMembersRow: cn("flex items-center gap-6 py-6"),
  groupMembersAvatar: cn("grid size-16 shrink-0 place-items-center rounded-full text-xl font-semibold"),
  groupMembersName: cn("text-[28px] leading-none text-[#273043]"),
  groupMembersState: cn("flex min-h-[260px] items-center justify-center text-lg text-panel-muted")
};
