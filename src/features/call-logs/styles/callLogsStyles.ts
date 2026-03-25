import { cn } from "@/lib/utils";

export const callLogsStyles = {
  page: cn("flex min-h-[calc(100vh-140px)] flex-1 flex-col"),
  title: cn("px-4 text-[34px] font-semibold tracking-tight text-text-primary md:px-6"),
  card: cn(
    "mt-8 overflow-hidden rounded-[30px] border border-border bg-white shadow-[0_14px_40px_rgba(15,23,42,0.06)]"
  ),
  toolbar: cn(
    "grid gap-4 border-b border-border px-4 py-5 md:px-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"
  ),
  searchField: cn(
    "flex h-13 w-full items-center gap-4 rounded-[14px] border border-border bg-white px-4 shadow-xs lg:max-w-[700px]"
  ),
  searchInput: cn(
    "w-full border-none bg-transparent text-[16px] leading-6 text-text-primary outline-none placeholder:text-panel-muted md:text-[18px]"
  ),
  filterRow: cn("flex flex-wrap items-center gap-3 lg:justify-end"),
  filterTrigger: cn(
    "h-13 min-w-[132px] rounded-[14px] border-border bg-white px-4 text-[16px] text-text-primary shadow-xs md:text-[18px]"
  ),
  dateTrigger: cn("min-w-[170px]"),
  selectContent: cn(
    "rounded-[18px] border border-border bg-white p-2 shadow-[0_18px_40px_rgba(15,23,42,0.1)]"
  ),
  selectItem: cn("rounded-[12px] px-4 py-3 text-[16px] text-text-primary md:text-[18px]"),
  tableHead: cn("px-5 py-5 text-[15px] font-medium text-panel-muted md:px-6 md:text-[16px]"),
  row: cn("cursor-pointer border-border hover:bg-[#FBFCFD]"),
  cell: cn("px-5 py-6 text-[16px] text-text-primary md:px-6 md:text-[18px]"),
  dispositionCell: cn("w-[1%] whitespace-nowrap"),
  dispositionBadge: cn("h-8 rounded-[12px] px-5 text-[15px] font-medium md:text-[16px]"),
  arrowButton: cn(
    "grid size-11 place-items-center rounded-full text-[#667085] transition-colors hover:bg-muted hover:text-text-primary"
  ),
  pagination: cn(
    "flex flex-col gap-4 border-t border-border px-5 py-5 text-panel-muted md:flex-row md:items-center md:justify-end md:px-6"
  ),
  paginationText: cn("text-[16px]"),
  paginationActions: cn("flex items-center gap-1 self-end md:self-auto"),
  paginationButton: cn(
    "grid size-10 place-items-center rounded-full text-[#667085] transition-colors hover:bg-muted hover:text-text-primary"
  ),
  emptyWrap: cn("flex min-h-[720px] flex-1 items-center justify-center px-6"),
  emptyInner: cn("flex max-w-[580px] flex-col items-center text-center"),
  emptyTitle: cn("mt-8 text-[42px] font-medium tracking-tight text-text-primary"),
  emptyDescription: cn(
    "mt-5 max-w-[540px] text-[28px] leading-[1.45] text-[#667794]"
  ),
  dialogHeader: cn("items-start px-8 pt-8 pb-5"),
  dialogTitle: cn("text-[30px] font-semibold tracking-tight text-text-primary"),
  section: cn("border-t border-border px-8 py-7 first:border-t-0"),
  sectionTitle: cn("text-[18px] font-semibold tracking-wide text-text-primary"),
  detailsGrid: cn("mt-8 grid gap-x-12 gap-y-8 md:grid-cols-2"),
  detailLabel: cn("text-[16px] text-panel-muted"),
  detailValue: cn("mt-1.5 text-[20px] text-text-primary"),
  keapLink: cn("mt-1.5 inline-flex text-[20px] text-[#1F6C73] underline underline-offset-4"),
  summaryGrid: cn("mt-8 grid gap-x-12 gap-y-8 md:grid-cols-2"),
  representative: cn("mt-1.5 flex items-center gap-3 text-[20px] text-text-primary"),
  avatar: cn("grid size-10 place-items-center rounded-full bg-[#F8D7C7] text-[14px] font-semibold text-[#7A2F2F]"),
  noteWrap: cn("mt-8"),
  noteValue: cn("mt-1.5 text-[20px] leading-8 text-text-primary"),
  recordingBar: cn(
    "mt-auto mx-8 mb-8 flex items-center justify-between rounded-[20px] bg-[#DDF8FA] px-7 py-6"
  ),
  recordingMeta: cn("flex items-center gap-4"),
  recordingIconWrap: cn(
    "grid size-14 place-items-center rounded-full border border-[#B6E7E9] bg-white/50 text-[#0B5E61]"
  ),
  recordingLabel: cn("text-[16px] font-medium text-text-primary"),
  recordingTime: cn("mt-1 text-[16px] text-[#62708A]"),
  playButton: cn(
    "grid size-12 place-items-center rounded-full bg-white text-[#42526E] shadow-xs transition-transform hover:scale-[1.02]"
  ),
};
