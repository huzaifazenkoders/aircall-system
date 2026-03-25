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
import { usersStyles } from "@/features/users/styles/usersStyles";

const RemoveGroupDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[790px] rounded-[30px] p-0">
        <DialogHeader className={usersStyles.modalHeader}>
          <div className="flex-1">
            <DialogTitle className="text-[24px] font-semibold text-text-primary">
              Confirm Remove Group
            </DialogTitle>
            <DialogDescription className="mt-4 max-w-[620px] text-[18px] leading-8 text-panel-muted">
              Are you sure you want to remove this group assignment from this user? They will no
              longer receive leads from this group. This action is permanent. The user will not
              receive leads from this group after this removal.
            </DialogDescription>
          </div>
          <DialogIconClose className="mt-1 size-10 rounded-full text-panel-muted hover:bg-muted" />
        </DialogHeader>

        <DialogBody className="hidden" />

        <DialogFooter className="justify-end gap-4 px-8 pb-8">
          <Button variant="outline" className={usersStyles.secondaryButton} onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className={usersStyles.dangerButton} onClick={() => onOpenChange(false)}>
            Remove Group
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveGroupDialog;
