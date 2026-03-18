"use client";

import React from "react";
import { MoreVerticalIcon, PlusIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { listDetailsStyles } from "@/features/list/styles/listDetailsStyles";

type Assignee = {
  name: string;
  email: string;
};

const AssignmentCard = () => {
  const assignees: Assignee[] = [
    { name: "Sarah Kim", email: "sara@email.com" },
    { name: "James White", email: "james@email.com" },
    { name: "Robert Fox", email: "robert@email.com" },
    { name: "Alanah Albert", email: "alanah@email.com" },
    { name: "James Anderson", email: "james@email.com" },
    { name: "Octavia Wright", email: "octavia@email.com" },
    { name: "Albert John", email: "albert@email.com" },
  ];

  return (
    <div className={listDetailsStyles.card}>
      <div className={listDetailsStyles.cardHeader}>
        <div className={listDetailsStyles.cardTitle}>Assignment</div>
        <button
          type="button"
          className={cn(
            buttonVariants({
              variant: "outline",
              size: "sm",
              className: "h-9 rounded-xl px-4 text-sm font-medium",
            })
          )}
        >
          <PlusIcon className="size-4" aria-hidden="true" />
          Add
        </button>
      </div>

      <div className={cn(listDetailsStyles.assignmentList, "max-h-[420px] overflow-auto")}>
        {assignees.map((a) => (
          <div key={a.email} className={listDetailsStyles.assignmentRow}>
            <div className={listDetailsStyles.assignmentMeta}>
              <div className={listDetailsStyles.avatar}>{initials(a.name)}</div>
              <div className="min-w-0">
                <div className={listDetailsStyles.assignmentName}>{a.name}</div>
                <div className={cn(listDetailsStyles.assignmentEmail, "truncate")}>
                  {a.email}
                </div>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "icon",
                    className: "size-10 rounded-xl",
                  })
                )}
              >
                <MoreVerticalIcon className="size-5" aria-hidden="true" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuItem>Remove</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>
    </div>
  );
};

const initials = (name: string) => {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase()).join("");
};

export default AssignmentCard;

