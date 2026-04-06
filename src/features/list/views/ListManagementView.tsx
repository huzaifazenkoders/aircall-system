"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import CreateListDialog from "@/features/list/components/list-all/CreateListDialog";
import ListTable from "@/features/list/components/list-all/ListTable";
import { listStyles } from "@/features/list/styles/listStyles";

const ListManagementView = () => {
  const [createOpen, setCreateOpen] = React.useState(false);

  return (
    <div className="flex min-h-[calc(100vh-140px)] flex-1 flex-col mt-5 px-4 md:px-6">
      <div className={listStyles.pageHeader}>
        <h1 className={listStyles.pageTitle}>List Management</h1>
        <Button
          className={listStyles.primaryCta}
          onClick={() => setCreateOpen(true)}
        >
          Create New List
        </Button>
      </div>

      <ListTable setCreateOpen={setCreateOpen} />
      <CreateListDialog open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
};

export default ListManagementView;
