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
import { type CallbackScheduleRecord } from "@/features/dialer/data/dialerData";
import { callbackStyles } from "@/features/dialer/styles/dialerStyles";

const CallbackSchedulesTable = ({
  rows,
  onSelect,
}: {
  rows: CallbackScheduleRecord[];
  onSelect: (row: CallbackScheduleRecord) => void;
}) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className={callbackStyles.tableHead}>Lead Name</TableHead>
            <TableHead className={callbackStyles.tableHead}>Phone</TableHead>
            <TableHead className={callbackStyles.tableHead}>List</TableHead>
            <TableHead className={callbackStyles.tableHead}>Scheduled Time</TableHead>
            <TableHead className={callbackStyles.tableHead} />
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} className={callbackStyles.row} onClick={() => onSelect(row)}>
              <TableCell className={callbackStyles.cell}>{row.leadName}</TableCell>
              <TableCell className={callbackStyles.cell}>{row.phone}</TableCell>
              <TableCell className={callbackStyles.cell}>{row.list}</TableCell>
              <TableCell className={callbackStyles.cell}>{row.scheduledTime}</TableCell>
              <TableCell className={callbackStyles.arrowCell}>
                <Button
                  variant="ghost"
                  size="icon"
                  className={callbackStyles.arrowButton}
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

      <div className={callbackStyles.pagination}>
        <div className="flex items-center gap-2">
          <span className="text-base">Rows per page:</span>
          <button type="button" className="flex items-center gap-2 text-base text-text-primary">
            10
            <ChevronDownIcon className="size-4 text-[#6B7A99]" />
          </button>
        </div>

        <div className="flex items-center gap-8">
          <span className="text-base">1-5 of 13</span>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="grid size-9 place-items-center rounded-full text-[#6B7A99] hover:bg-muted">
              <ChevronLeftIcon className="size-5" />
            </Button>
            <Button variant="ghost" size="icon" className="grid size-9 place-items-center rounded-full text-[#6B7A99] hover:bg-muted">
              <ChevronRightIcon className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CallbackSchedulesTable;

