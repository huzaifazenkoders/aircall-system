"use client";

import React from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ListChecksIcon,
  SearchIcon,
  UsersRoundIcon
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
  DialogTitle
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import GroupAvatar from "@/features/groups/components/GroupAvatar";
import { GroupMember } from "@/features/groups/data/groupsData";
import { groupsStyles } from "@/features/groups/styles/groupsStyles";
import TextInput from "@/components/ui/text-input";

type SelectionItem = {
  id: string;
  title: string;
  subtitle?: string;
  member?: GroupMember;
};

const GroupSelectionDialog = ({
  open,
  onOpenChange,
  title,
  description,
  fieldLabel,
  triggerLabel,
  searchPlaceholder,
  submitLabel,
  emptyTitle,
  emptyDescription,
  emptyKind,
  items,
  initialSelectedIds,
  onSubmit
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  fieldLabel: string;
  triggerLabel: string;
  searchPlaceholder: string;
  submitLabel: string;
  emptyTitle: string;
  emptyDescription: string;
  emptyKind: "members" | "lists";
  items: SelectionItem[];
  initialSelectedIds?: string[];
  onSubmit: (selectedIds: string[]) => void;
}) => {
  const [query, setQuery] = React.useState("");
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [selectedIds, setSelectedIds] = React.useState<string[]>(
    initialSelectedIds ?? []
  );
  const lockedIds = React.useMemo(
    () => new Set(initialSelectedIds ?? []),
    [initialSelectedIds]
  );

  React.useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIds(initialSelectedIds ?? []);
    }
  }, [initialSelectedIds, open]);

  const filteredItems = React.useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return items;
    }

    return items.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(search);
      const subtitleMatch = item.subtitle?.toLowerCase().includes(search);
      return titleMatch || subtitleMatch;
    });
  }, [items, query]);

  const toggleItem = (itemId: string, checked: boolean) => {
    if (lockedIds.has(itemId)) {
      return;
    }

    setSelectedIds((current) => {
      if (checked) {
        return current.includes(itemId) ? current : [...current, itemId];
      }

      return current.filter((value) => value !== itemId);
    });
  };

  const resolvedTriggerLabel =
    selectedIds.length > 0 ? `${selectedIds.length} selected` : triggerLabel;

  const EmptyIcon = emptyKind === "members" ? UsersRoundIcon : ListChecksIcon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={groupsStyles.selectionDialogContent}>
        <DialogHeader className={groupsStyles.dialogHeader}>
          <div>
            <DialogTitle className={groupsStyles.dialogTitle}>
              {title}
            </DialogTitle>
            <DialogDescription className={groupsStyles.dialogSubtitle}>
              {description}
            </DialogDescription>
          </div>
          <DialogIconClose />
        </DialogHeader>

        <DialogBody className={groupsStyles.dialogBody}>
          <div className={groupsStyles.formGrid}>
            <div className={groupsStyles.fieldGroup}>
              <span className={groupsStyles.fieldLabel}>{fieldLabel}</span>

              <DropdownMenu open={pickerOpen} onOpenChange={setPickerOpen}>
                <DropdownMenuTrigger
                  render={
                    <button
                      type="button"
                      className={groupsStyles.memberTrigger}
                    >
                      <span>{resolvedTriggerLabel}</span>
                      {pickerOpen ? (
                        <ChevronUpIcon className="size-6 text-panel-muted" />
                      ) : (
                        <ChevronDownIcon className="size-6 text-panel-muted" />
                      )}
                    </button>
                  }
                />

                <DropdownMenuContent
                  className={`${groupsStyles.memberPanel} w-(--anchor-width) p-0`}
                  sideOffset={8}
                >
                  <div className="px-3 pt-3">
                    <TextInput
                      startIcon={
                        <SearchIcon className="size-6 text-panel-muted" />
                      }
                      placeholder={searchPlaceholder}
                      value={query}
                      setValue={setQuery}
                    />
                  </div>

                  {filteredItems.length ? (
                    <div className={groupsStyles.memberList}>
                      {filteredItems.map((item) => {
                        const checked = selectedIds.includes(item.id);
                        const isLocked = lockedIds.has(item.id);

                        return (
                          <label
                            key={item.id}
                            className={groupsStyles.selectionRow}
                          >
                            <Checkbox
                              checked={checked}
                              disabled={isLocked}
                              onCheckedChange={(value) =>
                                toggleItem(item.id, Boolean(value))
                              }
                              className="size-7 rounded-[8px] border-border data-checked:border-primary data-checked:bg-primary disabled:opacity-100"
                            />
                            {item.member ? (
                              <GroupAvatar member={item.member} />
                            ) : (
                              <div
                                className={groupsStyles.listCheckboxSpacer}
                              />
                            )}
                            <div>
                              <div className={groupsStyles.assignmentTitle}>
                                {item.title}
                              </div>
                              {item.subtitle ? (
                                <div className={groupsStyles.assignmentMeta}>
                                  {item.subtitle}
                                </div>
                              ) : null}
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  ) : (
                    <div className={groupsStyles.selectionEmptyState}>
                      <div className={groupsStyles.selectionEmptyIconWrap}>
                        <EmptyIcon className="size-10 text-[#1795A1]" />
                      </div>
                      <div className={groupsStyles.selectionEmptyTitle}>
                        {emptyTitle}
                      </div>
                      <div className={groupsStyles.selectionEmptyDescription}>
                        {emptyDescription}
                      </div>
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </DialogBody>

        <DialogFooter className={groupsStyles.dialogFooter}>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            disabled={!selectedIds.length}
            onClick={() => {
              onSubmit(selectedIds);
              onOpenChange(false);
            }}
          >
            {submitLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GroupSelectionDialog;
