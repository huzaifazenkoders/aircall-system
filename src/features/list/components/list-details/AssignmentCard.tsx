"use client";

import React from "react";
import { ChevronDownIcon, ChevronUpIcon, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ListDetail } from "@/features/list/types/listTypes";
import { AuthUser } from "@/features/auth/types/authTypes";
import { Button } from "@/components/ui/button";
import AssignGroupsToListDialog from "@/features/list/components/list-details/AssignGroupsToListDialog";
import AssignUsersToListDialog from "@/features/list/components/list-details/AssignUsersToListDialog";

// ─── Types ────────────────────────────────────────────────────────────────────

interface GroupWithMembers {
  id: string;
  name: string;
  members: AuthUser[];
}

const PREVIEW_COUNT = 3;

// ─── Main Component ───────────────────────────────────────────────────────────

const AssignmentCard = ({ list }: { list: ListDetail }) => {
  const [assignGroupsOpen, setAssignGroupsOpen] = React.useState(false);
  const [assignUsersOpen, setAssignUsersOpen] = React.useState(false);

  const preselectedGroupIds = React.useMemo(
    () =>
      Array.from(
        new Set(
          list.assignments
            .filter((assignment) => assignment.group?.id)
            .map((assignment) => assignment.group!.id)
        )
      ),
    [list.assignments]
  );

  const preselectedUserIds = React.useMemo(
    () =>
      Array.from(
        new Set(
          list.assignments
            .filter((assignment) => assignment.user?.id)
            .map((assignment) => assignment.user!.id)
        )
      ),
    [list.assignments]
  );

  if (list.assign_type === "group") {
    const groups = buildGroups(list);
    return (
      <>
        <div className="self-stretch bg-white rounded-2xl shadow-[0px_5px_22px_0px_rgba(0,0,0,0.04)] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06)] inline-flex flex-col justify-start items-start gap-4 overflow-hidden w-full">
          <div className="self-stretch px-4 py-4 border-b border-zinc-200 inline-flex justify-start items-center">
            <div className="flex-1 py-1.5 inline-flex flex-col justify-start items-start">
              <div className="self-stretch text-gray-800 text-lg font-medium leading-5">
                Assignment
              </div>
            </div>
            <Button
              variant={"outline-transparent"}
              size={"sm"}
              type="button"
              onClick={() => setAssignGroupsOpen(true)}
            >
              <PlusIcon className="" />
              Add
            </Button>
          </div>

          <div className="self-stretch px-4 pb-4 flex flex-col justify-start items-start gap-4">
            {groups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
            {groups.length === 0 && (
              <p className="text-sm text-gray-500">No groups assigned yet.</p>
            )}
          </div>
        </div>

        <AssignGroupsToListDialog
          open={assignGroupsOpen}
          onOpenChange={setAssignGroupsOpen}
          listId={list.id}
          preselectedGroupIds={preselectedGroupIds}
        />
      </>
    );
  }

  // ─── Individual mode (unchanged style) ───────────────────────────────────
  const users = list.assignments
    .filter((a) => a.user !== null)
    .map((a) => a.user!);

  return (
    <>
      <div className="self-stretch bg-white rounded-2xl shadow-[0px_5px_22px_0px_rgba(0,0,0,0.04)] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06)] inline-flex flex-col justify-start items-start gap-4 overflow-hidden w-full">
        <div className="self-stretch px-4 py-4 border-b border-zinc-200 inline-flex justify-start items-center">
          <div className="flex-1 py-1.5">
            <div className="text-gray-800 text-lg font-medium leading-5">
              Assignment
            </div>
          </div>
          <Button
            variant={"outline-transparent"}
            size={"sm"}
            type="button"
            onClick={() => setAssignUsersOpen(true)}
          >
            <PlusIcon className="" />
            Add
          </Button>
        </div>

        <div className="self-stretch px-4 pb-4 flex flex-col gap-2 max-h-[420px] overflow-auto">
          {users.map((u) => (
            <UserRow key={u.id} user={u} />
          ))}
          {users.length === 0 && (
            <p className="text-sm text-gray-500">No individuals assigned yet.</p>
          )}
        </div>
      </div>

      <AssignUsersToListDialog
        open={assignUsersOpen}
        onOpenChange={setAssignUsersOpen}
        listId={list.id}
        preselectedUserIds={preselectedUserIds}
      />
    </>
  );
};

// ─── Group Card ───────────────────────────────────────────────────────────────

const GroupCard = ({ group }: { group: GroupWithMembers }) => {
  const [expanded, setExpanded] = React.useState(true);
  const hasMore = group.members.length > PREVIEW_COUNT;
  const visibleMembers = expanded
    ? group.members
    : group.members.slice(0, PREVIEW_COUNT);

  return (
    <div className="self-stretch flex flex-col justify-start items-start w-full">
      <div className="self-stretch p-4 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-zinc-200 flex flex-col justify-start items-start gap-3">
        {/* Group header */}
        <div className="self-stretch inline-flex justify-between items-center">
          <div className="flex justify-start items-start gap-2">
            <div className="text-gray-800 text-base font-medium leading-5">
              {group.name}
            </div>
          </div>
          <div className="px-2 py-0.5 bg-teal-50 rounded-full outline outline-1 outline-offset-[-1px] outline-teal-100 flex justify-center items-center gap-1">
            <div className="text-teal-600 text-xs font-medium leading-4">
              {group.members.length} Members
            </div>
          </div>
        </div>

        {visibleMembers.length ? (
          <>
            <div className="self-stretch h-px bg-zinc-200" />
            {/* Members */}
            {visibleMembers.map((member) => (
              <React.Fragment key={member.id}>
                <UserRow user={member} />
              </React.Fragment>
            ))}
          </>
        ) : null}

        {/* Toggle footer */}
        {hasMore && (
          <>
            <div className="self-stretch h-px bg-zinc-200" />
            <button
              type="button"
              onClick={() => setExpanded((p) => !p)}
              className="self-stretch inline-flex justify-between items-center"
            >
              <span className="text-teal-600 text-sm font-medium leading-5">
                {expanded ? "Hide" : `View all ${group.members.length} members`}
              </span>
              {expanded ? (
                <ChevronUpIcon
                  className="size-4 text-teal-600"
                  aria-hidden="true"
                />
              ) : (
                <ChevronDownIcon
                  className="size-4 text-teal-600"
                  aria-hidden="true"
                />
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// ─── User Row ─────────────────────────────────────────────────────────────────

const UserRow = ({ user }: { user: AuthUser }) => {
  const name = [user.first_name, user.last_name].filter(Boolean).join(" ");
  const avatarText = initials(name);

  return (
    <div className="self-stretch inline-flex justify-between items-center w-full">
      <div className="flex justify-start items-center gap-2">
        <div className="size-10 rounded-full bg-zinc-100 inline-flex items-center justify-center text-sm font-semibold text-zinc-700 shrink-0">
          {avatarText}
        </div>
        <div className="inline-flex flex-col justify-start items-start">
          <div className="text-gray-800 text-sm font-medium leading-5">
            {name}
          </div>
          <div className="text-gray-500 text-sm font-normal leading-5">
            {user.email}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildGroups(list: ListDetail): GroupWithMembers[] {
  const groupMap = new Map<string, GroupWithMembers>();

  for (const assignment of list.assignments) {
    if (!assignment.group) continue;
    const { id, name } = assignment.group;
    if (!groupMap.has(id)) {
      groupMap.set(id, { id, name, members: [] });
    }
    if (assignment.user) {
      groupMap.get(id)!.members.push(assignment.user);
    }
  }

  return Array.from(groupMap.values());
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase()).join("");
}

export default AssignmentCard;
