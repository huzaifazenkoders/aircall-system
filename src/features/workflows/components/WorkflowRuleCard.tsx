"use client";

import React from "react";
import { EllipsisIcon, PencilIcon, Trash2Icon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { workflowsStyles } from "@/features/workflows/styles/workflowsStyles";
import { Disposition } from "@/features/workflows/types/workflowTypes";

const DISPOSITION_LABELS: Record<string, string> = {
  no_answer: "No Answer",
  connected_positive: "Connected / Positive",
  not_interested: "Not Interested",
  callback_scheduled: "Callback Scheduled",
  voicemail_left: "Voicemail Left",
  wrong_number: "Wrong Number",
  do_not_call: "Do Not Call",
  ban_contact: "Ban Contact",
};

function buildStats(d: Disposition) {
  const isCooldown = d.resulting_lead_status === "cooldown";
  const cooldownValue = isCooldown
    ? d.cooldown_behavior === "custom"
      ? `Custom (${d.custom_cooldown_hours} hr)`
      : "Default (12 hr)"
    : "—";

  return [
    { label: "Lead Status", value: d.resulting_lead_status || "—" },
    { label: "Cooldown", value: isCooldown ? cooldownValue : "—" },
    {
      label: "Attempts",
      value: isCooldown && d.is_retry_allowed ? String(d.max_attempts) : "—",
    },
    {
      label: "Final Action",
      value: isCooldown ? d.max_attempt_reached : d.resulting_lead_status || "—",
    },
  ];
}

const WorkflowRuleCard = ({
  disposition,
  onEdit,
  onDelete,
}: {
  disposition: Disposition;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  const stats = buildStats(disposition);
  const title = DISPOSITION_LABELS[disposition.disposition_type] ?? disposition.name;

  return (
    <article className={workflowsStyles.ruleCard}>
      <div className={workflowsStyles.ruleHead}>
        <h3 className={workflowsStyles.ruleTitle}>{title}</h3>

        <DropdownMenu>
          <DropdownMenuTrigger className={workflowsStyles.menuTrigger}>
            <EllipsisIcon className="size-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className={workflowsStyles.menuContent}
            sideOffset={8}
          >
            <DropdownMenuItem className={workflowsStyles.menuItem} onClick={onEdit}>
              <PencilIcon className="size-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className={workflowsStyles.menuItem}
              onClick={onDelete}
              variant="destructive"
            >
              <Trash2Icon className="size-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className={workflowsStyles.ruleBody}>
        {stats.map((stat) => (
          <div key={stat.label} className={workflowsStyles.ruleStat}>
            <span className={workflowsStyles.ruleStatLabel}>{stat.label}</span>
            <span className={workflowsStyles.ruleStatValue}>{stat.value}</span>
          </div>
        ))}
      </div>
    </article>
  );
};

export default WorkflowRuleCard;
