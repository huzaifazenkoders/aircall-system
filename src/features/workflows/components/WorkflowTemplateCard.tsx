"use client";

import Link from "next/link";
import React from "react";

import {
  getWorkflowAccentClass,
  workflowsStyles
} from "@/features/workflows/styles/workflowsStyles";
import { Workflow } from "@/features/workflows/types/workflowTypes";

const accentByIndex = ["mint", "lilac", "cream", "sky", "lime"] as const;

const WorkflowTemplateCard = ({
  workflow,
  index = 0
}: {
  workflow: Workflow;
  index?: number;
}) => {
  const accent = accentByIndex[index % accentByIndex.length];

  const formattedDate = workflow.updated_at
    ? new Date(workflow.updated_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      })
    : "—";

  return (
    <article className={workflowsStyles.summaryCard}>
      <div className="h-px border-b border-zinc-200" />
      <div
        className={`${workflowsStyles.summaryHero} ${getWorkflowAccentClass(accent)}`}
      >
        <div className={workflowsStyles.summaryTitleBlock}>
          <h2 className={workflowsStyles.summaryTitle}>{workflow.name}</h2>
          <p className={workflowsStyles.summaryDescription}>
            {workflow.description}
          </p>
        </div>
        {workflow.is_default ? (
          <span className={workflowsStyles.defaultBadge}>Default</span>
        ) : null}
      </div>

      <div className={workflowsStyles.summaryStats}>
        <div className={workflowsStyles.summaryStat}>
          <span className={workflowsStyles.summaryStatLabel}>Last Updated</span>
          <span className={workflowsStyles.summaryStatValue}>
            {formattedDate}
          </span>
        </div>
        <div className={workflowsStyles.summaryStat}>
          <span className={workflowsStyles.summaryStatLabel}>Status</span>
          <span className={workflowsStyles.summaryStatValue}>
            {workflow.status === "publish" ? "Active" : "Draft"}
          </span>
        </div>
        <div className={workflowsStyles.summaryStat}>
          <span className={workflowsStyles.summaryStatLabel}>Used by</span>
          <span className={workflowsStyles.summaryStatValue}>
            {workflow.list_count ?? 0} Lists
          </span>
        </div>
        <div className={workflowsStyles.summaryStat}>
          <span className={workflowsStyles.summaryStatLabel}>Dispositions</span>
          <span className={workflowsStyles.summaryStatValue}>
            {workflow.disposition_count ?? 0}
          </span>
        </div>
      </div>

      <Link
        href={`/workflows/${workflow.id}`}
        className={workflowsStyles.summaryFooter}
      >
        View Detail
      </Link>
    </article>
  );
};

export default WorkflowTemplateCard;
