"use client";

import { Loader2Icon } from "lucide-react";

import { assignedLeadStyles as s } from "@/features/assigned-leads/styles/assignedLeadStyles";
import AssignedLeadActiveState from "@/features/assigned-leads/components/AssignedLeadActiveState";
import AssignedLeadEmptyState from "@/features/assigned-leads/components/AssignedLeadEmptyState";
import { useGetCurrentLead } from "@/features/assigned-leads/services/assignedLeadService";

const AssignedLeadView = () => {
  const { data, isPending, isError, refetch } = useGetCurrentLead();
  const lead = data?.data ?? null;

  if (isPending) {
    return (
      <div className={s.page}>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2Icon className="size-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (isError || !lead) {
    return (
      <div className={s.page}>
        <AssignedLeadEmptyState onRefresh={refetch} />
      </div>
    );
  }

  return (
    <div className={s.page}>
      <AssignedLeadActiveState lead={lead} />
    </div>
  );
};

export default AssignedLeadView;
