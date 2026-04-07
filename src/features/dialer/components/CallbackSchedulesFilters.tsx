"use client";

import { CalendarDaysIcon, SearchIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { callbackStyles } from "@/features/dialer/styles/dialerStyles";
import TextInput from "@/components/ui/text-input";
import DateRangeSelector from "@/components/ui/date-range-selector";

const CallbackSchedulesFilters = ({
  searchValue,
  onSearchChange,
  statusValue,
  onStatusChange
}: {
  searchValue: string;
  onSearchChange: (value: string) => void;
  statusValue: string;
  onStatusChange: (value: string) => void;
}) => {
  return (
    <div className={callbackStyles.toolbar}>
      <TextInput
        setValue={() => {}}
        startIcon={<SearchIcon className="size-5 text-gray-500 mr-2" />}
        placeholder="Search by name, phone number"
        className="w-[500px]"
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
          <DateRangeSelector />
        </div>
      </div>
    </div>
  );
};

export default CallbackSchedulesFilters;
