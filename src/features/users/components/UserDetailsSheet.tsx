"use client";

import React from "react";
import {
  ArrowLeftIcon,
  EllipsisVerticalIcon,
  MailIcon,
  PencilIcon,
  PhoneIcon,
  RotateCcwIcon,
  UsersIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRecord } from "@/features/users/data/usersData";
import { usersStyles } from "@/features/users/styles/usersStyles";

const stats = [
  { key: "totalCalls", label: "Total Calls Made" },
  { key: "noAnswer", label: "No Answer" },
  { key: "scheduled", label: "Call Scheduled" },
  { key: "completedLeads", label: "Completed Leads" },
] as const;

const UserDetailsSheet = ({
  user,
  open,
  onClose,
  onAddGroup,
  onAssignList,
  onRemoveGroup,
}: {
  user: UserRecord;
  open: boolean;
  onClose: () => void;
  onAddGroup: () => void;
  onAssignList: () => void;
  onRemoveGroup: () => void;
}) => {
  const [activeTab, setActiveTab] = React.useState<"groups" | "lists">("groups");

  React.useEffect(() => {
    if (open) {
      setActiveTab("groups");
    }
  }, [open, user.id]);

  if (!open) {
    return null;
  }

  return (
    <>
      <div className={usersStyles.overlay} onClick={onClose} />
      <aside className={usersStyles.sheetWrap}>
        <section className={usersStyles.sheet}>
          <header className={usersStyles.sheetHeader}>
            <div className={usersStyles.sheetTopRow}>
              <div>
                <div className={usersStyles.sheetTitleRow}>
                  <button type="button" className="pt-1 text-panel-muted" onClick={onClose}>
                    <ArrowLeftIcon className="size-9" />
                  </button>
                  <div className="flex items-center gap-4">
                    <h2 className={usersStyles.sheetTitle}>{user.name}</h2>
                    <span className={usersStyles.statusPill}>{user.status}</span>
                  </div>
                </div>
                <p className={usersStyles.createdText}>Created On: {user.createdOn}</p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger className={usersStyles.iconButton}>
                  <EllipsisVerticalIcon className="size-7" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className={usersStyles.menuContent} align="end" sideOffset={12}>
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

          <div className={usersStyles.statsGrid}>
            {stats.map((stat) => (
              <div key={stat.key} className={usersStyles.statCard}>
                <div className={usersStyles.statLabel}>{stat.label}</div>
                <div className={usersStyles.statValue}>{user.stats[stat.key]}</div>
              </div>
            ))}
          </div>

          <div className={usersStyles.contactGrid}>
            <div className={usersStyles.contactItem}>
              <PhoneIcon className="size-9 text-secondary" />
              <div>
                <div className={usersStyles.contactLabel}>Phone</div>
                <div className={usersStyles.contactValue}>{user.phone}</div>
              </div>
            </div>
            <div className={usersStyles.contactItem}>
              <MailIcon className="size-9 text-secondary" />
              <div>
                <div className={usersStyles.contactLabel}>Email</div>
                <div className={usersStyles.contactValue}>{user.email}</div>
              </div>
            </div>
          </div>

          <div className={usersStyles.assignmentsArea}>
            <h3 className={usersStyles.assignmentsTitle}>ASSIGNMENTS</h3>

            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "groups" | "lists")}>
              <TabsList variant="line" className={usersStyles.tabsList}>
                <TabsTrigger value="groups" className={`${usersStyles.tabsTrigger} ${usersStyles.tabsUnderline}`}>
                  Groups
                  <span className={usersStyles.countBadge}>{user.groups.length}</span>
                </TabsTrigger>
                <TabsTrigger value="lists" className={`${usersStyles.tabsTrigger} ${usersStyles.tabsUnderline}`}>
                  Assigned Lists
                  <span className={usersStyles.countBadge}>{user.assignedLists.length}</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="groups" className={usersStyles.assignmentList}>
                {user.groups.slice(0, 4).map((group, index) => (
                  <div key={group.id} className={usersStyles.assignmentRow}>
                    <div>
                      <div className={usersStyles.assignmentTitle}>{group.name}</div>
                      <div className={usersStyles.assignmentMeta}>({group.members} members)</div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger className={usersStyles.iconButton}>
                        <EllipsisVerticalIcon className="size-7" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className={usersStyles.menuContent} align="end" sideOffset={12}>
                        <DropdownMenuItem className={usersStyles.menuItem}>
                          <UsersIcon className="size-5 text-panel-muted" />
                          View Members
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className={usersStyles.menuItem}
                          onClick={() => {
                            if (index === 2) {
                              onRemoveGroup();
                            }
                          }}
                        >
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="lists" className={usersStyles.assignmentList}>
                {user.assignedLists.slice(0, 4).map((list, index) => (
                  <div key={list.id} className={usersStyles.assignmentRow}>
                    <div>
                      <div className={usersStyles.assignmentTitle}>{list.name}</div>
                      <div className={usersStyles.assignmentMeta}>{list.leads} Leads</div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger className={usersStyles.iconButton}>
                        <EllipsisVerticalIcon className="size-7" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className={usersStyles.menuContent} align="end" sideOffset={12}>
                        <DropdownMenuItem className={usersStyles.menuItem}>View Details</DropdownMenuItem>
                        <DropdownMenuItem className={usersStyles.menuItem}>
                          {index === 1 ? "Unassign" : "Manage"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </TabsContent>
            </Tabs>

            <div className={usersStyles.footer}>
              <Button variant="outline" className={usersStyles.secondaryButton} onClick={onAddGroup}>
                Add to Group
              </Button>
              <Button className={usersStyles.primaryButton} onClick={onAssignList}>
                Assign List
              </Button>
            </div>
          </div>
        </section>
      </aside>
    </>
  );
};

export default UserDetailsSheet;
