"use client";

import GroupConfirmDialog from "@/features/groups/components/GroupConfirmDialog";

const DeactivateGroupDialog = ({
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
      title="Deactivate Group"
      description="This group will no longer receive new leads or be available for list assignment."
      prompt="Do you want to continue?"
      actionLabel="Deactivate Group"
      onConfirm={onConfirm}
    />
  );
};

export default DeactivateGroupDialog;
