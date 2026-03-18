"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { ArrowLeftIcon, PencilIcon, RotateCcwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import ListOverviewCard from "@/features/list/components/list-details/ListOverviewCard";
import LeadOverviewCard from "@/features/list/components/list-details/LeadOverviewCard";
import AssignmentCard from "@/features/list/components/list-details/AssignmentCard";
import LeadsTable from "@/features/list/components/list-details/LeadsTable";
import { listDetailsStyles } from "@/features/list/styles/listDetailsStyles";

const ListDetailsView = () => {
  const params = useParams<{ listId: string }>();
  const listId = params?.listId ?? "101";

  return (
    <div className="flex min-h-[calc(100vh-140px)] flex-1 flex-col">
      <div className={listDetailsStyles.topRow}>
        <div className="min-w-0">
          <Link href="/list" className={listDetailsStyles.backLink}>
            <ArrowLeftIcon className="size-4" aria-hidden="true" />
            Back
          </Link>
          <h1 className={listDetailsStyles.title}>List Details</h1>
        </div>

        <div className={listDetailsStyles.headerActions}>
          <button type="button" className={listDetailsStyles.headerPill}>
            <span className="inline-flex items-center gap-2">
              <RotateCcwIcon className="size-4 text-muted-foreground" aria-hidden="true" />
              Inactive
            </span>
          </button>
          <Button className={listDetailsStyles.headerEdit}>
            <PencilIcon className="size-4" aria-hidden="true" />
            Edit
          </Button>
        </div>
      </div>

      <div className={listDetailsStyles.grid}>
        <div className="flex flex-col gap-6">
          <ListOverviewCard />
          <AssignmentCard />
        </div>

        <div className="min-w-0">
          <LeadOverviewCard />
          <LeadsTable listId={listId} />
        </div>
      </div>
    </div>
  );
};

export default ListDetailsView;

