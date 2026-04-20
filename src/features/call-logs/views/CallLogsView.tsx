"use client";

import React from "react";
import { Loader2Icon } from "lucide-react";

import CallLogDetailsDialog from "@/features/call-logs/components/CallLogDetailsDialog";
import CallLogFilters from "@/features/call-logs/components/CallLogFilters";
import CallLogsEmptyState from "@/features/call-logs/components/CallLogsEmptyState";
import CallLogsTable from "@/features/call-logs/components/CallLogsTable";
import { callLogsStyles } from "@/features/call-logs/styles/callLogsStyles";
import {
  useGetCallLogById,
  useGetCallLogs
} from "@/features/call-logs/services/callLogService";
import { CallStatus } from "@/features/call-logs/types/callLogTypes";

const callLogStatusOptions = [
  { label: "All Status", value: "" },
  { label: "Completed", value: "completed" },
  { label: "Failed", value: "failed" },
  { label: "No Answer", value: "no_answer" }
];

const CallLogsView = () => {
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [selectedListId, setSelectedListId] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState("");
  const [selectedCallLogId, setSelectedCallLogId] = React.useState("");
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const { data, isPending, isError } = useGetCallLogs({
    page,
    limit,
    list_id: selectedListId || undefined,
    call_status: (selectedStatus as CallStatus) || undefined
  });

  const { data: detailData, isPending: isDetailPending } =
    useGetCallLogById(selectedCallLogId);

  const rows = data?.data?.data ?? [];
  const meta = data?.data?.meta;
  const isDefaultState = !selectedListId && !selectedStatus;
  const shouldShowEmptyStateOnly =
    !isPending && !isError && rows.length === 0 && isDefaultState;

  return (
    <div className={callLogsStyles.page}>
      <h1 className={callLogsStyles.title}>Call Logs</h1>

      <section className={callLogsStyles.card}>
        {shouldShowEmptyStateOnly ? (
          <CallLogsEmptyState />
        ) : (
          <>
            <CallLogFilters
              selectedStatus={selectedStatus}
              onStatusChange={(val) => {
                setSelectedStatus(val as string);
                setPage(1);
              }}
              statusOptions={callLogStatusOptions}
              selectedList={selectedListId}
              onListChange={(val) => {
                setSelectedListId(val);
                setPage(1);
              }}
            />

            {isPending ? (
              <div className="flex min-h-[400px] items-center justify-center">
                <Loader2Icon className="size-8 animate-spin text-panel-muted" />
              </div>
            ) : isError || rows.length === 0 ? (
              <CallLogsEmptyState />
            ) : (
              <CallLogsTable
                rows={rows}
                page={page}
                limit={limit}
                total={meta?.total ?? 0}
                totalPages={meta?.totalPages ?? 1}
                onPageChange={setPage}
                onLimitChange={(l) => { setLimit(l); setPage(1); }}
                onRowSelect={(callLog) => {
                  setSelectedCallLogId(callLog.id);
                  setIsDialogOpen(true);
                }}
              />
            )}
          </>
        )}
      </section>

      <CallLogDetailsDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setSelectedCallLogId("");
        }}
        callLog={detailData?.data ?? null}
        isLoading={isDetailPending}
      />
    </div>
  );
};

export default CallLogsView;
