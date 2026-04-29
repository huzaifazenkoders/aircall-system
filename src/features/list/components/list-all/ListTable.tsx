"use client";

import TablePagination from "@/components/ui/table-pagination";
import { Loader2Icon, MoreVerticalIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import DateRangeSelector from "@/components/ui/date-range-selector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TextInput from "@/components/ui/text-input";
import {
  useGetListById,
  useGetLists
} from "@/features/list/services/listService";
import { listStyles } from "@/features/list/styles/listStyles";
import { List, ListDetail, ListStatus } from "@/features/list/types/listTypes";
import { cn } from "@/lib/utils";
import { ReactDispatch } from "@/types/common";
import { transformInfiniteData } from "@/utils/infiniteQueryUtils";
import moment from "moment";
import ListEmptyState from "./ListEmptyState";

const ListTable = ({
  setCreateOpen,
  setEditList
}: {
  setCreateOpen: ReactDispatch<boolean>;
  setEditList: ReactDispatch<ListDetail | null>;
}) => {
  const [query, setQuery] = React.useState("");
  const [limit, setLimit] = React.useState(10);
  const [tabs, setTabs] = useState<"shared" | "idv">("shared");
  const [dateRange, setDateRange] = React.useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({ startDate: null, endDate: null });

  const startDateStr = dateRange.startDate
    ? moment(dateRange.startDate).format("YYYY-MM-DD")
    : undefined;
  const endDateStr = dateRange.endDate
    ? moment(dateRange.endDate).format("YYYY-MM-DD")
    : undefined;

  const sharedQuery = useGetLists({
    limit,
    search: query || undefined,
    list_type: "shared",
    startDate: startDateStr,
    endDate: endDateStr
  });

  const idvQuery = useGetLists({
    limit,
    search: query || undefined,
    list_type: "individual",
    startDate: startDateStr,
    endDate: endDateStr
  });

  const sharedLists = transformInfiniteData(sharedQuery.data, "data");
  const idvLists = transformInfiniteData(idvQuery.data, "data");

  const sharedTotal = sharedQuery.data?.pages[0]?.data?.meta?.total ?? 0;
  const idvTotal = idvQuery.data?.pages[0]?.data?.meta?.total ?? 0;

  const isDefaultState =
    query.trim() === "" && !dateRange.startDate && !dateRange.endDate;
  const hasAnyLists = sharedLists.length > 0 || idvLists.length > 0;
  const shouldShowEmptyStateOnly =
    isDefaultState &&
    !sharedQuery.isPending &&
    !idvQuery.isPending &&
    !sharedQuery.isError &&
    !idvQuery.isError &&
    !hasAnyLists;

  if (shouldShowEmptyStateOnly) {
    return (
      <div className={listStyles.card}>
        <div className="flex items-center justify-center py-16">
          <ListEmptyState onCreate={() => setCreateOpen(true)} />
        </div>
      </div>
    );
  }

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
            className="bg-transparent md:w-100"
          />

          <DateRangeSelector
            value={dateRange}
            setValue={setDateRange}
            placeholder="Date"
            triggerClassName="w-full md:w-fit"
          />
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
                <div className="flex items-center justify-center py-16">
                  <ListEmptyState onCreate={() => setCreateOpen(true)} />
                </div>
              ) : (
                <>
                  <div className={listStyles.tableWrap}>
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-background">
                          <TableHead className="min-w-60">ID</TableHead>
                          <TableHead className="min-w-60">Name</TableHead>
                          {tab === "shared" && (
                            <TableHead className="w-24">Priority</TableHead>
                          )}
                          <TableHead className="w-32">Cooldown (hrs)</TableHead>
                          <TableHead className="w-24">In Cooldown</TableHead>
                          <TableHead className="w-24">Avail to Call</TableHead>
                          <TableHead className="w-24">Total</TableHead>
                          <TableHead className="min-w-40">
                            Assigned To
                          </TableHead>
                          <TableHead className="w-32">Status</TableHead>
                          <TableHead className="w-14" />
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {lists.map((r) => (
                          <ListRow
                            key={r?.id}
                            row={r!}
                            setEditList={setEditList}
                            tab={tab}
                          />
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <TablePagination
                    from={1}
                    to={lists.length}
                    total={total}
                    limit={limit}
                    onLimitChange={(l) => setLimit(l)}
                    prevDisabled={!q.hasPreviousPage}
                    nextDisabled={!q.hasNextPage || q.isFetchingNextPage}
                    onPrev={() => {}}
                    onNext={() => q.fetchNextPage()}
                  />
                </>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

const ListRow = ({
  row,
  setEditList,
  tab
}: {
  row: List;
  setEditList: ReactDispatch<ListDetail | null>;
  tab: string;
}) => {
  const [fetchEdit, setFetchEdit] = React.useState(false);
  const { data, isFetching } = useGetListById(fetchEdit ? row.id : "");

  React.useEffect(() => {
    if (data?.data && fetchEdit) {
      setEditList(data.data);
      setFetchEdit(false);
    }
  }, [data, fetchEdit, setEditList]);

  const assignedToLabel =
    row.assign_type === "individual"
      ? `${row.assignments.length} Individuals`
      : row.assignments?.[0]?.group?.name;
  const groupId =
    row.assign_type !== "individual"
      ? row.assignments?.[0]?.group?.id
      : null;

  return (
    <TableRow className="h-15.5">
      <TableCell className="font-medium text-foreground">{row.code}</TableCell>
      <TableCell className="text-foreground">
        <Link
          href={`/list/${row.id}`}
          className="font-medium text-foreground hover:underline"
        >
          {row.name}
        </Link>
      </TableCell>
      {tab === "shared" && <TableCell>{row.priority}</TableCell>}
      <TableCell>{row.cooldown_minimum_hours ?? "-"}</TableCell>
      <TableCell>
        {row.cooldown_leads != null ? (
          <Link
            href={`/list/${row.id}?lead_status=cooldown`}
            className="hover:underline text-foreground"
          >
            {row.cooldown_leads}
          </Link>
        ) : (
          "-"
        )}
      </TableCell>
      <TableCell>
        {row.available_leads != null ? (
          <Link
            href={`/list/${row.id}?lead_status=pending`}
            className="hover:underline text-foreground"
          >
            {row.available_leads}
          </Link>
        ) : (
          "-"
        )}
      </TableCell>
      <TableCell>
        {row.total_leads != null ? (
          <Link
            href={`/list/${row.id}`}
            className="hover:underline text-foreground"
          >
            {row.total_leads}
          </Link>
        ) : (
          "-"
        )}
      </TableCell>
      <TableCell className="text-foreground text-sm">
        {groupId ? (
          <Link
            href={`/groups?group_id=${groupId}`}
            className="truncate hover:underline"
            title={assignedToLabel || ""}
          >
            {assignedToLabel}
          </Link>
        ) : (
          <span className="truncate" title={assignedToLabel || ""}>
            {assignedToLabel}
          </span>
        )}
      </TableCell>
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
            {tab !== "idv" && (
              <DropdownMenuItem
                onClick={() => setFetchEdit(true)}
                disabled={isFetching}
              >
                {isFetching ? (
                  <Loader2Icon className="size-4 animate-spin" />
                ) : (
                  "Edit"
                )}
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

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
