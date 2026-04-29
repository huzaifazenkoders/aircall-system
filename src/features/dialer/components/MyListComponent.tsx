"use client";

import React from "react";
import { Loader2Icon, SearchIcon } from "lucide-react";
import { useDebounce } from "use-debounce";
import TablePagination from "@/components/ui/table-pagination";
import InfiniteScroll from "react-infinite-scroll-component";

import { cn } from "@/lib/utils";
import TextInput from "@/components/ui/text-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import DateRangeSelector from "@/components/ui/date-range-selector";
import FocusModeDialog from "@/features/dialer/components/FocusModeDialog";
import ResumeAllListsDialog from "@/features/dialer/components/ResumeAllListsDialog";
import ActivateListDialog from "@/features/dialer/components/ActivateListDialog";
import { leadStatusOptions } from "@/features/dialer/data/dialerData";
import { myListStyles } from "@/features/dialer/styles/dialerStyles";
import Toggle from "@/components/ui/toggle";
import {
  useGetMyLists,
  useActivateMyList,
  useDeactivateMyList,
  useGetUserListPriorityStatus,
  type MyList
} from "@/features/list/services/listService";
import { useGetLeads } from "@/features/list/services/listService";
import {
  getLeadStatus,
  LeadStatusBadge
} from "@/features/list/components/LeadStatusBadge";
import { transformInfiniteData } from "@/utils/infiniteQueryUtils";
import { handleMutationError } from "@/utils/handleMutationError";
import { useQueryClient } from "@tanstack/react-query";
import { listKeys } from "@/features/list/query-keys";
import toast from "react-hot-toast";

const LIMIT = 20;

const MyListComponent = () => {
  const queryClient = useQueryClient();

  const [focusMode, setFocusMode] = React.useState(false);
  const [focusModeDialogOpen, setFocusModeDialogOpen] = React.useState(false);
  const [resumeAllDialogOpen, setResumeAllDialogOpen] = React.useState(false);
  const [activateListDialog, setActivateListDialog] = React.useState<{
    open: boolean;
    list: MyList | null;
  }>({ open: false, list: null });

  const [listSearch, setListSearch] = React.useState("");
  const [debouncedListSearch] = useDebounce(listSearch, 400);
  const [selectedList, setSelectedList] = React.useState<MyList | null>(null);
  const [leadSearch, setLeadSearch] = React.useState("");
  const [debouncedLeadSearch] = useDebounce(leadSearch, 400);
  const [statusFilter, setStatusFilter] = React.useState("All Status");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [leadsPage, setLeadsPage] = React.useState(1);
  const [leadsLimit, setLeadsLimit] = React.useState(10);

  // ── My Lists (infinite scroll) ──────────────────────────────────────────────
  const {
    data: myListsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetMyLists({ limit: LIMIT, search: debouncedListSearch.trim() });

  const myLists = transformInfiniteData(myListsData, "data");

  // Auto-select first list
  React.useEffect(() => {
    if (!selectedList && myLists.length > 0) {
      setSelectedList(myLists[0]);
    }
  }, [myLists, selectedList]);

  // ── Focus Mode initial value from API ────────────────────────────────────────
  const { data: priorityStatusData, isPending: gettingStatus } =
    useGetUserListPriorityStatus(selectedList?.id ?? "");

  React.useEffect(() => {
    if (priorityStatusData?.data?.isActive !== undefined) {
      setFocusMode(priorityStatusData.data.isActive);
    }
  }, [priorityStatusData]);

  // ── Leads ───────────────────────────────────────────────────────────────────
  const { data: leadsData, isPending: leadsLoading } = useGetLeads({
    page: leadsPage,
    limit: leadsLimit,
    list_id: selectedList?.id ?? "",
    search: debouncedLeadSearch.trim() || undefined,
    status:
      statusFilter !== "All Status"
        ? (statusFilter.toLowerCase() as never)
        : undefined,
    startDate: startDate || undefined,
    endDate: endDate || undefined
  });

  const leads = leadsData?.data?.data ?? [];
  const leadsMeta = leadsData?.data?.meta;

  // ── Mutations ───────────────────────────────────────────────────────────────
  const { mutate: activateMyList, isPending: activating } = useActivateMyList();
  const { mutate: deactivateMyList, isPending: deactivating } =
    useDeactivateMyList();

  const invalidateMyLists = () =>
    queryClient.invalidateQueries({
      queryKey: listKeys.myLists({ limit: LIMIT, search: debouncedListSearch.trim() })
    });

  const handleToggleList = (list: MyList) => {
    if (list.user_priorities?.[0]?.is_active) {
      deactivateMyList(
        { payload: { list_id: list.id } },
        {
          onSuccess: () => {
            toast.success("List deactivated");
            invalidateMyLists();
          },
          onError: handleMutationError
        }
      );
    } else {
      setActivateListDialog({ open: true, list });
    }
  };

  const handleActivateConfirm = () => {
    if (!activateListDialog.list) return;
    activateMyList(
      { payload: { list_id: activateListDialog.list.id } },
      {
        onSuccess: () => {
          toast.success("List activated");
          invalidateMyLists();
          setActivateListDialog({ open: false, list: null });
        },
        onError: handleMutationError
      }
    );
  };

  const handleFocusMode = () => {
    deactivateMyList(
      { payload: { list_id: "all" } },
      {
        onSuccess: () => {
          setFocusMode(false);
          invalidateMyLists();
        },
        onError: handleMutationError
      }
    );
  };

  const handleResumeAll = () => {
    activateMyList(
      { payload: { list_id: "all" } },
      {
        onSuccess: () => {
          setFocusMode(true);
          invalidateMyLists();
        },
        onError: handleMutationError
      }
    );
  };

  const togglePending = activating || deactivating;

  if (gettingStatus) {
    return (
      <div className="flex flex-1 items-center justify-center py-20">
        <Loader2Icon className="size-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <>
      <div className={myListStyles.layout}>
        {/* Sidebar */}
        <div className={myListStyles.sidebar}>
          <div className={myListStyles.sidebarHeader}>
            <span className={myListStyles.sidebarTitle}>Assigned Lists</span>
            <div className="flex items-center gap-2 ml-auto">
              <span className={myListStyles.listCardToggleLabel}>
                {focusMode ? "All On" : "Focus Mode"}
              </span>
              <button
                type="button"
                aria-label="Toggle focus mode"
                disabled={togglePending}
                onClick={() =>
                  !focusMode
                    ? setResumeAllDialogOpen(true)
                    : setFocusModeDialogOpen(true)
                }
              >
                <Toggle active={focusMode} />
              </button>
            </div>
          </div>

          <div className={myListStyles.sidebarSearch}>
            <TextInput
              setValue={setListSearch}
              value={listSearch}
              startIcon={<SearchIcon className="size-5 text-gray-500" />}
              placeholder="Search by list name"
              className="h-9 text-base"
            />
          </div>

          <div
            id="my-lists-scroll"
            className={cn(
              myListStyles.sidebarList,
              "overflow-y-auto max-h-[45vh] xl:max-h-[calc(100vh-16rem)]"
            )}
          >
            <InfiniteScroll
              dataLength={myLists.length}
              next={fetchNextPage}
              hasMore={!!hasNextPage}
              loader={
                <div className="flex justify-center py-2">
                  <Loader2Icon className="size-5 animate-spin text-gray-400" />
                </div>
              }
              scrollableTarget="my-lists-scroll"
              className="flex flex-col gap-4"
            >
              {myLists.map((list) => (
                <div
                  key={list.id}
                  className={cn(
                    myListStyles.listCard,
                    !list.user_priorities.length ||
                      list.user_priorities?.[0]?.is_active
                      ? myListStyles.listCardActive
                      : myListStyles.listCardInactive,
                    selectedList?.id === list.id && "border-3 border-primary"
                  )}
                  onClick={() => setSelectedList(list)}
                >
                  <div className={myListStyles.listCardHeader}>
                    <span className={myListStyles.listCardName}>
                      {list.name}
                    </span>
                    <div className={myListStyles.listCardToggleWrap}>
                      <span className={myListStyles.listCardToggleLabel}>
                        {!list.user_priorities.length ||
                        list.user_priorities?.[0]?.is_active
                          ? "Active"
                          : "Inactive"}
                      </span>
                      <button
                        type="button"
                        aria-label={`Toggle ${list.name}`}
                        disabled={togglePending}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleList(list);
                        }}
                      >
                        <Toggle
                          active={
                            !list.user_priorities.length ||
                            list.user_priorities?.[0]?.is_active
                          }
                        />
                      </button>
                    </div>
                  </div>
                  <div className={myListStyles.listCardDivider} />
                  <div className={myListStyles.listCardMeta}>
                    <div className={myListStyles.listCardMetaItem}>
                      <span className={myListStyles.listCardMetaLabel}>
                        Priority:
                      </span>
                      <span className={myListStyles.listCardMetaValue}>
                        {list.priority}
                      </span>
                    </div>
                    <div className={myListStyles.listCardMetaItem}>
                      <span className={myListStyles.listCardMetaLabel}>
                        Total Lead:
                      </span>
                      <span className={myListStyles.listCardMetaValue}>
                        {list.total_leads}
                      </span>
                    </div>
                    <div className={myListStyles.listCardMetaItem}>
                      <span className={myListStyles.listCardMetaLabel}>
                        Assigned Diallers
                      </span>
                      <span className={myListStyles.listCardMetaValue}>
                        {list.assigned_diallers}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {isFetchingNextPage && (
                <div className="flex justify-center py-2">
                  <Loader2Icon className="size-5 animate-spin text-gray-400" />
                </div>
              )}
            </InfiniteScroll>
          </div>
        </div>

        {/* Table panel */}
        <div className={myListStyles.tablePanel}>
          <div className={myListStyles.toolbar}>
            <TextInput
              setValue={(v) => {
                setLeadSearch(v);
                setLeadsPage(1);
              }}
              value={leadSearch}
              startIcon={<SearchIcon className="size-5 text-gray-500" />}
              placeholder="Search..."
              className="h-9 w-full md:w-84 text-base"
            />
            <div className={myListStyles.toolbarRight}>
              <Select
                value={statusFilter}
                onValueChange={(v) => {
                  setStatusFilter(v ?? "All Status");
                  setLeadsPage(1);
                }}
              >
                <SelectTrigger className="h-9 text-sm text-gray-800 border-zinc-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent
                  align="end"
                  className="rounded-lg border border-border bg-input py-2 shadow-[0_18px_40px_rgba(15,23,42,0.1)]"
                >
                  {leadStatusOptions.map((opt) => (
                    <SelectItem
                      key={opt}
                      value={opt}
                      className="rounded-none px-3 py-2 text-sm text-text-primary"
                    >
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <DateRangeSelector
                triggerClassName="h-9 text-sm text-gray-800 border-zinc-200"
                value={{
                  startDate: startDate ? new Date(startDate) : null,
                  endDate: endDate ? new Date(endDate) : null
                }}
                setValue={(range) => {
                  setStartDate(
                    range.startDate
                      ? range.startDate.toISOString().slice(0, 10)
                      : ""
                  );
                  setEndDate(
                    range.endDate
                      ? range.endDate.toISOString().slice(0, 10)
                      : ""
                  );
                  setLeadsPage(1);
                }}
              />
            </div>
          </div>

          {leadsLoading ? (
            <div className="flex flex-1 items-center justify-center py-20">
              <Loader2Icon className="size-8 animate-spin text-gray-400" />
            </div>
          ) : (
            <div className={myListStyles.tableWrap}>
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 border-b border-zinc-200 hover:bg-gray-50">
                    <TableHead className={myListStyles.tableHead}>
                      Name
                    </TableHead>
                    <TableHead className={myListStyles.tableHead}>
                      Lead Status
                    </TableHead>
                    <TableHead className={myListStyles.tableHead}>
                      Assigned Rep
                    </TableHead>
                    <TableHead className={myListStyles.tableHead}>
                      Last Disposition
                    </TableHead>
                    <TableHead className={myListStyles.tableHead}>
                      Attempt
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id} className={myListStyles.row}>
                      <TableCell className="pl-4 py-3.5">
                        <div className="text-sm font-medium text-gray-800 leading-5">
                          {lead.first_name} {lead.last_name}
                        </div>
                        <div className="text-sm text-gray-500 leading-5">
                          {lead.phone}
                        </div>
                      </TableCell>
                      <TableCell className={myListStyles.cell}>
                        <LeadStatusBadge status={getLeadStatus(lead)} />
                      </TableCell>
                      <TableCell className={myListStyles.cell}>
                        <div className="text-sm text-gray-800 leading-5">
                          {lead.lead_activities?.[0]?.assigned_user
                            ? lead.lead_activities?.[0]?.assigned_user
                                ?.first_name +
                              " " +
                              lead.lead_activities?.[0]?.assigned_user
                                ?.last_name
                            : "-"}
                        </div>
                      </TableCell>
                      <TableCell className={myListStyles.cell}>
                        <div className="text-sm text-gray-800 leading-5 capitalize">
                          {lead.lead_activities?.[0]?.last_disposition_type
                            ? lead.lead_activities?.[0]?.last_disposition_type?.replaceAll(
                                "_",
                                " "
                              )
                            : "- "}
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-3.5 text-center text-sm font-medium text-gray-800 leading-5">
                        {lead.lead_activities?.[0]?.attempt_count}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          <TablePagination
            from={
              leadsMeta && leadsMeta.total > 0
                ? (leadsPage - 1) * leadsLimit + 1
                : 0
            }
            to={
              leadsMeta ? Math.min(leadsPage * leadsLimit, leadsMeta.total) : 0
            }
            total={leadsMeta?.total ?? 0}
            limit={leadsLimit}
            onLimitChange={(l) => {
              setLeadsLimit(l);
              setLeadsPage(1);
            }}
            prevDisabled={leadsPage <= 1}
            nextDisabled={!leadsMeta?.hasNextPage}
            onPrev={() => setLeadsPage((p) => p - 1)}
            onNext={() => setLeadsPage((p) => p + 1)}
            className={myListStyles.pagination}
          />
        </div>
      </div>

      <FocusModeDialog
        open={focusModeDialogOpen}
        onOpenChange={setFocusModeDialogOpen}
        onConfirm={handleFocusMode}
      />

      <ResumeAllListsDialog
        open={resumeAllDialogOpen}
        onOpenChange={setResumeAllDialogOpen}
        onConfirm={handleResumeAll}
      />

      <ActivateListDialog
        open={activateListDialog.open}
        onOpenChange={(open) =>
          setActivateListDialog((prev) => ({ ...prev, open }))
        }
        listName={activateListDialog.list?.name ?? ""}
        onConfirm={handleActivateConfirm}
      />
    </>
  );
};

export default MyListComponent;
