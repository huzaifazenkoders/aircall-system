"use client";

import React from "react";
import { Loader2Icon } from "lucide-react";

import AddUserToGroupDialog from "@/features/users/components/AddUserToGroupDialog";
import RemoveGroupDialog from "@/features/users/components/RemoveGroupDialog";
import UsersConfigDialog from "@/features/users/components/UsersConfigDialog";
import UserDetailsSheet from "@/features/users/components/UserDetailsSheet";
import UsersManagementTable from "@/features/users/components/UsersManagementTable";
import { usersStyles } from "@/features/users/styles/usersStyles";
import { useGetUsers } from "@/features/users/services/userService";

const UsersView = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const [selectedUserId, setSelectedUserId] = React.useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const [isConfigOpen, setIsConfigOpen] = React.useState(false);
  const [isAddGroupOpen, setIsAddGroupOpen] = React.useState(false);
  const [isRemoveGroupOpen, setIsRemoveGroupOpen] = React.useState(false);

  const { data, isPending, error } = useGetUsers({
    limit: 10,
    search: searchValue || undefined,
  });

  const users = data?.pages.flatMap((page) => page.data ?? []) ?? [];

  return (
    <div className={usersStyles.page}>
      <div className={usersStyles.contentWrap}>
        {isPending ? (
          <div className="flex flex-1 items-center justify-center py-20">
            <Loader2Icon className="size-8 animate-spin text-secondary" />
          </div>
        ) : error ? (
          <div className="flex flex-1 items-center justify-center py-20 text-sm text-red-500">
            Failed to load users. Please try again.
          </div>
        ) : (
          <UsersManagementTable
            users={users}
            selectedUserId={selectedUserId ?? ""}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            onSelectUser={(userId) => {
              setSelectedUserId(userId as string);
              setIsSheetOpen(true);
            }}
            onViewDetails={(userId) => {
              setSelectedUserId(userId as string);
              setIsSheetOpen(true);
            }}
            onAssignList={(userId) => {
              setSelectedUserId(userId as string);
              setIsConfigOpen(true);
            }}
            onAddToGroup={(userId) => {
              setSelectedUserId(userId as string);
              setIsAddGroupOpen(true);
            }}
            onAddUser={() => setIsConfigOpen(true)}
          />
        )}
      </div>

      <UserDetailsSheet
        userId={selectedUserId}
        open={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onAddGroup={() => setIsAddGroupOpen(true)}
        onAssignList={() => setIsConfigOpen(true)}
        onRemoveGroup={() => setIsRemoveGroupOpen(true)}
      />

      <AddUserToGroupDialog open={isAddGroupOpen} onOpenChange={setIsAddGroupOpen} />
      <UsersConfigDialog open={isConfigOpen} onOpenChange={setIsConfigOpen} />
      <RemoveGroupDialog open={isRemoveGroupOpen} onOpenChange={setIsRemoveGroupOpen} />
    </div>
  );
};

export default UsersView;
