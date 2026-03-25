"use client";

import Link from "next/link";
import React from "react";
import { ArrowLeftIcon, BookOpenIcon, PencilLineIcon, PlusCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import DispositionRuleDialog from "@/features/workflows/components/DispositionRuleDialog";
import WorkflowConfirmDialog from "@/features/workflows/components/WorkflowConfirmDialog";
import WorkflowRuleCard from "@/features/workflows/components/WorkflowRuleCard";
import {
  buildWorkflowRuleFromForm,
  getWorkflowById,
  vipDraftPreset,
  WorkflowRule,
  WorkflowRuleFormValues,
} from "@/features/workflows/data/workflowsData";
import { workflowsStyles } from "@/features/workflows/styles/workflowsStyles";

const WorkflowDetailsView = ({
  workflowId,
}: {
  workflowId: string;
}) => {
  const workflow = getWorkflowById(workflowId) ?? getWorkflowById("vip-event-workflow");

  const [status, setStatus] = React.useState(workflow?.status ?? "Draft");
  const [draftRules, setDraftRules] = React.useState<WorkflowRule[]>([]);
  const [activeRules, setActiveRules] = React.useState<WorkflowRule[]>(
    workflow?.status === "Active" ? workflow.publishedRules ?? [] : []
  );
  const [isRuleDialogOpen, setIsRuleDialogOpen] = React.useState(false);
  const [editingRuleId, setEditingRuleId] = React.useState<string | null>(null);
  const [ruleToDelete, setRuleToDelete] = React.useState<WorkflowRule | null>(null);
  const [moveToDraftOpen, setMoveToDraftOpen] = React.useState(false);

  if (!workflow) {
    return null;
  }

  const editableRuleSet = status === "Active" ? activeRules : draftRules;
  const editingRule =
    editingRuleId !== null
      ? editableRuleSet.find((rule) => rule.id === editingRuleId) ?? null
      : null;

  const canPublish = draftRules.length > 0 || workflow.id === "vip-event-workflow";

  const handleSaveRule = (values: WorkflowRuleFormValues) => {
    const nextRule = buildWorkflowRuleFromForm(values);

    if (status === "Active") {
      setActiveRules((current) => {
        if (!editingRuleId) {
          return [...current, nextRule];
        }

        return current.map((rule) => (rule.id === editingRuleId ? nextRule : rule));
      });
    } else {
      setDraftRules((current) => {
        if (!editingRuleId) {
          return [...current, nextRule];
        }

        return current.map((rule) => (rule.id === editingRuleId ? nextRule : rule));
      });
    }

    setEditingRuleId(null);
  };

  const openNewRule = () => {
    setEditingRuleId(null);
    setIsRuleDialogOpen(true);
  };

  const visibleRules = status === "Active" ? activeRules : [];

  return (
    <div className={workflowsStyles.detailsPage}>
      <Link href="/workflows" className={workflowsStyles.backLink}>
        <ArrowLeftIcon className="size-5" />
        Back
      </Link>

      <div className={workflowsStyles.detailHeader}>
        <div className={workflowsStyles.detailHeading}>
          <div className={workflowsStyles.detailTitleRow}>
            <h1 className={workflowsStyles.detailTitle}>{workflow.name}</h1>
            {status === "Active" ? (
              <span className={workflowsStyles.activeBadge}>Active</span>
            ) : null}
          </div>
          <p className={workflowsStyles.detailDescription}>{workflow.description}</p>
        </div>

        <div className={workflowsStyles.detailActions}>
          {status === "Active" ? (
            <Button
              variant="outline"
              className={workflowsStyles.outlineAction}
              onClick={() => setMoveToDraftOpen(true)}
            >
              Move to Draft
            </Button>
          ) : (
            <>
              <Button variant="outline" className={workflowsStyles.outlineAction}>
                <BookOpenIcon className="size-5" />
                Draft
              </Button>
              <Button
                className={draftRules.length > 0 ? workflowsStyles.primaryAction : workflowsStyles.mutedAction}
                disabled={!canPublish}
                onClick={() => {
                  setActiveRules(
                    draftRules.length > 0 ? draftRules : workflow.publishedRules ?? []
                  );
                  setStatus("Active");
                }}
              >
                <PencilLineIcon className="size-5" />
                Publish
              </Button>
            </>
          )}
        </div>
      </div>

      {status === "Active" ? (
        <div className={workflowsStyles.rulesGrid}>
          {visibleRules.map((rule) => (
            <WorkflowRuleCard
              key={rule.id}
              rule={rule}
              onEdit={() => {
                setEditingRuleId(rule.id);
                setIsRuleDialogOpen(true);
              }}
              onDelete={() => setRuleToDelete(rule)}
            />
          ))}

          <button
            type="button"
            className={workflowsStyles.addRuleCard}
            onClick={openNewRule}
          >
            <PlusCircleIcon className={workflowsStyles.addRuleIcon} />
            <span className={workflowsStyles.addRuleText}>Add Disposition</span>
          </button>
        </div>
      ) : (
        <div className={workflowsStyles.addCardWrap}>
          <button
            type="button"
            className={workflowsStyles.addRuleCard}
            onClick={() => {
              setEditingRuleId(null);
              setDraftRules((current) => (current.length === 0 ? [buildWorkflowRuleFromForm(vipDraftPreset)] : current));
              setIsRuleDialogOpen(true);
            }}
          >
            <PlusCircleIcon className={workflowsStyles.addRuleIcon} />
            <span className={workflowsStyles.addRuleText}>Add Disposition</span>
          </button>
        </div>
      )}

      <DispositionRuleDialog
        open={isRuleDialogOpen}
        onOpenChange={(open) => {
          setIsRuleDialogOpen(open);
          if (!open) {
            setEditingRuleId(null);
          }
        }}
        initialValues={editingRule?.formValues ?? vipDraftPreset}
        onSave={handleSaveRule}
      />

      <WorkflowConfirmDialog
        open={Boolean(ruleToDelete)}
        onOpenChange={(open) => {
          if (!open) {
            setRuleToDelete(null);
          }
        }}
        title="Delete Disposition"
        actionLabel="Delete Disposition"
        destructive
        onConfirm={() => {
          if (!ruleToDelete) {
            return;
          }

          setActiveRules((current) =>
            current.filter((rule) => rule.id !== ruleToDelete.id)
          );
          setRuleToDelete(null);
        }}
        content={
          <>
            <p>
              This disposition will be removed from the workflow and will no longer
              be available for dialers to select during calls.
            </p>
            <p>Past call records and reports will remain unchanged</p>
          </>
        }
      />

      <WorkflowConfirmDialog
        open={moveToDraftOpen}
        onOpenChange={setMoveToDraftOpen}
        title={`Move ${workflow.name} to Draft?`}
        actionLabel="Move to Draft"
        onConfirm={() => {
          setDraftRules(activeRules);
          setActiveRules([]);
          setStatus("Draft");
          setMoveToDraftOpen(false);
        }}
        content={
          <>
            <p>This workflow is currently assigned to 5 active lists.</p>
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
