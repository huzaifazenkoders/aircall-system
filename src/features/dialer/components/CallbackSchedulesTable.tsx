"use client";

import { ArrowRightIcon } from "lucide-react";
import TablePagination from "@/components/ui/table-pagination";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { callbackStyles } from "@/features/dialer/styles/dialerStyles";
import { LeadActivity } from "@/features/dialer/types/leadActivityTypes";

const CallbackSchedulesTable = ({
  rows,
  page,
  limit,
  total,
  totalPages,
  onPageChange,
  onLimitChange,
  onSelect
}: {
  rows: LeadActivity[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onSelect: (row: LeadActivity) => void;
}) => {
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 border-b border-zinc-200 hover:bg-gray-50">
            <TableHead className={callbackStyles.tableHead}>
              Lead Name
            </TableHead>
            <TableHead className={callbackStyles.tableHead}>Phone</TableHead>
            <TableHead className={callbackStyles.tableHead}>List</TableHead>
            <TableHead className={callbackStyles.tableHead}>
              Scheduled Time
            </TableHead>
            <TableHead className="w-20 pl-9 pr-4 py-4 text-sm font-medium text-gray-500 leading-4 opacity-0">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => {
            const leadName =
              row.lead_name ||
              (row.lead
                ? `${row.lead.first_name} ${row.lead.last_name}`
                : undefined);
            const leadPhone = row.lead_phone || row.lead?.phone;
            const listName = row.list_name || row.list?.name;
            const scheduledTime = row.scheduled_time || row.scheduled_at;

            return (
              <TableRow
                key={row.id}
                className={callbackStyles.row}
                onClick={() => onSelect(row)}
              >
                <TableCell className="flex-1 self-stretch pl-4 text-sm text-gray-800 leading-5">
                  {leadName ?? "N/A"}
                </TableCell>
                <TableCell className="flex-1 pl-4 text-sm text-gray-800 leading-5">
                  {leadPhone ?? "N/A"}
                </TableCell>
                <TableCell className={callbackStyles.cell}>
                  {listName ?? "N/A"}
                </TableCell>
                <TableCell className={callbackStyles.cell}>
                  {scheduledTime
                    ? new Date(scheduledTime).toLocaleString()
                    : "N/A"}
                </TableCell>
                <TableCell className={callbackStyles.arrowCell}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={callbackStyles.arrowButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(row);
                    }}
                  >
                    <ArrowRightIcon className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
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
        className={callbackStyles.pagination}
      />
    </>
  );
};

export default CallbackSchedulesTable;
