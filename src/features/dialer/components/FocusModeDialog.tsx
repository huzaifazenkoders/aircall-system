import ConfirmDialog from "@/components/ui/confirm-dialog";

type FocusModeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

const FocusModeDialog = ({ open, onOpenChange, onConfirm }: FocusModeDialogProps) => (
  <ConfirmDialog
    open={open}
    onOpenChange={onOpenChange}
    title="Switch to Focus Mode?"
    description="All assigned lists will be paused until you manually enable the list you want to work on. New calls will come only from selected lists."
    confirmLabel="Enter Focus Mode"
    onConfirm={onConfirm}
  />
);

export default FocusModeDialog;
