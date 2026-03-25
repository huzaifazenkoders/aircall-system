"use client";

import React from "react";
import {
  CalendarDaysIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleCheckBigIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  ListChecksIcon,
  SearchIcon,
  UsersRoundIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GroupRecord, GroupStatus } from "@/features/groups/data/groupsData";
import { groupsStyles } from "@/features/groups/styles/groupsStyles";

const statusOptions: ("All Status" | GroupStatus)[] = [
  "All Status",
  "Active",
  "Inactive",
];

const GroupsTable = ({
  groups,
  searchValue,
  statusFilter,
  onSearchChange,
  onStatusChange,
  onViewDetails,
  onAssignList,
  onAddMember,
}: {
  groups: GroupRecord[];
  searchValue: string;
  statusFilter: "All Status" | GroupStatus;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: "All Status" | GroupStatus) => void;
  onViewDetails: (groupId: string) => void;
  onAssignList: (groupId: string) => void;
  onAddMember: (groupId: string) => void;
}) => {
  return (
    <div className={groupsStyles.tableCard}>
      <div className={groupsStyles.toolbar}>
        <label className={groupsStyles.searchField}>
          <SearchIcon className="size-7 text-panel-muted" />
          <input
            className={groupsStyles.searchInput}
            placeholder="Search by group name"
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </label>

        <div className={groupsStyles.filterRow}>
          <DropdownMenu>
            <DropdownMenuTrigger className={groupsStyles.filterButton}>
              <span>{statusFilter}</span>
              <ChevronDownIcon className="size-5 text-panel-muted" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className={groupsStyles.menuContent} align="end" sideOffset={12}>
              {statusOptions.map((option) => (
                <DropdownMenuItem
                  key={option}
                  className={groupsStyles.menuItem}
                  onClick={() => onStatusChange(option)}
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <button type="button" className={groupsStyles.filterButton}>
            <span>Date</span>
            <CalendarDaysIcon className="size-5 text-panel-muted" />
          </button>
        </div>
      </div>

      <div className={groupsStyles.tableWrap}>
        <Table className={groupsStyles.table}>
          <TableHeader>
            <TableRow className={groupsStyles.row}>
              <TableHead className={groupsStyles.headCell}>Name</TableHead>
              <TableHead className={groupsStyles.headCell}>Members</TableHead>
              <TableHead className={groupsStyles.headCell}>Assigned Lists</TableHead>
              <TableHead className={groupsStyles.headCell}>Created On</TableHead>
              <TableHead className={groupsStyles.headCell}>Status</TableHead>
              <TableHead className={groupsStyles.headCell} />
            </TableRow>
          </TableHeader>

          <TableBody>
            {groups.map((group) => (
              <TableRow key={group.id} className={groupsStyles.row}>
                <TableCell className={groupsStyles.bodyCell}>{group.name}</TableCell>
                <TableCell className={groupsStyles.bodyCell}>{group.members.length}</TableCell>
                <TableCell className={groupsStyles.bodyCell}>{group.assignedLists.length}</TableCell>
                <TableCell className={groupsStyles.bodyCell}>{group.createdOn}</TableCell>
                <TableCell className={`${groupsStyles.bodyCell} ${groupsStyles.statusCell}`}>
                  <Badge
                    className={`${groupsStyles.statusBadge} ${
                      group.status === "Active"
                        ? groupsStyles.statusActive
                        : groupsStyles.statusInactive
                    }`}
                  >
                    {group.status}
                  </Badge>
                </TableCell>
                <TableCell className={groupsStyles.bodyCell}>
                  <DropdownMenu>
                    <DropdownMenuTrigger className={groupsStyles.iconActionButton}>
                      <EllipsisVerticalIcon className="size-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className={groupsStyles.menuContent} align="end" sideOffset={10}>
                      <DropdownMenuItem
                        className={groupsStyles.menuItem}
                        onClick={() => onViewDetails(group.id)}
                      >
                        <EyeIcon className="size-5 text-panel-muted" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className={groupsStyles.menuItem}
                        onClick={() => onAssignList(group.id)}
                      >
                        <ListChecksIcon className="size-5 text-panel-muted" />
                        Assign List
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className={groupsStyles.menuItem}
                        onClick={() => onAddMember(group.id)}
                      >
                        <UsersRoundIcon className="size-5 text-panel-muted" />
                        Add Member
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className={groupsStyles.footer}>
        <div className={groupsStyles.footerMeta}>Rows per page: 10</div>
        <div className={groupsStyles.footerPager}>
          <span>1-5 of 13</span>
          <button type="button" className={groupsStyles.pagerButton}>
            <ChevronLeftIcon className="size-6" />
          </button>
          <button type="button" className={groupsStyles.pagerButton}>
            <ChevronRightIcon className="size-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const GroupsCreatedBanner = ({ name }: { name: string }) => {
  return (
    <div className={groupsStyles.successBanner}>
      <CircleCheckBigIcon className="mt-1 size-6 shrink-0" />
      <div>
        <div className={groupsStyles.successTitle}>Group created</div>
        <div className={groupsStyles.successText}>{name} group created successfully.</div>
      </div>
    </div>
  );
};

export default GroupsTable;
