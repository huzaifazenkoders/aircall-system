"use client";

import React from "react";
import { ArrowRightIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type CallLog } from "@/features/call-logs/data/callLogsData";
import { callLogsStyles } from "@/features/call-logs/styles/callLogsStyles";

const dispositionVariantMap = {
  Connected: "connected",
  Callback: "callback",
  "No Answer": "no-answer",
  "Not Interested": "not-interested",
  "Wrong Number": "wrong-number",
} as const;

type CallLogsTableProps = {
  rows: CallLog[];
  onRowSelect: (callLog: CallLog) => void;
};

const CallLogsTable = ({ rows, onRowSelect }: CallLogsTableProps) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className={callLogsStyles.tableHead}>Lead Name</TableHead>
            <TableHead className={callLogsStyles.tableHead}>Phone</TableHead>
            <TableHead className={callLogsStyles.tableHead}>
              Representative
            </TableHead>
            <TableHead className={callLogsStyles.tableHead}>List</TableHead>
            <TableHead className={callLogsStyles.tableHead}>Call Time</TableHead>
            <TableHead className={callLogsStyles.tableHead}>Disposition</TableHead>
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
              <TableCell className={callLogsStyles.cell}>{row.leadName}</TableCell>
              <TableCell className={callLogsStyles.cell}>{row.phone}</TableCell>
              <TableCell className={callLogsStyles.cell}>
                {row.representative}
              </TableCell>
              <TableCell className={callLogsStyles.cell}>{row.list}</TableCell>
              <TableCell className={callLogsStyles.cell}>{row.callTime}</TableCell>
              <TableCell
                className={cn(callLogsStyles.cell, callLogsStyles.dispositionCell)}
              >
                <Badge
                  variant={dispositionVariantMap[row.disposition]}
                  className={callLogsStyles.dispositionBadge}
                >
                  {row.disposition}
                </Badge>
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
                  <ArrowRightIcon className="size-8 stroke-[1.8]" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className={callLogsStyles.pagination}>
        <div className="flex items-center gap-2">
          <span className={callLogsStyles.paginationText}>Rows per page:</span>
          <button type="button" className="flex items-center gap-2 text-[16px] text-text-primary">
            10
            <ChevronDownIcon className="size-4 text-panel-muted" />
          </button>
        </div>

        <div className="flex items-center gap-10">
          <span className={callLogsStyles.paginationText}>1-5 of 13</span>
          <div className={callLogsStyles.paginationActions}>
            <Button variant="ghost" size="icon" className={callLogsStyles.paginationButton}>
              <ChevronLeftIcon className="size-6" />
            </Button>
            <Button variant="ghost" size="icon" className={callLogsStyles.paginationButton}>
              <ChevronRightIcon className="size-6" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CallLogsTable;
