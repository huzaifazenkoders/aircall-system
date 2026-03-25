"use client";

import Link from "next/link";
import React from "react";

import { WorkflowSummary } from "@/features/workflows/data/workflowsData";
import {
  getWorkflowAccentClass,
  workflowsStyles,
} from "@/features/workflows/styles/workflowsStyles";

const WorkflowTemplateCard = ({
  workflow,
}: {
  workflow: WorkflowSummary;
}) => {
  return (
    <article className={workflowsStyles.summaryCard}>
      <div
        className={`${workflowsStyles.summaryHero} ${getWorkflowAccentClass(
          workflow.accent
        )}`}
      >
        <div className={workflowsStyles.summaryTitleBlock}>
          <h2 className={workflowsStyles.summaryTitle}>{workflow.name}</h2>
          <p className={workflowsStyles.summaryDescription}>{workflow.description}</p>
        </div>

        {workflow.isDefault ? (
          <span className={workflowsStyles.defaultBadge}>Default</span>
        ) : null}
      </div>

      <div className={workflowsStyles.summaryStats}>
        <div className={workflowsStyles.summaryStat}>
          <span className={workflowsStyles.summaryStatLabel}>Last Updated</span>
          <span className={workflowsStyles.summaryStatValue}>{workflow.lastUpdated}</span>
        </div>
        <div className={workflowsStyles.summaryStat}>
          <span className={workflowsStyles.summaryStatLabel}>Status</span>
          <span className={workflowsStyles.summaryStatValue}>{workflow.status}</span>
        </div>
        <div className={workflowsStyles.summaryStat}>
          <span className={workflowsStyles.summaryStatLabel}>Used by</span>
          <span className={workflowsStyles.summaryStatValue}>{workflow.usedBy}</span>
        </div>
        <div className={workflowsStyles.summaryStat}>
          <span className={workflowsStyles.summaryStatLabel}>Dispositions</span>
          <span className={workflowsStyles.summaryStatValue}>{workflow.dispositions}</span>
        </div>
      </div>

      <div className={workflowsStyles.summaryFooter}>
        <Link href={`/workflows/${workflow.id}`} className={workflowsStyles.detailLink}>
          View Detail
        </Link>
      </div>
    </article>
  );
};

export default WorkflowTemplateCard;
