"use client";

import React from "react";
import { CalendarIcon, Loader2Icon } from "lucide-react";

import CallHistoryDetailsSheet from "@/features/dialer/components/CallHistoryDetailsSheet";
import CallHistoryEmptyState from "@/features/dialer/components/CallHistoryEmptyState";
import CallHistoryFilters from "@/features/dialer/components/CallHistoryFilters";
import CallHistoryStats from "@/features/dialer/components/CallHistoryStats";
import CallHistoryTable from "@/features/dialer/components/CallHistoryTable";
import {
  callHistoryStyles,
  dialerShellStyles
} from "@/features/dialer/styles/dialerStyles";
import {
  useGetMyCallLogs,
  useGetMyCallLogDetail
} from "@/features/dialer/services/leadActivityService";
import { MyCallStatus } from "@/features/dialer/types/leadActivityTypes";
import DateSelector from "@/components/custom/date-selector.component";
import {
  DropdownMenu,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const LIMIT = 10;

const CallHistoryView = () => {
  const [page, setPage] = React.useState(1);
  const [searchValue, setSearchValue] = React.useState("");
  const [statusValue, setStatusValue] = React.useState("");
  const [selectedId, setSelectedId] = React.useState("");
  const [sheetOpen, setSheetOpen] = React.useState(false);

  const { data, isPending, isError } = useGetMyCallLogs({
    page,
    limit: LIMIT,
    call_status: (statusValue as MyCallStatus) || undefined
  });

  const { data: detailData, isPending: isDetailPending } =
    useGetMyCallLogDetail(selectedId);

  const rows = data?.data?.data ?? [];
  const meta = data?.data?.meta;
  const isDefaultState = !statusValue;
  const shouldShowEmptyStateOnly =
    !isPending && !isError && rows.length === 0 && isDefaultState;

  return (
    <>
      <div className={dialerShellStyles.titleRow}>
        <h1 className={dialerShellStyles.title}>Call History</h1>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline-transparent">
                <span>Date</span>
                <CalendarIcon
                  className="ml-2 size-4 text-muted-foreground"
                  aria-hidden="true"
                />
              </Button>
            }
          />
          <DateSelector />
        </DropdownMenu>
      </div>

      <CallHistoryStats />

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
              <div className="flex min-h-[400px] items-center justify-center">
                <Loader2Icon className="size-8 animate-spin text-panel-muted" />
              </div>
            ) : isError || rows.length === 0 ? (
              <CallHistoryEmptyState />
            ) : (
              <CallHistoryTable
                rows={rows}
                page={page}
                limit={LIMIT}
                total={meta?.total ?? 0}
                totalPages={meta?.totalPages ?? 1}
                onPageChange={setPage}
                onSelect={(row) => {
                  setSelectedId(row.id);
                  setSheetOpen(true);
                }}
              />
            )}
          </section>
        )}
      </>

      <CallHistoryDetailsSheet
        open={sheetOpen}
        onOpenChange={(open) => {
          setSheetOpen(open);
          if (!open) setSelectedId("");
        }}
        record={detailData?.data ?? null}
        isLoading={isDetailPending}
      />
    </>
  );
};

export default CallHistoryView;
