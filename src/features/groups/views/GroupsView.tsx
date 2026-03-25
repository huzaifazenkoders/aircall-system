"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import GroupConfirmDialog from "@/features/groups/components/GroupConfirmDialog";
import CreateGroupDialog from "@/features/groups/components/CreateGroupDialog";
import GroupDetailsSheet from "@/features/groups/components/GroupDetailsSheet";
import GroupSelectionDialog from "@/features/groups/components/GroupSelectionDialog";
import GroupsEmptyState from "@/features/groups/components/GroupsEmptyState";
import GroupsTable, {
  GroupsCreatedBanner,
} from "@/features/groups/components/GroupsTable";
import {
  GroupAssignedList,
  GroupMember,
  GroupRecord,
  GroupStatus,
  availableListsCatalog,
  groupMembers,
  groupsSeedData,
} from "@/features/groups/data/groupsData";
import { groupsStyles } from "@/features/groups/styles/groupsStyles";

const GroupsView = () => {
  const [groups, setGroups] = React.useState<GroupRecord[]>(groupsSeedData);
  const [createOpen, setCreateOpen] = React.useState(false);
  const [createdName, setCreatedName] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<"All Status" | GroupStatus>("All Status");
  const [selectedGroupId, setSelectedGroupId] = React.useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [activeSheetTab, setActiveSheetTab] = React.useState<"members" | "lists">("members");
  const [addMembersOpen, setAddMembersOpen] = React.useState(false);
  const [assignListsOpen, setAssignListsOpen] = React.useState(false);
  const [memberToRemove, setMemberToRemove] = React.useState<GroupMember | null>(null);
  const [listToUnassign, setListToUnassign] = React.useState<GroupAssignedList | null>(null);
  const [deactivateOpen, setDeactivateOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const handleCreateGroup = ({
    name,
    description,
    memberIds,
  }: {
    name: string;
    description: string;
    memberIds: string[];
  }) => {
    const selectedMembers = groupMembers.filter((member) => memberIds.includes(member.id));

    const createdGroup: GroupRecord = {
      id: name.toLowerCase().replaceAll(" ", "-"),
      name,
      description,
      members: selectedMembers,
      assignedLists: [
        { id: "gold-coast-event", name: "Gold Cost Event", leads: 150 },
        { id: "live-event-brisbane", name: "Live Event Brisbane", leads: 80 },
      ],
      createdOn: "04/12/26",
      status: "Active",
    };

    setGroups((current) => [
      current[0] ?? groupsSeedData[0],
      createdGroup,
      ...current.slice(1),
    ]);
    setCreatedName(name);
  };

  const filteredGroups = React.useMemo(() => {
    return groups.filter((group) => {
      const matchesSearch = group.name.toLowerCase().includes(searchValue.trim().toLowerCase());
      const matchesStatus = statusFilter === "All Status" || group.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [groups, searchValue, statusFilter]);

  const selectedGroup =
    groups.find((group) => group.id === selectedGroupId) ??
    filteredGroups[0] ??
    null;

  const availableMembersForSelectedGroup = React.useMemo(() => {
    if (!selectedGroup) {
      return [];
    }

    const existingMemberIds = new Set(selectedGroup.members.map((member) => member.id));

    return groupMembers.filter((member) => !existingMemberIds.has(member.id));
  }, [selectedGroup]);

  const availableListsForSelectedGroup = React.useMemo(() => {
    if (!selectedGroup) {
      return [];
    }

    const existingListIds = new Set(selectedGroup.assignedLists.map((assignedList) => assignedList.id));

    return availableListsCatalog.filter((list) => !existingListIds.has(list.id));
  }, [selectedGroup]);

  const updateGroup = React.useCallback(
    (groupId: string, updater: (group: GroupRecord) => GroupRecord | null) => {
      setGroups((current) =>
        current
          .map((group) => (group.id === groupId ? updater(group) : group))
          .filter(Boolean) as GroupRecord[]
      );
    },
    []
  );

  const handleAddMembers = (memberIds: string[]) => {
    if (!selectedGroup) {
      return;
    }

    const newMembers = groupMembers.filter((member) => memberIds.includes(member.id));

    updateGroup(selectedGroup.id, (group) => ({
      ...group,
      members: [...group.members, ...newMembers],
    }));
  };

  const handleAssignLists = (listIds: string[]) => {
    if (!selectedGroup) {
      return;
    }

    const newLists = availableListsCatalog.filter((list) => listIds.includes(list.id));

    updateGroup(selectedGroup.id, (group) => ({
      ...group,
      assignedLists: [...group.assignedLists, ...newLists],
    }));
  };

  const handleRemoveMember = () => {
    if (!selectedGroup || !memberToRemove) {
      return;
    }

    updateGroup(selectedGroup.id, (group) => ({
      ...group,
      members: group.members.filter((member) => member.id !== memberToRemove.id),
    }));
    setMemberToRemove(null);
  };

  const handleUnassignList = () => {
    if (!selectedGroup || !listToUnassign) {
      return;
    }

    updateGroup(selectedGroup.id, (group) => ({
      ...group,
      assignedLists: group.assignedLists.filter((assignedList) => assignedList.id !== listToUnassign.id),
    }));
    setListToUnassign(null);
  };

  const handleDeactivate = () => {
    if (!selectedGroup) {
      return;
    }

    updateGroup(selectedGroup.id, (group) => ({
      ...group,
      status: "Inactive",
    }));
    setDeactivateOpen(false);
  };

  const handleDelete = () => {
    if (!selectedGroup) {
      return;
    }

    updateGroup(selectedGroup.id, () => null);
    setDeleteOpen(false);
    setSheetOpen(false);
    setSelectedGroupId(null);
  };

  const openDetails = (groupId: string, tab: "members" | "lists") => {
    setSelectedGroupId(groupId);
    setActiveSheetTab(tab);
    setSheetOpen(true);
  };

  return (
    <div className={groupsStyles.page}>
      <div className={groupsStyles.pageInner}>
        {groups.length === 0 ? (
          <GroupsEmptyState onCreate={() => setCreateOpen(true)} />
        ) : (
          <>
            {createdName ? <GroupsCreatedBanner name={createdName} /> : null}

            <div className={groupsStyles.pageHeader}>
              <h1 className={groupsStyles.title}>Groups</h1>
              <Button className={groupsStyles.createButton} onClick={() => setCreateOpen(true)}>
                Create Group
              </Button>
            </div>

            <GroupsTable
              groups={filteredGroups}
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
        onOpenChange={setCreateOpen}
        members={groupMembers.slice(0, 5)}
        onCreate={handleCreateGroup}
      />

      <GroupDetailsSheet
        group={selectedGroup}
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
      />

      <GroupSelectionDialog
        open={addMembersOpen}
        onOpenChange={setAddMembersOpen}
        title="Add Members to Group"
        description="Select one or more users to include in this group."
        fieldLabel="Members"
        triggerLabel="Select Members"
        searchPlaceholder="Search..."
        submitLabel="Add"
        emptyTitle="No available users found"
        emptyDescription="All active users are already part of this group."
        emptyKind="members"
        items={availableMembersForSelectedGroup.map((member) => ({
          id: member.id,
          title: member.name,
          member,
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
        items={availableListsForSelectedGroup.map((list) => ({
          id: list.id,
          title: list.name,
          subtitle: `${list.leads} Leads`,
        }))}
        onSubmit={handleAssignLists}
      />

      <GroupConfirmDialog
        open={Boolean(memberToRemove)}
        onOpenChange={(open) => {
          if (!open) {
            setMemberToRemove(null);
          }
        }}
        title={
          <>
            Remove <span className="text-secondary">{memberToRemove?.name}</span> from this Group?
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
        actionLabel="Remove Member"
        onConfirm={handleRemoveMember}
      />

      <GroupConfirmDialog
        open={Boolean(listToUnassign)}
        onOpenChange={(open) => {
          if (!open) {
            setListToUnassign(null);
          }
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
        onConfirm={handleUnassignList}
      />

      <GroupConfirmDialog
        open={deactivateOpen}
        onOpenChange={setDeactivateOpen}
        title="Deactivate Group"
        description="This group will no longer receive new leads or be available for list assignment."
        prompt="Do you want to continue?"
        actionLabel="Deactivate Group"
        onConfirm={handleDeactivate}
      />

      <GroupConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Group"
        description="Deleting this group will remove all members and stop lead distribution to this group. Deleting this group will remove all members and stop lead distribution to this group."
        actionLabel="Delete Group"
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default GroupsView;
