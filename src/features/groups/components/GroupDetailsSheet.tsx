"use client";

import {
  ArrowLeftIcon,
  EllipsisVerticalIcon,
  Loader2Icon,
  PencilIcon,
  RotateCcwIcon,
  Trash2Icon
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GroupAvatar from "@/features/groups/components/GroupAvatar";
import { useGetGroupInfo } from "@/features/groups/services/groupService";
import { groupsStyles } from "@/features/groups/styles/groupsStyles";
import { GroupInfo, GroupUser } from "@/features/groups/types/groupTypes";

type ListAssignment = GroupInfo["list_assignments"][number];

const GroupDetailsSheet = ({
  groupId,
  open,
  activeTab,
  onTabChange,
  onClose,
  onAddMembers,
  onAssignLists,
  onRemoveMember,
  onUnassignList,
  onDeactivate,
  onDelete,
  onEdit
}: {
  groupId: string | null;
  open: boolean;
  activeTab: "members" | "lists";
  onTabChange: (tab: "members" | "lists") => void;
  onClose: () => void;
  onAddMembers: () => void;
  onAssignLists: () => void;
  onRemoveMember: (user: GroupUser) => void;
  onUnassignList: (assignment: ListAssignment) => void;
  onDeactivate: () => void;
  onDelete: () => void;
  onEdit: () => void;
}) => {
  const { data, isPending } = useGetGroupInfo(groupId ?? "");
  const group = data?.data;

  if (!open || !groupId) return null;

  return (
    <>
      <div className={groupsStyles.overlay} onClick={onClose} />
      <aside className={groupsStyles.sheetWrap}>
        <section className={groupsStyles.sheet}>
          <header className={groupsStyles.sheetHeader}>
            <div className={groupsStyles.sheetHeaderTop}>
              <div className={groupsStyles.backRow}>
                <button
                  type="button"
                  className={groupsStyles.backButton}
                  onClick={onClose}
                >
                  <ArrowLeftIcon className="size-6" />
                </button>
                <h2 className={groupsStyles.sheetTitle}>Group Details</h2>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger className={groupsStyles.iconActionButton}>
                  <EllipsisVerticalIcon className="size-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className={groupsStyles.menuContent}
                  align="end"
                  sideOffset={12}
                >
                  <DropdownMenuItem
                    className={groupsStyles.menuItem}
                    onClick={onEdit}
                  >
                    <PencilIcon className="size-5 text-panel-muted" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={groupsStyles.menuItem}
                    onClick={onDeactivate}
                  >
                    <RotateCcwIcon className="size-5 text-panel-muted" />
                    {group?.is_active ? "Deactivate" : "Activate"}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={groupsStyles.menuItem}
                    onClick={onDelete}
                  >
                    <Trash2Icon className="size-5 text-danger" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {isPending ? (
            <div className="flex flex-1 items-center justify-center py-12">
              <Loader2Icon className="size-8 animate-spin text-secondary" />
            </div>
          ) : !group ? (
            <div className="flex flex-1 items-center justify-center py-12 text-sm text-red-500">
              Failed to load group details.
            </div>
          ) : (
            <>
              <div className={groupsStyles.sheetLeadRow}>
                <div>
                  <div className={groupsStyles.sheetGroupName}>
                    {group.name}
                  </div>
                  <p className={groupsStyles.sheetDescription}>
                    {group.description}
                  </p>
                </div>
                <span className={groupsStyles.sheetStatus}>
                  {group.is_active ? "Active" : "Inactive"}
                </span>
              </div>

              <div className={groupsStyles.tabsWrap}>
                <Tabs
                  value={activeTab}
                  onValueChange={(value) =>
                    onTabChange(value as "members" | "lists")
                  }
                >
                  <TabsList variant="line" className={groupsStyles.tabsList}>
                    <TabsTrigger
                      value="members"
                      className={`${groupsStyles.tabsTrigger} ${groupsStyles.tabsUnderline}`}
                    >
                      Members
                      <span className={groupsStyles.countBadge}>
                        {group.user_groups.length}
                      </span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="lists"
                      className={`${groupsStyles.tabsTrigger} ${groupsStyles.tabsUnderline}`}
                    >
                      Assigned Lists
                      <span className={groupsStyles.countBadge}>
                        {group.list_assignments.length}
                      </span>
                    </TabsTrigger>
                  </TabsList>

                  <div className={groupsStyles.sheetBody}>
                    <TabsContent
                      value="members"
                      className={groupsStyles.assignmentList}
                    >
                      {group.user_groups.length ? (
                        group.user_groups.map((user) => (
                          <div
                            key={user.id}
                            className={groupsStyles.assignmentRow}
                          >
                            <div className={groupsStyles.memberMetaRow}>
                              <GroupAvatar
                                member={{
                                  id: user.id,
                                  name: `${user.user.first_name} ${user.user.last_name}`,
                                  accent: "#147B8A",
                                  tint: "#DAF4F6",
                                  role: user.user.role
                                }}
                              />
                              <div>
                                <div className={groupsStyles.assignmentTitle}>
                                  {user.user.first_name} {user.user.last_name}
                                </div>
                                <div className={groupsStyles.assignmentMeta}>
                                  {user.user.role ?? "Representative"}
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="outline-transparent"
                              size="sm"
                              onClick={() => onRemoveMember(user.user)}
                            >
                              Remove
                            </Button>
                          </div>
                        ))
                      ) : (
                        <div className="flex w-full center h-32 font-semibold text-lg">
                          No user found
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent
                      value="lists"
                      className={groupsStyles.assignmentList}
                    >
                      {group.list_assignments.length ? (
                        group.list_assignments.map((assignedList) => (
                          <div
                            key={assignedList.id}
                            className={groupsStyles.assignmentRow}
                          >
                            <div>
                              <div className={groupsStyles.assignmentTitle}>
                                {assignedList.list.name}
                              </div>
                              <div className={groupsStyles.assignmentMeta}>
                                {assignedList.list.total_leads} Leads
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size={"sm"}
                              onClick={() => onUnassignList(assignedList)}
                            >
                              Unassign
                            </Button>
                          </div>
                        ))
                      ) : (
                        <div className="flex w-full center h-32 font-semibold text-lg">
                          No lists assigned yet.
                        </div>
                      )}
                    </TabsContent>
                  </div>
                </Tabs>
              </div>

              <div className={groupsStyles.footerActions}>
                <Button variant="outline" onClick={onAddMembers}>
                  Add Member
                </Button>
                <Button onClick={onAssignLists}>Assign List</Button>
              </div>
            </>
          )}
        </section>
      </aside>
    </>
  );
};

export default GroupDetailsSheet;
