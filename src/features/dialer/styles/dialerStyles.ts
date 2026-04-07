import { cn } from "@/lib/utils";

export const dialerShellStyles = {
  shell: cn("min-h-screen bg-background p-4 lg:p-5"),
  frame: cn(
    "grid min-h-[calc(100vh-2rem)] grid-cols-1 gap-4 rounded-[2rem] bg-background lg:grid-cols-[6.5rem_minmax(0,1fr)] lg:gap-8"
  ),
  sidebar: cn(
    "flex min-h-full flex-row gap-3 rounded-[2rem] bg-[image:var(--gradient)] px-4 py-5 text-white lg:flex-col lg:items-center lg:px-0 lg:py-6"
  ),
  logoWrap: cn(
    "grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-accent/15 lg:size-16"
  ),
  nav: cn(
    "flex flex-1 items-center gap-2 overflow-x-auto lg:flex-col lg:gap-6 lg:overflow-visible"
  ),
  navItem: cn(
    "flex min-w-max items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-white/85 transition-colors hover:bg-white/10 hover:text-white lg:min-w-0 lg:flex-col lg:justify-center lg:gap-2 lg:px-3 lg:py-3"
  ),
  navItemActive: cn("bg-white/10 text-white"),
  navLabel: cn("text-sm font-medium tracking-tight"),
  content: cn("flex min-w-0 flex-col"),
  topbar: cn(
    "flex items-center justify-end border-b border-border px-2 pb-4 lg:pb-5"
  ),
  avatar: cn(
    "grid size-11 place-items-center overflow-hidden rounded-xl border border-border bg-white shadow-xs"
  ),
  topbarMeta: cn("leading-tight"),
  topbarGreeting: cn("text-sm text-[#94A3B8]"),
  topbarName: cn("text-sm font-semibold text-text-primary"),
  page: cn("flex min-h-[calc(100vh-9rem)] flex-1 flex-col px-2 pt-6 lg:pt-8"),
  titleRow: cn(
    "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
  ),
  title: cn(
    "text-[2rem] font-semibold tracking-tight text-text-primary lg:text-[2.625rem]"
  )
};

export const callHistoryStyles = {
  statsCard: cn(
    "mt-8 grid overflow-hidden rounded-[1.875rem] border border-border bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)] md:grid-cols-2 xl:grid-cols-5"
  ),
  statItem: cn(
    "flex min-h-36 flex-col justify-center gap-2 px-8 py-6 xl:border-r xl:border-border last:border-r-0"
  ),
  statLabel: cn("text-[1rem] text-[#6B7A99] lg:text-[1.125rem]"),
  statValue: cn(
    "text-[3.25rem] font-medium leading-none tracking-tight text-[#127A79]"
  ),
  tableCard: cn(
    "mt-10 overflow-hidden rounded-[1.875rem] border border-border bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
  ),
  toolbar: cn(
    "grid gap-4 border-b border-border px-5 py-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:px-7"
  ),
  searchField: cn(
    "flex h-11 items-center gap-3 rounded-[0.875rem] border border-border bg-white px-4 shadow-xs sm:max-w-xl"
  ),
  searchInput: cn(
    "w-full border-none bg-transparent text-lg text-text-primary outline-none placeholder:text-[#6B7A99]"
  ),
  filterTrigger: cn(
    "h-11 min-w-36 rounded-[0.875rem] border-border bg-white px-4 text-lg text-text-primary shadow-xs"
  ),
  tableHead: cn("px-5 py-4 text-[1rem] font-medium text-[#6B7A99] lg:px-6"),
  cell: cn("px-5 py-5 text-lg text-text-primary lg:px-6"),
  row: cn("cursor-pointer border-border hover:bg-[#FBFCFD]"),
  statusBadge: cn("h-8 rounded-[0.75rem] px-4 text-base font-medium"),
  arrowCell: cn("w-14 py-5 pr-5"),
  arrowButton: cn(
    "grid size-10 place-items-center rounded-full text-[#6B7A99] transition-colors hover:bg-muted hover:text-text-primary"
  ),
  pagination: cn(
    "flex flex-col gap-3 border-t border-border px-5 py-4 text-[#6B7A99] sm:flex-row sm:items-center sm:justify-end lg:px-6"
  ),
  paginationText: cn("text-base"),
  paginationButton: cn(
    "grid size-9 place-items-center rounded-full text-[#6B7A99] transition-colors hover:bg-muted hover:text-text-primary"
  ),
  emptyWrap: cn("flex min-h-[42rem] flex-1 items-center justify-center px-6"),
  emptyInner: cn("flex max-w-2xl flex-col items-center text-center"),
  emptyTitle: cn("mt-8 text-2xl font-medium text-text-primary lg:text-[3rem]"),
  emptyDescription: cn(
    "mt-4 max-w-2xl text-xl leading-[1.45] text-[#667794] lg:text-[1.75rem]"
  ),
  sheetHeader: cn("px-8 pt-8 pb-6"),
  sheetTitle: cn(
    "text-[2.125rem] font-semibold tracking-tight text-text-primary"
  ),
  sheetSection: cn("border-t border-border px-8 py-8"),
  sheetSectionTitle: cn(
    "text-[1.125rem] font-semibold tracking-wide text-text-primary"
  ),
  detailGrid: cn("mt-8 grid gap-x-10 gap-y-7 md:grid-cols-2"),
  detailLabel: cn("text-[1rem] text-[#6B7A99]"),
  detailValue: cn("mt-1.5 text-[1.125rem] text-text-primary lg:text-[1.25rem]"),
  link: cn(
    "mt-1.5 inline-flex items-center gap-2 text-[1.125rem] text-[#166A6D] underline underline-offset-4"
  ),
  representative: cn(
    "mt-1.5 flex items-center gap-3 text-[1.125rem] text-text-primary lg:text-[1.25rem]"
  ),
  representativeAvatar: cn(
    "grid size-9 place-items-center overflow-hidden rounded-full bg-[#F8D7C7] text-sm font-semibold text-[#7A2F2F]"
  ),
  noteText: cn("mt-1.5 text-[1.125rem] leading-8 text-text-primary"),
  recordingBar: cn(
    "mt-auto mx-8 mb-8 flex items-center justify-between gap-4 rounded-[1.25rem] bg-[#D8F5F7] px-5 py-5"
  ),
  recordingMeta: cn("flex items-center gap-4"),
  recordingIconWrap: cn(
    "grid size-12 place-items-center rounded-full border border-[#A8DFE3] bg-white/55 text-[#0B5E61]"
  ),
  recordingLabel: cn("text-[1rem] font-medium text-text-primary"),
  recordingTime: cn("mt-0.5 text-[1rem] text-[#62708A]"),
  playButton: cn(
    "grid size-12 place-items-center rounded-full bg-white text-[#364152] shadow-xs"
  )
};

export const callbackStyles = {
  card: cn(
    "mt-8 overflow-hidden rounded-[1.875rem] border border-border bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
  ),
  toolbar: cn(
    "grid gap-4 border-b border-border px-5 py-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:px-7"
  ),
  toolbarRight: cn("flex flex-wrap items-center gap-3 lg:justify-end"),
  searchField: cn(
    "flex h-11 items-center gap-3 rounded-[0.875rem] border border-border bg-white px-4 shadow-xs sm:max-w-2xl"
  ),
  searchInput: cn(
    "w-full border-none bg-transparent text-lg text-text-primary outline-none placeholder:text-[#6B7A99]"
  ),
  filterTrigger: cn(
    "h-11 min-w-36 rounded-[0.875rem] border-border bg-white px-4 text-lg text-text-primary shadow-xs"
  ),
  dateTrigger: cn("min-w-40"),
  tableHead: cn("px-5 py-4 text-[1rem] font-medium text-[#6B7A99] lg:px-6"),
  cell: cn("px-5 py-5 text-lg text-text-primary lg:px-6"),
  row: cn("cursor-pointer border-border hover:bg-[#FBFCFD]"),
  arrowCell: cn("w-14 py-5 pr-5"),
  arrowButton: cn(
    "grid size-10 place-items-center rounded-full text-[#6B7A99] transition-colors hover:bg-muted hover:text-text-primary"
  ),
  pagination: cn(
    "flex flex-col gap-3 border-t border-border px-5 py-4 text-[#6B7A99] sm:flex-row sm:items-center sm:justify-end lg:px-6"
  ),
  dialogContent: cn("w-full max-w-7xl rounded-[2rem]"),
  dialogHeader: cn("px-6 py-5 lg:px-8"),
  dialogTitleWrap: cn("flex items-center gap-4"),
  dialogTitle: cn("text-[2rem] font-semibold tracking-tight text-text-primary"),
  dialogAction: cn(
    "h-11 rounded-[0.875rem] border-border bg-white px-5 text-[1rem] text-text-primary shadow-xs"
  ),
  dialogBody: cn(
    "grid min-h-0 flex-1 gap-0 lg:grid-cols-[minmax(0,1.55fr)_minmax(18rem,0.95fr)]"
  ),
  dialogLeft: cn("min-w-0 px-6 py-6 lg:px-8"),
  dialogRight: cn(
    "border-t border-border px-6 py-6 lg:border-t-0 lg:border-l lg:px-8"
  ),
  sectionTitle: cn(
    "text-[1.125rem] font-semibold tracking-wide text-text-primary"
  ),
  infoGrid: cn("mt-6 grid gap-x-8 gap-y-7 md:grid-cols-3"),
  detailLabel: cn("text-[1rem] text-[#6B7A99]"),
  detailValue: cn("mt-1 text-[1.125rem] text-text-primary lg:text-[1.25rem]"),
  divider: cn("my-8 border-t border-border"),
  statusGrid: cn("mt-6 grid gap-x-8 gap-y-7 md:grid-cols-2"),
  pill: cn(
    "inline-flex h-8 items-center rounded-[0.75rem] bg-status-cooldown-bg px-4 text-base font-medium text-status-cooldown-fg"
  ),
  purchaseCard: cn(
    "mt-8 overflow-hidden rounded-[1.75rem] border border-border bg-white"
  ),
  purchaseHeader: cn(
    "flex flex-col gap-4 border-b border-border px-5 py-5 sm:flex-row sm:items-center sm:justify-between"
  ),
  purchaseTitle: cn(
    "text-[1.125rem] font-medium text-text-primary lg:text-[1.25rem]"
  ),
  purchaseTotalWrap: cn("flex items-center gap-3"),
  purchaseTotalLabel: cn(
    "text-[1rem] font-semibold uppercase tracking-wide text-[#6B7A99]"
  ),
  purchaseTotalValue: cn("text-[1.625rem] font-semibold text-[#127A79]"),
  purchaseTableWrap: cn("max-h-[34rem] overflow-auto"),
  purchaseHead: cn(
    "px-4 py-4 text-left text-[1rem] font-medium text-[#6B7A99] lg:px-5"
  ),
  purchaseCell: cn("px-4 py-4 text-[1.125rem] text-text-primary lg:px-5"),
  tabs: cn("flex flex-wrap gap-6"),
  tab: cn(
    "border-b-[3px] border-transparent pb-3 text-[1rem] text-[#6B7A99] transition-colors"
  ),
  tabActive: cn("border-primary text-primary"),
  timeline: cn("mt-8 flex flex-col gap-6"),
  timelineItem: cn("grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4"),
  timelineRail: cn("flex flex-col items-center"),
  timelineDot: cn(
    "grid size-10 place-items-center rounded-full bg-[#C9FAF3] text-primary"
  ),
  timelineLine: cn("mt-2 h-full w-px bg-border"),
  timelineTitle: cn("text-[1.125rem] font-medium text-text-primary"),
  timelineSubtitle: cn("mt-1 text-[1rem] text-[#6B7A99]"),
  noteList: cn("mt-8 flex flex-col gap-4"),
  noteItem: cn(
    "rounded-2xl bg-[#F7FAFC] px-4 py-4 text-[1rem] leading-7 text-text-primary"
  ),
  emptyWrap: cn("flex min-h-[42rem] flex-1 items-center justify-center px-6"),
  emptyInner: cn("flex max-w-2xl flex-col items-center text-center"),
  emptyTitle: cn(
    "mt-8 text-[2rem] font-medium tracking-tight text-text-primary lg:text-[3rem]"
  ),
  emptyDescription: cn(
    "mt-4 max-w-2xl text-xl leading-[1.45] text-[#667794] lg:text-[1.75rem]"
  )
};
