"use client";

import { ArrowRightIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { callbackStyles } from "@/features/dialer/styles/dialerStyles";
import { LeadActivity } from "@/features/dialer/types/leadActivityTypes";

const LIMIT = 10;

const CallbackSchedulesTable = ({
  rows,
  page,
  total,
  totalPages,
  onPageChange,
  onSelect,
}: {
  rows: LeadActivity[];
  page: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onSelect: (row: LeadActivity) => void;
}) => {
  const from = total === 0 ? 0 : (page - 1) * LIMIT + 1;
  const to = Math.min(page * LIMIT, total);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 border-b border-zinc-200 hover:bg-gray-50">
            <TableHead className={callbackStyles.tableHead}>Lead Name</TableHead>
            <TableHead className={callbackStyles.tableHead}>Phone</TableHead>
            <TableHead className={callbackStyles.tableHead}>List</TableHead>
            <TableHead className={callbackStyles.tableHead}>Scheduled Time</TableHead>
            <TableHead className="w-20 pl-9 pr-4 py-4 text-sm font-medium text-gray-500 leading-4 opacity-0">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} className={callbackStyles.row} onClick={() => onSelect(row)}>
              <TableCell className="flex-1 self-stretch pl-4 text-sm text-gray-800 leading-5">
                {row.lead ? `${row.lead.first_name} ${row.lead.last_name}` : row.lead_id}
              </TableCell>
              <TableCell className="flex-1 pl-4 text-sm text-gray-800 leading-5">
                {row.lead?.phone ?? "—"}
              </TableCell>
              <TableCell className={callbackStyles.cell}>{row.list?.name ?? "—"}</TableCell>
              <TableCell className={callbackStyles.cell}>
                {row.scheduled_at ? new Date(row.scheduled_at).toLocaleString() : "—"}
              </TableCell>
              <TableCell className={callbackStyles.arrowCell}>
                <Button
                  variant="ghost"
                  size="icon"
                  className={callbackStyles.arrowButton}
                  onClick={(e) => { e.stopPropagation(); onSelect(row); }}
                >
                  <ArrowRightIcon className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className={callbackStyles.pagination}>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 leading-5">Rows per page:</span>
          <span className="flex items-center gap-2 text-xs text-gray-800 leading-5">
            {LIMIT}
            <ChevronDownIcon className="size-4 text-gray-500" />
          </span>
        </div>
        <span className="text-xs text-gray-800 leading-5">{from}-{to} of {total}</span>
        <div className="flex items-start">
          <Button
            variant="ghost"
            size="icon"
            className="p-2 rounded-lg"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            <ChevronLeftIcon className="size-6 text-gray-500" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="p-2 rounded-lg"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            <ChevronRightIcon className="size-6 text-gray-500" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default CallbackSchedulesTable;
