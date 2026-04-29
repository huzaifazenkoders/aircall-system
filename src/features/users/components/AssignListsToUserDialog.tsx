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
import { useGetLists } from "@/features/list/services/listService";
import { List } from "@/features/list/types/listTypes";
import { userKeys } from "@/features/users/query-keys";
import { useAddListsToUser } from "@/features/users/services/userService";
import { usersStyles } from "@/features/users/styles/usersStyles";
import { transformInfiniteData } from "@/utils/infiniteQueryUtils";
import { handleMutationError } from "@/utils/handleMutationError";

const AssignListsToUserDialog = ({
  open,
  onOpenChange,
  userId,
  preselectedListIds
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string | null;
  preselectedListIds: string[];
}) => {
  const queryClient = useQueryClient();
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [selectedListIds, setSelectedListIds] = React.useState<string[]>([]);
  const initialSelectedKey = React.useMemo(
    () => [...preselectedListIds].sort().join(","),
    [preselectedListIds]
  );

  const {
    data,
    isPending,
    hasNextPage,
    fetchNextPage
  } = useGetLists({
    limit: 20,
    search: searchValue.trim() || undefined,
    status: "active",
    list_type: "shared"
  });

  const { mutate: addListsToUser, isPending: isAssigning } = useAddListsToUser();

  const availableLists = React.useMemo(
    () => transformInfiniteData(data, "data") as List[],
    [data]
  );

  const preselectedIdsSet = React.useMemo(
    () => new Set(preselectedListIds),
    [preselectedListIds]
  );

  const newListIds = React.useMemo(
    () => selectedListIds.filter((id) => !preselectedIdsSet.has(id)),
    [preselectedIdsSet, selectedListIds]
  );

  React.useEffect(() => {
    if (!open) {
      setPickerOpen(false);
      setSearchValue("");
      setSelectedListIds([]);
      return;
    }

    setSelectedListIds((current) => {
      const merged =
        current.length === 0
          ? preselectedListIds
          : Array.from(new Set([...current, ...preselectedListIds]));
      const currentKey = [...current].sort().join(",");
      const mergedKey = [...merged].sort().join(",");
      return currentKey === mergedKey ? current : merged;
    });
  }, [initialSelectedKey, open, preselectedListIds]);

  const handleToggle = React.useCallback(
    (listId: string, nextChecked: boolean) => {
      if (preselectedIdsSet.has(listId)) return;

      setSelectedListIds((current) => {
        if (nextChecked) {
          return current.includes(listId) ? current : [...current, listId];
        }

        return current.filter((id) => id !== listId);
      });
    },
    [preselectedIdsSet]
  );

  const handleSubmit = React.useCallback(() => {
    if (!userId || newListIds.length === 0) {
      onOpenChange(false);
      return;
    }

    addListsToUser(
      {
        payload: {
          user_id: userId,
          list_ids: newListIds
        }
      },
      {
        onSuccess: (res) => {
          toast.success(res.message || "Lists assigned successfully");
          void queryClient.invalidateQueries({ queryKey: userKeys.all });
          void queryClient.invalidateQueries({ queryKey: userKeys.detail(userId) });
          onOpenChange(false);
        },
        onError: handleMutationError
      }
    );
  }, [addListsToUser, newListIds, onOpenChange, queryClient, userId]);

  const triggerLabel =
    selectedListIds.length > 0
      ? `${selectedListIds.length} list${selectedListIds.length === 1 ? "" : "s"} selected`
      : "Select Lists";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={usersStyles.modalContent}>
        <DialogHeader className={usersStyles.modalHeader}>
          <div className="flex-1">
            <DialogTitle className={usersStyles.modalTitle}>
              Assign Lists to User
            </DialogTitle>
            <DialogDescription className={usersStyles.modalSubtitle}>
              Select lists to assign directly to this user. Leads from these
              lists will be routed to this user.
            </DialogDescription>
          </div>
          <DialogIconClose className="mt-1 size-10 rounded-full text-panel-muted hover:bg-muted" />
        </DialogHeader>

        <DialogBody className={usersStyles.modalBody}>
          <div>
            <label className={usersStyles.sectionLabel}>Lists</label>

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
                    placeholder="Search..."
                    className="w-full text-sm"
                    startIcon={<SearchIcon className="size-4 text-gray-500" />}
                  />
                </div>

                <div
                  id="assign-user-lists-scroll-area"
                  className={`${usersStyles.menuList} max-h-[420px] overflow-y-auto`}
                >
                  {isPending ? (
                    <div className="flex items-center justify-center px-4 py-6">
                      <Loader2Icon className="size-5 animate-spin text-secondary" />
                    </div>
                  ) : !availableLists.length ? (
                    <div className="px-4 py-6 text-center text-sm text-panel-muted">
                      No lists found.
                    </div>
                  ) : (
                    <TooltipProvider>
                      <InfiniteScroll
                        dataLength={availableLists.length}
                        next={() => void fetchNextPage()}
                        hasMore={Boolean(hasNextPage)}
                        loader={
                          <div className="flex items-center justify-center px-4 py-4">
                            <Loader2Icon className="size-4 animate-spin text-secondary" />
                          </div>
                        }
                        scrollThreshold="120px"
                        scrollableTarget="assign-user-lists-scroll-area"
                      >
                        {availableLists.map((list) => {
                          const checked = selectedListIds.includes(list.id);
                          const isLocked = preselectedIdsSet.has(list.id);

                          const row = (
                            <label
                              className={`${usersStyles.listOptionRow} ${isLocked ? "cursor-not-allowed opacity-70" : ""}`}
                            >
                              <Checkbox
                                checked={checked}
                                disabled={isLocked}
                                onCheckedChange={(next) =>
                                  handleToggle(list.id, Boolean(next))
                                }
                                className="mt-0.5 size-6 rounded-[8px] border-[#98A2B3] data-checked:border-secondary data-checked:bg-secondary"
                              />
                              <div className="min-w-0">
                                <div className={usersStyles.assignmentTitle}>
                                  {list.name}
                                </div>
                                <div className={usersStyles.optionMuted}>
                                  {list.total_leads ?? 0} Leads
                                </div>
                              </div>
                            </label>
                          );

                          return isLocked ? (
                            <Tooltip key={list.id}>
                              <TooltipTrigger
                                delay={0}
                                closeDelay={0}
                                render={<div className="w-full" />}
                              >
                                {row}
                              </TooltipTrigger>
                              <TooltipContent>
                                user already assigned to given list
                              </TooltipContent>
                            </Tooltip>
                          ) : (
                            <div key={list.id}>{row}</div>
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
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={!userId || newListIds.length === 0 || isAssigning}
            onClick={handleSubmit}
          >
            {isAssigning ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : null}
            Assign Lists
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignListsToUserDialog;
