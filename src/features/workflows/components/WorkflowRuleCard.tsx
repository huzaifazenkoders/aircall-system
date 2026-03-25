"use client";

import React from "react";
import { EllipsisIcon, PencilIcon, Trash2Icon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WorkflowRule } from "@/features/workflows/data/workflowsData";
import { workflowsStyles } from "@/features/workflows/styles/workflowsStyles";

const WorkflowRuleCard = ({
  rule,
  onEdit,
  onDelete,
}: {
  rule: WorkflowRule;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  return (
    <article className={workflowsStyles.ruleCard}>
      <div className={workflowsStyles.ruleHead}>
        <h3 className={workflowsStyles.ruleTitle}>{rule.title}</h3>

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
        {rule.stats.map((stat) => (
          <div key={`${rule.id}-${stat.label}`} className={workflowsStyles.ruleStat}>
            <span className={workflowsStyles.ruleStatLabel}>{stat.label}</span>
            <span className={workflowsStyles.ruleStatValue}>{stat.value}</span>
          </div>
        ))}
      </div>

      {rule.tags?.length ? (
        <div className={workflowsStyles.tagRow}>
          {rule.tags.map((tag) =>
            tag.overflow ? (
              <span key={tag.id} className={workflowsStyles.tagOverflow}>
                {tag.label}
              </span>
            ) : (
              <span key={tag.id} className={workflowsStyles.tag}>
                {tag.label}
              </span>
            )
          )}
        </div>
      ) : null}
    </article>
  );
};

export default WorkflowRuleCard;
