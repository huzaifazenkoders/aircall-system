"use client";

import { listDetailsStyles } from "@/features/list/styles/listDetailsStyles";
import { LeadActivityStatus } from "@/features/list/types/leadTypes";
import { ListDetail, ListStats } from "@/features/list/types/listTypes";
import { cn } from "@/lib/utils";
import { parseAsString, useQueryState } from "nuqs";

const LeadOverviewCard = ({
  listStats
}: {
  list: ListDetail;
  listStats: ListStats | null;
}) => {
  const [statusFilter, setStatusFilter] = useQueryState(
    "lead_status",
    parseAsString.withDefault("all").withOptions({ shallow: true })
  );

  const stats: { label: string; value: number | undefined; status: string }[] =
    [
      {
        label: "Total Leads",
        value: listStats?.total_leads ?? 0,
        status: "all"
      },
      {
        label: "Available to Call",
        value: listStats?.available_to_call ?? 0,
        status: LeadActivityStatus.Pending
      },
      {
        label: "Leads in Cooldown",
        value: listStats?.leads_in_cooldown ?? 0,
        status: LeadActivityStatus.Cooldown
      },
      {
        label: "Calls Completed",
        value: listStats?.calls_completed,
        status: LeadActivityStatus.Completed
      },
      {
        label: "Scheduled Callback",
        value: listStats?.scheduled_callbacks,
        status: LeadActivityStatus.Scheduled
      },
      {
        label: "Invalid / Banned",
        value: listStats?.invalid_banned,
        status: LeadActivityStatus.Cancelled
      }
    ];

  return (
    <div className={listDetailsStyles.leadOverviewWrap}>
      <div className={listDetailsStyles.leadOverviewTitle}>Lead Overview</div>
      <div className={listDetailsStyles.statGrid}>
        {stats.map((s) => {
          const isActive = statusFilter === s.status;
          return (
            <button
              key={s.label}
              type="button"
              onClick={() => setStatusFilter(s.status)}
              className={cn(
                listDetailsStyles.statCard,
                "text-left cursor-pointer transition-colors",
                isActive && ""
              )}
            >
              <div className={listDetailsStyles.statLabel}>{s.label}</div>
              <div className={listDetailsStyles.statValue}>{s.value}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LeadOverviewCard;
