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
import { listKeys } from "@/features/list/query-keys";
import { useAssignList } from "@/features/list/services/listService";
import { usersStyles } from "@/features/users/styles/usersStyles";
import { useGetUsers } from "@/features/users/services/userService";
import { User } from "@/features/users/types/userTypes";
import { transformInfiniteData } from "@/utils/infiniteQueryUtils";
import { handleMutationError } from "@/utils/handleMutationError";

const AssignUsersToListDialog = ({
  open,
  onOpenChange,
  listId,
  preselectedUserIds
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listId: string;
  preselectedUserIds: string[];
}) => {
  const queryClient = useQueryClient();
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [selectedUserIds, setSelectedUserIds] = React.useState<string[]>([]);

  const { data, isPending, hasNextPage, fetchNextPage } = useGetUsers({
    limit: 20,
    search: searchValue || undefined,
    status: "active"
  });

  const { mutate: assignList, isPending: isAssigning } = useAssignList();

  const users = React.useMemo(
    () => transformInfiniteData(data, "data") as User[],
    [data]
  );

  const preselectedIdsSet = React.useMemo(
    () => new Set(preselectedUserIds),
    [preselectedUserIds]
  );

  React.useEffect(() => {
    if (!open) {
      setPickerOpen(false);
      setSearchValue("");
      setSelectedUserIds([]);
      return;
    }

    setSelectedUserIds(preselectedUserIds);
  }, [open, preselectedUserIds]);

  const newUserIds = React.useMemo(
    () => selectedUserIds.filter((id) => !preselectedIdsSet.has(id)),
    [preselectedIdsSet, selectedUserIds]
  );

  const handleToggle = React.useCallback(
    (userId: string, nextChecked: boolean) => {
      if (preselectedIdsSet.has(userId)) return;

      setSelectedUserIds((current) => {
        if (nextChecked) {
          return current.includes(userId) ? current : [...current, userId];
        }

        return current.filter((id) => id !== userId);
      });
    },
    [preselectedIdsSet]
  );

  const handleSubmit = React.useCallback(() => {
    if (!listId || newUserIds.length === 0) {
      onOpenChange(false);
      return;
    }

    assignList(
      {
        payload: {
          list_id: listId,
          assign_type: "individual",
          group_ids: [],
          user_ids: selectedUserIds
        }
      },
      {
        onSuccess: (res) => {
          toast.success(res.message || "Users assigned successfully");
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
    newUserIds.length,
    onOpenChange,
    queryClient,
    selectedUserIds
  ]);

  const triggerLabel =
    selectedUserIds.length > 0
      ? `${selectedUserIds.length} user${selectedUserIds.length === 1 ? "" : "s"} selected`
      : "Select users";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={usersStyles.modalContent}>
        <DialogHeader className={usersStyles.modalHeader}>
          <div className="flex-1">
            <DialogTitle className={usersStyles.modalTitle}>
              Assign Users to List
            </DialogTitle>
            <DialogDescription className={usersStyles.modalSubtitle}>
              Select one or more users to assign directly to this list.
            </DialogDescription>
          </div>
          <DialogIconClose className="mt-1 size-10 rounded-full text-panel-muted hover:bg-muted" />
        </DialogHeader>

        <DialogBody className={usersStyles.modalBody}>
          <div>
            <label className={usersStyles.sectionLabel}>Users</label>

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
                <div className="border-b border-border p-3">
                  <TextInput
                    value={searchValue}
                    setValue={setSearchValue}
                    placeholder="Search users"
                    className="w-full text-sm"
                    startIcon={<SearchIcon className="size-4 text-gray-500" />}
                  />
                </div>

                <div
                  id="assign-list-users-scroll-area"
                  className={`${usersStyles.menuList} max-h-[420px] overflow-y-auto`}
                >
                  {isPending ? (
                    <div className="flex items-center justify-center px-4 py-6">
                      <Loader2Icon className="size-5 animate-spin text-secondary" />
                    </div>
                  ) : !users.length ? (
                    <div className="px-4 py-6 text-center text-sm text-panel-muted">
                      No users found.
                    </div>
                  ) : (
                    <TooltipProvider>
                      <InfiniteScroll
                        dataLength={users.length}
                        next={() => void fetchNextPage()}
                        hasMore={Boolean(hasNextPage)}
                        loader={
                          <div className="flex items-center justify-center px-4 py-4">
                            <Loader2Icon className="size-4 animate-spin text-secondary" />
                          </div>
                        }
                        scrollThreshold="120px"
                        scrollableTarget="assign-list-users-scroll-area"
                      >
                        {users.map((user) => {
                          const checked = selectedUserIds.includes(user.id);
                          const isLocked = preselectedIdsSet.has(user.id);
                          const fullName = [user.first_name, user.last_name]
                            .filter(Boolean)
                            .join(" ");

                          const row = (
                            <label
                              className={`${usersStyles.listOptionRow} ${isLocked ? "cursor-not-allowed opacity-70" : ""}`}
                            >
                              <Checkbox
                                checked={checked}
                                disabled={isLocked}
                                onCheckedChange={(next) =>
                                  handleToggle(user.id, Boolean(next))
                                }
                                className="mt-0.5 size-6 rounded-[8px] border-[#98A2B3] data-checked:border-secondary data-checked:bg-secondary"
                              />
                              <div className="min-w-0">
                                <div className={usersStyles.assignmentTitle}>
                                  {fullName}
                                </div>
                                <div className={usersStyles.optionMuted}>
                                  {user.email}
                                </div>
                              </div>
                            </label>
                          );

                          return isLocked ? (
                            <Tooltip key={user.id}>
                              <TooltipTrigger
                                delay={0}
                                closeDelay={0}
                                render={<div className="w-full" />}
                              >
                                {row}
                              </TooltipTrigger>
                              <TooltipContent>
                                User is already assigned to this list
                              </TooltipContent>
                            </Tooltip>
                          ) : (
                            <div key={user.id}>{row}</div>
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
            disabled={!listId || newUserIds.length === 0 || isAssigning}
            onClick={handleSubmit}
          >
            {isAssigning ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : null}
            Assign Users
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignUsersToListDialog;
