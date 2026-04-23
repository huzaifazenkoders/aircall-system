"use client";

import React from "react";
import { CalendarIcon, Loader2Icon } from "lucide-react";
import { useDebounce } from "use-debounce";

import CallHistoryDetailsSheet from "@/features/dialer/components/CallHistoryDetailsSheet";
import CallHistoryEmptyState from "@/features/dialer/components/CallHistoryEmptyState";
import CallHistoryFilters from "@/features/dialer/components/CallHistoryFilters";
import CallHistoryStats from "@/features/dialer/components/CallHistoryStats";
import CallHistoryTable from "@/features/dialer/components/CallHistoryTable";
import {
  callHistoryStyles,
  dialerShellStyles
} from "@/features/dialer/styles/dialerStyles";
import { useGetMyCallLogs } from "@/features/dialer/services/leadActivityService";
import { MyCallStatus } from "@/features/dialer/types/leadActivityTypes";
import DateSelector from "@/components/custom/date-selector.component";
import {
  DropdownMenu,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const CallHistoryView = () => {
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [searchValue, setSearchValue] = React.useState("");
  const [debouncedSearch] = useDebounce(searchValue, 400);
  const [statusValue, setStatusValue] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState<string | undefined>();
  const [selectedId, setSelectedId] = React.useState("");
  const [sheetOpen, setSheetOpen] = React.useState(false);

  const { data, isPending, isError } = useGetMyCallLogs({
    page,
    limit,
    search: debouncedSearch || undefined,
    call_status: (statusValue as MyCallStatus) || undefined,
    date: selectedDate
  });

  const rows = data?.data?.data ?? [];
  const meta = data?.data?.meta;
  const isDefaultState = !debouncedSearch && !statusValue && !selectedDate;
  const shouldShowEmptyStateOnly =
    !isPending && !isError && rows.length === 0 && isDefaultState;

  return (
    <>
      <div className={dialerShellStyles.titleRow}>
        <h1 className={dialerShellStyles.title}>Call History</h1>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline-transparent">
              <span>Date</span>
              <CalendarIcon
                className="ml-2 size-4 text-muted-foreground"
                aria-hidden="true"
              />
            </Button>
          </DropdownMenuTrigger>
          <DateSelector
            setValue={(date) =>
              setSelectedDate(date.toISOString().split("T")[0])
            }
          />
        </DropdownMenu>
      </div>

      <CallHistoryStats myStats={data?.data?.my_stats} isPending={isPending} />

      <>
        {shouldShowEmptyStateOnly ? (
          <CallHistoryEmptyState />
        ) : (
          <section className={callHistoryStyles.tableCard}>
            <CallHistoryFilters
              searchValue={searchValue}
              onSearchChange={(val) => {
                setSearchValue(val);
                setPage(1);
              }}
              statusValue={statusValue || "All"}
              onStatusChange={(val) => {
                setStatusValue(val === "All" ? "" : val);
                setPage(1);
              }}
            />

            {isPending ? (
              <div className="flex min-h-100 items-center justify-center">
                <Loader2Icon className="size-8 animate-spin text-panel-muted" />
              </div>
            ) : isError || rows.length === 0 ? (
              <CallHistoryEmptyState />
            ) : (
              <CallHistoryTable
                rows={rows}
                page={page}
                limit={limit}
                total={meta?.total ?? 0}
                totalPages={meta?.totalPages ?? 1}
                onPageChange={setPage}
                onLimitChange={(l) => { setLimit(l); setPage(1); }}
                onSelect={(row) => {
                  setSelectedId(row.id);
                  setSheetOpen(true);
                }}
              />
            )}
          </section>
        )}
      </>

      {sheetOpen && (
        <CallHistoryDetailsSheet
          open={sheetOpen}
          onOpenChange={(open) => {
            setSheetOpen(open);
            if (!open) setSelectedId("");
          }}
          id={selectedId}
        />
      )}
    </>
  );
};

export default CallHistoryView;
