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

type ClearListNowDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isPending?: boolean;
};

const ClearListNowDialog = ({
  open,
  onOpenChange,
  onConfirm,
  isPending
}: ClearListNowDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-lg">
        <DialogHeader className="border-b-0 px-6 pt-6 pb-0">
          <div className="">
            <DialogTitle className="text-2xl font-medium text-text-primary">
              Clear List Now
            </DialogTitle>
            <DialogDescription className="mt-1 text-base text-text-secondary">
              Are you sure you want to clear all leads from this list? This
              action cannot be undone, and leads will be removed from the list
              immediately.
            </DialogDescription>
          </div>
          <DialogIconClose className="size-7 [&_svg]:size-5 rounded-full shrink-0" />
        </DialogHeader>

        <DialogBody className="py-6 md:px-6" />

        <DialogFooter className="justify-end gap-2 px-6 pb-6">
          <Button
            variant="outline-transparent"
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
            Clear Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClearListNowDialog;
