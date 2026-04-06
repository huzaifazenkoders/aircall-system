"use client";

import React from "react";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Loader2Icon,
  MoreVerticalIcon,
  SearchIcon
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
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
import TextInput from "@/components/ui/text-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import DateSelector from "@/components/custom/date-selector.component";
import { cn } from "@/lib/utils";
import { listDetailsStyles } from "@/features/list/styles/listDetailsStyles";
import { useGetLeads } from "@/features/list/services/listService";
import { Lead, LeadActivityStatus } from "@/features/list/types/leadTypes";
import Image from "next/image";
import NoImage from "@/../public/assets/list/no-leads.png";
import MoveLeadDialog from "@/features/list/components/list-details/MoveLeadDialog";
import LeadDetailsDialog from "@/features/list/components/list-details/LeadDetailsDialog";

const PAGE_SIZE = 10;

const statusOptions = [
  { label: "All Status", value: "all" },
  { label: "Pending", value: LeadActivityStatus.Pending },
  { label: "In Progress", value: LeadActivityStatus.InProgress },
  { label: "Scheduled", value: LeadActivityStatus.Scheduled },
  { label: "Cooldown", value: LeadActivityStatus.Cooldown },
  { label: "Completed", value: LeadActivityStatus.Completed },
  { label: "Cancelled", value: LeadActivityStatus.Cancelled }
] as const;

const LeadsTable = ({ listId }: { listId: string }) => {
  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [isStartDateOpen, setIsStartDateOpen] = React.useState(false);
  const [isEndDateOpen, setIsEndDateOpen] = React.useState(false);
  const [leadDetailsOpen, setLeadDetailsOpen] = React.useState(false);
  const [selectedLead, setSelectedLead] = React.useState<Lead | null>(null);
  const [moveLeadOpen, setMoveLeadOpen] = React.useState(false);
  const [moveLeadId, setMoveLeadId] = React.useState<string | null>(null);

  const { data, isPending, isError } = useGetLeads({
    page,
    limit: PAGE_SIZE,
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
  const start = total === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const end = total === 0 ? 0 : Math.min(currentPage * PAGE_SIZE, total);

  React.useEffect(() => {
    setPage(1);
  }, [query, statusFilter, startDate, endDate]);

  return (
    <div className={listDetailsStyles.leadTableWrap}>
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

          <DropdownMenu
            open={isStartDateOpen}
            onOpenChange={setIsStartDateOpen}
          >
            <DropdownMenuTrigger
              render={
                <Button
                  variant="outline"
                  className={cn(
                    listDetailsStyles.filterTrigger,
                    "flex items-center gap-2"
                  )}
                >
                  {formatFilterDate(startDate, "Start Date")}
                  <CalendarIcon
                    className="size-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                </Button>
              }
            />
            <DateSelector
              value={startDate ? new Date(startDate) : undefined}
              setValue={(date) => setStartDate(date.toISOString().slice(0, 10))}
              onOpenChange={setIsStartDateOpen}
            />
          </DropdownMenu>

          <DropdownMenu open={isEndDateOpen} onOpenChange={setIsEndDateOpen}>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="outline"
                  className={cn(
                    listDetailsStyles.filterTrigger,
                    "flex items-center gap-2"
                  )}
                >
                  {formatFilterDate(endDate, "End Date")}
                  <CalendarIcon
                    className="size-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                </Button>
              }
            />
            <DateSelector
              value={endDate ? new Date(endDate) : undefined}
              setValue={(date) => setEndDate(date.toISOString().slice(0, 10))}
              onOpenChange={setIsEndDateOpen}
            />
          </DropdownMenu>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-17 shrink-0">Name</TableHead>
              <TableHead className="w-17 shrink-0">Lead Status</TableHead>
              <TableHead className="w-17 shrink-0">Assigned Rep</TableHead>
              <TableHead className="w-17 shrink-0">Last Disposition</TableHead>
              <TableHead className="w-17 shrink-0">Attempt</TableHead>
              <TableHead className="w-17" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Loader2Icon className="size-4 animate-spin" />
                    Loading leads...
                  </div>
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={6}
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
                    <LeadStatusBadge status={LeadActivityStatus.Completed} />
                  </TableCell>
                  <TableCell className="text-foreground">
                    {getAssignedRepName(lead)}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-foreground">
                      {getDispositionName(lead)}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {formatLeadDate(lead.updated_at ?? lead.created_at)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium text-foreground">
                    {"N/A"}
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

      <div className="flex items-center justify-end gap-6 border-t border-border px-6 py-4">
        <span className="text-sm text-muted-foreground">
          {start}-{end} of {total}
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            disabled={currentPage <= 1}
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          >
            <ChevronLeftIcon className="size-4 text-muted-foreground" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            disabled={currentPage >= totalPages}
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          >
            <ChevronRightIcon className="size-4 text-muted-foreground" />
          </Button>
        </div>
      </div>

      <LeadDetailsDialog
        lead={selectedLead}
        open={leadDetailsOpen}
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

const getAssignedRepName = (lead: Lead) => "N/A";

const getDispositionName = (lead: Lead) => "N/A";

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

const formatFilterDate = (value: string, fallback: string) => {
  if (!value) return fallback;
  return formatLeadDate(value);
};

const formatLeadStatus = (status: LeadActivityStatus) =>
  status
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const LeadStatusBadge = ({ status }: { status: LeadActivityStatus }) => {
  const classes =
    status === LeadActivityStatus.Pending
      ? "bg-status-pending-bg text-status-pending-fg"
      : status === LeadActivityStatus.Cooldown
        ? "bg-status-cooldown-bg text-status-cooldown-fg"
        : status === LeadActivityStatus.Completed
          ? "bg-status-completed-bg text-status-completed-fg"
          : status === LeadActivityStatus.Scheduled
            ? "bg-status-scheduled-bg text-status-scheduled-fg"
            : status === LeadActivityStatus.InProgress
              ? "bg-status-active-bg text-status-active-fg"
              : "bg-status-no-answer-bg text-status-no-answer-fg";

  return (
    <Badge className={cn("rounded-md px-3 py-3 text-sm font-medium", classes)}>
      {formatLeadStatus(status)}
    </Badge>
  );
};

export default LeadsTable;
