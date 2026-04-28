"use client";

import { SearchIcon } from "lucide-react";

import DateRangeSelector from "@/components/ui/date-range-selector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import TextInput from "@/components/ui/text-input";
import { callbackStyles } from "@/features/dialer/styles/dialerStyles";

const CallbackSchedulesFilters = ({
  searchValue,
  onSearchChange,
  statusValue,
  onStatusChange,
  startDate,
  endDate,
  onDateChange
}: {
  searchValue: string;
  onSearchChange: (value: string) => void;
  statusValue: string;
  onStatusChange: (value: string) => void;
  startDate: string;
  endDate: string;
  onDateChange: (startDate: string, endDate: string) => void;
}) => {
  return (
    <div className={callbackStyles.toolbar}>
      <TextInput
        value={searchValue}
        setValue={onSearchChange}
        startIcon={<SearchIcon className="size-5 text-gray-500 mr-2" />}
        placeholder="Search by name, phone number"
        className="w-full md:w-125"
      />
      <div className={callbackStyles.toolbarRight}>
        <Select
          value={statusValue}
          onValueChange={(value) => onStatusChange(value ?? "All Status")}
        >
          <SelectTrigger className={callbackStyles.filterTrigger}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent
            align="end"
            className="rounded-lg border border-border bg-input py-2 shadow-[0_18px_40px_rgba(15,23,42,0.1)]"
          >
            {["All Status", "Cooldown", "Callback"].map((option) => (
              <SelectItem
                key={option}
                value={option}
                className="rounded-none px-3 py-2 text-sm text-text-primary"
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="">
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
    </div>
  );
};

export default CallbackSchedulesFilters;
