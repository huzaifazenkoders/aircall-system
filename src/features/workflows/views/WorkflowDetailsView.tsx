"use client";

import Link from "next/link";
import React from "react";
import {
  ArrowLeftIcon,
  BookOpenIcon,
  Loader2Icon,
  PencilLineIcon,
  PlusCircleIcon
} from "lucide-react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import DispositionRuleDialog from "@/features/workflows/components/DispositionRuleDialog";
import WorkflowConfirmDialog from "@/features/workflows/components/WorkflowConfirmDialog";
import WorkflowRuleCard from "@/features/workflows/components/WorkflowRuleCard";
import { workflowsStyles } from "@/features/workflows/styles/workflowsStyles";
import { useGetDispositions } from "@/features/workflows/services/dispositionService";
import { useUpdateWorkflowStatus } from "@/features/workflows/services/workflowService";
import { workflowKeys } from "@/features/workflows/query-keys";
import { handleMutationError } from "@/utils/handleMutationError";
import { transformInfiniteData } from "@/utils/infiniteQueryUtils";
import {
  Disposition,
  WorkflowStatus
} from "@/features/workflows/types/workflowTypes";

const WorkflowDetailsView = ({ workflowId }: { workflowId: string }) => {
  const queryClient = useQueryClient();

  const [status, setStatus] = React.useState<WorkflowStatus | null>(null);

  const [isRuleDialogOpen, setIsRuleDialogOpen] = React.useState(false);
  const [editingDisposition, setEditingDisposition] =
    React.useState<Disposition | null>(null);
  const [dispositionToDelete, setDispositionToDelete] =
    React.useState<Disposition | null>(null);
  const [moveToDraftOpen, setMoveToDraftOpen] = React.useState(false);

  const {
    data: dispositionsData,
    isPending: isLoadingDispositions,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetDispositions({ workflow_id: workflowId, limit: 20 });

  const dispositions = transformInfiniteData(dispositionsData, "dispositions");

  const workflow = dispositionsData?.pages?.[0]?.data;

  React.useEffect(() => {
    if (workflow && status === null)
      setStatus(workflow.status as WorkflowStatus);
  }, [workflow]); // eslint-disable-line react-hooks/exhaustive-deps

  const currentStatus = status ?? workflow?.status ?? "draft";

  const { mutate: updateStatus, isPending: isUpdatingStatus } =
    useUpdateWorkflowStatus();

  const invalidateDispositions = () => {
    queryClient.invalidateQueries({
      queryKey: workflowKeys.dispositions({ workflow_id: workflowId })
    });
    queryClient.invalidateQueries({
      queryKey: workflowKeys.remainingDispositionTypes(workflowId)
    });
    queryClient.invalidateQueries({
      queryKey: workflowKeys.existingDispositionTypes(workflowId)
    });
  };

  const handleStatusChange = (nextStatus: WorkflowStatus) => {
    updateStatus(
      { payload: { id: workflowId, status: nextStatus } },
      {
        onSuccess: () => {
          toast.success(
            nextStatus === "publish"
              ? "Workflow published"
              : "Workflow moved to draft"
          );
          setStatus(nextStatus);
          queryClient.invalidateQueries({ queryKey: workflowKeys.all });
          setMoveToDraftOpen(false);
        },
        onError: handleMutationError
      }
    );
  };

  if (isLoadingDispositions) {
    return (
      <div className="mt-12 flex justify-center">
        <Loader2Icon className="size-8 animate-spin text-secondary" />
      </div>
    );
  }

  if (!workflow) {
    return (
      <div className="mt-12 text-center text-sm text-red-500">
        Workflow not found.
      </div>
    );
  }

  return (
    <div className={workflowsStyles.detailsPage}>
      <div className={workflowsStyles.detailHeader}>
        <div>
          <Link href="/workflows" className={workflowsStyles.backLink}>
            <ArrowLeftIcon className="size-5" />
            Back
          </Link>

          <div className={workflowsStyles.detailHeading}>
            <div className={workflowsStyles.detailTitleRow}>
              <h1 className={workflowsStyles.detailTitle}>{workflow.name}</h1>
              {currentStatus === "publish" && (
                <span className={workflowsStyles.activeBadge}>Active</span>
              )}
            </div>
            <p className={workflowsStyles.detailDescription}>
              {workflow.description}
            </p>
          </div>
        </div>

        <div className={workflowsStyles.detailActions}>
          {currentStatus === "publish" ? (
            <Button
              variant="outline"
              onClick={() => setMoveToDraftOpen(true)}
              disabled={isUpdatingStatus}
            >
              Move to Draft
            </Button>
          ) : (
            <>
              <Button
                onClick={() => handleStatusChange("publish")}
                disabled={isUpdatingStatus || !dispositions.length}
                title={
                  !dispositions.length
                    ? "Need to add atleast 1 disposition to publish"
                    : undefined
                }
              >
                {isUpdatingStatus ? (
                  <Loader2Icon className="size-4 animate-spin" />
                ) : (
                  <PencilLineIcon className="size-5" />
                )}
                Publish
              </Button>
            </>
          )}
        </div>
      </div>

      {isLoadingDispositions ? (
        <div className="mt-12 flex justify-center">
          <Loader2Icon className="size-8 animate-spin text-secondary" />
        </div>
      ) : (
        <div className={workflowsStyles.rulesGrid}>
          {dispositions.map((disposition) => (
            <WorkflowRuleCard
              key={disposition.id}
              disposition={disposition}
              onEdit={() => {
                setEditingDisposition(disposition);
                setIsRuleDialogOpen(true);
              }}
              onDelete={() => setDispositionToDelete(disposition)}
            />
          ))}

          <button
            type="button"
            className={workflowsStyles.addRuleCard}
            onClick={() => {
              setEditingDisposition(null);
              setIsRuleDialogOpen(true);
            }}
          >
            <PlusCircleIcon className={workflowsStyles.addRuleIcon} />
            <span className={workflowsStyles.addRuleText}>Add Disposition</span>
          </button>
        </div>
      )}

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

      <DispositionRuleDialog
        open={isRuleDialogOpen}
        onOpenChange={(open) => {
          setIsRuleDialogOpen(open);
          if (!open) setEditingDisposition(null);
        }}
        workflowId={workflowId}
        editingDisposition={editingDisposition}
      />

      <WorkflowConfirmDialog
        open={Boolean(dispositionToDelete)}
        onOpenChange={(open) => {
          if (!open) setDispositionToDelete(null);
        }}
        title="Delete Disposition"
        actionLabel="Delete Disposition"
        destructive
        onConfirm={() => {
          invalidateDispositions();
          setDispositionToDelete(null);
        }}
        content={
          <>
            <p>
              This disposition will be removed from the workflow and will no
              longer be available for dialers to select during calls.
            </p>
            <p>Past call records and reports will remain unchanged.</p>
          </>
        }
      />

      <WorkflowConfirmDialog
        open={moveToDraftOpen}
        onOpenChange={setMoveToDraftOpen}
        title={`Move ${workflow.name} to Draft?`}
        actionLabel="Move to Draft"
        onConfirm={() => handleStatusChange("draft")}
        content={
          <>
            <p>This workflow is currently assigned to active lists.</p>
            <div>
              <p>Moving it to draft will:</p>
              <ul className={workflowsStyles.bulletList}>
                <li>Prevent new lists from selecting this workflow</li>
                <li>Keep existing lists using this workflow unchanged</li>
              </ul>
            </div>
            <p>Would you like to continue?</p>
          </>
        }
      />
    </div>
  );
};

export default WorkflowDetailsView;
