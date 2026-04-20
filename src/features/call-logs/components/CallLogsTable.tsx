"use client";

import TablePagination from "@/components/ui/table-pagination";
import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { callLogsStyles } from "@/features/call-logs/styles/callLogsStyles";
import { type CallLog } from "@/features/call-logs/types/callLogTypes";
import { DispositionBadge } from "@/features/workflows/components/DispositionBadge";
import { DispositionType } from "@/features/workflows/types/workflowTypes";
import { cn } from "@/lib/utils";

type CallLogsTableProps = {
  rows: CallLog[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onRowSelect: (callLog: CallLog) => void;
};

const CallLogsTable = ({
  rows,
  page,
  limit,
  total,
  totalPages,
  onPageChange,
  onLimitChange,
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

      <TablePagination
        from={from}
        to={to}
        total={total}
        limit={limit}
        onLimitChange={onLimitChange}
        prevDisabled={page <= 1}
        nextDisabled={page >= totalPages}
        onPrev={() => onPageChange(page - 1)}
        onNext={() => onPageChange(page + 1)}
        className={callLogsStyles.pagination}
      />
    </>
  );
};

export default CallLogsTable;
