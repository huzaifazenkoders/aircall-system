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
import { cn } from "@/lib/utils";
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
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className={callHistoryStyles.tableHead}>Lead Name</TableHead>
            <TableHead className={callHistoryStyles.tableHead}>Phone</TableHead>
            <TableHead className={callHistoryStyles.tableHead}>List</TableHead>
            <TableHead className={callHistoryStyles.tableHead}>Duration</TableHead>
            <TableHead className={callHistoryStyles.tableHead}>Call Time</TableHead>
            <TableHead className={callHistoryStyles.tableHead}>Disposition</TableHead>
            <TableHead className={callHistoryStyles.tableHead} />
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} className={callHistoryStyles.row} onClick={() => onSelect(row)}>
              <TableCell className={callHistoryStyles.cell}>{row.leadName}</TableCell>
              <TableCell className={callHistoryStyles.cell}>{row.phone}</TableCell>
              <TableCell className={callHistoryStyles.cell}>{row.list}</TableCell>
              <TableCell className={callHistoryStyles.cell}>{row.duration}</TableCell>
              <TableCell className={callHistoryStyles.cell}>{row.callTime}</TableCell>
              <TableCell className={cn(callHistoryStyles.cell, "whitespace-nowrap")}>
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
                  <ArrowRightIcon className="size-7" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className={callHistoryStyles.pagination}>
        <div className="flex items-center gap-2">
          <span className={callHistoryStyles.paginationText}>Rows per page:</span>
          <button type="button" className="flex items-center gap-2 text-base text-text-primary">
            10
            <ChevronDownIcon className="size-4 text-[#6B7A99]" />
          </button>
        </div>

        <div className="flex items-center gap-8">
          <span className={callHistoryStyles.paginationText}>1-5 of 13</span>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className={callHistoryStyles.paginationButton}>
              <ChevronLeftIcon className="size-5" />
            </Button>
            <Button variant="ghost" size="icon" className={callHistoryStyles.paginationButton}>
              <ChevronRightIcon className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CallHistoryTable;

