"use client";

import React from "react";

import CallLogDetailsDialog from "@/features/call-logs/components/CallLogDetailsDialog";
import CallLogFilters from "@/features/call-logs/components/CallLogFilters";
import CallLogsEmptyState from "@/features/call-logs/components/CallLogsEmptyState";
import CallLogsTable from "@/features/call-logs/components/CallLogsTable";
import {
  callLogDateRangeOptions,
  callLogListOptions,
  callLogStatusOptions,
  callLogsData,
  type CallLog
} from "@/features/call-logs/data/callLogsData";
import { callLogsStyles } from "@/features/call-logs/styles/callLogsStyles";

const CallLogsView = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const [selectedList, setSelectedList] = React.useState("All Lists");
  const [selectedStatus, setSelectedStatus] = React.useState("All Status");
  const [selectedDateRange, setSelectedDateRange] = React.useState("all");
  const [selectedCallLog, setSelectedCallLog] = React.useState<CallLog | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const filteredRows = React.useMemo(() => {
    const query = searchValue.trim().toLowerCase();

    return callLogsData.filter((row) => {
      const matchesQuery =
        !query ||
        [row.leadName, row.phone, row.list, row.representative, row.id]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesList =
        selectedList === "All Lists" || row.list === selectedList;
      const matchesStatus =
        selectedStatus === "All Status" || row.disposition === selectedStatus;
      const matchesDateRange =
        selectedDateRange === "all" || row.dateRangeValue === selectedDateRange;

      return matchesQuery && matchesList && matchesStatus && matchesDateRange;
    });
  }, [searchValue, selectedList, selectedStatus, selectedDateRange]);

  return (
    <div className={callLogsStyles.page}>
      <h1 className={callLogsStyles.title}>Call Logs</h1>

      <section className={callLogsStyles.card}>
        <CallLogFilters
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          selectedList={selectedList}
          onListChange={setSelectedList}
          listOptions={callLogListOptions}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          statusOptions={callLogStatusOptions}
          selectedDateRange={selectedDateRange}
          onDateRangeChange={setSelectedDateRange}
          dateRangeOptions={callLogDateRangeOptions}
        />

        {filteredRows.length > 0 ? (
          <CallLogsTable
            rows={filteredRows}
            onRowSelect={(callLog) => {
              setSelectedCallLog(callLog);
              setIsDialogOpen(true);
            }}
          />
        ) : (
          <CallLogsEmptyState />
        )}
      </section>

      <CallLogDetailsDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        callLog={selectedCallLog}
      />
    </div>
  );
};

export default CallLogsView;
