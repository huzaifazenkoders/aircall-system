"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogIconClose,
  DialogTitle
} from "@/components/ui/dialog";
import { groupsStyles } from "@/features/groups/styles/groupsStyles";

const GroupConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description,
  prompt,
  actionLabel,
  onConfirm
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  description: React.ReactNode;
  prompt?: string;
  actionLabel: string;
  onConfirm: () => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={groupsStyles.confirmDialogContent}>
        <DialogHeader className={groupsStyles.confirmDialogHeader}>
          <div>
            <DialogTitle className={groupsStyles.confirmDialogTitle}>
              {title}
            </DialogTitle>
            <DialogDescription className={groupsStyles.confirmDialogSubtitle}>
              {description}
            </DialogDescription>
          </div>
          <DialogIconClose />
        </DialogHeader>
        <DialogBody className={groupsStyles.confirmDialogBody}>
          {prompt ? (
            <p className={groupsStyles.confirmDialogPrompt}>{prompt}</p>
          ) : null}
        </DialogBody>
        <DialogFooter className={groupsStyles.confirmDialogFooter}>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant={"destructive"}
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

export default GroupConfirmDialog;
