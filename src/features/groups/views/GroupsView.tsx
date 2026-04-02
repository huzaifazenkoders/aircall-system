"use client";

import React from "react";
import { Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import GroupConfirmDialog from "@/features/groups/components/GroupConfirmDialog";
import CreateGroupDialog from "@/features/groups/components/CreateGroupDialog";
import DeactivateGroupDialog from "@/features/groups/components/DeactivateGroupDialog";
import DeleteGroupDialog from "@/features/groups/components/DeleteGroupDialog";
import EditGroupDialog from "@/features/groups/components/EditGroupDialog";
import GroupDetailsSheet from "@/features/groups/components/GroupDetailsSheet";
import GroupSelectionDialog from "@/features/groups/components/GroupSelectionDialog";
import GroupsEmptyState from "@/features/groups/components/GroupsEmptyState";
import GroupsTable, {
  GroupsCreatedBanner
} from "@/features/groups/components/GroupsTable";
import { GroupStatus, groupMembers } from "@/features/groups/data/groupsData";
import { groupsStyles } from "@/features/groups/styles/groupsStyles";
import {
  useGetGroups,
  useAddUsersToGroup,
  useRemoveUserFromGroup,
  useUpdateGroupStatus,
  useDeleteGroup
} from "@/features/groups/services/groupService";
import { groupKeys } from "@/features/groups/query-keys";
import { handleMutationError } from "@/utils/handleMutationError";
import { Group, GroupInfo, GroupUser } from "@/features/groups/types/groupTypes";
import { transformInfiniteData } from "@/utils/infiniteQueryUtils";

type ListAssignment = GroupInfo["list_assignments"][number];

const GroupsView = () => {
  const queryClient = useQueryClient();

  const [createOpen, setCreateOpen] = React.useState(false);
  const [createdName, setCreatedName] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<
    "All Status" | GroupStatus
  >("All Status");
  const [selectedGroupId, setSelectedGroupId] = React.useState<string | null>(
    null
  );
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [activeSheetTab, setActiveSheetTab] = React.useState<
    "members" | "lists"
  >("members");
  const [addMembersOpen, setAddMembersOpen] = React.useState(false);
  const [assignListsOpen, setAssignListsOpen] = React.useState(false);
  const [memberToRemove, setMemberToRemove] = React.useState<GroupUser | null>(
    null
  );
  const [listToUnassign, setListToUnassign] =
    React.useState<ListAssignment | null>(null);
  const [deactivateOpen, setDeactivateOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);

  const isActiveFilter =
    statusFilter === "All Status" ? undefined : statusFilter === "Active";

  const { data, isPending, error } = useGetGroups({
    limit: 10,
    search: searchValue || undefined,
    is_active: isActiveFilter
  });

  const groups: Group[] = transformInfiniteData(data, "data");

  const { mutate: addUsers, isPending: isAddingUsers } = useAddUsersToGroup();
  const { mutate: removeUser, isPending: isRemoving } =
    useRemoveUserFromGroup();
  const { mutate: updateStatus, isPending: isDeactivating } =
    useUpdateGroupStatus();
  const { mutate: deleteGroup, isPending: isDeleting } = useDeleteGroup();

  const handleAddMembers = (memberIds: string[]) => {
    if (!selectedGroupId) return;
    addUsers(
      { payload: { id: selectedGroupId, user_ids: memberIds } },
      {
        onSuccess: () => {
          toast.success("Members added successfully");
          queryClient.invalidateQueries({
            queryKey: groupKeys.info(selectedGroupId)
          });
          queryClient.invalidateQueries({ queryKey: groupKeys.all });
        },
        onError: handleMutationError
      }
    );
  };

  const handleRemoveMember = () => {
    if (!selectedGroupId || !memberToRemove) return;
    removeUser(
      { group_id: selectedGroupId, user_id: memberToRemove.id },
      {
        onSuccess: () => {
          toast.success(
            `${memberToRemove.first_name} removed from group`
          );
          queryClient.invalidateQueries({
            queryKey: groupKeys.info(selectedGroupId)
          });
          queryClient.invalidateQueries({ queryKey: groupKeys.all });
          setMemberToRemove(null);
        },
        onError: handleMutationError
      }
    );
  };

  const handleDeactivate = () => {
    if (!selectedGroupId) return;
    updateStatus(
      { payload: { id: selectedGroupId } },
      {
        onSuccess: () => {
          toast.success("Group status updated");
          queryClient.invalidateQueries({
            queryKey: groupKeys.info(selectedGroupId)
          });
          queryClient.invalidateQueries({ queryKey: groupKeys.all });
          setDeactivateOpen(false);
        },
        onError: handleMutationError
      }
    );
  };

  const handleDelete = () => {
    if (!selectedGroupId) return;
    deleteGroup(
      { id: selectedGroupId },
      {
        onSuccess: () => {
          toast.success("Group deleted successfully");
          queryClient.invalidateQueries({ queryKey: groupKeys.all });
          setDeleteOpen(false);
          setSheetOpen(false);
          setSelectedGroupId(null);
        },
        onError: handleMutationError
      }
    );
  };

  const openDetails = (groupId: string, tab: "members" | "lists") => {
    setSelectedGroupId(groupId);
    setActiveSheetTab(tab);
    setSheetOpen(true);
  };

  return (
    <div className={groupsStyles.page}>
      <div className={groupsStyles.pageInner}>
        {isPending ? (
          <div className="flex flex-1 items-center justify-center py-20">
            <Loader2Icon className="size-8 animate-spin text-secondary" />
          </div>
        ) : error ? (
          <div className="flex flex-1 items-center justify-center py-20 text-sm text-red-500">
            Failed to load groups. Please try again.
          </div>
        ) : groups.length === 0 &&
          !searchValue &&
          statusFilter === "All Status" ? (
          <GroupsEmptyState onCreate={() => setCreateOpen(true)} />
        ) : (
          <>
            {createdName ? <GroupsCreatedBanner name={createdName} /> : null}

            <div className={groupsStyles.pageHeader}>
              <h1 className={groupsStyles.title}>Groups</h1>
              <Button
                size="xl"
                className={groupsStyles.createButton}
                onClick={() => setCreateOpen(true)}
              >
                Create Group
              </Button>
            </div>

            <GroupsTable
              groups={groups}
              searchValue={searchValue}
              statusFilter={statusFilter}
              onSearchChange={setSearchValue}
              onStatusChange={setStatusFilter}
              onViewDetails={(groupId) => openDetails(groupId, "members")}
              onAssignList={(groupId) => openDetails(groupId, "lists")}
              onAddMember={(groupId) => openDetails(groupId, "members")}
            />
          </>
        )}
      </div>

      <CreateGroupDialog
        open={createOpen}
        onOpenChange={(open) => {
          setCreateOpen(open);
          if (!open && createdName) setCreatedName("");
        }}
        members={groupMembers}
      />

      <GroupDetailsSheet
        groupId={selectedGroupId}
        open={sheetOpen}
        activeTab={activeSheetTab}
        onTabChange={setActiveSheetTab}
        onClose={() => setSheetOpen(false)}
        onAddMembers={() => setAddMembersOpen(true)}
        onAssignLists={() => setAssignListsOpen(true)}
        onRemoveMember={setMemberToRemove}
        onUnassignList={setListToUnassign}
        onDeactivate={() => setDeactivateOpen(true)}
        onDelete={() => setDeleteOpen(true)}
        onEdit={() => setEditOpen(true)}
      />

      <GroupSelectionDialog
        open={addMembersOpen}
        onOpenChange={setAddMembersOpen}
        title="Add Members to Group"
        description="Select one or more users to include in this group."
        fieldLabel="Members"
        triggerLabel="Select Members"
        searchPlaceholder="Search..."
        submitLabel={isAddingUsers ? "Adding..." : "Add"}
        emptyTitle="No available users found"
        emptyDescription="All active users are already part of this group."
        emptyKind="members"
        items={groupMembers.map((member) => ({
          id: member.id,
          title: member.name,
          member
        }))}
        onSubmit={handleAddMembers}
      />

      <GroupSelectionDialog
        open={assignListsOpen}
        onOpenChange={setAssignListsOpen}
        title="Assign Lists to Group"
        description="Select one or more lists to assign to this group. All group members will receive leads from these lists."
        fieldLabel="Lists"
        triggerLabel="Select Lists"
        searchPlaceholder="Search..."
        submitLabel="Assign Lists"
        emptyTitle="No available lists found"
        emptyDescription="All available lists are already assigned to this group."
        emptyKind="lists"
        items={[]}
        onSubmit={() => {}}
      />

      <GroupConfirmDialog
        open={Boolean(memberToRemove)}
        onOpenChange={(open) => {
          if (!open) setMemberToRemove(null);
        }}
        title={
          <>
            Remove{" "}
            <span className="text-secondary">
              {memberToRemove?.first_name} {memberToRemove?.last_name}
            </span>{" "}
            from this Group?
          </>
        }
        description={
          <>
            This user will no longer receive leads assigned to this group.
            <br />
            Ongoing calls and existing lead assignments will not be affected.
          </>
        }
        prompt="Are you sure you want to remove this member?"
        actionLabel={isRemoving ? "Removing..." : "Remove Member"}
        onConfirm={handleRemoveMember}
      />

      <GroupConfirmDialog
        open={Boolean(listToUnassign)}
        onOpenChange={(open) => {
          if (!open) setListToUnassign(null);
        }}
        title="Unassign List from Group?"
        description={
          <>
            This group will stop receiving new leads from this list.
            <br />
            Existing assigned leads will remain unchanged.
          </>
        }
        prompt="Do you want to continue?"
        actionLabel="Unassign List"
        onConfirm={() => {
          // unassign list API to be wired when endpoint is available
          setListToUnassign(null);
        }}
      />

      <DeactivateGroupDialog
        open={deactivateOpen}
        onOpenChange={setDeactivateOpen}
        onConfirm={handleDeactivate}
      />

      <DeleteGroupDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDelete}
      />

      <EditGroupDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        groupId={selectedGroupId}
        members={groupMembers}
      />
    </div>
  );
};

export default GroupsView;
