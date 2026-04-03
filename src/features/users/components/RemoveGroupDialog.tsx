"use client";

import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";

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
import { useRemoveUserFromGroup } from "@/features/groups/services/groupService";
import { userKeys } from "@/features/users/query-keys";
import { usersStyles } from "@/features/users/styles/usersStyles";
import { handleMutationError } from "@/utils/handleMutationError";

const RemoveGroupDialog = ({
  open,
  onOpenChange,
  userId,
  groupId,
  groupName
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string | null;
  groupId: string | null;
  groupName?: string | null;
}) => {
  const queryClient = useQueryClient();
  const { mutate: removeUserFromGroup, isPending } = useRemoveUserFromGroup();

  const handleRemove = React.useCallback(() => {
    if (!userId || !groupId) return;

    removeUserFromGroup(
      { user_id: userId, group_id: groupId },
      {
        onSuccess: (res) => {
          toast.success(
            res.message || `${groupName || "Group"} removed successfully`
          );
          void queryClient.invalidateQueries({ queryKey: userKeys.all });
          onOpenChange(false);
        },
        onError: handleMutationError
      }
    );
  }, [groupId, groupName, onOpenChange, queryClient, removeUserFromGroup, userId]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[790px] rounded-lg p-0">
        <DialogHeader className={usersStyles.modalHeader}>
          <div className="flex-1">
            <DialogTitle className="text-[24px] font-semibold text-text-primary">
              Confirm Remove Group
            </DialogTitle>
            <DialogDescription className="mt-4 max-w-[620px] text-base text-panel-muted">
              Are you sure you want to remove
              {groupName ? ` ${groupName}` : " this group"} from this user?
              They will no longer receive leads from this group. This action is
              permanent.
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
          <Button disabled={!userId || !groupId || isPending} onClick={handleRemove}>
            {isPending ? <Loader2Icon className="size-4 animate-spin" /> : null}
            Remove Group
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveGroupDialog;
