"use client";

import React from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  SearchIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import GroupAvatar from "@/features/groups/components/GroupAvatar";
import { GroupMember } from "@/features/groups/data/groupsData";
import { groupsStyles } from "@/features/groups/styles/groupsStyles";

const CreateGroupDialog = ({
  open,
  onOpenChange,
  members,
  onCreate,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  members: GroupMember[];
  onCreate: (payload: {
    name: string;
    description: string;
    memberIds: string[];
  }) => void;
}) => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [query, setQuery] = React.useState("");
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!open) {
      setName("");
      setDescription("");
      setQuery("");
      setPickerOpen(false);
      setSelectedIds([]);
    }
  }, [open]);

  const filteredMembers = React.useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return members;
    }

    return members.filter((member) => member.name.toLowerCase().includes(search));
  }, [members, query]);

  const toggleMember = (memberId: string, checked: boolean) => {
    setSelectedIds((current) =>
      checked ? [...current, memberId] : current.filter((item) => item !== memberId)
    );
  };

  const handleSubmit = () => {
    onCreate({
      name,
      description,
      memberIds: selectedIds,
    });
    onOpenChange(false);
  };

  const isDisabled = !name.trim() || !description.trim() || selectedIds.length === 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={groupsStyles.dialogContent}>
        <DialogHeader className={groupsStyles.dialogHeader}>
          <div>
            <DialogTitle className={groupsStyles.dialogTitle}>Create New Group</DialogTitle>
            <DialogDescription className={groupsStyles.dialogSubtitle}>
              Group representatives together for structured lead distribution.
            </DialogDescription>
          </div>
          <DialogIconClose />
        </DialogHeader>

        <DialogBody className={groupsStyles.dialogBody}>
          <div className={groupsStyles.formGrid}>
            <label className={groupsStyles.fieldGroup}>
              <span className={groupsStyles.fieldLabel}>Group Name</span>
              <input
                className={groupsStyles.input}
                placeholder="eg, Team Alpha"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>

            <label className={groupsStyles.fieldGroup}>
              <span className={groupsStyles.fieldLabel}>Description</span>
              <textarea
                className={groupsStyles.textarea}
                placeholder="eg, Primary calling team for Sydney live events."
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </label>

            <div className={groupsStyles.fieldGroup}>
              <span className={groupsStyles.fieldLabel}>Add Members</span>

              <button
                type="button"
                className={groupsStyles.memberTrigger}
                onClick={() => setPickerOpen((current) => !current)}
              >
                <span>Select members</span>
                {pickerOpen ? (
                  <ChevronUpIcon className="size-6 text-panel-muted" />
                ) : (
                  <ChevronDownIcon className="size-6 text-panel-muted" />
                )}
              </button>

              {pickerOpen ? (
                <div className={groupsStyles.memberPanel}>
                  <div className={groupsStyles.memberSearchField}>
                    <SearchIcon className="size-6 text-panel-muted" />
                    <input
                      className={groupsStyles.memberSearchInput}
                      placeholder="Search..."
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                  </div>

                  <div className={groupsStyles.memberList}>
                    {filteredMembers.map((member) => {
                      const checked = selectedIds.includes(member.id);

                      return (
                        <label key={member.id} className={groupsStyles.memberRow}>
                          <Checkbox
                            checked={checked}
                            onCheckedChange={(value) => toggleMember(member.id, Boolean(value))}
                            className="size-7 rounded-[8px] border-border data-checked:border-primary data-checked:bg-primary"
                          />
                          <GroupAvatar member={member} />
                          <span className="text-[18px] text-text-primary">{member.name}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </DialogBody>

        <DialogFooter className={groupsStyles.dialogFooter}>
          <Button
            variant="outline"
            className={groupsStyles.cancelButton}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            className={groupsStyles.submitButton}
            disabled={isDisabled}
            onClick={handleSubmit}
          >
            {pickerOpen ? "Create Group" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupDialog;
