"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { listDetailsStyles } from "@/features/list/styles/listDetailsStyles";

const ListOverviewCard = () => {
  return (
    <div className={listDetailsStyles.card}>
      <div className={listDetailsStyles.cardHeader}>
        <div className={listDetailsStyles.cardTitle}>List Overview</div>
        <Badge className="rounded-lg bg-status-active-bg px-4 py-1 text-xs font-medium text-status-active-fg">
          Active
        </Badge>
      </div>

      <div className={listDetailsStyles.kvList}>
        <div className={listDetailsStyles.kvKey}>Name</div>
        <div className={listDetailsStyles.kvVal}>Gold Cost Event (101)</div>

        <div className={listDetailsStyles.kvKey}>Priority</div>
        <div className={listDetailsStyles.kvVal}>1</div>

        <div className={listDetailsStyles.kvKey}>Cooldown hrs</div>
        <div className={listDetailsStyles.kvVal}>12 h 20 min</div>

        <div className={listDetailsStyles.kvKey}>Call Type</div>
        <div className={listDetailsStyles.kvVal}>Hot Lead</div>

        <div className={listDetailsStyles.kvKey}>Workflow Template</div>
        <div className={listDetailsStyles.kvVal}>High-Intent Lead Closer</div>

        <div className={listDetailsStyles.kvKey}>Created On</div>
        <div className={listDetailsStyles.kvVal}>02/21/2026</div>
      </div>
    </div>
  );
};

export default ListOverviewCard;

