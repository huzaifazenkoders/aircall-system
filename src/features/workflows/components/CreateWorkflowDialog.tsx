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
  DialogTitle,
} from "@/components/ui/dialog";
import { workflowsStyles } from "@/features/workflows/styles/workflowsStyles";

const CreateWorkflowDialog = ({
  open,
  onOpenChange,
  onContinue,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: () => void;
}) => {
  const [name, setName] = React.useState("VIP Event Workflow");
  const [description, setDescription] = React.useState(
    "Special automation rules for VIP campaign leads."
  );

  React.useEffect(() => {
    if (!open) {
      setName("VIP Event Workflow");
      setDescription("Special automation rules for VIP campaign leads.");
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={workflowsStyles.dialogContent}>
        <DialogHeader className={workflowsStyles.dialogHeader}>
          <div>
            <DialogTitle className={workflowsStyles.dialogTitle}>
              Create Workflow Template
            </DialogTitle>
            <DialogDescription className={workflowsStyles.dialogDescription}>
              Define how call outcomes trigger automation and update lead status.
            </DialogDescription>
          </div>
          <DialogIconClose />
        </DialogHeader>

        <DialogBody className={workflowsStyles.dialogBody}>
          <div className={workflowsStyles.fieldStack}>
            <label className={workflowsStyles.field}>
              <span className={workflowsStyles.fieldLabel}>Workflow Name</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={workflowsStyles.textInput}
              />
            </label>

            <label className={workflowsStyles.field}>
              <span className={workflowsStyles.fieldLabel}>Description</span>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className={workflowsStyles.textarea}
              />
            </label>
          </div>
        </DialogBody>

        <DialogFooter className={workflowsStyles.dialogFooter}>
          <Button
            variant="outline"
            className={workflowsStyles.cancelButton}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            className={workflowsStyles.saveButton}
            onClick={() => {
              onContinue();
              onOpenChange(false);
            }}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkflowDialog;
