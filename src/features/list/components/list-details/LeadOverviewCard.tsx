"use client";

import React from "react";
import { listDetailsStyles } from "@/features/list/styles/listDetailsStyles";

const LeadOverviewCard = () => {
  const stats = [
    { label: "Total Leads", value: 148 },
    { label: "Available to Call", value: 32 },
    { label: "Leads in Cooldown", value: 41 },
    { label: "Calls Completed", value: 67 },
    { label: "Scheduled Callback", value: 6 },
    { label: "Invalid / Banned", value: 2 },
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

