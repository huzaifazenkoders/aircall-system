"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  Loader2Icon,
  PencilIcon,
  RotateCcwIcon,
  Trash2Icon
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import DeactivateListDialog from "@/features/list/components/list-all/DeactivateListDialog";
import ActivateListDialog from "@/features/list/components/list-all/ActivateListDialog";
import CreateListDialog from "@/features/list/components/list-all/CreateListDialog";
import ClearListNowDialog from "@/features/list/components/list-details/ClearListNowDialog";
import ScheduleListClearDialog from "@/features/list/components/list-details/ScheduleListClearDialog";
import { listDetailsStyles } from "@/features/list/styles/listDetailsStyles";
import SharedListDetailsBodyView from "@/features/list/views/SharedListDetailsBodyView";
import IndividualListDetailsBodyView from "@/features/list/views/IndividualListDetailsBodyView";
import {
  useGetListById,
  useActivateList,
  useDeactivateList,
  useListCleanup
} from "@/features/list/services/listService";
import { handleMutationError } from "@/utils/handleMutationError";
import { listKeys } from "@/features/list/query-keys";
import { cn } from "@/lib/utils";

const ListDetailsView = () => {
  const params = useParams<{ listId: string }>();
  const listId = params?.listId ?? "";
  const queryClient = useQueryClient();

  const [deactivateOpen, setDeactivateOpen] = React.useState(false);
  const [activateOpen, setActivateOpen] = React.useState(false);
  const [clearNowOpen, setClearNowOpen] = React.useState(false);
  const [scheduleOpen, setScheduleOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);

  const { data, isPending, isError } = useGetListById(listId);
  const list = data?.data;

  const { mutate: activateList, isPending: isActivating } = useActivateList();
  const { mutate: deactivateList, isPending: isDeactivating } =
    useDeactivateList();
  const { mutate: createListCleanup, isPending: isCreatingCleanup } =
    useListCleanup();

  const isMutatingStatus = isActivating || isDeactivating;

  const invalidateListQueries = () => {
    queryClient.invalidateQueries({ queryKey: listKeys.detail(listId) });
    queryClient.invalidateQueries({ queryKey: listKeys.all });
    queryClient.invalidateQueries({ queryKey: ["lists", "leads"] });
  };

  const handleActivate = () => {
    activateList(
      { id: listId },
      {
        onSuccess: () => {
          toast.success("List activated successfully");
          invalidateListQueries();
          setActivateOpen(false);
        },
        onError: handleMutationError
      }
    );
  };

  const handleDeactivate = () => {
    deactivateList(
      { id: listId },
      {
        onSuccess: () => {
          toast.success("List deactivated successfully");
          invalidateListQueries();
          setDeactivateOpen(false);
        },
        onError: handleMutationError
      }
    );
  };

  const handleCreateCleanup = (payload: {
    cleanup_type: "one_time" | "recurring" | "now";
    run_date?: string;
    run_time?: string;
    recurrence_type?: "weekly" | "monthly";
    day_of_week?: number;
    week_of_month?: number;
    timezone?: string;
  }) => {
    createListCleanup(
      {
        payload: {
          list_id: listId,
          ...payload
        }
      },
      {
        onSuccess: () => {
          toast.success(
            payload.cleanup_type === "now"
              ? "List cleared successfully"
              : payload.cleanup_type === "one_time"
                ? "List clear scheduled successfully"
                : "Recurring list clear created successfully"
          );
          invalidateListQueries();
          setClearNowOpen(false);
          setScheduleOpen(false);
        },
        onError: handleMutationError
      }
    );
  };

  const handleClearNow = () => {
    handleCreateCleanup({
      cleanup_type: "now"
    });
  };

  if (isPending) {
    return (
      <div className="flex min-h-[calc(100vh-140px)] flex-1 items-center justify-center">
        <Loader2Icon className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !list) {
    return (
      <div className="flex min-h-[calc(100vh-140px)] flex-1 items-center justify-center text-sm text-destructive">
        Failed to load list details.
      </div>
    );
  }

  const isActive = list.status === "active";

  return (
    <div className="flex min-h-[calc(100vh-140px)] flex-1 flex-col mt-5 px-4 md:px-6">
      <div className={listDetailsStyles.topRow}>
        <div className="min-w-0">
          <Link href="/list" className={listDetailsStyles.backLink}>
            <ArrowLeftIcon className="size-4" aria-hidden="true" />
            Back
          </Link>
          <h1 className={listDetailsStyles.title}>List Details</h1>
        </div>

        <div className={listDetailsStyles.headerActions}>
          {list.list_type === "individual" ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    type="button"
                    variant="outline-transparent"
                    disabled={isCreatingCleanup}
                  >
                    <Trash2Icon className="size-4 text-destructive" />
                    Clear
                    <ChevronDownIcon className="size-4 text-muted-foreground" />
                  </Button>
                }
              />
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem
                  onClick={() => setClearNowOpen(true)}
                  disabled={isCreatingCleanup}
                >
                  Clear Now
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setScheduleOpen(true)}
                  disabled={isCreatingCleanup}
                >
                  Schedule
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    type="button"
                    variant="outline-transparent"
                    disabled={isMutatingStatus || isCreatingCleanup}
                  >
                    More Action
                    <ChevronDownIcon className="size-4 text-muted-foreground" />
                  </Button>
                }
              />
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem
                  onClick={
                    isActive
                      ? () => setDeactivateOpen(true)
                      : () => setActivateOpen(true)
                  }
                  disabled={isMutatingStatus || isCreatingCleanup}
                >
                  <RotateCcwIcon
                    className={cn(
                      "size-4 text-muted-foreground",
                      isMutatingStatus ? "animate-spin" : ""
                    )}
                  />
                  {isActive ? "Deactivate" : "Activate"}
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="text-destructive [&_svg]:text-destructive">
                    <Trash2Icon className="size-4" />
                    Clear
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="w-44">
                    <DropdownMenuItem
                      onClick={() => setClearNowOpen(true)}
                      disabled={isCreatingCleanup}
                    >
                      Clear Now
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setScheduleOpen(true)}
                      disabled={isCreatingCleanup}
                    >
                      Schedule
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Button type="button" onClick={() => setEditOpen(true)}>
            <PencilIcon className="size-4" aria-hidden="true" />
            Edit
          </Button>
        </div>
      </div>

      {list.list_type === "individual" ? (
        <IndividualListDetailsBodyView list={list} listId={listId} />
      ) : (
        <SharedListDetailsBodyView list={list} listId={listId} />
      )}

      <ActivateListDialog
        open={activateOpen}
        onOpenChange={setActivateOpen}
        onConfirm={handleActivate}
        isPending={isActivating}
      />
      <DeactivateListDialog
        open={deactivateOpen}
        onOpenChange={setDeactivateOpen}
        onConfirm={handleDeactivate}
        isPending={isDeactivating}
      />
      <ClearListNowDialog
        open={clearNowOpen}
        onOpenChange={setClearNowOpen}
        onConfirm={handleClearNow}
        isPending={isCreatingCleanup}
      />
      <ScheduleListClearDialog
        open={scheduleOpen}
        onOpenChange={setScheduleOpen}
        onSubmit={handleCreateCleanup}
        isPending={isCreatingCleanup}
      />
      <CreateListDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        mode="edit"
        initialList={list}
      />
    </div>
  );
};

export default ListDetailsView;
