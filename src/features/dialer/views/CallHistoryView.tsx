"use client";

import React from "react";
import { CalendarDaysIcon, CalendarIcon } from "lucide-react";

import CallHistoryDetailsSheet from "@/features/dialer/components/CallHistoryDetailsSheet";
import CallHistoryEmptyState from "@/features/dialer/components/CallHistoryEmptyState";
import CallHistoryFilters from "@/features/dialer/components/CallHistoryFilters";
import CallHistoryStats from "@/features/dialer/components/CallHistoryStats";
import CallHistoryTable from "@/features/dialer/components/CallHistoryTable";
import {
  callHistoryRows,
  type CallHistoryRecord
} from "@/features/dialer/data/dialerData";
import {
  callHistoryStyles,
  dialerShellStyles
} from "@/features/dialer/styles/dialerStyles";
import DateSelector from "@/components/custom/date-selector.component";
import {
  DropdownMenu,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const CallHistoryView = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const [statusValue, setStatusValue] = React.useState("All Status");
  const [selectedRecord, setSelectedRecord] =
    React.useState<CallHistoryRecord | null>(null);
  const [sheetOpen, setSheetOpen] = React.useState(false);

  const filteredRows = React.useMemo(() => {
    const query = searchValue.trim().toLowerCase();

    return callHistoryRows.filter((row) => {
      const matchesSearch =
        !query ||
        [row.leadName, row.phone, row.list, row.callTime]
          .join(" ")
          .toLowerCase()
          .includes(query);
      const matchesStatus =
        statusValue === "All Status" || row.disposition === statusValue;

      return matchesSearch && matchesStatus;
    });
  }, [searchValue, statusValue]);
  const isDefaultState =
    searchValue.trim() === "" && statusValue === "All Status";
  const shouldShowEmptyStateOnly =
    filteredRows.length === 0 && isDefaultState;

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

      <section className={callHistoryStyles.tableCard}>
        {shouldShowEmptyStateOnly ? (
          <CallHistoryEmptyState />
        ) : (
          <>
            <CallHistoryFilters
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              statusValue={statusValue}
              onStatusChange={setStatusValue}
            />

            {filteredRows.length > 0 ? (
              <CallHistoryTable
                rows={filteredRows}
                onSelect={(row) => {
                  setSelectedRecord(row);
                  setSheetOpen(true);
                }}
              />
            ) : (
              <CallHistoryEmptyState />
            )}
          </>
        )}
      </section>

      <CallHistoryDetailsSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        record={selectedRecord}
      />
    </>
  );
};

export default CallHistoryView;
