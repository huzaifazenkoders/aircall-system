"use client";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogIconClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: React.ReactNode;
  confirmLabel: string;
  onConfirm: () => void;
};

const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  onConfirm,
}: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[588px] rounded-[20px] gap-0 p-0">
        <div className="px-8 pt-8 pb-6 flex justify-between items-start gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-medium text-gray-800 leading-5">{title}</h2>
            <p className="text-sm text-gray-500 leading-5">{description}</p>
          </div>
          <DialogIconClose className="shrink-0 -mt-1 -mr-1" />
        </div>

        <div className="border-t border-zinc-200" />

        <div className="px-6 py-6 flex justify-end gap-4">
          <DialogClose
            render={
              <Button variant="outline-transparent" size="lg">
                Cancel
              </Button>
            }
          />
          <Button
            size="lg"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            {confirmLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
