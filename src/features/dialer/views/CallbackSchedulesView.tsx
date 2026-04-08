"use client";

import React from "react";
import { Loader2Icon } from "lucide-react";

import CallbackScheduleDetailsDialog from "@/features/dialer/components/CallbackScheduleDetailsDialog";
import CallbackSchedulesEmptyState from "@/features/dialer/components/CallbackSchedulesEmptyState";
import CallbackSchedulesFilters from "@/features/dialer/components/CallbackSchedulesFilters";
import CallbackSchedulesTable from "@/features/dialer/components/CallbackSchedulesTable";
import { callbackStyles, dialerShellStyles } from "@/features/dialer/styles/dialerStyles";
import { useGetScheduledCooldown } from "@/features/dialer/services/leadActivityService";
import { LeadActivityStatus } from "@/features/dialer/types/leadActivityTypes";

const LIMIT = 10;

const statusMap: Record<string, LeadActivityStatus | undefined> = {
  "All Status": undefined,
  Scheduled: "scheduled",
  Cooldown: "cooldown",
};

const CallbackSchedulesView = () => {
  const [page, setPage] = React.useState(1);
  const [statusValue, setStatusValue] = React.useState("All Status");
  const [selectedActivityId, setSelectedActivityId] = React.useState("");
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const { data, isPending, isError } = useGetScheduledCooldown({
    page,
    limit: LIMIT,
    status: statusMap[statusValue],
  });

  const rows = data?.data?.data ?? [];
  const meta = data?.data?.meta;

  return (
    <>
      <div className={dialerShellStyles.titleRow}>
        <h1 className={dialerShellStyles.title}>Callback Schedule</h1>
        <div className="opacity-0 w-28 h-11" />
      </div>

      <section className={callbackStyles.card}>
        <CallbackSchedulesFilters
          searchValue=""
          onSearchChange={() => {}}
          statusValue={statusValue}
          onStatusChange={(val) => { setStatusValue(val); setPage(1); }}
        />

        {isPending ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <Loader2Icon className="size-8 animate-spin text-gray-400" />
          </div>
        ) : isError || rows.length === 0 ? (
          <CallbackSchedulesEmptyState />
        ) : (
          <CallbackSchedulesTable
            rows={rows}
            page={page}
            total={meta?.total ?? 0}
            totalPages={meta?.totalPages ?? 1}
            onPageChange={setPage}
            onSelect={(row) => {
              setSelectedActivityId(row.id);
              setDialogOpen(true);
            }}
          />
        )}
      </section>

      <CallbackScheduleDetailsDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setSelectedActivityId("");
        }}
        activityId={selectedActivityId}
      />
    </>
  );
};

export default CallbackSchedulesView;
