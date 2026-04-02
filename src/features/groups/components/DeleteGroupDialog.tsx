"use client";

import GroupConfirmDialog from "@/features/groups/components/GroupConfirmDialog";

const DeleteGroupDialog = ({
  open,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}) => {
  return (
    <GroupConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Group"
      description="Deleting this group will remove all members and stop lead distribution to this group. Deleting this group will remove all members and stop lead distribution to this group."
      actionLabel="Delete Group"
      onConfirm={onConfirm}
    />
  );
};

export default DeleteGroupDialog;
