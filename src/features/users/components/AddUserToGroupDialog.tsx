"use client";

import React from "react";
import { ChevronUpIcon } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogIconClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { availableGroups } from "@/features/users/data/usersData";
import { usersStyles } from "@/features/users/styles/usersStyles";

const AddUserToGroupDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [selectedGroups, setSelectedGroups] = React.useState<string[]>(["group-2"]);

  React.useEffect(() => {
    if (open) {
      setSelectedGroups(["group-2"]);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={usersStyles.modalContent}>
        <DialogHeader className={usersStyles.modalHeader}>
          <div className="flex-1">
            <DialogTitle className={usersStyles.modalTitle}>Add User to Group</DialogTitle>
            <DialogDescription className={usersStyles.modalSubtitle}>
              Select one or more groups to assign this user to.
            </DialogDescription>
          </div>
          <DialogIconClose className="mt-1 size-10 rounded-full text-panel-muted hover:bg-muted" />
        </DialogHeader>

        <DialogBody className={usersStyles.modalBody}>
          <div>
            <label className={usersStyles.sectionLabel}>Add to Groups</label>
            <button type="button" className={usersStyles.triggerField}>
              <span>Select groups</span>
              <ChevronUpIcon className="size-6 text-panel-muted" />
            </button>

            <div className={usersStyles.menuPanel}>
              <div className={usersStyles.menuList}>
                {availableGroups.map((group) => {
                  const checked = selectedGroups.includes(group.id);

                  return (
                    <label key={group.id} className={usersStyles.optionRow}>
                      <Checkbox
                        checked={checked}
                        onCheckedChange={(next) => {
                          setSelectedGroups((current) =>
                            next
                              ? [...current, group.id]
                              : current.filter((id) => id !== group.id)
                          );
                        }}
                        className="size-7 rounded-[8px] border-[#98A2B3] data-checked:border-secondary data-checked:bg-secondary"
                      />
                      <span>{group.name}</span>
                      <span className={usersStyles.optionMuted}>({group.users} users)</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </DialogBody>

        <DialogFooter className={usersStyles.modalFooter}>
          <Button variant="outline" className={usersStyles.secondaryButton} onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className={usersStyles.submitButton} onClick={() => onOpenChange(false)}>
            Add to Group
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserToGroupDialog;
