"use client";

import React from "react";
import { SearchIcon } from "lucide-react";

import DateRangeSelector from "@/components/ui/date-range-selector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { callLogsStyles } from "@/features/call-logs/styles/callLogsStyles";
import TextInput from "@/components/ui/text-input";

type StatusOption = { label: string; value: string };

type CallLogFiltersProps = {
  selectedList: string;
  onListChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string | null) => void;
  statusOptions: StatusOption[];
  startDate: string;
  endDate: string;
  onDateChange: (startDate: string, endDate: string) => void;
};

const CallLogFilters = ({
  selectedStatus,
  onStatusChange,
  statusOptions,
  startDate,
  endDate,
  onDateChange
}: CallLogFiltersProps) => {
  return (
    <div className={callLogsStyles.toolbar}>
      <TextInput
        setValue={() => {}}
        startIcon={
          <SearchIcon className="size-5 text-[#667085]" aria-hidden="true" />
        }
        placeholder="Search by name, phone number, or lead ID"
        className="max-w-[500px]"
      />
      <div className={callLogsStyles.filterRow}>
        <Select value={selectedStatus} onValueChange={onStatusChange}>
          <SelectTrigger className={callLogsStyles.filterTrigger}>
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent className={callLogsStyles.selectContent} align="end">
            {statusOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className={callLogsStyles.selectItem}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DateRangeSelector
          value={{
            startDate: startDate ? new Date(startDate) : null,
            endDate: endDate ? new Date(endDate) : null
          }}
          setValue={(range) => {
            onDateChange(
              range.startDate ? range.startDate.toISOString().slice(0, 10) : "",
              range.endDate ? range.endDate.toISOString().slice(0, 10) : ""
            );
          }}
        />
      </div>
    </div>
  );
};

export default CallLogFilters;
