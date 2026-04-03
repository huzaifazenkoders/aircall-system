"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [isStartDateOpen, setIsStartDateOpen] = React.useState(false);
  const [isEndDateOpen, setIsEndDateOpen] = React.useState(false);

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
              <TableHead className="min-w-56">Name</TableHead>
              <TableHead className="w-40">Lead Status</TableHead>
              <TableHead className="min-w-44">Assigned Rep</TableHead>
              <TableHead className="min-w-52">Last Disposition</TableHead>
              <TableHead className="w-24 text-right">Attempt</TableHead>
              <TableHead className="w-14" />
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
                  No leads found.
                </TableCell>
              </TableRow>
            ) : (
              leads.map((lead) => (
                <TableRow key={lead.id} className="h-16">
                  <TableCell>
                    <Link
                      href={`/list/${listId}/${lead.id}`}
                      className="block outline-none"
                    >
                      <div className="font-semibold text-foreground">
                        {getLeadName(lead)}
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {lead.phone_number ?? lead.phone ?? "—"}
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <LeadStatusBadge status={lead.status} />
                  </TableCell>
                  <TableCell className="text-foreground">
                    {getAssignedRepName(lead)}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-foreground">
                      {getDispositionName(lead)}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {formatLeadDate(
                        lead.last_disposition_at ??
                          lead.updated_at ??
                          lead.created_at
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium text-foreground">
                    {lead.attempt ?? lead.attempt_count ?? 0}
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
                        <MoreVerticalIcon
                          className="size-5"
                          aria-hidden="true"
                        />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(`/list/${listId}/${lead.id}`)
                          }
                        >
                          View Lead
                        </DropdownMenuItem>
                        <DropdownMenuItem>Move Lead</DropdownMenuItem>
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
    </div>
  );
};

const getLeadName = (lead: Lead) =>
  lead.full_name ||
  lead.name ||
  [lead.first_name, lead.last_name].filter(Boolean).join(" ") ||
  "Unnamed Lead";

const getAssignedRepName = (lead: Lead) => {
  const rep = lead.assigned_rep ?? lead.assigned_user;

  if (!rep) return "—";

  return (
    rep.name ||
    [rep.first_name, rep.last_name].filter(Boolean).join(" ") ||
    rep.email ||
    "—"
  );
};

const getDispositionName = (lead: Lead) => {
  const disposition = lead.last_disposition;

  if (!disposition) return "—";
  if (typeof disposition === "string") return disposition;
  return disposition.name || disposition.title || "—";
};

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
