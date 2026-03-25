"use client";

import { CalendarDaysIcon, SearchIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { callbackStyles } from "@/features/dialer/styles/dialerStyles";

const CallbackSchedulesFilters = ({
  searchValue,
  onSearchChange,
  statusValue,
  onStatusChange,
}: {
  searchValue: string;
  onSearchChange: (value: string) => void;
  statusValue: string;
  onStatusChange: (value: string) => void;
}) => {
  return (
    <div className={callbackStyles.toolbar}>
      <label className={callbackStyles.searchField}>
        <SearchIcon className="size-6 text-[#6B7A99]" />
        <input
          type="text"
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          className={callbackStyles.searchInput}
          placeholder="Search by name, phone number"
        />
      </label>

      <div className={callbackStyles.toolbarRight}>
        <Select
          value={statusValue}
          onValueChange={(value) => onStatusChange(value ?? "All Status")}
        >
          <SelectTrigger className={callbackStyles.filterTrigger}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-[1rem] border border-border bg-white p-2 shadow-[0_18px_40px_rgba(15,23,42,0.1)]">
            {["All Status", "Cooldown", "Callback"].map((option) => (
              <SelectItem key={option} value={option} className="rounded-xl px-4 py-3 text-base text-text-primary">
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <button type="button" className="inline-flex h-11 items-center gap-3 rounded-[0.875rem] border border-border bg-white px-4 text-lg text-text-primary shadow-xs">
          Date Range
          <CalendarDaysIcon className="size-5" />
        </button>
      </div>
    </div>
  );
};

export default CallbackSchedulesFilters;
