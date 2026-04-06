"use client";

import React from "react";

import AssignmentCard from "@/features/list/components/list-details/AssignmentCard";
import LeadOverviewCard from "@/features/list/components/list-details/LeadOverviewCard";
import LeadsTable from "@/features/list/components/list-details/LeadsTable";
import ListOverviewCard from "@/features/list/components/list-details/ListOverviewCard";
import { listDetailsStyles } from "@/features/list/styles/listDetailsStyles";
import { ListDetail } from "@/features/list/types/listTypes";

const SharedListDetailsBodyView = ({
  list,
  listId
}: {
  list: ListDetail;
  listId: string;
}) => {
  return (
    <div className={listDetailsStyles.grid}>
      <div className="flex flex-col gap-6">
        <ListOverviewCard list={list} />
        <AssignmentCard list={list} />
      </div>

      <div className="min-w-0">
        <LeadOverviewCard list={list} />
        <LeadsTable listId={listId} variant="shared" />
      </div>
    </div>
  );
};

export default SharedListDetailsBodyView;
