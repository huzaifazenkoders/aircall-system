import { cn } from "@/lib/utils";

export const dialerShellStyles = {
  shell: cn("min-h-screen bg-background p-4 pb-24 lg:p-5"),
  frame: cn(
    "min-h-[calc(100vh-2rem)] rounded-[2rem] bg-background lg:grid lg:grid-cols-[6.5rem_minmax(0,1fr)] lg:gap-8"
  ),
  sidebar: cn(
    "fixed bottom-4 left-4 right-4 z-50 flex flex-row items-center justify-around rounded-2xl bg-primary px-2 py-3 outline outline-1 outline-offset-[-1px]",
    "lg:static lg:bottom-auto lg:left-auto lg:right-auto lg:w-24 lg:self-stretch lg:flex-col lg:items-center lg:justify-start lg:gap-10 lg:px-4 lg:py-8"
  ),
  logoWrap: cn("hidden lg:inline-flex items-center gap-2"),
  nav: cn(
    "flex flex-row items-center justify-around w-full gap-1",
    "lg:self-stretch lg:flex-col lg:items-start lg:gap-4"
  ),
  navItem: cn(
    "flex flex-col items-center justify-center gap-1 rounded-lg px-3 py-1.5 overflow-hidden transition-colors hover:bg-brand-900/60",
    "lg:self-stretch lg:py-2 lg:gap-1.5"
  ),
  navItemActive: cn("bg-brand-900"),
  navLabel: cn(
    "text-[10px] font-normal leading-4 text-white lg:text-xs lg:leading-5"
  ),
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
  titleRow: cn("flex items-center justify-between"),
  title: cn("text-2xl font-medium text-gray-800")
};

export const callHistoryStyles = {
  statsCard: cn(
    "mt-8 overflow-hidden rounded-[20px] bg-white shadow-[0px_5px_22px_0px_rgba(0,0,0,0.04),0px_0px_0px_1px_rgba(0,0,0,0.06)] grid grid-cols-1 gap-y-6 gap-x-4 p-6 sm:grid-cols-3 lg:flex lg:items-center lg:gap-4"
  ),
  statItem: cn(
    "inline-flex flex-col justify-center items-start gap-2 lg:flex-1"
  ),
  statLabel: cn("text-base text-gray-500 leading-6"),
  statValue: cn("text-4xl font-medium text-Brand-700 leading-10"),
  statDivider: cn("hidden lg:block w-px self-stretch border border-zinc-200"),
  tableCard: cn(
    "mt-8 overflow-hidden rounded-[20px] bg-white shadow-[0px_5px_22px_0px_rgba(0,0,0,0.04),0px_0px_0px_1px_rgba(0,0,0,0.06)]"
  ),
  toolbar: cn(
    "border-b border-zinc-200 px-6 py-4 flex flex-wrap items-center gap-3 w-full"
  ),
  searchField: cn(
    "w-[504px] flex items-center bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.08)] border border-border-primary min-h-11 px-3 py-1.5"
  ),
  searchInput: cn(
    "w-full border-none bg-transparent text-base text-gray-500 outline-none placeholder:text-gray-500 tracking-tight leading-6"
  ),
  filterTrigger: cn(
    "bg-input h-11 rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.08)] border border-border-primary min-h-11 px-3 py-2 text-sm text-gray-800 leading-5"
  ),
  tableHead: cn("p-4 text-sm font-medium text-gray-500 leading-4"),
  cell: cn("px-4 py-3.5 text-sm text-gray-800 leading-5"),
  row: cn("cursor-pointer border-zinc-200 hover:bg-[#FBFCFD] h-16"),
  statusBadge: cn(
    "rounded-lg px-2 py-1 text-xs font-medium leading-4 uppercase tracking-tight"
  ),
  arrowCell: cn("w-20 py-3.5"),
  arrowButton: cn(
    "grid size-6 place-items-center text-gray-500 transition-colors hover:bg-muted"
  ),
  pagination: cn("py-2 inline-flex w-full items-center justify-end gap-6"),
  paginationText: cn("text-xs text-gray-500 leading-5"),
  paginationButton: cn("p-2 rounded-lg text-gray-500 hover:bg-muted"),
  emptyWrap: cn("flex min-h-[42rem] flex-1 items-center justify-center px-6"),
  emptyInner: cn("flex max-w-2xl flex-col items-center text-center"),
  emptyTitle: cn("mt-4 text-2xl font-medium text-text-primary"),
  emptyDescription: cn("mt-2 max-w-2xl text-sm"),
  sheetHeader: cn("px-8 pt-8 pb-6"),
  sheetTitle: cn(
    "text-[2.125rem] font-semibold tracking-tight text-text-primary"
  ),
  sheetSection: cn("border-t border-border px-8 py-8"),
  sheetSectionTitle: cn(
    "text-[1.125rem] font-semibold tracking-wide text-text-primary"
  ),
  detailGrid: cn("mt-8 grid grid-cols-1 gap-x-10 gap-y-7 md:grid-cols-2"),
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

export const myListStyles = {
  layout: cn("mt-8 flex flex-col gap-6 xl:flex-row xl:items-start"),
  sidebar: cn(
    "w-full xl:w-96 shrink-0 bg-white rounded-2xl shadow-[0px_5px_22px_0px_rgba(0,0,0,0.04),0px_0px_0px_1px_rgba(0,0,0,0.06)] flex flex-col overflow-hidden"
  ),
  sidebarHeader: cn(
    "px-4 py-4 border-b border-zinc-200 flex items-center gap-2 w-full"
  ),
  sidebarTitleContainer: cn(
    "px-4 py-4 border-b border-zinc-200 flex items-center justify-between gap-2 w-full"
  ),
  sidebarTitle: cn("text-lg font-medium text-gray-800 leading-5"),
  sidebarSearch: cn("px-4 pt-4"),
  sidebarList: cn("px-4 pb-4 pt-4 flex flex-col gap-4"),
  listCard: cn(
    "px-4 py-5 rounded-lg outline outline-1 outline-offset-[-1px] flex flex-col gap-5"
  ),
  listCardActive: cn("bg-Brand-50 outline-Brand-300"),
  listCardInactive: cn("bg-white outline-border"),
  listCardHeader: cn("flex justify-between items-start"),
  listCardName: cn("text-base font-semibold text-text-primary leading-5"),
  listCardToggleWrap: cn("flex items-center gap-2"),
  listCardToggleLabel: cn(
    "text-xs font-semibold text-gray-500 uppercase leading-5"
  ),
  listCardDivider: cn("border-t border-border"),
  listCardMeta: cn("flex justify-between items-center flex-wrap"),
  listCardMetaItem: cn("flex items-center gap-1.5"),
  listCardMetaLabel: cn("text-sm font-medium text-gray-400 leading-5"),
  listCardMetaValue: cn("text-sm text-gray-800 leading-5"),
  tablePanel: cn(
    "w-full flex-1 bg-white rounded-[20px] shadow-[0px_5px_22px_0px_rgba(0,0,0,0.04),0px_0px_0px_1px_rgba(0,0,0,0.06)] flex flex-col overflow-hidden"
  ),
  tableWrap: cn("overflow-x-auto"),
  toolbar: cn("p-4 border-b border-zinc-200 flex flex-wrap items-center gap-3"),
  toolbarRight: cn("flex flex-wrap items-center justify-end gap-3"),
  tableHead: cn("p-4 text-sm font-medium text-gray-500 leading-4"),
  cell: cn("px-3 py-3.5 text-sm text-gray-800 leading-5"),
  row: cn("cursor-pointer border-zinc-200 hover:bg-[#FBFCFD] h-16"),
  arrowCell: cn("w-16 py-3.5 pr-4"),
  arrowButton: cn(
    "size-8 grid place-items-center rounded-lg outline outline-1 outline-offset-[-1px] outline-gray-800/20 bg-white"
  ),
  pagination: cn(
    "py-2 px-4 inline-flex items-center justify-end w-full gap-6 text-gray-500"
  ),
  emptyWrap: cn("flex min-h-[42rem] flex-1 items-center justify-center px-6"),
  emptyInner: cn("flex max-w-lg flex-col items-center text-center gap-3"),
  emptyTitle: cn("text-2xl font-medium text-gray-800 leading-7"),
  emptyDescription: cn("text-base font-medium text-gray-500 leading-6")
};

export const callbackStyles = {
  card: cn(
    "mt-8 overflow-hidden rounded-[20px] bg-white shadow-[0px_5px_22px_0px_rgba(0,0,0,0.04),0px_0px_0px_1px_rgba(0,0,0,0.06)]"
  ),
  toolbar: cn(
    "border-b border-zinc-200 px-6 py-4 flex flex-wrap items-center gap-3 w-full"
  ),
  toolbarRight: cn("flex flex-wrap items-center gap-3"),
  searchField: cn(
    "w-[504px] flex items-center bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.08)] border border-border-primary min-h-9 px-3 py-1.5"
  ),
  searchInput: cn(
    "w-full border-none bg-transparent text-base text-gray-500 outline-none placeholder:text-gray-500 tracking-tight leading-6"
  ),
  filterTrigger: cn(
    "bg-input rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.08)] border border-border-primary h-11 px-2 py-2 text-base text-text-primary"
  ),
  dateTrigger: cn(""),
  tableHead: cn("p-4 text-sm font-medium text-gray-500 leading-4"),
  cell: cn("px-4 py-3.5 text-sm text-gray-800 leading-5"),
  row: cn("cursor-pointer border-zinc-200 hover:bg-[#FBFCFD] h-16"),
  arrowCell: cn("w-20 py-3.5"),
  arrowButton: cn(
    "grid size-6 place-items-center text-gray-500 transition-colors hover:bg-muted"
  ),
  pagination: cn(
    "py-2 inline-flex items-center justify-end w-full px-6 gap-6 text-gray-500"
  ),
  dialogContent: cn("w-full max-w-7xl rounded-2xl"),
  dialogHeader: cn("px-6 py-4"),
  dialogTitleWrap: cn("flex items-center gap-3 h-full"),
  dialogTitle: cn("text-2xl font-medium text-text-primary"),
  dialogBody: cn(
    "grid min-h-0 flex-1 gap-0 lg:grid-cols-[minmax(0,1.55fr)_minmax(18rem,0.95fr)]"
  ),
  dialogLeft: cn("min-w-0 px-6 py-4"),
  dialogRight: cn("border-t border-border px-6 py-4 lg:border-t-0 lg:border-l"),
  sectionTitle: cn(
    "text-xs font-semibold tracking-wide text-text-secondary uppercase"
  ),
  infoGrid: cn("mt-4 grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-3"),
  detailLabel: cn("text-xs text-[#6B7A99]"),
  detailValue: cn("mt-0.5 text-sm text-text-primary"),
  divider: cn("my-4 border-t border-border"),
  statusGrid: cn("mt-4 grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-3"),
  pill: cn(
    "inline-flex h-6 items-center rounded-lg bg-status-cooldown-bg px-3 text-xs font-medium text-status-cooldown-fg"
  ),
  purchaseCard: cn(
    "mt-4 overflow-hidden rounded-xl border border-border bg-white"
  ),
  purchaseHeader: cn(
    "flex flex-col gap-2 border-b border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
  ),
  purchaseTitle: cn("text-sm font-medium text-text-primary"),
  purchaseTotalWrap: cn("flex items-center gap-2"),
  purchaseTotalLabel: cn(
    "text-xs font-semibold uppercase tracking-wide text-[#6B7A99]"
  ),
  purchaseTotalValue: cn("text-base font-semibold text-[#127A79]"),
  purchaseTableWrap: cn("max-h-[410px] overflow-auto custom-scrollbar"),
  purchaseHead: cn("px-4 py-2 text-left text-xs font-medium text-[#6B7A99]"),
  purchaseCell: cn("px-4 py-2 text-sm text-text-primary"),
  tabs: cn("flex flex-wrap gap-4"),
  tab: cn(
    "border-b-2 border-transparent pb-2 text-sm text-[#6B7A99] transition-colors"
  ),
  tabActive: cn("border-primary text-primary"),
  timeline: cn("mt-10 flex flex-col gap-4"),
  timelineItem: cn("grid grid-cols-[2rem_minmax(0,1fr)] gap-3"),
  timelineRail: cn("flex flex-col items-center"),
  timelineDot: cn(
    "grid size-8 place-items-center rounded-full shrink-0 bg-[#C9FAF3] text-primary"
  ),
  timelineLine: cn("mt-1.5 h-full w-px bg-border"),
  timelineTitle: cn("text-sm font-medium text-text-primary"),
  timelineSubtitle: cn("mt-0.5 text-xs text-[#6B7A99]"),
  noteList: cn("mt-4 flex flex-col gap-3"),
  noteItem: cn(
    "rounded-xl bg-[#F7FAFC] px-3 py-3 text-sm leading-6 text-text-primary"
  ),
  emptyWrap: cn("flex min-h-[42rem] flex-1 items-center justify-center px-6"),
  emptyInner: cn("flex max-w-2xl flex-col items-center text-center"),
  emptyTitle: cn("mt-8 text-2xl font-medium text-text-primary"),
  emptyDescription: cn("mt-2 max-w-2xl text-base text-text-secondary")
};
