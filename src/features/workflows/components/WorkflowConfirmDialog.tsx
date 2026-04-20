"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogIconClose,
  DialogTitle
} from "@/components/ui/dialog";
import { workflowsStyles } from "@/features/workflows/styles/workflowsStyles";

const WorkflowConfirmDialog = ({
  open,
  onOpenChange,
  title,
  content,
  actionLabel,
  onConfirm
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  content: React.ReactNode;
  actionLabel: string;
  onConfirm: () => void;
  destructive?: boolean;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={workflowsStyles.wideDialogContent}>
        <DialogHeader className={workflowsStyles.dialogHeader}>
          <div>
            <DialogTitle className={workflowsStyles.dialogTitle}>
              {title}
            </DialogTitle>
          </div>
          <DialogIconClose />
        </DialogHeader>

        <DialogBody className={workflowsStyles.dialogBody}>
          <div className={workflowsStyles.confirmText}>{content}</div>
        </DialogBody>

        <DialogFooter className={workflowsStyles.dialogFooter}>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            {actionLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WorkflowConfirmDialog;
