"use client";

import { listDetailsStyles } from "@/features/list/styles/listDetailsStyles";
import { ListDetail, ListStats } from "@/features/list/types/listTypes";

const LeadOverviewCard = ({
  listStats
}: {
  list: ListDetail;
  listStats: ListStats | null;
}) => {
  const stats = [
    { label: "Total Leads", value: listStats?.total_leads ?? 0 },
    { label: "Available to Call", value: listStats?.available_to_call ?? 0 },
    { label: "Leads in Cooldown", value: listStats?.leads_in_cooldown ?? 0 },
    {
      label: "Calls Completed",
      value: listStats?.calls_completed
    },
    {
      label: "Scheduled Callback",
      value: listStats?.scheduled_callbacks
    },
    {
      label: "Invalid / Banned",
      value: listStats?.invalid_banned
    }
  ];

  return (
    <div className={listDetailsStyles.leadOverviewWrap}>
      <div className={listDetailsStyles.leadOverviewTitle}>Lead Overview</div>
      <div className={listDetailsStyles.statGrid}>
        {stats.map((s) => (
          <div key={s.label} className={listDetailsStyles.statCard}>
            <div className={listDetailsStyles.statLabel}>{s.label}</div>
            <div className={listDetailsStyles.statValue}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadOverviewCard;
