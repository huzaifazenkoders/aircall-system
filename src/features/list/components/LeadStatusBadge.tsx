import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Lead,
  LeadActivityStatus,
  LeadDisplayStatus
} from "@/features/list/types/leadTypes";

export const getLeadStatus = (lead: Lead): LeadDisplayStatus =>
  (lead.lead_activities?.[0]?.status as LeadDisplayStatus) || "N/A";

export const formatLeadStatus = (status: LeadDisplayStatus) =>
  status
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const statusClasses: Partial<Record<LeadDisplayStatus, string>> = {
  [LeadActivityStatus.Pending]: "bg-status-pending-bg text-status-pending-fg",
  [LeadActivityStatus.Cooldown]:
    "bg-status-cooldown-bg text-status-cooldown-fg",
  [LeadActivityStatus.Completed]:
    "bg-status-completed-bg text-status-completed-fg",
  [LeadActivityStatus.Scheduled]:
    "bg-status-scheduled-bg text-status-scheduled-fg",
  [LeadActivityStatus.InProgress]: "bg-status-active-bg text-status-active-fg",
  invalid: "bg-muted text-muted-foreground",
  banned: "bg-muted text-muted-foreground",
  expired: "bg-red-100 text-red-500"
};

export const LeadStatusBadge = ({ status }: { status: LeadDisplayStatus }) => {
  const classes =
    statusClasses[status] ?? "bg-status-no-answer-bg text-status-no-answer-fg";

  return (
    <Badge className={cn("rounded-md px-3 py-3 text-sm font-medium", classes)}>
      {formatLeadStatus(status)}
    </Badge>
  );
};
