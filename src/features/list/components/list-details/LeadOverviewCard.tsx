"use client";

import React from "react";
import { listDetailsStyles } from "@/features/list/styles/listDetailsStyles";
import { ListDetail } from "@/features/list/types/listTypes";

const LeadOverviewCard = ({ list }: { list: ListDetail }) => {
  const metrics = list as ListDetail & Record<string, unknown>;
  const stats = [
    { label: "Total Leads", value: list.total_leads ?? 0 },
    { label: "Available to Call", value: list.available_leads ?? 0 },
    { label: "Leads in Cooldown", value: list.cooldown_leads ?? 0 },
    {
      label: "Calls Completed",
      value: getMetric(metrics, ["calls_completed", "completed_calls", "completed_leads"])
    },
    {
      label: "Scheduled Callback",
      value: getMetric(metrics, ["scheduled_callback", "scheduled_callbacks"])
    },
    {
      label: "Invalid / Banned",
      value: getMetric(metrics, ["invalid_banned", "invalid_or_banned", "invalid_banned_leads"])
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

const getMetric = (source: Record<string, unknown>, keys: string[]) => {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "number") return value;
  }

  return "N/A";
};

export default LeadOverviewCard;
