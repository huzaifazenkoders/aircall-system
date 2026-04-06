"use client";

import React, { useState } from "react";
import {
  SearchIcon,
  MoreVerticalIcon,
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Loader2Icon
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
import DateSelector from "@/components/custom/date-selector.component";
import { useGetLists } from "@/features/list/services/listService";
import { transformInfiniteData } from "@/utils/infiniteQueryUtils";
import { List, ListStatus } from "@/features/list/types/listTypes";
import ListEmptyState from "./ListEmptyState";
import { ReactDispatch } from "@/types/common";

const LIMIT = 10;

const ListTable = ({
  setCreateOpen
}: {
  setCreateOpen: ReactDispatch<boolean>;
}) => {
  const [query, setQuery] = React.useState("");
  const [tabs, setTabs] = useState<"shared" | "idv">("shared");

  const sharedQuery = useGetLists({
    limit: LIMIT,
    search: query || undefined,
    list_type: "shared"
  });

  const idvQuery = useGetLists({
    limit: LIMIT,
    search: query || undefined,
    list_type: "individual"
  });

  const sharedLists = transformInfiniteData(sharedQuery.data, "data");
  const idvLists = transformInfiniteData(idvQuery.data, "data");

  const sharedTotal = sharedQuery.data?.pages[0]?.data?.meta?.total ?? 0;
  const idvTotal = idvQuery.data?.pages[0]?.data?.meta?.total ?? 0;

  const activeQuery = tabs === "shared" ? sharedQuery : idvQuery;
  const activeLists = tabs === "shared" ? sharedLists : idvLists;

  return (
    <div className={listStyles.card}>
      <Tabs
        className="w-full gap-0"
        value={tabs}
        onValueChange={(v) => setTabs(v as "shared" | "idv")}
      >
        <div className={listStyles.cardHeader}>
          <TabsList className={cn("bg-transparent p-0", listStyles.tabsWrap)}>
            <TabsTrigger
              value="shared"
              className={cn(
                listStyles.tabTrigger,
                tabs === "shared" ? "border-b-primary" : "border-b-transparent"
              )}
            >
              Shared List{" "}
              <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-foreground">
                {sharedTotal}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="idv"
              className={cn(
                listStyles.tabTrigger,
                tabs === "idv" ? "border-b-primary" : "border-b-transparent"
              )}
            >
              IDV List{" "}
              <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-foreground">
                {idvTotal}
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
            className="bg-transparent"
          />

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline" className={listStyles.dateBtn}>
                  <span>Date</span>
                  <CalendarIcon
                    className="ml-2 size-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                </Button>
              }
            />
            <DateSelector />
          </DropdownMenu>
        </div>

        {(["shared", "idv"] as const).map((tab) => {
          const lists = tab === "shared" ? sharedLists : idvLists;
          const q = tab === "shared" ? sharedQuery : idvQuery;
          const total = tab === "shared" ? sharedTotal : idvTotal;

          return (
            <TabsContent key={tab} value={tab} className="m-0">
              {q.isPending ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2Icon className="size-6 animate-spin text-muted-foreground" />
                </div>
              ) : q.isError ? (
                <div className="px-6 py-10 text-sm text-destructive">
                  Failed to load lists.
                </div>
              ) : lists.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="flex">
                    <ListEmptyState onCreate={() => setCreateOpen(true)} />
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  <div className={listStyles.tableWrap}>
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-background">
                          <TableHead className="min-w-60">ID</TableHead>
                          <TableHead className="min-w-60">Name</TableHead>
                          <TableHead className="w-24">Priority</TableHead>
                          <TableHead className="w-24">Total</TableHead>
                          <TableHead className="w-32">Status</TableHead>
                          <TableHead className="w-14" />
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {lists.map((r) => (
                          <ListRow key={r?.id} row={r!} />
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex items-center justify-end gap-5 px-6 py-4 text-sm text-muted-foreground">
                    <span>Rows per page: {LIMIT}</span>
                    <span className="text-foreground">
                      1-{lists.length} of {total}
                    </span>
                    <button
                      type="button"
                      className="grid size-9 place-items-center rounded-lg hover:bg-muted disabled:opacity-40"
                      disabled={!q.hasPreviousPage}
                    >
                      <ChevronLeft />
                    </button>
                    <button
                      type="button"
                      className="grid size-9 place-items-center rounded-lg hover:bg-muted disabled:opacity-40"
                      onClick={() => q.fetchNextPage()}
                      disabled={!q.hasNextPage || q.isFetchingNextPage}
                    >
                      {q.isFetchingNextPage ? (
                        <Loader2Icon className="size-4 animate-spin" />
                      ) : (
                        <ChevronRight />
                      )}
                    </button>
                  </div>
                </>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

const ListRow = ({ row }: { row: List }) => (
  <TableRow className="h-15.5">
    <TableCell className="font-medium text-foreground">{row.id}</TableCell>
    <TableCell className="text-foreground">
      <Link
        href={`/list/${row.id}`}
        className="font-medium text-foreground hover:underline"
      >
        {row.name}
      </Link>
    </TableCell>
    <TableCell>{row.priority}</TableCell>
    <TableCell>{row.total_leads ?? "-"}</TableCell>
    <TableCell>
      <StatusBadge status={row.status} />
    </TableCell>
    <TableCell className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            buttonVariants({
              variant: "outline-transparent",
              size: "icon",
              className: "size-10 rounded-xl"
            })
          )}
        >
          <MoreVerticalIcon className="size-5" aria-hidden="true" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36">
          <DropdownMenuItem>
            <Link href={`/list/${row.id}`} className="w-full">
              View
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  </TableRow>
);

const StatusBadge = ({ status }: { status: ListStatus }) => {
  const classes =
    status === "active"
      ? "bg-status-active-bg text-status-active-fg"
      : status === "waiting"
        ? "bg-status-waiting-bg text-status-waiting-fg"
        : "bg-muted text-muted-foreground";

  const label =
    status === "active"
      ? "Active"
      : status === "waiting"
        ? "Waiting"
        : "Inactive";

  return (
    <Badge
      className={cn("rounded-md px-4 py-1 h-auto text-sm font-medium", classes)}
    >
      {label}
    </Badge>
  );
};

export default ListTable;
