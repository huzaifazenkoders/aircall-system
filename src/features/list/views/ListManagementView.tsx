"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import CreateListDialog from "@/features/list/components/list-all/CreateListDialog";
import ListTable from "@/features/list/components/list-all/ListTable";
import { listStyles } from "@/features/list/styles/listStyles";
import { ListDetail } from "@/features/list/types/listTypes";

const ListManagementView = () => {
  const [createOpen, setCreateOpen] = React.useState(false);
  const [editList, setEditList] = React.useState<ListDetail | null>(null);

  const handleEditClose = (open: boolean) => {
    if (!open) setEditList(null);
  };

  return (
    <div className="flex min-h-[calc(100vh-150px)] flex-1 flex-col px-4 md:px-6 py-6">
      <div className={listStyles.pageHeader}>
        <h1 className={listStyles.pageTitle}>List Management</h1>
        <Button
          className={listStyles.primaryCta}
          onClick={() => setCreateOpen(true)}
        >
          Create New List
        </Button>
      </div>

      <ListTable setCreateOpen={setCreateOpen} setEditList={setEditList} />
      <CreateListDialog open={createOpen} onOpenChange={setCreateOpen} />
      <CreateListDialog
        open={!!editList}
        onOpenChange={handleEditClose}
        mode="edit"
        initialList={editList}
      />
    </div>
  );
};

export default ListManagementView;
