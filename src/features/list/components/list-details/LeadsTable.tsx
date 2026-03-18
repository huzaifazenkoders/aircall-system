"use client";

import Link from "next/link";
import React from "react";
import { CalendarIcon, MoreVerticalIcon, SearchIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TextInput from "@/components/ui/text-input";
import { cn } from "@/lib/utils";
import { listDetailsStyles } from "@/features/list/styles/listDetailsStyles";

type LeadRow = {
  leadId: string;
  name: string;
  phone: string;
  status: "Pending" | "Cooldown" | "Completed" | "Scheduled" | "Invalid" | "Ban Contact";
  assignedRep: string;
  lastDisposition: string;
  attempt: number;
};

const leads: LeadRow[] = [
  { leadId: "201", name: "Sarah Mitchell", phone: "+61 412 778 992", status: "Pending", assignedRep: "-", lastDisposition: "-", attempt: 0 },
  { leadId: "202", name: "Liam Johnson", phone: "+61 423 665 210", status: "Cooldown", assignedRep: "Olivia Smith", lastDisposition: "No Answer", attempt: 2 },
  { leadId: "203", name: "Emma Williams", phone: "+61 411 334 887", status: "Completed", assignedRep: "Daniel Harris", lastDisposition: "Connected", attempt: 1 },
  { leadId: "204", name: "Noah Brown", phone: "+61 433 556 199", status: "Scheduled", assignedRep: "Michael Tan", lastDisposition: "Callback", attempt: 1 },
  { leadId: "205", name: "Olivia Taylor", phone: "+61 455 999 113", status: "Invalid", assignedRep: "Ryan Cooper", lastDisposition: "Wrong Number", attempt: 1 },
  { leadId: "206", name: "Charlotte Anderson", phone: "+61 489 445 221", status: "Ban Contact", assignedRep: "Daniel Harris", lastDisposition: "Ban Contact", attempt: 1 },
];

const LeadsTable = ({ listId }: { listId: string }) => {
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return leads;
    return leads.filter((l) => l.name.toLowerCase().includes(q) || l.phone.includes(q));
  }, [query]);

  return (
    <div className={listDetailsStyles.leadTableWrap}>
      <div className={listDetailsStyles.leadToolbar}>
        <div className={listDetailsStyles.searchWrap}>
          <TextInput
            id="leadSearch"
            placeholder="Search..."
            value={query}
            setValue={setQuery}
            startIcon={
              <SearchIcon
                className="size-5 text-muted-foreground"
                aria-hidden="true"
              />
            }
            className="h-10 rounded-xl border-input bg-background px-4 py-2 text-sm shadow-none"
          />
        </div>

        <div className={listDetailsStyles.leadFilters}>
          <button
            type="button"
            className={cn(listDetailsStyles.filterTrigger, "flex items-center gap-2")}
          >
            All Status
            <svg viewBox="0 0 20 20" className="size-4 text-muted-foreground" aria-hidden="true">
              <path d="M5.5 7.5 10 12l4.5-4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <Button variant="outline" className={cn(listDetailsStyles.filterTrigger, "flex items-center gap-2")}>
            Date Range
            <CalendarIcon className="size-4 text-muted-foreground" aria-hidden="true" />
          </Button>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-56">Name</TableHead>
              <TableHead className="w-40">Lead Status</TableHead>
              <TableHead className="min-w-44">Assigned Rep</TableHead>
              <TableHead className="min-w-52">Last Disposition</TableHead>
              <TableHead className="w-24 text-right">Attempt</TableHead>
              <TableHead className="w-14" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((l) => (
              <TableRow key={l.leadId} className="h-16">
                <TableCell>
                  <Link
                    href={`/list/${listId}/${l.leadId}`}
                    className="block outline-none"
                  >
                    <div className="font-semibold text-foreground">{l.name}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{l.phone}</div>
                  </Link>
                </TableCell>
                <TableCell>
                  <LeadStatusBadge status={l.status} />
                </TableCell>
                <TableCell className="text-foreground">{l.assignedRep}</TableCell>
                <TableCell>
                  <div className="font-medium text-foreground">{l.lastDisposition}</div>
                  <div className="mt-1 text-sm text-muted-foreground">02/21/2026</div>
                </TableCell>
                <TableCell className="text-right font-medium text-foreground">
                  {l.attempt}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className={cn(
                        buttonVariants({
                          variant: "outline",
                          size: "icon",
                          className: "size-10 rounded-xl",
                        })
                      )}
                    >
                      <MoreVerticalIcon className="size-5" aria-hidden="true" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem>View Lead</DropdownMenuItem>
                      <DropdownMenuItem>Move Lead</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const LeadStatusBadge = ({ status }: { status: LeadRow["status"] }) => {
  const classes =
    status === "Pending"
      ? "bg-status-pending-bg text-status-pending-fg"
      : status === "Cooldown"
      ? "bg-status-cooldown-bg text-status-cooldown-fg"
      : status === "Completed"
      ? "bg-status-completed-bg text-status-completed-fg"
      : status === "Scheduled"
      ? "bg-status-scheduled-bg text-status-scheduled-fg"
      : status === "Invalid"
      ? "bg-status-invalid-bg text-status-invalid-fg"
      : "bg-status-ban-bg text-status-ban-fg";

  return (
    <Badge className={cn("rounded-lg px-3 py-1 text-xs font-medium", classes)}>
      {status}
    </Badge>
  );
};

export default LeadsTable;
