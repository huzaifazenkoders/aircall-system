"use client";

import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  Loader2Icon,
  SearchIcon
} from "lucide-react";
import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroll-component";

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
import TextInput from "@/components/ui/text-input";
import {
  useAddGroupsToUser,
  useGetGroups
} from "@/features/groups/services/groupService";
import { usersStyles } from "@/features/users/styles/usersStyles";
import { userKeys } from "@/features/users/query-keys";
import { transformInfiniteData } from "@/utils/infiniteQueryUtils";
import { handleMutationError } from "@/utils/handleMutationError";
import { useDebounce } from "use-debounce";

type GroupOption = {
  id: string;
  name: string;
  total_users?: number;
};

const AddUserToGroupDialog = ({
  open,
  onOpenChange,
  userId,
  preselectedGroupIds
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string | null;
  preselectedGroupIds: string[];
}) => {
  const queryClient = useQueryClient();
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [debouncedSearch] = useDebounce(searchValue, 400);
  const [selectedGroups, setSelectedGroups] = React.useState<string[]>([]);

  const { data, isPending, hasNextPage, fetchNextPage } = useGetGroups({
    limit: 20,
    search: debouncedSearch.trim() || undefined
  });

  const { mutate: addGroupsToUser, isPending: isAddingGroups } =
    useAddGroupsToUser();

  const availableGroups = React.useMemo(
    () => transformInfiniteData(data, "data") as GroupOption[],
    [data]
  );

  const preselectedGroupIdsSet = React.useMemo(
    () => new Set(preselectedGroupIds),
    [preselectedGroupIds]
  );

  const newlySelectedGroupIds = React.useMemo(
    () => selectedGroups.filter((id) => !preselectedGroupIdsSet.has(id)),
    [preselectedGroupIdsSet, selectedGroups]
  );

  React.useEffect(() => {
    if (!open) {
      setPickerOpen(false);
      setSearchValue("");
      setSelectedGroups([]);
      return;
    }

    setSelectedGroups((current) =>
      current.length === 0
        ? preselectedGroupIds
        : Array.from(new Set([...current, ...preselectedGroupIds]))
    );
  }, [open, preselectedGroupIds]);

  const handleGroupToggle = React.useCallback(
    (groupId: string, nextChecked: boolean) => {
      if (preselectedGroupIdsSet.has(groupId)) return;

      setSelectedGroups((current) => {
        if (nextChecked) {
          return current.includes(groupId) ? current : [...current, groupId];
        }

        return current.filter((id) => id !== groupId);
      });
    },
    [preselectedGroupIdsSet]
  );

  const handleSubmit = React.useCallback(() => {
    if (!userId || newlySelectedGroupIds.length === 0) {
      onOpenChange(false);
      return;
    }

    addGroupsToUser(
      {
        payload: {
          id: userId,
          group_ids: newlySelectedGroupIds
        }
      },
      {
        onSuccess: (res) => {
          toast.success(res.message || "Groups added successfully");
          void queryClient.invalidateQueries({ queryKey: userKeys.all });
          onOpenChange(false);
        },
        onError: handleMutationError
      }
    );
  }, [
    addGroupsToUser,
    newlySelectedGroupIds,
    onOpenChange,
    queryClient,
    userId
  ]);

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
                <div className="border-b border-border p-3" onKeyDown={(e) => e.stopPropagation()}>
                  <TextInput
                    value={searchValue}
                    setValue={setSearchValue}
                    placeholder="Search groups"
                    className="w-full text-sm"
                    startIcon={<SearchIcon className="size-4 text-gray-500" />}
                  />
                </div>

                <div
                  id="add-user-groups-scroll-area"
                  className={`${usersStyles.menuList} max-h-72 overflow-y-auto`}
                >
                  {isPending ? (
                    <div className="flex items-center justify-center px-4 py-6">
                      <Loader2Icon className="size-5 animate-spin text-secondary" />
                    </div>
                  ) : !availableGroups.length ? (
                    <div className="px-4 py-6 text-center text-sm text-panel-muted">
                      No groups found.
                    </div>
                  ) : (
                    <InfiniteScroll
                      dataLength={availableGroups.length}
                      next={() => void fetchNextPage()}
                      hasMore={Boolean(hasNextPage)}
                      loader={
                        <div className="flex items-center justify-center px-4 py-4">
                          <Loader2Icon className="size-4 animate-spin text-secondary" />
                        </div>
                      }
                      scrollThreshold="120px"
                      scrollableTarget="add-user-groups-scroll-area"
                    >
                      {availableGroups.map((group) => {
                        const checked = selectedGroups.includes(group.id);
                        const isLocked = preselectedGroupIdsSet.has(group.id);

                        return (
                          <label
                            key={group.id}
                            className={`${usersStyles.optionRow} ${isLocked ? "cursor-not-allowed opacity-70" : ""}`}
                          >
                            <Checkbox
                              checked={checked}
                              disabled={isLocked}
                              onCheckedChange={(next) =>
                                handleGroupToggle(group.id, Boolean(next))
                              }
                              className="size-6 rounded-[8px] border-[#98A2B3] data-checked:border-secondary data-checked:bg-secondary"
                            />
                            <span>{group.name}</span>
                            <span className={usersStyles.optionMuted}>
                              ({group.total_users ?? 0} users)
                            </span>
                          </label>
                        );
                      })}
                    </InfiniteScroll>
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </DialogBody>

        <DialogFooter className={usersStyles.modalFooter}>
          <Button
            variant="outline"
            disabled={isAddingGroups}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            disabled={
              !userId || newlySelectedGroupIds.length === 0 || isAddingGroups
            }
            onClick={handleSubmit}
          >
            {isAddingGroups ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : null}
            Add to Group
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserToGroupDialog;
