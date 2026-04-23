"use client";

import TablePagination from "@/components/ui/table-pagination";
import { Loader2Icon, MoreVerticalIcon, SearchIcon } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import React from "react";

import NoImage from "@/../public/assets/list/no-leads.png";
import { buttonVariants } from "@/components/ui/button";
import DateRangeSelector from "@/components/ui/date-range-selector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import TextInput from "@/components/ui/text-input";
import {
  getLeadStatus,
  LeadStatusBadge
} from "@/features/list/components/LeadStatusBadge";
import LeadDetailsDialog from "@/features/list/components/list-details/LeadDetailsDialog";
import MoveLeadDialog from "@/features/list/components/list-details/MoveLeadDialog";
import { useGetLeads } from "@/features/list/services/listService";
import { listDetailsStyles } from "@/features/list/styles/listDetailsStyles";
import { Lead, LeadActivityStatus } from "@/features/list/types/leadTypes";
import { cn } from "@/lib/utils";
import { ReactDispatch } from "@/types/common";
import Image from "next/image";
import { ListStats } from "../../types/listTypes";

const statusOptions = [
  { label: "All Status", value: "all" },
  { label: "Pending", value: LeadActivityStatus.Pending },
  { label: "In Progress", value: LeadActivityStatus.InProgress },
  { label: "Scheduled", value: LeadActivityStatus.Scheduled },
  { label: "Cooldown", value: LeadActivityStatus.Cooldown },
  { label: "Completed", value: LeadActivityStatus.Completed },
  { label: "Cancelled", value: LeadActivityStatus.Cancelled }
] as const;

const LeadsTable = ({
  listId,
  variant = "shared",
  setListStats
}: {
  listId: string;
  variant?: "shared" | "individual";
  setListStats: ReactDispatch<ListStats | null>;
}) => {
  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [statusFilter, setStatusFilter] = useQueryState(
    "lead_status",
    parseAsString.withDefault("all").withOptions({ shallow: true })
  );
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [leadDetailsOpen, setLeadDetailsOpen] = React.useState(false);
  const [selectedLead, setSelectedLead] = React.useState<Lead | null>(null);
  const [moveLeadOpen, setMoveLeadOpen] = React.useState(false);
  const [moveLeadId, setMoveLeadId] = React.useState<string | null>(null);

  const { data, isPending, isError } = useGetLeads({
    page,
    limit,
    list_id: listId,
    search: query || undefined,
    status:
      statusFilter === "all" ? undefined : (statusFilter as LeadActivityStatus),
    startDate: startDate || undefined,
    endDate: endDate || undefined
  });

  const leads = data?.data.data ?? [];
  const meta = data?.data.meta;
  const total = Number(meta?.total ?? 0);
  const totalPages = Math.max(1, Number(meta?.totalPages ?? 1));
  const currentPage = Number(meta?.page ?? page);
  const start = total === 0 ? 0 : (currentPage - 1) * limit + 1;
  const end = total === 0 ? 0 : Math.min(currentPage * limit, total);

  React.useEffect(() => {
    setPage(1);
  }, [query, statusFilter, startDate, endDate, limit]);

  React.useEffect(() => {
    if (data && data?.data?.lead_stats) setListStats(data?.data?.lead_stats);
  }, [data]);

  const isIndividual = variant === "individual";
  const isDefaultState =
    query.trim() === "" && statusFilter === "all" && !startDate && !endDate;
  const shouldShowEmptyStateOnly =
    !isPending && !isError && !leads.length && isDefaultState;

  if (shouldShowEmptyStateOnly && isIndividual) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <Image
          src={NoImage}
          alt="No Leads Assigned Yet"
          height={260}
          width={340}
        />
        <h2 className="mt-8 text-[28px] font-semibold tracking-tight text-foreground">
          No Leads Assigned Yet
        </h2>
        <p className="mt-4 max-w-[620px] text-lg leading-8 text-muted-foreground">
          It looks like there are currently no leads assigned to this
          representative&apos;s individual list. You can add leads manually once
          they become available.
        </p>
      </div>
    );
  }

  if (shouldShowEmptyStateOnly) {
    return (
      <div className={listDetailsStyles.leadTableWrap}>
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
          <Image src={NoImage} alt="No Leads Found" height={227} width={300} />
          <h2 className="mt-5 text-lg font-semibold tracking-tight">
            No Leads Assigned Yet
          </h2>
          <p className="mx-auto text-sm leading-6 text-muted-foreground">
            It looks like there are currently no leads assigned to this list.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        isIndividual
          ? listDetailsStyles.leadTableWrapFlush
          : listDetailsStyles.leadTableWrap
      )}
    >
      <div className={listDetailsStyles.leadToolbar}>
        <div>
          <TextInput
            id="leadSearch"
            placeholder="Search..."
            value={query}
            setValue={setQuery}
            startIcon={
              <SearchIcon
                className="text-muted-foreground"
                aria-hidden="true"
              />
            }
          />
        </div>

        <div className={listDetailsStyles.leadFilters}>
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value ?? "all")}
          >
            <SelectTrigger
              className={cn(
                listDetailsStyles.filterTrigger,
                "flex min-w-[170px] items-center gap-2"
              )}
            >
              <SelectValue className={"capitalize"}>
                {statusFilter.replaceAll("_", " ")}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <DateRangeSelector
            triggerClassName={cn(
              listDetailsStyles.filterTrigger,
              "flex min-w-[220px] items-center gap-2"
            )}
            value={{
              startDate: startDate ? new Date(startDate) : null,
              endDate: endDate ? new Date(endDate) : null
            }}
            setValue={(range) => {
              setStartDate(
                range.startDate
                  ? range.startDate.toISOString().slice(0, 10)
                  : ""
              );
              setEndDate(
                range.endDate ? range.endDate.toISOString().slice(0, 10) : ""
              );
            }}
          />
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-17 shrink-0">Name</TableHead>
              <TableHead className="w-17 shrink-0">Lead Status</TableHead>
              {isIndividual ? null : (
                <TableHead className="w-17 shrink-0">Assigned Rep</TableHead>
              )}
              <TableHead className="w-17 shrink-0">Last Disposition</TableHead>
              {isIndividual ? (
                <TableHead className="w-17 shrink-0">Days to Expiry</TableHead>
              ) : null}
              <TableHead className="w-17 shrink-0">Attempt</TableHead>
              <TableHead className="w-17" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending ? (
              <TableRow>
                <TableCell
                  colSpan={isIndividual ? 6 : 6}
                  className="h-32 text-center"
                >
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Loader2Icon className="size-4 animate-spin" />
                    Loading leads...
                  </div>
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={isIndividual ? 6 : 6}
                  className="h-32 text-center text-destructive"
                >
                  Failed to load leads.
                </TableCell>
              </TableRow>
            ) : !leads.length ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-muted-foreground"
                >
                  <div className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
                    <Image
                      src={NoImage}
                      alt="No Leads Found"
                      height={227}
                      width={300}
                    />

                    <h2 className="mt-5 text-lg font-semibold tracking-tight">
                      No Leads Assigned Yet
                    </h2>
                    <p className="mx-auto text-sm leading-6 text-muted-foreground">
                      It looks like there are currently no leads assigned to
                      this list.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              leads.map((lead) => (
                <TableRow key={lead.id} className="h-16">
                  <TableCell>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedLead(lead);
                        setLeadDetailsOpen(true);
                      }}
                      className="block w-full text-left outline-none"
                    >
                      <div className="font-semibold text-foreground">
                        {getLeadName(lead)}
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {lead.phone ?? "—"}
                      </div>
                    </button>
                  </TableCell>
                  <TableCell>
                    <LeadStatusBadge status={getLeadStatus(lead)} />
                  </TableCell>
                  {isIndividual ? null : (
                    <TableCell className="text-foreground">
                      {getAssignedRepName(lead)}
                    </TableCell>
                  )}
                  <TableCell>
                    <div className="font-medium text-foreground capitalize">
                      {getDispositionName(lead)}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {formatLeadDate(
                        lead?.lead_activities?.[0]?.last_attempt_at
                      )}
                    </div>
                  </TableCell>
                  {isIndividual ? (
                    <TableCell className="font-medium text-foreground">
                      {getDaysToExpiry(lead)}
                    </TableCell>
                  ) : null}
                  <TableCell className={cn("font-medium text-foreground")}>
                    {getAttemptCount(lead)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className={cn(
                          buttonVariants({
                            variant: "outline-transparent",
                            size: "icon",
                            className: "size-7 rounded-xl"
                          })
                        )}
                      >
                        <MoreVerticalIcon
                          className="size-3"
                          aria-hidden="true"
                        />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedLead(lead);
                            setLeadDetailsOpen(true);
                          }}
                        >
                          View Lead
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setMoveLeadId(lead.id);
                            setMoveLeadOpen(true);
                          }}
                        >
                          Move Lead
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {leads.length ? (
        <TablePagination
          from={start}
          to={end}
          total={total}
          limit={limit}
          onLimitChange={(l) => setLimit(l)}
          prevDisabled={currentPage <= 1}
          nextDisabled={currentPage >= totalPages}
          onPrev={() => setPage((p) => Math.max(1, p - 1))}
          onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
          className="border-t border-border"
        />
      ) : null}

      <LeadDetailsDialog
        lead={selectedLead}
        open={leadDetailsOpen}
        fromListId={listId}
        onOpenChange={(open) => {
          setLeadDetailsOpen(open);
          if (!open) {
            setSelectedLead(null);
          }
        }}
      />

      <MoveLeadDialog
        open={moveLeadOpen}
        onOpenChange={(open) => {
          setMoveLeadOpen(open);
          if (!open) {
            setMoveLeadId(null);
          }
        }}
        leadId={moveLeadId}
        fromListId={listId}
      />
    </div>
  );
};

const getLeadName = (lead: Lead) => lead.first_name + " " + lead.last_name;

const getAssignedRepName = (lead: Lead) => {
  const ass = lead?.lead_activities?.[0]?.assigned_user;
  return ass ? ass?.first_name + " " + ass?.last_name : "N/A";
};

const getDispositionName = (lead: Lead) =>
  lead.lead_activities?.[0]?.last_disposition_type?.replaceAll("_", " ") ||
  "N/A";

const getAttemptCount = (lead: Lead) =>
  lead?.lead_activities?.[0]?.attempt_count || "0";

const getDaysToExpiry = (lead: Lead) => lead.days_to_expiry ?? "N/A";

const formatLeadDate = (value?: string | null) => {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric"
  });
};

export default LeadsTable;
