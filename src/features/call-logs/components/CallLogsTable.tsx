"use client";

import React from "react";
import {
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "lucide-react";

import { DispositionBadge } from "@/features/workflows/components/DispositionBadge";
import { DispositionType } from "@/features/workflows/types/workflowTypes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type CallLog } from "@/features/call-logs/types/callLogTypes";
import { callLogsStyles } from "@/features/call-logs/styles/callLogsStyles";

const callStatusVariantMap: Record<string, string> = {
  completed: "connected",
  failed: "not-interested",
  no_answer: "no-answer"
};

const callStatusLabelMap: Record<string, string> = {
  completed: "Completed",
  failed: "Failed",
  no_answer: "No Answer"
};

type CallLogsTableProps = {
  rows: CallLog[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onRowSelect: (callLog: CallLog) => void;
};

const CallLogsTable = ({
  rows,
  page,
  limit,
  total,
  totalPages,
  onPageChange,
  onRowSelect
}: CallLogsTableProps) => {
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className={callLogsStyles.tableHead}>
              Lead Name
            </TableHead>
            <TableHead className={callLogsStyles.tableHead}>Phone</TableHead>
            <TableHead className={callLogsStyles.tableHead}>
              Representative
            </TableHead>
            <TableHead className={callLogsStyles.tableHead}>List</TableHead>
            <TableHead className={callLogsStyles.tableHead}>
              Call Time
            </TableHead>
            <TableHead className={callLogsStyles.tableHead}>
              Disposition
            </TableHead>
            <TableHead className={cn(callLogsStyles.tableHead, "w-16")} />
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              className={callLogsStyles.row}
              onClick={() => onRowSelect(row)}
            >
              <TableCell className={callLogsStyles.cell}>
                {`${row.lead_name}`}
              </TableCell>
              <TableCell className={callLogsStyles.cell}>
                {row.lead_phone ?? "—"}
              </TableCell>
              <TableCell className={callLogsStyles.cell}>
                {row.user_name || "—"}
              </TableCell>
              <TableCell className={callLogsStyles.cell}>
                {row.list_name ?? "—"}
              </TableCell>
              <TableCell className={callLogsStyles.cell}>
                {new Date(row.call_time).toLocaleString()}
              </TableCell>
              <TableCell
                className={cn(
                  callLogsStyles.cell,
                  callLogsStyles.dispositionCell
                )}
              >
                <DispositionBadge
                  type={row.disposition_type as DispositionType}
                />
              </TableCell>
              <TableCell className={cn(callLogsStyles.cell, "py-4 pr-4")}>
                <Button
                  variant="ghost"
                  size="icon"
                  className={callLogsStyles.arrowButton}
                  onClick={(event) => {
                    event.stopPropagation();
                    onRowSelect(row);
                  }}
                >
                  <ArrowRightIcon className="size-5 stroke-[1.8]" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className={callLogsStyles.pagination}>
        <div className="flex items-center gap-2">
          <span className={callLogsStyles.paginationText}>Rows per page:</span>
          <button
            type="button"
            className="flex items-center gap-2 text-[16px] text-text-primary"
          >
            10
            <ChevronDownIcon className="size-4 text-panel-muted" />
          </button>
        </div>

        <div className="flex items-center gap-10">
          <span className={callLogsStyles.paginationText}>
            {from}-{to} of {total}
          </span>
          <div className={callLogsStyles.paginationActions}>
            <Button
              variant="ghost"
              size="icon"
              className={callLogsStyles.paginationButton}
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
            >
              <ChevronLeftIcon className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={callLogsStyles.paginationButton}
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
            >
              <ChevronRightIcon className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CallLogsTable;
