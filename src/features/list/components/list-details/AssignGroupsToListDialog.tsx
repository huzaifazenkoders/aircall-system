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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { useGetGroups } from "@/features/groups/services/groupService";
import { Group } from "@/features/groups/types/groupTypes";
import { listKeys } from "@/features/list/query-keys";
import { useAssignList } from "@/features/list/services/listService";
import { usersStyles } from "@/features/users/styles/usersStyles";
import { transformInfiniteData } from "@/utils/infiniteQueryUtils";
import { handleMutationError } from "@/utils/handleMutationError";
import { useDebounce } from "use-debounce";

const AssignGroupsToListDialog = ({
  open,
  onOpenChange,
  listId,
  preselectedGroupIds
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listId: string;
  preselectedGroupIds: string[];
}) => {
  const queryClient = useQueryClient();
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [debouncedSearch] = useDebounce(searchValue, 400);
  const [selectedGroupIds, setSelectedGroupIds] = React.useState<string[]>([]);

  const { data, isPending, hasNextPage, fetchNextPage } = useGetGroups({
    limit: 20,
    search: debouncedSearch.trim() || undefined,
    is_active: true
  });

  const { mutate: assignList, isPending: isAssigning } = useAssignList();

  const groups = React.useMemo(
    () => transformInfiniteData(data, "data") as Group[],
    [data]
  );

  const preselectedIdsSet = React.useMemo(
    () => new Set(preselectedGroupIds),
    [preselectedGroupIds]
  );

  React.useEffect(() => {
    if (!open) {
      setPickerOpen(false);
      setSearchValue("");
      setSelectedGroupIds([]);
      return;
    }

    setSelectedGroupIds(preselectedGroupIds);
  }, [open, preselectedGroupIds]);

  const newGroupIds = React.useMemo(
    () => selectedGroupIds.filter((id) => !preselectedIdsSet.has(id)),
    [preselectedIdsSet, selectedGroupIds]
  );

  const handleToggle = React.useCallback(
    (groupId: string, nextChecked: boolean) => {
      if (preselectedIdsSet.has(groupId)) return;

      setSelectedGroupIds((current) => {
        if (nextChecked) {
          return current.includes(groupId) ? current : [...current, groupId];
        }

        return current.filter((id) => id !== groupId);
      });
    },
    [preselectedIdsSet]
  );

  const handleSubmit = React.useCallback(() => {
    if (!listId || newGroupIds.length === 0) {
      onOpenChange(false);
      return;
    }

    assignList(
      {
        payload: {
          list_id: listId,
          assign_type: "group",
          group_ids: selectedGroupIds,
          user_ids: []
        }
      },
      {
        onSuccess: (res) => {
          toast.success(res.message || "Groups assigned successfully");
          void queryClient.invalidateQueries({
            queryKey: listKeys.detail(listId)
          });
          void queryClient.invalidateQueries({ queryKey: listKeys.all });
          onOpenChange(false);
        },
        onError: handleMutationError
      }
    );
  }, [
    assignList,
    listId,
    newGroupIds.length,
    onOpenChange,
    queryClient,
    selectedGroupIds
  ]);

  const triggerLabel =
    selectedGroupIds.length > 0
      ? `${selectedGroupIds.length} group${selectedGroupIds.length === 1 ? "" : "s"} selected`
      : "Select groups";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={usersStyles.modalContent}>
        <DialogHeader className={usersStyles.modalHeader}>
          <div className="flex-1">
            <DialogTitle className={usersStyles.modalTitle}>
              Assign Groups to List
            </DialogTitle>
            <DialogDescription className={usersStyles.modalSubtitle}>
              Select one or more groups to assign to this list.
            </DialogDescription>
          </div>
          <DialogIconClose className="mt-1 size-10 rounded-full text-panel-muted hover:bg-muted" />
        </DialogHeader>

        <DialogBody className={usersStyles.modalBody}>
          <div>
            <label className={usersStyles.sectionLabel}>Groups</label>

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
                  id="assign-list-groups-scroll-area"
                  className={`${usersStyles.menuList} max-h-[420px] overflow-y-auto`}
                >
                  {isPending ? (
                    <div className="flex items-center justify-center px-4 py-6">
                      <Loader2Icon className="size-5 animate-spin text-secondary" />
                    </div>
                  ) : !groups.length ? (
                    <div className="px-4 py-6 text-center text-sm text-panel-muted">
                      No groups found.
                    </div>
                  ) : (
                    <TooltipProvider>
                      <InfiniteScroll
                        dataLength={groups.length}
                        next={() => void fetchNextPage()}
                        hasMore={Boolean(hasNextPage)}
                        loader={
                          <div className="flex items-center justify-center px-4 py-4">
                            <Loader2Icon className="size-4 animate-spin text-secondary" />
                          </div>
                        }
                        scrollThreshold="120px"
                        scrollableTarget="assign-list-groups-scroll-area"
                      >
                        {groups.map((group) => {
                          const checked = selectedGroupIds.includes(group.id);
                          const isLocked = preselectedIdsSet.has(group.id);

                          const row = (
                            <label
                              className={`${usersStyles.listOptionRow} ${isLocked ? "cursor-not-allowed opacity-70" : ""}`}
                            >
                              <Checkbox
                                checked={checked}
                                disabled={isLocked}
                                onCheckedChange={(next) =>
                                  handleToggle(group.id, Boolean(next))
                                }
                                className="mt-0.5 size-6 rounded-[8px] border-[#98A2B3] data-checked:border-secondary data-checked:bg-secondary"
                              />
                              <div className="min-w-0">
                                <div className={usersStyles.assignmentTitle}>
                                  {group.name}
                                </div>
                                <div className={usersStyles.optionMuted}>
                                  {group.total_users ?? 0} users
                                </div>
                              </div>
                            </label>
                          );

                          return isLocked ? (
                            <Tooltip key={group.id}>
                              <TooltipTrigger delay={0} closeDelay={0}>
                                {row}
                              </TooltipTrigger>
                              <TooltipContent>
                                Group already assigned to this list
                              </TooltipContent>
                            </Tooltip>
                          ) : (
                            <div key={group.id}>{row}</div>
                          );
                        })}
                      </InfiniteScroll>
                    </TooltipProvider>
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </DialogBody>

        <DialogFooter className={usersStyles.modalFooter}>
          <Button
            type="button"
            variant="outline"
            disabled={isAssigning}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={!listId || newGroupIds.length === 0 || isAssigning}
            onClick={handleSubmit}
          >
            {isAssigning ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : null}
            Assign Groups
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignGroupsToListDialog;
