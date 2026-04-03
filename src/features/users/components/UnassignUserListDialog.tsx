"use client";

import React from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
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
import { useUnassignUserList } from "@/features/list/services/listService";
import { userKeys } from "@/features/users/query-keys";
import { usersStyles } from "@/features/users/styles/usersStyles";
import { handleMutationError } from "@/utils/handleMutationError";

const UnassignUserListDialog = ({
  open,
  onOpenChange,
  userId,
  listId
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string | null;
  listId: string | null;
}) => {
  const queryClient = useQueryClient();
  const { mutate: unassignUserList, isPending } = useUnassignUserList();

  const handleConfirm = React.useCallback(() => {
    if (!userId || !listId) return;

    unassignUserList(
      {
        payload: {
          list_id: listId,
          user_id: userId
        }
      },
      {
        onSuccess: (res) => {
          toast.success(res.message || "List unassigned successfully");
          void queryClient.invalidateQueries({ queryKey: userKeys.all });
          void queryClient.invalidateQueries({ queryKey: userKeys.detail(userId) });
          onOpenChange(false);
        },
        onError: handleMutationError
      }
    );
  }, [listId, onOpenChange, queryClient, unassignUserList, userId]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={usersStyles.modalContent}>
        <DialogHeader className={usersStyles.modalHeader}>
          <div className="flex-1">
            <DialogTitle className={usersStyles.modalTitle}>
              Confirm Unassign List
            </DialogTitle>
            <DialogDescription className={usersStyles.modalSubtitle}>
              Are you sure you want to unassign this list from this user? They
              will no longer receive leads from this list. This action will
              remove the list from the user&apos;s active lead assignments.
            </DialogDescription>
          </div>
          <DialogIconClose className="mt-1 size-10 rounded-full text-panel-muted hover:bg-muted" />
        </DialogHeader>

        <DialogBody className="hidden" />

        <DialogFooter className={usersStyles.modalFooter}>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" disabled={!userId || !listId || isPending} onClick={handleConfirm}>
            {isPending ? <Loader2Icon className="size-4 animate-spin" /> : null}
            Unassign List
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UnassignUserListDialog;
