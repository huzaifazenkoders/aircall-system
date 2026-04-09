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

const ActivateListDialog = ({
  open,
  onOpenChange,
  onConfirm,
  isPending
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isPending?: boolean;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div>
            <DialogTitle>Activate List?</DialogTitle>
            <DialogDescription>
              Are you sure you want to activate this list? This will resume all
              activity for this list and allow leads to be dialled according to
              the assigned workflow.
            </DialogDescription>
          </div>
          <DialogIconClose />
        </DialogHeader>
        <DialogBody />
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={isPending}>
            Activate List
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ActivateListDialog;
