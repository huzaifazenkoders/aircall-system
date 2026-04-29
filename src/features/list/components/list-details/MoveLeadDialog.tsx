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
import { useGetLists, useMoveLead } from "@/features/list/services/listService";
import { List } from "@/features/list/types/listTypes";
import { listKeys } from "@/features/list/query-keys";
import { usersStyles } from "@/features/users/styles/usersStyles";
import { transformInfiniteData } from "@/utils/infiniteQueryUtils";
import { handleMutationError } from "@/utils/handleMutationError";
import { useDebounce } from "use-debounce";
import { cn } from "@/lib/utils";

const MoveLeadDialog = ({
  open,
  onOpenChange,
  leadId,
  fromListId,
  onConfirm
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  leadId: string | null;
  fromListId: string;
  onConfirm?: () => void;
}) => {
  const queryClient = useQueryClient();
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [debouncedSearch] = useDebounce(searchValue, 400);
  const [selectedListId, setSelectedListId] = React.useState("");

  const { data, isPending, hasNextPage, fetchNextPage } = useGetLists({
    limit: 20,
    search: debouncedSearch.trim() || undefined,
    list_type: "shared"
  });

  const { mutate: moveLead, isPending: isMoving } = useMoveLead();

  const availableLists = React.useMemo(
    () =>
      (transformInfiniteData(data, "data") as List[]).filter(
        (list) => list.id !== fromListId
      ),
    [data, fromListId]
  );

  const selectedList = React.useMemo(
    () => availableLists.find((list) => list.id === selectedListId) ?? null,
    [availableLists, selectedListId]
  );

  React.useEffect(() => {
    if (!open) {
      setPickerOpen(false);
      setSearchValue("");
      setSelectedListId("");
    }
  }, [open]);

  const handleSubmit = React.useCallback(() => {
    if (!leadId || !selectedListId) return;

    moveLead(
      {
        payload: {
          lead_id: leadId,
          from_list_id: fromListId,
          to_list_id: selectedListId
        }
      },
      {
        onSuccess: (res) => {
          toast.success(res.message || "Lead moved successfully");
          onConfirm?.();
          void queryClient.invalidateQueries({
            queryKey: listKeys.detail(fromListId)
          });
          void queryClient.invalidateQueries({ queryKey: ["lists", "leads"] });
          void queryClient.invalidateQueries({ queryKey: listKeys.all });
          onOpenChange(false);
        },
        onError: handleMutationError
      }
    );
  }, [fromListId, leadId, moveLead, onOpenChange, queryClient, selectedListId]);

  const triggerLabel = selectedList
    ? `${selectedList.name} (${selectedList.total_leads ?? 0} Leads)`
    : "Select Lists";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-lg p-0">
        <DialogHeader className="items-start border-b border-border px-6 pt-6 pb-4">
          <div className="flex-1">
            <DialogTitle className="text-2xl font-medium text-text-primary">
              Move Lead to Another List
            </DialogTitle>
            <DialogDescription className="mt-2 text-sm text-panel-muted">
              The lead will be reassigned to the selected list and follow its
              workflow. Existing progress, including status and scheduling, will
              be reset.
            </DialogDescription>
          </div>
          <DialogIconClose className="mt-1 size-10 rounded-full text-panel-muted hover:bg-muted" />
        </DialogHeader>

        <DialogBody className="px-6 py-4">
          <div>
            <label className={usersStyles.sectionLabel}>Lists</label>

            <DropdownMenu open={pickerOpen} onOpenChange={setPickerOpen}>
              <DropdownMenuTrigger
                render={
                  <button
                    type="button"
                    className={cn(usersStyles.triggerField, "mt-2")}
                  >
                    <span className={selectedList ? "text-text-primary" : ""}>
                      {triggerLabel}
                    </span>
                    {pickerOpen ? (
                      <ChevronUpIcon className="size-6 text-panel-muted" />
                    ) : (
                      <ChevronDownIcon className="size-6 text-panel-muted" />
                    )}
                  </button>
                }
              />

              <DropdownMenuContent
                className="mt-0 w-(--anchor-width) rounded-lg border border-border bg-white p-0 shadow-[0_20px_40px_rgba(15,23,42,0.08)]"
                sideOffset={8}
              >
                <div className="border-b border-border p-4" onKeyDown={(e) => e.stopPropagation()}>
                  <TextInput
                    value={searchValue}
                    setValue={setSearchValue}
                    placeholder="Search..."
                    className="w-full text-sm"
                    startIcon={<SearchIcon className="size-4 text-gray-500" />}
                  />
                </div>

                <div
                  id="move-lead-lists-scroll-area"
                  className="max-h-[320px] overflow-y-auto py-2"
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
                      scrollableTarget="move-lead-lists-scroll-area"
                    >
                      {availableLists.map((list) => {
                        const checked = selectedListId === list.id;

                        return (
                          <button
                            key={list.id}
                            type="button"
                            onClick={() => setSelectedListId(list.id)}
                            className="flex w-full items-start gap-4 px-5 py-3 text-left text-sm text-text-primary hover:bg-muted/40"
                          >
                            <span
                              className={cn(
                                "mt-1 flex size-6 items-center justify-center rounded-full border-2 transition-colors",
                                checked
                                  ? "border-secondary"
                                  : "border-[#98A2B3]"
                              )}
                            >
                              <span
                                className={cn(
                                  "size-2.5 rounded-full transition-colors",
                                  checked ? "bg-secondary" : "bg-transparent"
                                )}
                              />
                            </span>
                            <div className="min-w-0">
                              <div className="font-medium text-text-primary">
                                {list.name}
                                <span className="ml-2 font-normal text-panel-muted">
                                  ({list.total_leads ?? 0} Leads)
                                </span>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </InfiniteScroll>
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </DialogBody>

        <DialogFooter className="justify-end gap-4 px-8 pt-0 pb-8">
          <Button
            type="button"
            variant="outline"
            disabled={isMoving}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={!leadId || !selectedListId || isMoving}
            onClick={handleSubmit}
          >
            {isMoving ? <Loader2Icon className="size-4 animate-spin" /> : null}
            Move Lead
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MoveLeadDialog;
