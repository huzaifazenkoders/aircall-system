"use client";

import React from "react";
import { SearchIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { callLogsStyles } from "@/features/call-logs/styles/callLogsStyles";
import TextInput from "@/components/ui/text-input";

type StatusOption = { label: string; value: string };

type CallLogFiltersProps = {
  selectedList: string;
  onListChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  statusOptions: StatusOption[];
};

const CallLogFilters = ({
  selectedList,
  onListChange,
  selectedStatus,
  onStatusChange,
  statusOptions,
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
      </div>
    </div>
  );
};

export default CallLogFilters;
