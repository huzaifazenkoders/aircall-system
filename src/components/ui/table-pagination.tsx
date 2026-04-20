"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const LIMIT_OPTIONS = [10, 20, 30] as const;

interface TablePaginationProps {
  from: number;
  to: number;
  total: number;
  limit: number;
  onLimitChange: (limit: number) => void;
  prevDisabled: boolean;
  nextDisabled: boolean;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}

const TablePagination = ({
  from,
  to,
  total,
  limit,
  onLimitChange,
  prevDisabled,
  nextDisabled,
  onPrev,
  onNext,
  className
}: TablePaginationProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-3 px-4 py-2",
        className
      )}
    >
      <div className="flex shrink-0 items-center gap-1.5">
        <span className="hidden whitespace-nowrap text-xs text-gray-500 sm:inline">
          Rows per page:
        </span>
        <Select
          value={String(limit)}
          onValueChange={(val) => onLimitChange(Number(val))}
        >
          <SelectTrigger className="h-7 w-14 rounded border-gray-200 px-2 text-xs text-gray-800 shadow-none focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="end" className="min-w-14 rounded-lg py-1">
            {LIMIT_OPTIONS.map((opt) => (
              <SelectItem key={opt} value={String(opt)} className="px-3 py-1 text-xs">
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <span className="shrink-0 whitespace-nowrap text-xs text-gray-800">
        {from}–{to} of {total}
      </span>

      <div className="flex shrink-0 items-center">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-7 rounded-lg"
          disabled={prevDisabled}
          onClick={onPrev}
        >
          <ChevronLeftIcon className="size-3.5" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-7 rounded-lg"
          disabled={nextDisabled}
          onClick={onNext}
        >
          <ChevronRightIcon className="size-3.5" />
        </Button>
      </div>
    </div>
  );
};

export default TablePagination;
