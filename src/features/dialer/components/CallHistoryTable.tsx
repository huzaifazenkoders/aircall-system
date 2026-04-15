"use client";

import { ArrowRightIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MyCallLog } from "@/features/dialer/types/leadActivityTypes";
import { callHistoryStyles } from "@/features/dialer/styles/dialerStyles";

const callStatusVariantMap: Record<string, string> = {
  completed: "connected",
  failed: "not-interested",
  no_answer: "no-answer",
};

const callStatusLabelMap: Record<string, string> = {
  completed: "Completed",
  failed: "Failed",
  no_answer: "No Answer",
};

const CallHistoryTable = ({
  rows,
  onSelect,
  page,
  limit,
  total,
  totalPages,
  onPageChange,
}: {
  rows: MyCallLog[];
  onSelect: (row: MyCallLog) => void;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 border-b border-zinc-200 hover:bg-gray-50">
            <TableHead className={callHistoryStyles.tableHead}>Lead Name</TableHead>
            <TableHead className={callHistoryStyles.tableHead}>Phone</TableHead>
            <TableHead className={callHistoryStyles.tableHead}>List</TableHead>
            <TableHead className="w-40 p-4 text-sm font-medium text-gray-500 leading-4">Duration</TableHead>
            <TableHead className={callHistoryStyles.tableHead}>Call Time</TableHead>
            <TableHead className="pl-2 pr-4 py-4 text-sm font-medium text-gray-500 leading-4">Disposition</TableHead>
            <TableHead className="w-20 pl-9 pr-4 py-4 text-sm font-medium text-gray-500 leading-4 opacity-0">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} className={callHistoryStyles.row} onClick={() => onSelect(row)}>
              <TableCell className="flex-1 pl-4 text-sm text-gray-800 leading-5">
                {row.lead ? `${row.lead.first_name} ${row.lead.last_name}` : "—"}
              </TableCell>
              <TableCell className="flex-1 pl-4 text-sm text-gray-800 leading-5">{row.lead?.phone ?? "—"}</TableCell>
              <TableCell className={callHistoryStyles.cell}>{row.list?.name ?? "—"}</TableCell>
              <TableCell className="w-40 px-4 py-3.5 text-sm text-gray-800 leading-5">{row.duration}</TableCell>
              <TableCell className={callHistoryStyles.cell}>{row.created_at}</TableCell>
              <TableCell className="flex-1 pl-2 pr-4 py-3.5">
                <Badge variant={callStatusVariantMap[row.call_status] as never} className={callHistoryStyles.statusBadge}>
                  {callStatusLabelMap[row.call_status] ?? row.call_status}
                </Badge>
              </TableCell>
              <TableCell className={callHistoryStyles.arrowCell}>
                <Button
                  variant="ghost"
                  size="icon"
                  className={callHistoryStyles.arrowButton}
                  onClick={(event) => {
                    event.stopPropagation();
                    onSelect(row);
                  }}
                >
                  <ArrowRightIcon className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className={callHistoryStyles.pagination}>
        <div className="flex items-center gap-2">
          <span className={callHistoryStyles.paginationText}>Rows per page:</span>
          <button type="button" className="flex items-center gap-2 text-xs text-gray-800 leading-5">
            {limit}
            <ChevronDownIcon className="size-4 text-gray-500" />
          </button>
        </div>
        <span className="text-xs text-gray-800 leading-5">
          {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of {total}
        </span>
        <div className="flex items-start">
          <Button variant="ghost" size="icon" className={callHistoryStyles.paginationButton} onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
            <ChevronLeftIcon className="size-6" />
          </Button>
          <Button variant="ghost" size="icon" className={callHistoryStyles.paginationButton} onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>
            <ChevronRightIcon className="size-6" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default CallHistoryTable;

