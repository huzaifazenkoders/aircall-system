"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import {
  ArrowLeftIcon,
  Loader2Icon,
  PencilIcon,
  RotateCcwIcon
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import ListOverviewCard from "@/features/list/components/list-details/ListOverviewCard";
import LeadOverviewCard from "@/features/list/components/list-details/LeadOverviewCard";
import AssignmentCard from "@/features/list/components/list-details/AssignmentCard";
import LeadsTable from "@/features/list/components/list-details/LeadsTable";
import DeactivateListDialog from "@/features/list/components/list-all/DeactivateListDialog";
import { listDetailsStyles } from "@/features/list/styles/listDetailsStyles";
import {
  useGetListById,
  useActivateList,
  useDeactivateList
} from "@/features/list/services/listService";
import { handleMutationError } from "@/utils/handleMutationError";
import { listKeys } from "@/features/list/query-keys";
import { cn } from "@/lib/utils";

const ListDetailsView = () => {
  const params = useParams<{ listId: string }>();
  const listId = params?.listId ?? "";
  const queryClient = useQueryClient();

  const [deactivateOpen, setDeactivateOpen] = React.useState(false);

  const { data, isPending, isError } = useGetListById(listId);
  const list = data?.data;

  const { mutate: activateList, isPending: isActivating } = useActivateList();
  const { mutate: deactivateList, isPending: isDeactivating } =
    useDeactivateList();

  const handleActivate = () => {
    activateList(
      { id: listId },
      {
        onSuccess: () => {
          toast.success("List activated successfully");
          queryClient.invalidateQueries({ queryKey: listKeys.detail(listId) });
          queryClient.invalidateQueries({ queryKey: listKeys.all });
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
          queryClient.invalidateQueries({ queryKey: listKeys.detail(listId) });
          queryClient.invalidateQueries({ queryKey: listKeys.all });
          setDeactivateOpen(false);
        },
        onError: handleMutationError
      }
    );
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
          <Button
            type="button"
            variant={"outline-transparent"}
            onClick={isActive ? () => setDeactivateOpen(true) : handleActivate}
            disabled={isActivating || isDeactivating}
          >
            <RotateCcwIcon
              className={cn(
                "size-4 text-muted-foreground",
                isActivating || isDeactivating ? "animate-spine" : ""
              )}
              aria-hidden="true"
            />
            {isActive ? "Deactivate" : "Activate"}
          </Button>
          <Button className={listDetailsStyles.headerEdit}>
            <PencilIcon className="size-4" aria-hidden="true" />
            Edit
          </Button>
        </div>
      </div>

      <div className={listDetailsStyles.grid}>
        <div className="flex flex-col gap-6">
          <ListOverviewCard list={list} />
          <AssignmentCard list={list} />
        </div>

        <div className="min-w-0">
          <LeadOverviewCard list={list} />
          <LeadsTable listId={listId} />
        </div>
      </div>

      <DeactivateListDialog
        open={deactivateOpen}
        onOpenChange={setDeactivateOpen}
        onConfirm={handleDeactivate}
        isPending={isDeactivating}
      />
    </div>
  );
};

export default ListDetailsView;
