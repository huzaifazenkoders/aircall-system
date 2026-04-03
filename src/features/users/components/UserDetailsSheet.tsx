"use client";

import {
  ArrowLeftIcon,
  EllipsisVerticalIcon,
  Loader2Icon,
  MailIcon,
  PencilIcon,
  PhoneIcon,
  RotateCcwIcon
} from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usersStyles } from "@/features/users/styles/usersStyles";
import { useGetUserById } from "@/features/users/services/userService";

const stats = [
  { key: "total_calls_made" as const, label: "Total Calls Made" },
  { key: "total_no_answer" as const, label: "No Answer" },
  { key: "total_scheduled" as const, label: "Call Scheduled" },
  { key: "total_completed" as const, label: "Completed Leads" }
];

const UserDetailsSheet = ({
  userId,
  open,
  onClose,
  onAddGroup,
  onAssignList,
  onRemoveGroup,
  onViewGroupMembers
}: {
  userId: string | null;
  open: boolean;
  onClose: () => void;
  onAddGroup: () => void;
  onAssignList: () => void;
  onRemoveGroup: (group: { id: string; name: string }) => void;
  onViewGroupMembers: (group: { id: string; name: string }) => void;
}) => {
  const [activeTab, setActiveTab] = React.useState<"groups" | "lists">(
    "groups"
  );

  const { data, isPending } = useGetUserById(userId ?? "");
  const user = data?.data;

  React.useEffect(() => {
    if (open) setActiveTab("groups");
  }, [open, userId]);

  if (!open) return null;

  return (
    <>
      <div className={usersStyles.overlay} onClick={onClose} />
      <aside className={usersStyles.sheetWrap}>
        <section className={usersStyles.sheet}>
          <header className={usersStyles.sheetHeader}>
            <div className={usersStyles.sheetTopRow}>
              <div>
                <div className={usersStyles.sheetTitleRow}>
                  <button
                    type="button"
                    className="pt-1 hover:bg-primary/10 flex items-center justify-center rounded-full size-9 text-panel-muted"
                    onClick={onClose}
                  >
                    <ArrowLeftIcon className="size-6" />
                  </button>
                  <div className="flex items-center gap-4">
                    <h2 className={usersStyles.sheetTitle}>
                      {user ? `${user.first_name} ${user.last_name}` : "—"}
                    </h2>
                    {user && (
                      <span className={usersStyles.statusPill}>
                        {user.status}
                      </span>
                    )}
                  </div>
                </div>
                {user && (
                  <p className={usersStyles.createdText}>
                    Created On:{" "}
                    {new Date(user.created_at).toLocaleDateString("en-US", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "2-digit"
                    })}
                  </p>
                )}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger className={usersStyles.iconButton}>
                  <EllipsisVerticalIcon className="size-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className={usersStyles.menuContent}
                  align="end"
                  sideOffset={12}
                >
                  <DropdownMenuItem className={usersStyles.menuItem}>
                    <PencilIcon className="size-5 text-panel-muted" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className={usersStyles.menuItem}>
                    <RotateCcwIcon className="size-5 text-panel-muted" />
                    Inactive
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {isPending ? (
            <div className="flex flex-1 items-center justify-center py-12">
              <Loader2Icon className="size-8 animate-spin text-secondary" />
            </div>
          ) : !user ? (
            <div className="flex flex-1 items-center justify-center py-12 text-sm text-red-500">
              Failed to load user details.
            </div>
          ) : (
            <>
              <div className={usersStyles.statsGrid}>
                {stats.map((stat) => (
                  <div key={stat.key} className={usersStyles.statCard}>
                    <div className={usersStyles.statLabel}>{stat.label}</div>
                    <div className={usersStyles.statValue}>
                      {user?.[stat.key] ?? 0}
                    </div>
                  </div>
                ))}
              </div>

              <div className={usersStyles.contactGrid}>
                <div className={usersStyles.contactItem}>
                  <PhoneIcon className="size-5 text-secondary" />
                  <div>
                    <div className={usersStyles.contactLabel}>Phone</div>
                    <div className={usersStyles.contactValue}>
                      {user.phone_number ?? "—"}
                    </div>
                  </div>
                </div>
                <div className={usersStyles.contactItem}>
                  <MailIcon className="size-5 text-secondary" />
                  <div>
                    <div className={usersStyles.contactLabel}>Email</div>
                    <div className={usersStyles.contactValue}>{user.email}</div>
                  </div>
                </div>
              </div>

              <div className={usersStyles.assignmentsArea}>
                <h3 className={usersStyles.assignmentsTitle}>ASSIGNMENTS</h3>

                <Tabs
                  value={activeTab}
                  onValueChange={(value) =>
                    setActiveTab(value as "groups" | "lists")
                  }
                >
                  <TabsList variant="line" className={usersStyles.tabsList}>
                    <TabsTrigger
                      value="groups"
                      className={`${usersStyles.tabsTrigger} ${usersStyles.tabsUnderline}`}
                    >
                      Groups
                      <span className={usersStyles.countBadge}>
                        {user.user_groups?.length ?? 0}
                      </span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="lists"
                      className={`${usersStyles.tabsTrigger} ${usersStyles.tabsUnderline}`}
                    >
                      Assigned Lists
                      <span className={usersStyles.countBadge}>
                        {user.list_assignments?.length ?? 0}
                      </span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent
                    value="groups"
                    className={usersStyles.assignmentList}
                  >
                    {(user.user_groups ?? []).map((group) => (
                      <div key={group.id} className={usersStyles.assignmentRow}>
                        <div className="flex items-center">
                          <div className={usersStyles.assignmentTitle}>
                            {group.group.name}
                          </div>
                          <div className={usersStyles.assignmentMeta}>
                            ({group.group.total_users ?? 0} members)
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            className={usersStyles.iconButton}
                          >
                            <EllipsisVerticalIcon className="size-5" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            className={usersStyles.menuContent}
                            align="end"
                            sideOffset={12}
                          >
                            <DropdownMenuItem
                              className={usersStyles.menuItem}
                              onClick={() =>
                                onViewGroupMembers({
                                  id: group.group.id,
                                  name: group.group.name
                                })
                              }
                            >
                              View Members
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className={usersStyles.menuItem}
                              onClick={() =>
                                onRemoveGroup({
                                  id: group.group.id,
                                  name: group.group.name
                                })
                              }
                            >
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent
                    value="lists"
                    className={usersStyles.assignmentList}
                  >
                    {(user.list_assignments ?? []).map((list) => (
                      <div key={list.id} className={usersStyles.assignmentRow}>
                        <div className="flex items-center">
                          <div className={usersStyles.assignmentTitle}>
                            {list.list.name}
                          </div>
                          <div className={usersStyles.assignmentMeta}>
                            - {list.list.total_leads ?? 0} Leads
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            className={usersStyles.iconButton}
                          >
                            <EllipsisVerticalIcon className="size-5" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            className={usersStyles.menuContent}
                            align="end"
                            sideOffset={12}
                          >
                            <DropdownMenuItem className={usersStyles.menuItem}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className={usersStyles.menuItem}>
                              Manage
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>

                <div className={usersStyles.footer}>
                  <Button variant="outline" onClick={onAddGroup}>
                    Add to Group
                  </Button>
                  <Button onClick={onAssignList}>Assign List</Button>
                </div>
              </div>
            </>
          )}
        </section>
      </aside>
    </>
  );
};

export default UserDetailsSheet;
