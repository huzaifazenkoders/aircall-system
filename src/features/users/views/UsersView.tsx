"use client";

import React from "react";
import { Loader2Icon } from "lucide-react";

import AddUserToGroupDialog from "@/features/users/components/AddUserToGroupDialog";
import GroupMembersDialog from "@/features/users/components/GroupMembersDialog";
import RemoveGroupDialog from "@/features/users/components/RemoveGroupDialog";
import UsersConfigDialog from "@/features/users/components/UsersConfigDialog";
import UserDetailsSheet from "@/features/users/components/UserDetailsSheet";
import UsersManagementTable from "@/features/users/components/UsersManagementTable";
import { usersStyles } from "@/features/users/styles/usersStyles";
import {
  useGetUserById,
  useGetUsers
} from "@/features/users/services/userService";
import { transformInfiniteData } from "@/utils/infiniteQueryUtils";

const UsersView = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const [selectedUserId, setSelectedUserId] = React.useState<string | null>(
    null
  );
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const [isConfigOpen, setIsConfigOpen] = React.useState(false);
  const [isAddGroupOpen, setIsAddGroupOpen] = React.useState(false);
  const [isRemoveGroupOpen, setIsRemoveGroupOpen] = React.useState(false);
  const [isGroupMembersOpen, setIsGroupMembersOpen] = React.useState(false);
  const [groupToRemove, setGroupToRemove] = React.useState<{
    id: string;
    name: string;
  } | null>(null);
  const [selectedGroupForMembers, setSelectedGroupForMembers] =
    React.useState<{
      id: string;
      name: string;
    } | null>(null);

  const { data, isPending, error } = useGetUsers({
    limit: 10,
    search: searchValue || undefined
  });
  const { data: selectedUserData } = useGetUserById(selectedUserId ?? "");

  const users = transformInfiniteData(data, "data");
  const selectedUserGroups = selectedUserData?.data.user_groups ?? [];

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
        onRemoveGroup={(group) => {
          setGroupToRemove(group);
          setIsRemoveGroupOpen(true);
        }}
        onViewGroupMembers={(group) => {
          setSelectedGroupForMembers(group);
          setIsGroupMembersOpen(true);
        }}
      />

      <AddUserToGroupDialog
        open={isAddGroupOpen}
        onOpenChange={setIsAddGroupOpen}
        userId={selectedUserId}
        preselectedGroupIds={selectedUserGroups.map((group) => group.group.id)}
      />
      <GroupMembersDialog
        open={isGroupMembersOpen}
        onOpenChange={(nextOpen) => {
          setIsGroupMembersOpen(nextOpen);
          if (!nextOpen) setSelectedGroupForMembers(null);
        }}
        groupId={selectedGroupForMembers?.id ?? null}
        groupName={selectedGroupForMembers?.name ?? null}
      />
      <UsersConfigDialog open={isConfigOpen} onOpenChange={setIsConfigOpen} />
      <RemoveGroupDialog
        open={isRemoveGroupOpen}
        onOpenChange={(nextOpen) => {
          setIsRemoveGroupOpen(nextOpen);
          if (!nextOpen) setGroupToRemove(null);
        }}
        userId={selectedUserId}
        groupId={groupToRemove?.id ?? null}
        groupName={groupToRemove?.name ?? null}
      />
    </div>
  );
};

export default UsersView;
