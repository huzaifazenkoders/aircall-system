"use client";

import React from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  Loader2Icon,
  MoreVerticalIcon,
  PlusIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ListDetail } from "@/features/list/types/listTypes";
import { AuthUser } from "@/features/auth/types/authTypes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogIconClose,
  DialogTitle
} from "@/components/ui/dialog";
import AssignGroupsToListDialog from "@/features/list/components/list-details/AssignGroupsToListDialog";
import AssignUsersToListDialog from "@/features/list/components/list-details/AssignUsersToListDialog";
import { useUnassignList } from "@/features/list/services/listService";
import { useRemoveUserFromGroup } from "@/features/groups/services/groupService";
import { groupKeys } from "@/features/groups/query-keys";
import { listKeys } from "@/features/list/query-keys";
import { userKeys } from "@/features/users/query-keys";
import { handleMutationError } from "@/utils/handleMutationError";

// ─── Types ────────────────────────────────────────────────────────────────────

interface GroupWithMembers {
  id: string;
  name: string;
  user_groups: AuthUser[];
}

type ConfirmAction =
  | {
      type: "unassign-group";
      groupId: string;
      groupName: string;
    }
  | {
      type: "unassign-user";
      userId: string;
      userName: string;
    }
  | {
      type: "remove-user-from-group";
      groupId: string;
      groupName: string;
      userId: string;
      userName: string;
    };

const PREVIEW_COUNT = 3;

// ─── Main Component ───────────────────────────────────────────────────────────

const AssignmentCard = ({ list }: { list: ListDetail }) => {
  const queryClient = useQueryClient();
  const [assignGroupsOpen, setAssignGroupsOpen] = React.useState(false);
  const [assignUsersOpen, setAssignUsersOpen] = React.useState(false);
  const [confirmAction, setConfirmAction] =
    React.useState<ConfirmAction | null>(null);
  const { mutate: unassignList, isPending: isUnassigning } = useUnassignList();
  const { mutate: removeUserFromGroup, isPending: isRemovingUser } =
    useRemoveUserFromGroup();

  const handleGroupModeConfirm = React.useCallback(() => {
    if (!confirmAction) return;

    if (confirmAction.type === "unassign-group") {
      unassignList(
        {
          payload: {
            list_id: list.id,
            group_id: confirmAction.groupId
          }
        },
        {
          onSuccess: (res) => {
            toast.success(res.message || "Group unassigned successfully");
            void queryClient.invalidateQueries({
              queryKey: listKeys.detail(list.id)
            });
            void queryClient.invalidateQueries({ queryKey: listKeys.all });
            void queryClient.invalidateQueries({
              queryKey: groupKeys.info(confirmAction.groupId)
            });
            setConfirmAction(null);
          },
          onError: handleMutationError
        }
      );
      return;
    }

    if (confirmAction.type !== "remove-user-from-group") {
      return;
    }

    removeUserFromGroup(
      {
        group_id: confirmAction.groupId,
        user_id: confirmAction.userId
      },
      {
        onSuccess: (res) => {
          toast.success(res.message || "User removed from group successfully");
          void queryClient.invalidateQueries({
            queryKey: listKeys.detail(list.id)
          });
          void queryClient.invalidateQueries({ queryKey: listKeys.all });
          void queryClient.invalidateQueries({
            queryKey: groupKeys.info(confirmAction.groupId)
          });
          void queryClient.invalidateQueries({ queryKey: groupKeys.all });
          void queryClient.invalidateQueries({
            queryKey: userKeys.detail(confirmAction.userId)
          });
          void queryClient.invalidateQueries({ queryKey: userKeys.all });
          setConfirmAction(null);
        },
        onError: handleMutationError
      }
    );
  }, [confirmAction, list.id, queryClient, removeUserFromGroup, unassignList]);

  const handleIndividualModeConfirm = React.useCallback(() => {
    if (!confirmAction || confirmAction.type !== "unassign-user") return;

    unassignList(
      {
        payload: {
          list_id: list.id,
          user_id: confirmAction.userId
        }
      },
      {
        onSuccess: (res) => {
          toast.success(res.message || "User unassigned successfully");
          void queryClient.invalidateQueries({
            queryKey: listKeys.detail(list.id)
          });
          void queryClient.invalidateQueries({ queryKey: listKeys.all });
          void queryClient.invalidateQueries({
            queryKey: userKeys.detail(confirmAction.userId)
          });
          void queryClient.invalidateQueries({ queryKey: userKeys.all });
          setConfirmAction(null);
        },
        onError: handleMutationError
      }
    );
  }, [confirmAction, list.id, queryClient, unassignList]);

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
              <GroupCard
                key={group.id}
                group={group}
                onUnassign={() =>
                  setConfirmAction({
                    type: "unassign-group",
                    groupId: group.id,
                    groupName: group.name
                  })
                }
                onRemoveMember={(member) =>
                  setConfirmAction({
                    type: "remove-user-from-group",
                    groupId: group.id,
                    groupName: group.name,
                    userId: member.id,
                    userName: getUserName(member)
                  })
                }
              />
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

        <AssignmentConfirmDialog
          action={confirmAction}
          open={Boolean(confirmAction)}
          isPending={isUnassigning || isRemovingUser}
          onOpenChange={(open) => {
            if (!open) setConfirmAction(null);
          }}
          onConfirm={handleGroupModeConfirm}
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
            <UserRow
              key={u.id}
              user={u}
              actionLabel="Unassign"
              onAction={() =>
                setConfirmAction({
                  type: "unassign-user",
                  userId: u.id,
                  userName: getUserName(u)
                })
              }
            />
          ))}
          {users.length === 0 && (
            <p className="text-sm text-gray-500">
              No individuals assigned yet.
            </p>
          )}
        </div>
      </div>

      <AssignUsersToListDialog
        open={assignUsersOpen}
        onOpenChange={setAssignUsersOpen}
        listId={list.id}
        preselectedUserIds={preselectedUserIds}
      />

      <AssignmentConfirmDialog
        action={confirmAction}
        open={Boolean(confirmAction)}
        isPending={isUnassigning}
        onOpenChange={(open) => {
          if (!open) setConfirmAction(null);
        }}
        onConfirm={handleIndividualModeConfirm}
      />
    </>
  );
};

// ─── Group Card ───────────────────────────────────────────────────────────────

const GroupCard = ({
  group,
  onUnassign,
  onRemoveMember
}: {
  group: GroupWithMembers;
  onUnassign: () => void;
  onRemoveMember: (member: AuthUser) => void;
}) => {
  const [expanded, setExpanded] = React.useState(true);
  const hasMore = group.user_groups.length > PREVIEW_COUNT;
  const visibleMembers = expanded
    ? group.user_groups
    : group.user_groups.slice(0, PREVIEW_COUNT);

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
          <div className="flex items-center gap-2">
            <div className="px-2 py-0.5 bg-teal-50 rounded-full outline outline-1 outline-offset-[-1px] outline-teal-100 flex justify-center items-center gap-1">
              <div className="text-teal-600 text-xs font-medium leading-4">
                {group.user_groups.length} Members
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  "inline-flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted"
                )}
              >
                <MoreVerticalIcon className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onUnassign}>
                  Unassign
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {visibleMembers.length ? (
          <>
            <div className="self-stretch h-px bg-zinc-200" />
            {/* Members */}
            {visibleMembers.map((member) => (
              <React.Fragment key={member.id}>
                <UserRow
                  user={member}
                  actionLabel="Remove User from Group"
                  onAction={() => onRemoveMember(member)}
                />
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
                {expanded
                  ? "Hide"
                  : `View all ${group.user_groups.length} members`}
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

const UserRow = ({
  user,
  actionLabel,
  onAction
}: {
  user: AuthUser;
  actionLabel?: string;
  onAction?: () => void;
}) => {
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
      {actionLabel && onAction ? (
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              "inline-flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted"
            )}
          >
            <MoreVerticalIcon className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className={"min-w-fit"}>
            <DropdownMenuItem onClick={onAction}>
              {actionLabel}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
    </div>
  );
};

const AssignmentConfirmDialog = ({
  open,
  onOpenChange,
  action,
  isPending,
  onConfirm
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: ConfirmAction | null;
  isPending?: boolean;
  onConfirm: () => void;
}) => {
  const copy = getConfirmCopy(action);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-lg">
        <DialogHeader className="border-b-0 px-6 pt-6 pb-0">
          <div>
            <DialogTitle className="text-2xl font-medium text-text-primary">
              {copy.title}
            </DialogTitle>
            <DialogDescription className="mt-1 text-base text-text-secondary">
              {copy.description}
            </DialogDescription>
          </div>
          <DialogIconClose className="size-7 shrink-0 rounded-full [&_svg]:size-5" />
        </DialogHeader>

        <DialogBody className="py-6 md:px-6" />

        <DialogFooter className="justify-end gap-2 px-6 pb-6">
          <Button
            variant="outline-transparent"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            variant={copy.variant}
            onClick={onConfirm}
            disabled={!action || isPending}
          >
            {isPending ? <Loader2Icon className="size-4 animate-spin" /> : null}
            {copy.actionLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildGroups(list: ListDetail): GroupWithMembers[] {
  const groupMap = new Map<string, GroupWithMembers>();

  for (const assignment of list.assignments) {
    if (!assignment.group) continue;
    const { id, name, user_groups } = assignment.group;
    if (!groupMap.has(id)) {
      groupMap.set(id, { id, name, user_groups: [] });
    }
    if (user_groups) {
      groupMap.get(id)!.user_groups.push(...user_groups.map((ug) => ug.user));
    }
  }

  return Array.from(groupMap.values());
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase()).join("");
}

function getUserName(user: AuthUser) {
  return (
    [user.first_name, user.last_name].filter(Boolean).join(" ") || user.email
  );
}

function getConfirmCopy(action: ConfirmAction | null): {
  title: string;
  description: string;
  actionLabel: string;
  variant: "default" | "destructive";
} {
  if (!action) {
    return {
      title: "Confirm Action",
      description: "",
      actionLabel: "Confirm",
      variant: "default"
    };
  }

  if (action.type === "unassign-group") {
    return {
      title: `Unassign ${action.groupName}?`,
      description:
        "This group will stop receiving leads from this list. Existing assigned leads will remain unchanged.",
      actionLabel: "Unassign",
      variant: "destructive"
    };
  }

  if (action.type === "unassign-user") {
    return {
      title: `Unassign ${action.userName}?`,
      description:
        "This user will no longer receive leads from this list. Existing assigned leads will remain unchanged.",
      actionLabel: "Unassign",
      variant: "destructive"
    };
  }

  return {
    title: `Remove ${action.userName} from ${action.groupName}?`,
    description:
      "This user will no longer be a member of this group and will stop receiving leads assigned through it.",
    actionLabel: "Remove User",
    variant: "destructive"
  };
}

export default AssignmentCard;
