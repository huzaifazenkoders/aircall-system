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

const DeactivateListDialog = ({
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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div>
            <DialogTitle>Deactivate List?</DialogTitle>
            <DialogDescription>
              Are you sure you want to deactivate this list? This will stop all
              activity for this list. Any scheduled callbacks, retries, or
              ongoing workflows will be cancelled, and no further actions will be
              performed.
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
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isPending}
          >
            Deactivate List
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeactivateListDialog;
