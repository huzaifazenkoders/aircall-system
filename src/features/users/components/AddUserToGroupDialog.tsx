"use client";

import React from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

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
  DialogTitle
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { availableGroups } from "@/features/users/data/usersData";
import { usersStyles } from "@/features/users/styles/usersStyles";

const AddUserToGroupDialog = ({
  open,
  onOpenChange
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [pickerOpen, setPickerOpen] = React.useState(true);
  const [selectedGroups, setSelectedGroups] = React.useState<string[]>([
    "group-2"
  ]);

  React.useEffect(() => {
    if (open) {
      setPickerOpen(true);
      setSelectedGroups(["group-2"]);
    }
  }, [open]);

  const triggerLabel =
    selectedGroups.length > 0
      ? `${selectedGroups.length} group${selectedGroups.length === 1 ? "" : "s"} selected`
      : "Select groups";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={usersStyles.modalContent}>
        <DialogHeader className={usersStyles.modalHeader}>
          <div className="flex-1">
            <DialogTitle className={usersStyles.modalTitle}>
              Add User to Group
            </DialogTitle>
            <DialogDescription className={usersStyles.modalSubtitle}>
              Select one or more groups to assign this user to.
            </DialogDescription>
          </div>
          <DialogIconClose className="mt-1 size-10 rounded-full text-panel-muted hover:bg-muted" />
        </DialogHeader>

        <DialogBody className={usersStyles.modalBody}>
          <div>
            <label className={usersStyles.sectionLabel}>Add to Groups</label>

            <DropdownMenu open={pickerOpen} onOpenChange={setPickerOpen}>
              <DropdownMenuTrigger
                render={
                  <button type="button" className={usersStyles.triggerField}>
                    <span>{triggerLabel}</span>
                    {pickerOpen ? (
                      <ChevronUpIcon className="size-6 text-panel-muted" />
                    ) : (
                      <ChevronDownIcon className="size-6 text-panel-muted" />
                    )}
                  </button>
                }
              />

              <DropdownMenuContent
                className={`${usersStyles.menuPanel} mt-0 w-(--anchor-width) p-0`}
                sideOffset={8}
              >
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
                          className="size-6 rounded-[8px] border-[#98A2B3] data-checked:border-secondary data-checked:bg-secondary"
                        />
                        <span>{group.name}</span>
                        <span className={usersStyles.optionMuted}>
                          ({group.users} users)
                        </span>
                      </label>
                    );
                  })}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </DialogBody>

        <DialogFooter className={usersStyles.modalFooter}>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Add to Group</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserToGroupDialog;
