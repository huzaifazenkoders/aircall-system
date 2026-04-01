"use client";

import React from "react";
import {
  SearchIcon,
  MoreHorizontalIcon,
  EyeIcon,
  ListIcon,
  UsersIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  PlusIcon
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import TextInput from "@/components/ui/text-input";
import { UserRecord } from "@/features/users/data/usersData";
import { ReactDispatch } from "@/types/common";

const PAGE_SIZE = 10;

const statusBadge = (status: UserRecord["status"] | "Invite Send") => {
  if (status === "Active")
    return (
      <span className="inline-flex items-center rounded-lg bg-teal-100 px-2.5 py-1 text-xs font-medium text-teal-600">
        Active
      </span>
    );
  if (status === "Inactive")
    return (
      <span className="inline-flex items-center rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-500">
        Inactive
      </span>
    );
  return (
    <span className="inline-flex items-center rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-500">
      Invite Send
    </span>
  );
};

const UsersManagementTable = ({
  users,
  selectedUserId,
  searchValue,
  onSearchChange,
  onSelectUser,
  onAddUser,
  onViewDetails,
  onAssignList,
  onAddToGroup
}: {
  users: UserRecord[];
  selectedUserId: string;
  searchValue: string;
  onSearchChange: ReactDispatch<string>;
  onSelectUser: ReactDispatch<string>;
  onAddUser?: () => void;
  onViewDetails?: ReactDispatch<string>;
  onAssignList?: ReactDispatch<string>;
  onAddToGroup?: ReactDispatch<string>;
}) => {
  type StatusFilter = "All Status" | "Active" | "Inactive";

  const [statusFilter, setStatusFilter] =
    React.useState<StatusFilter>("All Status");
  const [page, setPage] = React.useState(1);

  const filtered = React.useMemo(() => {
    if (statusFilter === "All Status") return users;
    return users.filter(
      (u) => u.status.toLowerCase() === statusFilter.toLowerCase()
    );
  }, [users, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const start = filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const end = Math.min(page * PAGE_SIZE, filtered.length);

  React.useEffect(() => {
    setPage(1);
  }, [searchValue, statusFilter]);

  return (
    <div className="inline-flex w-full flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-6">
        <h1 className="flex-1 text-2xl font-medium text-gray-800">
          Users Management
        </h1>
        <Button className="gap-2" onClick={onAddUser}>
          <PlusIcon className="size-4" />
          Add User
        </Button>
      </div>

      {/* Card */}
      <div className="w-full overflow-hidden rounded-[20px] bg-white shadow-[0px_5px_22px_0px_rgba(0,0,0,0.04),0px_0px_0px_1px_rgba(0,0,0,0.06)]">
        {/* Toolbar */}
        <div className="flex items-center gap-4 border-b border-zinc-200 px-6 py-4">
          <TextInput
            setValue={onSearchChange}
            value={searchValue}
            placeholder="Search by name, email, or phone"
            className="h-9 w-96 text-sm"
            startIcon={<SearchIcon className="size-4 text-gray-500" />}
          />
          <div className="flex flex-1 justify-end">
            <Select
              value={statusFilter}
              onValueChange={(val) => setStatusFilter(val as StatusFilter)}
            >
              <SelectTrigger className="h-9 min-w-[110px] rounded-lg border-zinc-200 text-sm text-gray-800 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.08)]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Status">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-200 bg-gray-50 hover:bg-gray-50">
              <TableHead className="w-44 px-4 py-4 text-sm font-medium text-gray-500">
                Name
              </TableHead>
              <TableHead className="w-48 px-4 py-4 text-sm font-medium text-gray-500">
                Email
              </TableHead>
              <TableHead className="w-48 px-4 py-4 text-sm font-medium text-gray-500">
                Phone Number
              </TableHead>
              <TableHead className="w-40 px-4 py-4 text-sm font-medium text-gray-500">
                Assigned Group
              </TableHead>
              <TableHead className="w-40 px-4 py-4 text-sm font-medium text-gray-500">
                Assigned Lists
              </TableHead>
              <TableHead className="w-32 px-4 py-4 text-sm font-medium text-gray-500">
                Status
              </TableHead>
              <TableHead className="w-12 px-4 py-4 text-sm font-medium text-gray-500 opacity-0">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((user) => (
              <TableRow
                key={user.id}
                className="h-16 cursor-pointer border-zinc-200 hover:bg-gray-50 data-[state=selected]:bg-gray-50"
                data-state={user.id === selectedUserId ? "selected" : undefined}
                onClick={() => onSelectUser(user.id)}
              >
                <TableCell className="w-44 px-4 text-sm text-gray-800">
                  {user.name}
                </TableCell>
                <TableCell className="w-48 px-4 text-sm text-gray-800">
                  {user.email}
                </TableCell>
                <TableCell className="w-48 px-4 text-sm text-gray-800">
                  {user.phone}
                </TableCell>
                <TableCell className="w-40 px-4 text-sm text-gray-800">
                  {user.groups.length}
                </TableCell>
                <TableCell className="w-40 px-4 text-sm text-gray-800">
                  {user.assignedLists.length}
                </TableCell>
                <TableCell className="w-32 px-4">
                  {statusBadge(user.status)}
                </TableCell>
                <TableCell
                  className="w-12 px-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button
                        variant="outline"
                        size="icon-sm"
                        className="size-8 border-gray-800/20"
                      >
                        <MoreHorizontalIcon className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-40 rounded-xl p-1"
                    >
                      <DropdownMenuItem
                        className="gap-3 rounded-lg px-2 py-1.5 text-sm cursor-pointer text-gray-800"
                        onClick={() => onViewDetails?.(user.id)}
                      >
                        <EyeIcon className="size-4 text-gray-500" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="gap-3 rounded-lg px-2 py-1.5 text-sm cursor-pointer text-gray-800"
                        onClick={() => onAssignList?.(user.id)}
                      >
                        <ListIcon className="size-4 text-gray-500" />
                        Assign List
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="gap-3 rounded-lg px-2 py-1.5 text-sm cursor-pointer text-gray-800"
                        onClick={() => onAddToGroup?.(user.id)}
                      >
                        <UsersIcon className="size-4 text-gray-500" />
                        Add to Group
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-6 py-2 pr-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Rows per page:</span>
            <span className="text-xs text-gray-800">{PAGE_SIZE}</span>
            <ChevronDownIcon className="size-4 text-gray-500" />
          </div>
          <span className="text-xs text-gray-800">
            {start}-{end} of {filtered.length}
          </span>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon-sm"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeftIcon className="size-4 text-gray-500" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              <ChevronRightIcon className="size-4 text-gray-500" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersManagementTable;
