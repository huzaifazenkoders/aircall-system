"use client";

import React from "react";
import { CalendarDaysIcon, SearchIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { callLogsStyles } from "@/features/call-logs/styles/callLogsStyles";

type CallLogFiltersProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedList: string;
  onListChange: (value: string) => void;
  listOptions: string[];
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  statusOptions: string[];
  selectedDateRange: string;
  onDateRangeChange: (value: string) => void;
  dateRangeOptions: Array<{ label: string; value: string }>;
};

const CallLogFilters = ({
  searchValue,
  onSearchChange,
  selectedList,
  onListChange,
  listOptions,
  selectedStatus,
  onStatusChange,
  statusOptions,
  selectedDateRange,
  onDateRangeChange,
  dateRangeOptions,
}: CallLogFiltersProps) => {
  return (
    <div className={callLogsStyles.toolbar}>
      <label className={callLogsStyles.searchField}>
        <SearchIcon className="size-7 text-[#667085]" aria-hidden="true" />
        <input
          type="text"
          className={callLogsStyles.searchInput}
          placeholder="Search by name, phone number, or lead ID"
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <div className={callLogsStyles.filterRow}>
        <Select value={selectedList} onValueChange={onListChange}>
          <SelectTrigger className={callLogsStyles.filterTrigger}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className={callLogsStyles.selectContent} align="end">
            {listOptions.map((option) => (
              <SelectItem
                key={option}
                value={option}
                className={callLogsStyles.selectItem}
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={onStatusChange}>
          <SelectTrigger className={callLogsStyles.filterTrigger}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className={callLogsStyles.selectContent} align="end">
            {statusOptions.map((option) => (
              <SelectItem
                key={option}
                value={option}
                className={callLogsStyles.selectItem}
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedDateRange} onValueChange={onDateRangeChange}>
          <SelectTrigger
            className={cn(callLogsStyles.filterTrigger, callLogsStyles.dateTrigger)}
          >
            <SelectValue />
            <CalendarDaysIcon className="ml-3 size-5 text-text-primary" />
          </SelectTrigger>
          <SelectContent className={callLogsStyles.selectContent} align="end">
            {dateRangeOptions.map((option) => (
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
      </div>
    </div>
  );
};

export default CallLogFilters;
