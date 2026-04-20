"use client";

import { ArrowRightIcon } from "lucide-react";
import TablePagination from "@/components/ui/table-pagination";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { callHistoryStyles } from "@/features/dialer/styles/dialerStyles";
import { CallHistory } from "@/features/dialer/types/leadActivityTypes";
import moment from "moment";

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

const CallHistoryTable = ({
  rows,
  onSelect,
  page,
  limit,
  total,
  totalPages,
  onPageChange,
  onLimitChange
}: {
  rows: CallHistory[];
  onSelect: (row: CallHistory) => void;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}) => {
  return (
    <>
      <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 border-b border-zinc-200 hover:bg-gray-50">
            <TableHead className={callHistoryStyles.tableHead}>
              Lead Name
            </TableHead>
            <TableHead className={callHistoryStyles.tableHead}>Phone</TableHead>
            <TableHead className={callHistoryStyles.tableHead}>List</TableHead>
            <TableHead className="w-40 p-4 text-sm font-medium text-gray-500 leading-4">
              Duration
            </TableHead>
            <TableHead className={callHistoryStyles.tableHead}>
              Call Time
            </TableHead>
            <TableHead className="pl-2 pr-4 py-4 text-sm font-medium text-gray-500 leading-4">
              Disposition
            </TableHead>
            <TableHead className="w-20 pl-9 pr-4 py-4 text-sm font-medium text-gray-500 leading-4 opacity-0">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              className={callHistoryStyles.row}
              onClick={() => onSelect(row)}
            >
              <TableCell className="flex-1 pl-4 text-sm text-gray-800 leading-5">
                {row.lead_name}
              </TableCell>
              <TableCell className="flex-1 pl-4 text-sm text-gray-800 leading-5">
                {row.lead_phone ?? "—"}
              </TableCell>
              <TableCell className={callHistoryStyles.cell}>
                {row.list_name || row.user_name || "—"}
              </TableCell>
              <TableCell className="w-40 px-4 py-3.5 text-sm text-gray-800 leading-5">
                {"N/A"}
              </TableCell>
              <TableCell className={callHistoryStyles.cell}>
                {moment(row.call_time).format("dd MMM yyyy, hh:mm A")}
              </TableCell>
              <TableCell className="flex-1 pl-2 pr-4 py-3.5">
                <Badge
                  variant={row.resulting_lead_status as never}
                  className={callHistoryStyles.statusBadge}
                >
                  {row.resulting_lead_status}
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
      </div>

      <TablePagination
        from={total === 0 ? 0 : (page - 1) * limit + 1}
        to={Math.min(page * limit, total)}
        total={total}
        limit={limit}
        onLimitChange={onLimitChange}
        prevDisabled={page <= 1}
        nextDisabled={page >= totalPages}
        onPrev={() => onPageChange(page - 1)}
        onNext={() => onPageChange(page + 1)}
        className={callHistoryStyles.pagination}
      />
    </>
  );
};

export default CallHistoryTable;
