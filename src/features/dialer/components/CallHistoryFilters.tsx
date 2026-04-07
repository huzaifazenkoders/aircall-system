"use client";

import { SearchIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { callHistoryStyles } from "@/features/dialer/styles/dialerStyles";
import TextInput from "@/components/ui/text-input";

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
  onStatusChange
}: CallHistoryFiltersProps) => {
  return (
    <div className={callHistoryStyles.toolbar}>
      <TextInput
        value={searchValue}
        setValue={onSearchChange}
        placeholder="Search by name, phone number"
        className="md:w-[500px]"
        startIcon={<SearchIcon className="size-5 text-text-secondary" />}
      />

      <div className="flex flex-1 items-center justify-end gap-4">
        <Select
          value={statusValue}
          onValueChange={(value) => onStatusChange(value ?? "All Status")}
        >
          <SelectTrigger className={callHistoryStyles.filterTrigger}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent
            align="end"
            className="rounded-lg border border-border bg-input py-2 shadow-[0_18px_40px_rgba(15,23,42,0.1)]"
          >
            {[
              "All Status",
              "No Answer",
              "Connected",
              "Callback",
              "Not Interested",
              "Wrong Number"
            ].map((option) => (
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
      </div>
    </div>
  );
};

export default CallHistoryFilters;
