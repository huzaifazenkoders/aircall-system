import ConfirmDialog from "@/components/ui/confirm-dialog";

type ResumeAllListsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

const ResumeAllListsDialog = ({ open, onOpenChange, onConfirm }: ResumeAllListsDialogProps) => (
  <ConfirmDialog
    open={open}
    onOpenChange={onOpenChange}
    title="Resume all list routing?"
    description="All assigned lists will be reactivated, and new leads will be routed automatically based on system priority, callback timing, and workflow rules."
    confirmLabel="Enable All Lists"
    onConfirm={onConfirm}
  />
);

export default ResumeAllListsDialog;
