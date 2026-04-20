"use client";

import { Loader2Icon, PlusIcon } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import CreateWorkflowDialog from "@/features/workflows/components/CreateWorkflowDialog";
import WorkflowTemplateCard from "@/features/workflows/components/WorkflowTemplateCard";
import { useGetWorkflows } from "@/features/workflows/services/workflowService";
import { workflowsStyles } from "@/features/workflows/styles/workflowsStyles";
import { WorkflowStatus } from "@/features/workflows/types/workflowTypes";
import { transformInfiniteData } from "@/utils/infiniteQueryUtils";

type StatusFilter = "all" | WorkflowStatus;

const statusOptions: Array<{ label: string; value: StatusFilter }> = [
  { label: "All", value: "all" },
  { label: "Active", value: "publish" },
  { label: "Draft", value: "draft" }
];

const WorkflowsView = () => {
  const [createOpen, setCreateOpen] = React.useState(false);
  const [statusFilter, setStatusFilter] = React.useState<StatusFilter>("all");

  const {
    data,
    isPending,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetWorkflows({
    limit: 10,
    status: statusFilter === "all" ? undefined : statusFilter
  });

  const workflows = transformInfiniteData(data, "data");

  return (
    <div className={workflowsStyles.page}>
      <div className={workflowsStyles.pageHeader}>
        <h1 className={workflowsStyles.pageTitle}>Workflows</h1>

        <div className={workflowsStyles.pageActions}>
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as StatusFilter)}
          >
            <SelectTrigger className={workflowsStyles.filterTrigger}>
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent
              className={workflowsStyles.selectContent}
              align="end"
            >
              {statusOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className={workflowsStyles.selectItem}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            size="xl"
            className={workflowsStyles.createButton}
            onClick={() => setCreateOpen(true)}
          >
            <PlusIcon className="size-4" />
            Create New Template
          </Button>
        </div>
      </div>

      {isPending ? (
        <div className="mt-12 flex justify-center">
          <Loader2Icon className="size-8 animate-spin text-secondary" />
        </div>
      ) : error ? (
        <div className="mt-12 text-center text-sm text-red-500">
          Failed to load workflows. Please try again.
        </div>
      ) : !workflows.length ? (
        <div className="mt-12 text-center font-semibold text-secondary">
          No workflows found.
        </div>
      ) : (
        <>
          <div className={workflowsStyles.cardGrid}>
            {workflows.map((workflow) => (
              <WorkflowTemplateCard key={workflow.id} workflow={workflow} />
            ))}
          </div>

          {hasNextPage && (
            <div className="mt-6 flex justify-center">
              <Button
                variant="outline"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? (
                  <Loader2Icon className="size-4 animate-spin" />
                ) : (
                  "Load More"
                )}
              </Button>
            </div>
          )}
        </>
      )}

      <CreateWorkflowDialog open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
};

export default WorkflowsView;
