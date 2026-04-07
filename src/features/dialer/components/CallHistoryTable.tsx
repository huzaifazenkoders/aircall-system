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
import { type CallHistoryRecord } from "@/features/dialer/data/dialerData";
import { callHistoryStyles } from "@/features/dialer/styles/dialerStyles";

const dispositionVariantMap = {
  Connected: "connected",
  Callback: "callback",
  "No Answer": "no-answer",
  "Not Interested": "not-interested",
  "Wrong Number": "wrong-number",
} as const;

const CallHistoryTable = ({
  rows,
  onSelect,
}: {
  rows: CallHistoryRecord[];
  onSelect: (row: CallHistoryRecord) => void;
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
              <TableCell className="flex-1 pl-4 text-sm text-gray-800 leading-5">{row.leadName}</TableCell>
              <TableCell className="flex-1 pl-4 text-sm text-gray-800 leading-5">{row.phone}</TableCell>
              <TableCell className={callHistoryStyles.cell}>{row.list}</TableCell>
              <TableCell className="w-40 px-4 py-3.5 text-sm text-gray-800 leading-5">{row.duration}</TableCell>
              <TableCell className={callHistoryStyles.cell}>{row.callTime}</TableCell>
              <TableCell className="flex-1 pl-2 pr-4 py-3.5">
                <Badge variant={dispositionVariantMap[row.disposition]} className={callHistoryStyles.statusBadge}>
                  {row.disposition}
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
            10
            <ChevronDownIcon className="size-4 text-gray-500" />
          </button>
        </div>
        <span className="text-xs text-gray-800 leading-5">1-5 of 13</span>
        <div className="flex items-start">
          <Button variant="ghost" size="icon" className={callHistoryStyles.paginationButton}>
            <ChevronLeftIcon className="size-6" />
          </Button>
          <Button variant="ghost" size="icon" className={callHistoryStyles.paginationButton}>
            <ChevronRightIcon className="size-6" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default CallHistoryTable;

