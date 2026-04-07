import { cn } from "@/lib/utils";

export const callLogsStyles = {
  page: cn("flex min-h-[calc(100vh-140px)] flex-1 flex-col py-6"),
  title: cn("text-2xl font-medium text-text-primary"),
  card: cn(
    "mt-6 overflow-hidden rounded-lg border border-border bg-white shadow-[0_14px_40px_rgba(15,23,42,0.06)]"
  ),
  toolbar: cn(
    "grid gap-4 border-b border-border px-4 py-5 md:px-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"
  ),
  searchField: cn(
    "flex h-13 w-full items-center gap-4 rounded-lg border border-border bg-white px-4 shadow-xs lg:max-w-[700px]"
  ),
  searchInput: cn(
    "w-full border-none bg-transparent text-[16px] leading-6 text-text-primary outline-none placeholder:text-panel-muted md:text-[18px]"
  ),
  filterRow: cn("flex flex-wrap items-center gap-3 lg:justify-end"),
  filterTrigger: cn(
    "h-11 min-w-[132px] rounded-lg border-border-primary bg-input px-3 text-base text-text-primary placeholder:text-text-secondary shadow-xs"
  ),
  dateTrigger: cn("min-w-[170px]"),
  selectContent: cn(
    "rounded-lg border border-border-primary bg-input py-1 shadow-[0_18px_40px_rgba(15,23,42,0.1)]"
  ),
  selectItem: cn("rounded-lg px-3 py-2 text-sm text-text-primary"),
  tableHead: cn("px-5 py-3 text-sm font-medium text-panel-muted bg-background"),
  row: cn("cursor-pointer border-border hover:bg-[#FBFCFD]"),
  cell: cn("px-5 pt-3 pb-3 text-sm text-text-primary"),
  dispositionCell: cn("w-[1%] whitespace-nowrap"),
  dispositionBadge: cn("rounded-lg px-3 py-2 text-xs font-medium"),
  arrowButton: cn(
    "grid size-11 place-items-center rounded-full text-[#667085] transition-colors hover:bg-muted hover:text-text-primary"
  ),
  pagination: cn(
    "flex flex-col gap-4 border-t border-border px-5 py-5 text-panel-muted md:flex-row md:items-center md:justify-end md:px-6"
  ),
  paginationText: cn("text-sm"),
  paginationActions: cn("flex items-center gap-1 self-end md:self-auto"),
  paginationButton: cn(
    "grid size-10 place-items-center rounded-full text-[#667085] transition-colors hover:bg-muted hover:text-text-primary"
  ),
  emptyWrap: cn("flex min-h-[720px] flex-1 items-center justify-center px-6"),
  emptyInner: cn("flex max-w-[580px] flex-col items-center text-center"),
  emptyTitle: cn(
    "mt-8 text-[42px] font-medium tracking-tight text-text-primary"
  ),
  emptyDescription: cn(
    "mt-5 max-w-[540px] text-[28px] leading-[1.45] text-[#667794]"
  ),
  dialogHeader: cn("items-start px-6 pt-8 pb-4"),
  dialogTitle: cn("text-2xl font-medium text-gray-800"),
  section: cn("border-t border-zinc-200 px-6 py-6 first:border-t-0"),
  sectionTitle: cn(
    "text-sm font-semibold uppercase tracking-wide text-gray-900 leading-9"
  ),
  detailsGrid: cn("flex flex-col gap-4"),
  detailLabel: cn("text-sm text-gray-500 leading-5"),
  detailValue: cn("text-base text-gray-800 leading-6"),
  keapLink: cn("inline-flex text-base text-Brand-800 underline leading-6"),
  summaryGrid: cn("flex flex-col gap-4"),
  representative: cn(
    "flex items-center gap-2 text-base text-gray-800 leading-6"
  ),
  avatar: cn("grid size-6 place-items-center rounded-full"),
  noteWrap: cn("mt-4"),
  noteValue: cn("text-base leading-6 text-gray-800"),
  recordingBar: cn(
    "mt-auto mx-6 mb-6 flex items-center gap-2.5 rounded-lg bg-[linear-gradient(90deg,_rgba(102,_226,_213,_0.2)_0%,_rgba(83,_165,_201,_0.2)_54.81%,_rgba(102,_226,_213,_0.2)_100%)] p-4"
  ),
  recordingMeta: cn("flex flex-1 items-center gap-2.5"),
  recordingIconWrap: cn("size-10 text-Brand-900"),
  recordingLabel: cn(
    "text-xs font-medium text-zinc-900 leading-4 tracking-tight"
  ),
  recordingTime: cn(
    "text-xs font-medium text-slate-500 leading-4 tracking-tight"
  ),
  playButton: cn(
    "grid p-2 place-items-center rounded-full bg-gray-50 transition-transform hover:scale-[1.02]"
  )
};
