"use client";

import React from "react";

import IndividualListOverviewCard from "@/features/list/components/list-details/IndividualListOverviewCard";
import LeadOverviewCard from "@/features/list/components/list-details/LeadOverviewCard";
import LeadsTable from "@/features/list/components/list-details/LeadsTable";
import { listDetailsStyles } from "@/features/list/styles/listDetailsStyles";
import { ListDetail } from "@/features/list/types/listTypes";

const IndividualListDetailsBodyView = ({
  list,
  listId
}: {
  list: ListDetail;
  listId: string;
}) => {
  return (
    <div className={listDetailsStyles.idvLayout}>
      <div className={listDetailsStyles.idvOverviewGrid}>
        <IndividualListOverviewCard list={list} />
        <LeadOverviewCard list={list} />
      </div>

      <LeadsTable listId={listId} variant="individual" />
    </div>
  );
};

export default IndividualListDetailsBodyView;
