"use client";

import React from "react";
import { ArrowLeftIcon, ChevronUpIcon } from "lucide-react";

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
import { cn } from "@/lib/utils";
import { usersStyles } from "@/features/users/styles/usersStyles";

const workflowOptions = [
  { label: "Default Sales Workflow", suffix: "(Default)" },
  { label: "High-Intent Lead Closer" },
  { label: "Trial User Conversion" },
];

const UsersConfigDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={usersStyles.modalContent}>
        <DialogHeader className={usersStyles.modalHeader}>
          <div className="flex-1">
            <DialogTitle className={usersStyles.modalTitle}>
              <ArrowLeftIcon className="mt-1 size-9 shrink-0 text-[#64748B]" />
              <span>List Configuration</span>
            </DialogTitle>
            <DialogDescription className={usersStyles.modalSubtitle}>
              Assign Workflow Template and Configure Cooldown for IDV List
            </DialogDescription>
          </div>

          <DialogIconClose className="mt-1 size-10 rounded-full text-[#64748B] hover:bg-muted" />
        </DialogHeader>

        <DialogBody className={usersStyles.modalBody}>
          <div>
            <label className={usersStyles.sectionLabel}>Assign Workflow Template</label>
            <button type="button" className={usersStyles.triggerField}>
              <span>Select template</span>
              <ChevronUpIcon className="size-6 text-[#64748B]" />
            </button>

            <div className={usersStyles.menuPanel}>
              <div className={usersStyles.menuList}>
                {workflowOptions.map((option) => (
                  <div key={option.label} className={usersStyles.menuItem}>
                    <span>{option.label} </span>
                    {option.suffix ? (
                      <span className={usersStyles.menuItemMuted}>{option.suffix}</span>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <label className={usersStyles.sectionLabel}>Minimum Hours Between Calls</label>
            <div className={usersStyles.cooldownGrid}>
              <div className={usersStyles.timeField}>
                <span className={usersStyles.timeValue}>12</span>
                <span className={usersStyles.timeUnit}>hr</span>
              </div>
              <div className={usersStyles.timeField}>
                <span className={usersStyles.timeValue}>30</span>
                <span className={usersStyles.timeUnit}>Min</span>
              </div>
            </div>

            <p className={usersStyles.helperText}>
              Prevents the same contact from being called multiple times within this time frame.
            </p>
          </div>
        </DialogBody>

        <DialogFooter className={usersStyles.modalFooter}>
          <Button
            variant="outline"
            className={usersStyles.cancelButton}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            className={cn(usersStyles.submitButton, "min-w-[210px]")}
            onClick={() => onOpenChange(false)}
          >
            Send Invitation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UsersConfigDialog;
