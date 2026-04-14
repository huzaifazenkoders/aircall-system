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
  Loader2Icon,
  MoreHorizontalIcon,
  SearchIcon,
  UsersRoundIcon,
  X
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
import { Group } from "@/features/groups/types/groupTypes";
import { groupsStyles } from "@/features/groups/styles/groupsStyles";
import TextInput from "@/components/ui/text-input";
import DateSelector from "@/components/custom/date-selector.component";
import { ReactDispatch } from "@/types/common";
import moment from "moment";

const statusOptions: string[] = ["All Status", "Active", "Inactive"];

const GroupsTable = ({
  groups,
  searchValue,
  statusFilter,
  onSearchChange,
  onStatusChange,
  onViewDetails,
  onAssignList,
  onAddMember,
  isPending,
  emptyState,
  date,
  setDate
}: {
  groups: Group[];
  searchValue: string;
  statusFilter: string;
  date: Date | null;
  setDate: ReactDispatch<Date | null>;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onViewDetails: (groupId: string) => void;
  onAssignList: (groupId: string) => void;
  onAddMember: (groupId: string) => void;
  isPending: boolean;
  emptyState: React.ReactNode;
}) => {
  const isDefaultState =
    searchValue.trim() === "" && statusFilter === "All Status" && !date;
  const shouldShowEmptyStateOnly =
    !isPending && groups.length === 0 && isDefaultState;

  if (shouldShowEmptyStateOnly) {
    return <div className={groupsStyles.tableCard}>{emptyState}</div>;
  }

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
                <div className={`${groupsStyles.filterButton} cursor-pointer`}>
                  <span>
                    {date ? moment(date).format("dd MMM yyyy") : "Date"}
                  </span>
                  <ChevronDownIcon className="size-4 text-gray-800" />
                </div>
              }
            />
            <DateSelector value={date || undefined} setValue={setDate} />
          </DropdownMenu>
        </div>
      </div>

      <div className={groupsStyles.tableWrap}>
        {isPending ? (
          <div className="flex flex-1 items-center justify-center py-20">
            <Loader2Icon className="size-8 animate-spin text-secondary" />
          </div>
        ) : !groups.length ? (
          emptyState
        ) : (
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
                    {group.total_users ?? 0}
                  </TableCell>
                  <TableCell className="flex-1 px-4 text-sm text-gray-800">
                    {group.total_lists ?? 0}
                  </TableCell>
                  <TableCell className="flex-1 px-4 text-sm text-gray-800">
                    {new Date(group.created_at).toLocaleDateString("en-US", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "2-digit"
                    })}
                  </TableCell>
                  <TableCell className="flex-1 px-4">
                    <span
                      className={`${groupsStyles.statusBadge} ${
                        group.is_active
                          ? groupsStyles.statusActive
                          : groupsStyles.statusInactive
                      }`}
                    >
                      {group.is_active ? "Active" : "Inactive"}
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
        )}
      </div>

      {groups.length ? (
        <div className={groupsStyles.footer}>
          <div className={groupsStyles.footerMeta}>
            <span>Rows per page:</span>
            <span className="text-gray-800">10</span>
            <ChevronDownIcon className="size-4 text-gray-500" />
          </div>
          <span className="text-xs text-gray-800">
            1–{Math.min(10, groups.length)} of {groups.length}
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
      ) : null}
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
