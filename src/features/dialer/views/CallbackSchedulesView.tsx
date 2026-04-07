"use client";

import React from "react";

import CallbackScheduleDetailsDialog from "@/features/dialer/components/CallbackScheduleDetailsDialog";
import CallbackSchedulesEmptyState from "@/features/dialer/components/CallbackSchedulesEmptyState";
import CallbackSchedulesFilters from "@/features/dialer/components/CallbackSchedulesFilters";
import CallbackSchedulesTable from "@/features/dialer/components/CallbackSchedulesTable";
import {
  callbackScheduleRows,
  type CallbackScheduleRecord,
} from "@/features/dialer/data/dialerData";
import { callbackStyles, dialerShellStyles } from "@/features/dialer/styles/dialerStyles";

const CallbackSchedulesView = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const [statusValue, setStatusValue] = React.useState("All Status");
  const [selectedRecord, setSelectedRecord] = React.useState<CallbackScheduleRecord | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const filteredRows = React.useMemo(() => {
    const query = searchValue.trim().toLowerCase();

    return callbackScheduleRows.filter((row) => {
      const matchesSearch =
        !query ||
        [row.leadName, row.phone, row.list, row.scheduledTime]
          .join(" ")
          .toLowerCase()
          .includes(query);
      const matchesStatus =
        statusValue === "All Status" || row.currentStatus === statusValue;

      return matchesSearch && matchesStatus;
    });
  }, [searchValue, statusValue]);

  return (
    <>
      <div className={dialerShellStyles.titleRow}>
        <h1 className={dialerShellStyles.title}>Callback Schedule</h1>
        <div className="opacity-0 w-28 h-11" />
      </div>

      <section className={callbackStyles.card}>
        <CallbackSchedulesFilters
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          statusValue={statusValue}
          onStatusChange={setStatusValue}
        />

        {filteredRows.length > 0 ? (
          <CallbackSchedulesTable
            rows={filteredRows}
            onSelect={(row) => {
              setSelectedRecord(row);
              setDialogOpen(true);
            }}
          />
        ) : (
          <CallbackSchedulesEmptyState />
        )}
      </section>

      <CallbackScheduleDetailsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        record={selectedRecord}
      />
    </>
  );
};

export default CallbackSchedulesView;

