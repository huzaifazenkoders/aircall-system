import ConfirmDialog from "@/components/ui/confirm-dialog";

type ActivateListDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listName: string;
  onConfirm: () => void;
};

const ActivateListDialog = ({ open, onOpenChange, listName, onConfirm }: ActivateListDialogProps) => (
  <ConfirmDialog
    open={open}
    onOpenChange={onOpenChange}
    title="Activate List"
    description={
      <>
        <span className="text-gray-500">You are about to activate the </span>
        <span className="text-Brand-800 font-semibold">{listName}</span>
        <span className="text-gray-500">, which has a lower priority. Are you sure you want to proceed? Once activated, leads from this list will be served to you for calling.</span>
      </>
    }
    confirmLabel="Activate List"
    onConfirm={onConfirm}
  />
);

export default ActivateListDialog;
