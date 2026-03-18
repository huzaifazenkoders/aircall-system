"use client";

import React from "react";

import { assignedLeadStyles as s } from "@/features/assigned-leads/styles/assignedLeadStyles";

const AssignedLeadTimelineItem = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="relative">
      <div className={s.timelineDotWrap}>
        <span className={s.timelineDot} aria-hidden="true" />
      </div>
      <div className={s.timelineItemTitle}>{title}</div>
      <div className={s.timelineItemSubtitle}>{subtitle}</div>
    </div>
  );
};

export default AssignedLeadTimelineItem;

