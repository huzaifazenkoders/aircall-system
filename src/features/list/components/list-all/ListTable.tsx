"use client";

import React from "react";
import {
  SearchIcon,
  MoreVerticalIcon,
  CalendarIcon,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { listStyles } from "@/features/list/styles/listStyles";

type ListRow = {
  id: string;
  name: string;
  priority: number;
  cooldownHours: number;
  inCooldown: number;
  availableToCall: number;
  total: number | "-";
  assignedTo: string;
  status: "Active" | "Waiting" | "Inactive";
};

const rows: ListRow[] = [
  {
    id: "101",
    name: "Gold Cost Event",
    priority: 1,
    cooldownHours: 19,
    inCooldown: 1,
    availableToCall: 19,
    total: 40,
    assignedTo: "Group-1",
    status: "Active"
  },
  {
    id: "102",
    name: "Masterclass Follow-Up",
    priority: 2,
    cooldownHours: 24,
    inCooldown: 2,
    availableToCall: 24,
    total: 0,
    assignedTo: "4 Individuals",
    status: "Waiting"
  },
  {
    id: "103",
    name: "COD New Registrations",
    priority: 3,
    cooldownHours: 16,
    inCooldown: 3,
    availableToCall: 16,
    total: 56,
    assignedTo: "Team Beta",
    status: "Inactive"
  },
  {
    id: "104",
    name: "RMS Replay Follow-Up",
    priority: 4,
    cooldownHours: 0,
    inCooldown: 0,
    availableToCall: 0,
    total: "-",
    assignedTo: "Team Alpha",
    status: "Waiting"
  },
  {
    id: "105",
    name: "Live Event Brisbane",
    priority: 5,
    cooldownHours: 16,
    inCooldown: 5,
    availableToCall: 16,
    total: 45,
    assignedTo: "Team Beta",
    status: "Active"
  }
];

const ListTable = () => {
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) => r.name.toLowerCase().includes(q) || r.id.includes(q)
    );
  }, [query]);

  return (
    <div className={listStyles.card}>
      <Tabs defaultValue="shared" className="w-full">
        <div className={listStyles.cardHeader}>
          <TabsList className={cn("bg-transparent p-0", listStyles.tabsWrap)}>
            <TabsTrigger
              value="shared"
              className={cn(listStyles.tabTrigger, listStyles.tabUnderline)}
            >
              Shared List{" "}
              <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-foreground">
                40
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="idv"
              className={cn(listStyles.tabTrigger, listStyles.tabUnderline)}
            >
              IDV List{" "}
              <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-foreground">
                11
              </span>
            </TabsTrigger>
          </TabsList>
        </div>

        <div className={listStyles.toolbar}>
          <TextInput
            id="listSearch"
            placeholder="Search..."
            value={query}
            setValue={setQuery}
            startIcon={
              <SearchIcon
                className="size-5 text-muted-foreground"
                aria-hidden="true"
              />
            }
            className="bg-background"
          />

          <Button variant="outline" className={listStyles.dateBtn}>
            <span>Date</span>
            <CalendarIcon
              className="ml-2 size-4 text-muted-foreground"
              aria-hidden="true"
            />
          </Button>
        </div>

        <TabsContent value="shared" className="m-0">
          <div className={listStyles.tableWrap}>
            <Table>
              <TableHeader>
                <TableRow className="bg-background">
                  <TableHead className="w-20">ID</TableHead>
                  <TableHead className="min-w-60">Name</TableHead>
                  <TableHead className="w-24">Priority</TableHead>
                  <TableHead className="w-36">Cooldown (hrs)</TableHead>
                  <TableHead className="w-32">In Cooldown</TableHead>
                  <TableHead className="w-32">Avail to Call</TableHead>
                  <TableHead className="w-24">Total</TableHead>
                  <TableHead className="min-w-40">Assigned To</TableHead>
                  <TableHead className="w-32">Status</TableHead>
                  <TableHead className="w-14" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow key={r.id} className="h-14">
                    <TableCell className="font-medium text-foreground">
                      {r.id}
                    </TableCell>
                    <TableCell className="text-foreground">
                      <Link
                        href={`/list/${r.id}`}
                        className="font-medium text-foreground hover:underline"
                      >
                        {r.name}
                      </Link>
                    </TableCell>
                    <TableCell>{r.priority}</TableCell>
                    <TableCell>{r.cooldownHours}</TableCell>
                    <TableCell>{r.inCooldown}</TableCell>
                    <TableCell>{r.availableToCall}</TableCell>
                    <TableCell>{r.total}</TableCell>
                    <TableCell>{r.assignedTo}</TableCell>
                    <TableCell>
                      <StatusBadge status={r.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          className={cn(
                            buttonVariants({
                              variant: "outline",
                              size: "icon",
                              className: "size-10 rounded-xl"
                            })
                          )}
                        >
                          <MoreVerticalIcon
                            className="size-5"
                            aria-hidden="true"
                          />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-36">
                          <DropdownMenuItem>
                            <Link href={`/list/${r.id}`} className="w-full">
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-end gap-5 px-6 py-4 text-sm text-muted-foreground">
            <span>Rows per page: 10</span>
            <span className="text-foreground">1-5 of 13</span>
            <button
              type="button"
              className="grid size-9 place-items-center rounded-lg hover:bg-muted"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              className="grid size-9 place-items-center rounded-lg hover:bg-muted"
            >
              <ChevronRight />
            </button>
          </div>
        </TabsContent>

        <TabsContent value="idv" className="m-0">
          <div className="px-6 py-10 text-sm text-muted-foreground">
            No IDV lists to show.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const StatusBadge = ({ status }: { status: ListRow["status"] }) => {
  const classes =
    status === "Active"
      ? "bg-status-active-bg text-status-active-fg"
      : status === "Waiting"
        ? "bg-status-waiting-bg text-status-waiting-fg"
        : "bg-muted text-muted-foreground";

  return (
    <Badge className={cn("rounded-lg px-3 py-1 text-xs font-medium", classes)}>
      {status}
    </Badge>
  );
};

export default ListTable;
