"use client";

import { Loader2Icon } from "lucide-react";

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
import { usersStyles } from "@/features/users/styles/usersStyles";

const ToggleUserStatusDialog = ({
  open,
  onOpenChange,
  isActive,
  isPending,
  onConfirm
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isActive: boolean;
  isPending: boolean;
  onConfirm: () => void;
}) => {
  const action = isActive ? "Deactivate" : "Activate";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[790px] rounded-lg p-0">
        <DialogHeader className={usersStyles.modalHeader}>
          <div className="flex-1">
            <DialogTitle className="text-[24px] font-semibold text-text-primary">
              Confirm {action} User
            </DialogTitle>
            <DialogDescription className="mt-4 max-w-[620px] text-base text-panel-muted">
              {isActive
                ? "Are you sure you want to deactivate this user? They will no longer have access to the system or receive new lead assignments."
                : "Are you sure you want to activate this user? They will regain access to the system and be eligible for new lead assignments."}
            </DialogDescription>
          </div>
          <DialogIconClose className="mt-1 size-10 rounded-full text-panel-muted hover:bg-muted" />
        </DialogHeader>

        <DialogBody className="hidden" />

        <DialogFooter className="justify-end gap-4 p-6">
          <Button
            variant="outline"
            disabled={isPending}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            variant={isActive ? "destructive" : "default"}
            disabled={isPending}
            onClick={onConfirm}
          >
            {isPending ? <Loader2Icon className="size-4 animate-spin" /> : null}
            {action} User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ToggleUserStatusDialog;
