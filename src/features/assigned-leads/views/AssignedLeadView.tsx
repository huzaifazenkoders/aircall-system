"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

import { assignedLeadStyles as s } from "@/features/assigned-leads/styles/assignedLeadStyles";
import AssignedLeadActiveState from "@/features/assigned-leads/components/AssignedLeadActiveState";
import AssignedLeadEmptyState from "@/features/assigned-leads/components/AssignedLeadEmptyState";

const AssignedLeadView = () => {
  const searchParams = useSearchParams();
  const state = searchParams.get("state");
  const isAssigned = state === "active";

  return (
    <div className={s.page}>
      {true ? <AssignedLeadActiveState /> : <AssignedLeadEmptyState />}
    </div>
  );
};

export default AssignedLeadView;
