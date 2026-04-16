"use client";

import React, { useState } from "react";

import IndividualListOverviewCard from "@/features/list/components/list-details/IndividualListOverviewCard";
import LeadOverviewCard from "@/features/list/components/list-details/LeadOverviewCard";
import LeadsTable from "@/features/list/components/list-details/LeadsTable";
import { listDetailsStyles } from "@/features/list/styles/listDetailsStyles";
import { ListDetail, ListStats } from "@/features/list/types/listTypes";

const IndividualListDetailsBodyView = ({
  list,
  listId
}: {
  list: ListDetail;
  listId: string;
}) => {
  const [listStats, setListStats] = useState<ListStats | null>(null);
  return (
    <div className={listDetailsStyles.idvLayout}>
      <div className={listDetailsStyles.idvOverviewGrid}>
        <IndividualListOverviewCard list={list} />
        <LeadOverviewCard list={list} listStats={listStats} />
      </div>

      <LeadsTable
        listId={listId}
        variant="individual"
        setListStats={setListStats}
      />
    </div>
  );
};

export default IndividualListDetailsBodyView;
