"use client";

import React from "react";
import { SearchIcon } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserRecord } from "@/features/users/data/usersData";
import { usersStyles } from "@/features/users/styles/usersStyles";

const UsersManagementTable = ({
  users,
  selectedUserId,
  searchValue,
  onSearchChange,
  onSelectUser,
}: {
  users: UserRecord[];
  selectedUserId: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSelectUser: (userId: string) => void;
}) => {
  return (
    <section className={usersStyles.card}>
      <div className={usersStyles.toolbar}>
        <label className={usersStyles.searchField}>
          <SearchIcon className="size-7 shrink-0 text-panel-muted" />
          <input
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            className={usersStyles.searchInput}
            placeholder="Search by name, email, or phone"
          />
        </label>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className={usersStyles.tableHead}>Name</TableHead>
            <TableHead className={usersStyles.tableHead}>Email</TableHead>
            <TableHead className={usersStyles.tableHead}>Phone Number</TableHead>
            <TableHead className={usersStyles.tableHead}>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              className={usersStyles.tableRow}
              data-state={user.id === selectedUserId ? "selected" : undefined}
              onClick={() => onSelectUser(user.id)}
            >
              <TableCell className={usersStyles.tableCell}>{user.name}</TableCell>
              <TableCell className={usersStyles.tableCell}>{user.email}</TableCell>
              <TableCell className={usersStyles.tableCell}>{user.phone}</TableCell>
              <TableCell className={usersStyles.tableCell}>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default UsersManagementTable;
