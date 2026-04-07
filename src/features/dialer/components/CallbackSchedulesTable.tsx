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
          <TableRow className="bg-gray-50 border-b border-zinc-200 hover:bg-gray-50">
            <TableHead className={callbackStyles.tableHead}>Lead Owner</TableHead>
            <TableHead className={callbackStyles.tableHead}>Phone</TableHead>
            <TableHead className={callbackStyles.tableHead}>List</TableHead>
            <TableHead className={callbackStyles.tableHead}>Scheduled Time</TableHead>
            <TableHead className="w-20 pl-9 pr-4 py-4 text-sm font-medium text-gray-500 leading-4 opacity-0">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} className={callbackStyles.row} onClick={() => onSelect(row)}>
              <TableCell className="flex-1 self-stretch pl-4 text-sm text-gray-800 leading-5">{row.leadName}</TableCell>
              <TableCell className="flex-1 pl-4 text-sm text-gray-800 leading-5">{row.phone}</TableCell>
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
          <button type="button" className="flex items-center gap-2 text-xs text-gray-800 leading-5">
            10
            <ChevronDownIcon className="size-4 text-gray-500" />
          </button>
        </div>
        <span className="text-xs text-gray-800 leading-5">1-5 of 13</span>
        <div className="flex items-start">
          <Button variant="ghost" size="icon" className="p-2 rounded-lg">
            <ChevronLeftIcon className="size-6 text-gray-500" />
          </Button>
          <Button variant="ghost" size="icon" className="p-2 rounded-lg">
            <ChevronRightIcon className="size-6 text-gray-500" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default CallbackSchedulesTable;

