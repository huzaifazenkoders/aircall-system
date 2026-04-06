"use client";

import React from "react";

import { Badge } from "@/components/ui/badge";
import { listDetailsStyles } from "@/features/list/styles/listDetailsStyles";
import { ListDetail } from "@/features/list/types/listTypes";
import { cn } from "@/lib/utils";

const STATUS_CLASSES: Record<string, string> = {
  active: "bg-status-active-bg text-status-active-fg",
  waiting: "bg-status-waiting-bg text-status-waiting-fg",
  inactive: "bg-muted text-muted-foreground"
};

const IndividualListOverviewCard = ({ list }: { list: ListDetail }) => {
  const assignedUser = list.assignments.find((assignment) => assignment.user)?.user;
  const assignedTo = assignedUser
    ? [assignedUser.first_name, assignedUser.last_name].filter(Boolean).join(" ")
    : "—";
  const cooldown = `${list.cooldown_minimum_hours} h ${list.cooldown_minimum_minutes} min`;
  const createdOn = new Date(list.created_at).toLocaleDateString("en-US");

  return (
    <div className={listDetailsStyles.card}>
      <div className={listDetailsStyles.cardHeader}>
        <div className={listDetailsStyles.cardTitle}>List Overview</div>
        <Badge
          className={cn(
            "rounded-md px-4 py-2 text-sm font-medium capitalize",
            STATUS_CLASSES[list.status] ?? "bg-muted text-muted-foreground"
          )}
        >
          {list.status}
        </Badge>
      </div>

      <div className={listDetailsStyles.idvKvGrid}>
        <div>
          <div className={listDetailsStyles.kvKey}>Name</div>
          <div className={listDetailsStyles.idvKvVal}>
            {list.name} ({list.id})
          </div>
        </div>

        <div>
          <div className={listDetailsStyles.kvKey}>Assigned To</div>
          <div className={listDetailsStyles.idvKvVal}>{assignedTo}</div>
        </div>

        <div>
          <div className={listDetailsStyles.kvKey}>Workflow Template</div>
          <div className={listDetailsStyles.idvKvVal}>
            {list.workflow?.name ?? "—"}
          </div>
        </div>

        <div>
          <div className={listDetailsStyles.kvKey}>Cooldown hrs</div>
          <div className={listDetailsStyles.idvKvVal}>{cooldown}</div>
        </div>

        <div>
          <div className={listDetailsStyles.kvKey}>Created On</div>
          <div className={listDetailsStyles.idvKvVal}>{createdOn}</div>
        </div>
      </div>
    </div>
  );
};

export default IndividualListOverviewCard;
