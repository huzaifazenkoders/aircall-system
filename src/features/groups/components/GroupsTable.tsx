"use client";

import React from "react";
import {
  CalendarDaysIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleCheckBigIcon,
  EyeIcon,
  ListChecksIcon,
  MoreHorizontalIcon,
  SearchIcon,
  UsersRoundIcon
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { GroupRecord, GroupStatus } from "@/features/groups/data/groupsData";
import { groupsStyles } from "@/features/groups/styles/groupsStyles";
import TextInput from "@/components/ui/text-input";
import DateSelector from "@/components/custom/date-selector.component";

const statusOptions: ("All Status" | GroupStatus)[] = [
  "All Status",
  "Active",
  "Inactive"
];

const GroupsTable = ({
  groups,
  searchValue,
  statusFilter,
  onSearchChange,
  onStatusChange,
  onViewDetails,
  onAssignList,
  onAddMember
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
        <TextInput
          placeholder="Search by group name"
          startIcon={<SearchIcon className="size-4 shrink-0 text-gray-500" />}
          setValue={(val) => onSearchChange(val)}
        />

        <div className={groupsStyles.filterRow}>
          <DropdownMenu>
            <DropdownMenuTrigger className={groupsStyles.filterButton}>
              <span>{statusFilter}</span>
              <ChevronDownIcon className="size-4 text-gray-800" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className={groupsStyles.menuContent}
              align="end"
              sideOffset={8}
            >
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

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button type="button" className={groupsStyles.filterButton}>
                  <span>Date</span>
                  <ChevronDownIcon className="size-4 text-gray-800" />
                </button>
              }
            />
            <DateSelector />
          </DropdownMenu>
        </div>
      </div>

      <div className={groupsStyles.tableWrap}>
        <Table className={groupsStyles.table}>
          <TableHeader>
            <TableRow className="border-zinc-200 bg-gray-50 hover:bg-gray-50">
              <TableHead className="flex-1 px-4 py-4 text-sm font-medium text-gray-500">
                Name
              </TableHead>
              <TableHead className="flex-1 px-4 py-4 text-sm font-medium text-gray-500">
                Members
              </TableHead>
              <TableHead className="flex-1 px-4 py-4 text-sm font-medium text-gray-500">
                Assigned Lists
              </TableHead>
              <TableHead className="flex-1 px-4 py-4 text-sm font-medium text-gray-500">
                Created On
              </TableHead>
              <TableHead className="flex-1 px-4 py-4 text-sm font-medium text-gray-500">
                Status
              </TableHead>
              <TableHead className="w-20 px-4 py-4 text-sm font-medium text-gray-500 opacity-0">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {groups.map((group) => (
              <TableRow
                key={group.id}
                className="h-16 border-zinc-200 hover:bg-gray-50"
              >
                <TableCell className="flex-1 px-4 text-sm text-gray-800">
                  {group.name}
                </TableCell>
                <TableCell className="flex-1 px-4 text-sm text-gray-800">
                  {group.members.length}
                </TableCell>
                <TableCell className="flex-1 px-4 text-sm text-gray-800">
                  {group.assignedLists.length}
                </TableCell>
                <TableCell className="flex-1 px-4 text-sm text-gray-800">
                  {group.createdOn}
                </TableCell>
                <TableCell className="flex-1 px-4">
                  <span
                    className={`${groupsStyles.statusBadge} ${
                      group.status === "Active"
                        ? groupsStyles.statusActive
                        : groupsStyles.statusInactive
                    }`}
                  >
                    {group.status}
                  </span>
                </TableCell>
                <TableCell
                  className="w-20 px-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className={groupsStyles.iconActionButton}
                    >
                      <MoreHorizontalIcon className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className={groupsStyles.menuContent}
                      align="end"
                      sideOffset={8}
                    >
                      <DropdownMenuItem
                        className={groupsStyles.menuItem}
                        onClick={() => onViewDetails(group.id)}
                      >
                        <EyeIcon className="size-4 text-gray-500" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className={groupsStyles.menuItem}
                        onClick={() => onAssignList(group.id)}
                      >
                        <ListChecksIcon className="size-4 text-gray-500" />
                        Assign List
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className={groupsStyles.menuItem}
                        onClick={() => onAddMember(group.id)}
                      >
                        <UsersRoundIcon className="size-4 text-gray-500" />
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
        <div className={groupsStyles.footerMeta}>
          <span>Rows per page:</span>
          <span className="text-gray-800">10</span>
          <ChevronDownIcon className="size-4 text-gray-500" />
        </div>
        <span className="text-xs text-gray-800">
          1-{Math.min(10, groups.length)} of {groups.length}
        </span>
        <div className="flex items-center">
          <button type="button" className={groupsStyles.pagerButton}>
            <ChevronLeftIcon className="size-4" />
          </button>
          <button type="button" className={groupsStyles.pagerButton}>
            <ChevronRightIcon className="size-4" />
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
        <div className={groupsStyles.successText}>
          {name} group created successfully.
        </div>
      </div>
    </div>
  );
};

export default GroupsTable;
