"use client";

import React from "react";
import { listDetailsStyles } from "@/features/list/styles/listDetailsStyles";
import { ListDetail } from "@/features/list/types/listTypes";

const LeadOverviewCard = ({ list }: { list: ListDetail }) => {
  const stats = [
    { label: "Total Leads", value: list.total_leads ?? 0 },
    { label: "Available to Call", value: list.available_leads ?? 0 },
    { label: "Leads in Cooldown", value: list.cooldown_leads ?? 0 },
    { label: "Calls Completed", value: "N/A" },
    { label: "Scheduled Callback", value: "N/A" },
    { label: "Invalid / Banned", value: "N/A" }
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
