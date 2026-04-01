"use client";

import React from "react";

import AddUserToGroupDialog from "@/features/users/components/AddUserToGroupDialog";
import RemoveGroupDialog from "@/features/users/components/RemoveGroupDialog";
import UsersConfigDialog from "@/features/users/components/UsersConfigDialog";
import UserDetailsSheet from "@/features/users/components/UserDetailsSheet";
import UsersManagementTable from "@/features/users/components/UsersManagementTable";
import { usersData } from "@/features/users/data/usersData";
import { usersStyles } from "@/features/users/styles/usersStyles";

const UsersView = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const [selectedUserId, setSelectedUserId] = React.useState(usersData[0].id);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const [isConfigOpen, setIsConfigOpen] = React.useState(false);
  const [isAddGroupOpen, setIsAddGroupOpen] = React.useState(false);
  const [isRemoveGroupOpen, setIsRemoveGroupOpen] = React.useState(false);

  const filteredUsers = React.useMemo(() => {
    const query = searchValue.trim().toLowerCase();

    if (!query) {
      return usersData;
    }

    return usersData.filter((user) =>
      [user.name, user.email, user.phone].some((value) =>
        value.toLowerCase().includes(query)
      )
    );
  }, [searchValue]);

  const selectedUser =
    filteredUsers.find((user) => user.id === selectedUserId) ??
    usersData.find((user) => user.id === selectedUserId) ??
    usersData[0];

  return (
    <div className={usersStyles.page}>
      <div className={usersStyles.contentWrap}>
        <UsersManagementTable
          users={filteredUsers}
          selectedUserId={selectedUser.id}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onSelectUser={(userId) => {
            setSelectedUserId(userId);
            setIsSheetOpen(true);
          }}
          onViewDetails={(userId) => {
            setSelectedUserId(userId);
            setIsSheetOpen(true);
          }}
          onAssignList={(userId) => {
            setSelectedUserId(userId);
            setIsConfigOpen(true);
          }}
          onAddToGroup={(userId) => {
            setSelectedUserId(userId);
            setIsAddGroupOpen(true);
          }}
          onAddUser={() => setIsConfigOpen(true)}
        />
      </div>

      <UserDetailsSheet
        user={selectedUser}
        open={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onAddGroup={() => setIsAddGroupOpen(true)}
        onAssignList={() => setIsConfigOpen(true)}
        onRemoveGroup={() => setIsRemoveGroupOpen(true)}
      />

      <AddUserToGroupDialog
        open={isAddGroupOpen}
        onOpenChange={setIsAddGroupOpen}
      />
      <UsersConfigDialog open={isConfigOpen} onOpenChange={setIsConfigOpen} />
      <RemoveGroupDialog
        open={isRemoveGroupOpen}
        onOpenChange={setIsRemoveGroupOpen}
      />
    </div>
  );
};

export default UsersView;
