"use client";

import { SearchIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { callHistoryStyles } from "@/features/dialer/styles/dialerStyles";

type CallHistoryFiltersProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  statusValue: string;
  onStatusChange: (value: string) => void;
};

const CallHistoryFilters = ({
  searchValue,
  onSearchChange,
  statusValue,
  onStatusChange,
}: CallHistoryFiltersProps) => {
  return (
    <div className={callHistoryStyles.toolbar}>
      <label className={callHistoryStyles.searchField}>
        <SearchIcon className="size-6 text-[#6B7A99]" />
        <input
          type="text"
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          className={callHistoryStyles.searchInput}
          placeholder="Search by name, phone number"
        />
      </label>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <Select
          value={statusValue}
          onValueChange={(value) => onStatusChange(value ?? "All Status")}
        >
          <SelectTrigger className={callHistoryStyles.filterTrigger}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-[1rem] border border-border bg-white p-2 shadow-[0_18px_40px_rgba(15,23,42,0.1)]">
            {["All Status", "No Answer", "Connected", "Callback", "Not Interested", "Wrong Number"].map((option) => (
              <SelectItem key={option} value={option} className="rounded-xl px-4 py-3 text-base text-text-primary">
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CallHistoryFilters;
