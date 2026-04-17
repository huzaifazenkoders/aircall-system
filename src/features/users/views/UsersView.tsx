"use client";

import React from "react";

import AddUserToGroupDialog from "@/features/users/components/AddUserToGroupDialog";
import AssignListsToUserDialog from "@/features/users/components/AssignListsToUserDialog";
import GroupMembersDialog from "@/features/users/components/GroupMembersDialog";
import RemoveGroupDialog from "@/features/users/components/RemoveGroupDialog";
import UserDetailsSheet from "@/features/users/components/UserDetailsSheet";
import UsersConfigDialog from "@/features/users/components/UsersConfigDialog";
import UsersManagementTable from "@/features/users/components/UsersManagementTable";
import {
  useGetUserById,
  useGetUsers
} from "@/features/users/services/userService";
import { usersStyles } from "@/features/users/styles/usersStyles";
import { transformInfiniteData } from "@/utils/infiniteQueryUtils";
import { useDebounce } from "use-debounce";

const UsersView = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const [searchValueD] = useDebounce(searchValue, 500);
  const [statusFilter, setStatusFilter] = React.useState<
    "All Status" | "active" | "suspend" | "invited"
  >("All Status");
  const [selectedUserId, setSelectedUserId] = React.useState<string | null>(
    null
  );
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const [isConfigOpen, setIsConfigOpen] = React.useState(false);
  const [isAssignListsOpen, setIsAssignListsOpen] = React.useState(false);
  const [isAddGroupOpen, setIsAddGroupOpen] = React.useState(false);
  const [isRemoveGroupOpen, setIsRemoveGroupOpen] = React.useState(false);
  const [isGroupMembersOpen, setIsGroupMembersOpen] = React.useState(false);
  const [groupToRemove, setGroupToRemove] = React.useState<{
    id: string;
    name: string;
  } | null>(null);
  const [selectedGroupForMembers, setSelectedGroupForMembers] = React.useState<{
    id: string;
    name: string;
  } | null>(null);

  const { data, isPending, error } = useGetUsers({
    limit: 10,
    search: searchValueD || undefined,
    status: statusFilter === "All Status" ? undefined : statusFilter,
    role: "sales_person"
  });
  const { data: selectedUserData } = useGetUserById(selectedUserId ?? "");

  const users = transformInfiniteData(data, "data");
  const selectedUserGroups = selectedUserData?.data.user_groups ?? [];
  const selectedUserLists = selectedUserData?.data.list_assignments ?? [];
  const selectedUserGroupIds = React.useMemo(
    () => selectedUserGroups.map((group) => group.group.id),
    [selectedUserGroups]
  );
  const selectedUserListIds = React.useMemo(
    () => selectedUserLists.map((list) => list.list.id),
    [selectedUserLists]
  );

  return (
    <div className={usersStyles.page}>
      <div className={usersStyles.contentWrap}>
        <UsersManagementTable
          users={users}
          selectedUserId={selectedUserId ?? ""}
          searchValue={searchValue}
          statusFilter={statusFilter}
          onSearchChange={setSearchValue}
          onStatusChange={setStatusFilter}
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
            setIsAssignListsOpen(true);
          }}
          onAddToGroup={(userId) => {
            setSelectedUserId(userId as string);
            setIsAddGroupOpen(true);
          }}
          onAddUser={() => setIsConfigOpen(true)}
          error={!!error}
          isPending={isPending}
        />
      </div>

      <UserDetailsSheet
        userId={selectedUserId}
        open={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onAddGroup={() => setIsAddGroupOpen(true)}
        onAssignList={() => setIsAssignListsOpen(true)}
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
        preselectedGroupIds={selectedUserGroupIds}
      />
      <AssignListsToUserDialog
        open={isAssignListsOpen}
        onOpenChange={setIsAssignListsOpen}
        userId={selectedUserId}
        preselectedListIds={selectedUserListIds}
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
