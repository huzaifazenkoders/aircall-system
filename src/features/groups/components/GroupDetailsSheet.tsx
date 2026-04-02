"use client";

import React from "react";
import {
  ArrowLeftIcon,
  EllipsisVerticalIcon,
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
import {
  GroupAssignedList,
  GroupMember,
  GroupRecord
} from "@/features/groups/data/groupsData";
import { groupsStyles } from "@/features/groups/styles/groupsStyles";

const GroupDetailsSheet = ({
  group,
  open,
  activeTab,
  onTabChange,
  onClose,
  onAddMembers,
  onAssignLists,
  onRemoveMember,
  onUnassignList,
  onDeactivate,
  onDelete
}: {
  group: GroupRecord | null;
  open: boolean;
  activeTab: "members" | "lists";
  onTabChange: (tab: "members" | "lists") => void;
  onClose: () => void;
  onAddMembers: () => void;
  onAssignLists: () => void;
  onRemoveMember: (member: GroupMember) => void;
  onUnassignList: (list: GroupAssignedList) => void;
  onDeactivate: () => void;
  onDelete: () => void;
}) => {
  if (!open || !group) {
    return null;
  }

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
                  <DropdownMenuItem className={groupsStyles.menuItem}>
                    <PencilIcon className="size-5 text-panel-muted" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={groupsStyles.menuItem}
                    onClick={onDeactivate}
                  >
                    <RotateCcwIcon className="size-5 text-panel-muted" />
                    Deactivate
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

          <div className={groupsStyles.sheetLeadRow}>
            <div>
              <div className={groupsStyles.sheetGroupName}>{group.name}</div>
              <p className={groupsStyles.sheetDescription}>
                {group.description}
              </p>
            </div>
            <span className={groupsStyles.sheetStatus}>{group.status}</span>
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
                    {group.members.length}
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="lists"
                  className={`${groupsStyles.tabsTrigger} ${groupsStyles.tabsUnderline}`}
                >
                  Assigned Lists
                  <span className={groupsStyles.countBadge}>
                    {group.assignedLists.length}
                  </span>
                </TabsTrigger>
              </TabsList>

              <div className={groupsStyles.sheetBody}>
                <TabsContent
                  value="members"
                  className={groupsStyles.assignmentList}
                >
                  {group.members.map((member) => (
                    <div key={member.id} className={groupsStyles.assignmentRow}>
                      <div className={groupsStyles.memberMetaRow}>
                        <GroupAvatar member={member} />
                        <div>
                          <div className={groupsStyles.assignmentTitle}>
                            {member.name}
                          </div>
                          <div className={groupsStyles.assignmentMeta}>
                            {member.role ?? "Representative"}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline-transparent"
                        size={"sm"}
                        onClick={() => onRemoveMember(member)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent
                  value="lists"
                  className={groupsStyles.assignmentList}
                >
                  {group.assignedLists.map((assignedList) => (
                    <div
                      key={assignedList.id}
                      className={groupsStyles.assignmentRow}
                    >
                      <div>
                        <div className={groupsStyles.assignmentTitle}>
                          {assignedList.name}
                        </div>
                        <div className={groupsStyles.assignmentMeta}>
                          {assignedList.leads} Leads
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
                  ))}
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
        </section>
      </aside>
    </>
  );
};

export default GroupDetailsSheet;
