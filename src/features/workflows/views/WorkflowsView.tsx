"use client";

import React from "react";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CreateWorkflowDialog from "@/features/workflows/components/CreateWorkflowDialog";
import WorkflowTemplateCard from "@/features/workflows/components/WorkflowTemplateCard";
import {
  workflowsSummary,
  WorkflowStatus,
} from "@/features/workflows/data/workflowsData";
import { workflowsStyles } from "@/features/workflows/styles/workflowsStyles";

const statusOptions: Array<"All Status" | WorkflowStatus> = [
  "All Status",
  "Active",
  "Draft",
];

const WorkflowsView = () => {
  const router = useRouter();
  const [createOpen, setCreateOpen] = React.useState(false);
  const [statusFilter, setStatusFilter] = React.useState<"All Status" | WorkflowStatus>(
    "All Status"
  );

  const filteredWorkflows = React.useMemo(() => {
    if (statusFilter === "All Status") {
      return workflowsSummary;
    }

    return workflowsSummary.filter((workflow) => workflow.status === statusFilter);
  }, [statusFilter]);

  return (
    <div className={workflowsStyles.page}>
      <div className={workflowsStyles.pageHeader}>
        <h1 className={workflowsStyles.pageTitle}>Workflows</h1>

        <div className={workflowsStyles.pageActions}>
          <Select
            value={statusFilter}
            onValueChange={(value) =>
              setStatusFilter(value as "All Status" | WorkflowStatus)
            }
          >
            <SelectTrigger className={workflowsStyles.filterTrigger}>
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent className={workflowsStyles.selectContent} align="end">
              {statusOptions.map((option) => (
                <SelectItem
                  key={option}
                  value={option}
                  className={workflowsStyles.selectItem}
                >
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            className={workflowsStyles.createButton}
            onClick={() => setCreateOpen(true)}
          >
            <PlusIcon className="size-5" />
            Create New Template
          </Button>
        </div>
      </div>

      <div className={workflowsStyles.cardGrid}>
        {filteredWorkflows.map((workflow) => (
          <WorkflowTemplateCard key={workflow.id} workflow={workflow} />
        ))}
      </div>

      <CreateWorkflowDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onContinue={() => router.push("/workflows/vip-event-workflow")}
      />
    </div>
  );
};

export default WorkflowsView;
