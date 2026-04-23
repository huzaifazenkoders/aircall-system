"use client";

import React from "react";
import {
  SearchIcon,
  MoreHorizontalIcon,
  EyeIcon,
  ListIcon,
  UsersIcon,
  PlusIcon,
  Loader2Icon
} from "lucide-react";
import TablePagination from "@/components/ui/table-pagination";

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
import { User } from "@/features/users/types/userTypes";
import { ReactDispatch } from "@/types/common";
import UsersEmptyState from "./UsersEmptyState";

const statusBadge = (status: User["status"]) => {
  if (status === "active")
    return (
      <span className="inline-flex items-center rounded-lg bg-teal-100 px-2.5 py-1 text-xs font-medium text-teal-600">
        Active
      </span>
    );
  if (status === "suspend")
    return (
      <span className="inline-flex items-center rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-500">
        Suspended
      </span>
    );
  return (
    <span className="inline-flex items-center rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-500">
      Invited
    </span>
  );
};

const UsersManagementTable = ({
  users,
  selectedUserId,
  searchValue,
  statusFilter,
  onSearchChange,
  onStatusChange,
  onSelectUser,
  onAddUser,
  onViewDetails,
  onAssignList,
  onAddToGroup,
  error,
  isPending
}: {
  users: User[];
  selectedUserId: string;
  searchValue: string;
  statusFilter: "All Status" | "active" | "suspend" | "invited";
  onSearchChange: ReactDispatch<string>;
  onStatusChange: ReactDispatch<
    "All Status" | "active" | "suspend" | "invited"
  >;
  onSelectUser: ReactDispatch<string>;
  onAddUser?: () => void;
  onViewDetails?: ReactDispatch<string>;
  onAssignList?: ReactDispatch<string>;
  onAddToGroup?: ReactDispatch<string>;
  isPending: boolean;
  error: boolean;
}) => {
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);

  const totalPages = Math.max(1, Math.ceil(users.length / limit));
  const paginated = users.slice((page - 1) * limit, page * limit);
  const start = users.length === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, users.length);

  React.useEffect(() => {
    setPage(1);
  }, [searchValue, statusFilter, limit]);

  // if (true) {
  if (users.length === 0 && !isPending && !error) {
    return (
      <div className="flex center h-full w-full -mt-10">
        <UsersEmptyState onAddUser={onAddUser} showButton={true} />
      </div>
    );
  }

  return (
    <>
      {
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
          <div className="w-full overflow-hidden rounded-lg bg-white shadow-[0px_5px_22px_0px_rgba(0,0,0,0.04),0px_0px_0px_1px_rgba(0,0,0,0.06)]">
            <>
              {/* Toolbar */}
              <div className="flex flex-col md:flex-row items-center gap-4 border-b border-zinc-200 px-6 py-6">
                <TextInput
                  setValue={onSearchChange}
                  value={searchValue}
                  placeholder="Search by name, email, or phone"
                  className="md:w-96 text-sm"
                  startIcon={<SearchIcon className="size-4 text-gray-500" />}
                />
                <div className="flex flex-1 w-full md:w-fit justify-end">
                  <Select
                    value={statusFilter}
                    onValueChange={(val) =>
                      onStatusChange(
                        val as "All Status" | "active" | "suspend" | "invited"
                      )
                    }
                  >
                    <SelectTrigger className="h-9 min-w-[110px] capitalize rounded-lg border-zinc-200 text-sm text-gray-800 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.08)]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Status">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="invited">Invited</SelectItem>
                      <SelectItem value="suspend">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Table */}
              {isPending ? (
                <div className="flex flex-1 items-center justify-center py-20">
                  <Loader2Icon className="size-8 animate-spin text-secondary" />
                </div>
              ) : error ? (
                <div className="flex flex-1 items-center justify-center py-20 text-sm text-red-500">
                  Failed to load users. Please try again.
                </div>
              ) : !paginated.length ? (
                <UsersEmptyState
                  onAddUser={onAddUser}
                  showButton={statusFilter === "All Status" ? true : false}
                />
              ) : (
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
                        data-state={
                          user.id === selectedUserId ? "selected" : undefined
                        }
                        onClick={() => onSelectUser(user.id)}
                      >
                        <TableCell className="w-44 px-4 text-sm text-gray-800">
                          {user.first_name} {user.last_name}
                        </TableCell>
                        <TableCell className="w-48 px-4 text-sm text-gray-800">
                          {user.email}
                        </TableCell>
                        <TableCell className="w-48 px-4 text-sm text-gray-800">
                          {user.phone_number ?? "—"}
                        </TableCell>
                        <TableCell className="w-40 px-4 text-sm text-gray-800">
                          {user.total_groups ?? 0}
                        </TableCell>
                        <TableCell className="w-40 px-4 text-sm text-gray-800">
                          {user.total_lists ?? 0}
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
                              className="w-40 rounded-xl py-2 px-0"
                            >
                              <DropdownMenuItem
                                className="gap-3 rounded-none px-2 py-1.5 text-sm cursor-pointer text-gray-800"
                                onClick={() => onViewDetails?.(user.id)}
                              >
                                <EyeIcon className="size-4 text-gray-500" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="gap-3 rounded-none px-2 py-1.5 text-sm cursor-pointer text-gray-800"
                                onClick={() => onAssignList?.(user.id)}
                              >
                                <ListIcon className="size-4 text-gray-500" />
                                Assign List
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="gap-3 rounded-none px-2 py-1.5 text-sm cursor-pointer text-gray-800"
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
              )}

              {/* Pagination */}
              <TablePagination
                from={start}
                to={end}
                total={users.length}
                limit={limit}
                onLimitChange={(l) => setLimit(l)}
                prevDisabled={page === 1}
                nextDisabled={page === totalPages}
                onPrev={() => setPage((p) => Math.max(1, p - 1))}
                onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
              />
            </>
          </div>
        </div>
      }
    </>
  );
};

export default UsersManagementTable;
