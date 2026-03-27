"use client";

import React from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogIconClose,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type AssignmentMode = "group" | "individual";

const CreateListDialog = ({
  open,
  onOpenChange
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [assignmentMode, setAssignmentMode] =
    React.useState<AssignmentMode>("group");
  const [groupOpen, setGroupOpen] = React.useState(false);
  const [selectedGroups, setSelectedGroups] = React.useState<string[]>([
    "Group-2"
  ]);

  const [listName, setListName] = React.useState("");
  const [priority, setPriority] = React.useState("1");
  const [minHours, setMinHours] = React.useState("12");
  const [minMinutes, setMinMinutes] = React.useState("30");

  const groups = [
    { id: "Group-1", label: "Group-1", users: 5 },
    { id: "Group-2", label: "Group-2", users: 4 },
    { id: "Group-3", label: "Group-3", users: 8 }
  ];

  const toggleGroup = (id: string) => {
    setSelectedGroups((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl overflow-visible">
        <DialogHeader>
          <div className="min-w-0">
            <DialogTitle>Create List</DialogTitle>
            <DialogDescription>
              Manage priority based lead routing and assignment rules for your
              outbound sales team.
            </DialogDescription>
          </div>
          <DialogIconClose />
        </DialogHeader>

        <DialogBody className="space-y-5">
          <Field label="List Name">
            <TextInput
              id="listName"
              value={listName}
              setValue={setListName}
              placeholder="eg, Gold Cost Event"
              className="border-input px-4 text-sm shadow-xs bg-transparent"
            />
          </Field>

          <div className="grid grid-cols-2 gap-6">
            <Field label="Call Type">
              <Select>
                <SelectTrigger className="h-11 w-full px-4 text-sm text-muted-foreground">
                  <SelectValue placeholder="Select call type" />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false}>
                  <SelectItem value="inbound">Inbound</SelectItem>
                  <SelectItem value="outbound">Outbound</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field label="Assign Workflow Template">
              <Select>
                <SelectTrigger className="h-11 w-full px-4 text-sm text-muted-foreground">
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false}>
                  <SelectItem value="default">Default Template</SelectItem>
                  <SelectItem value="vip">VIP Template</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>

          <Field label="Priority Level">
            <div className="flex items-center gap-2">
              <TextInput
                id="priority"
                value={priority}
                setValue={setPriority}
                className="border-input px-4 text-sm shadow-xs bg-transparent w-full"
                containerClassName="w-full"
              />
              <div className="grid grid-rows-2 overflow-hidden rounded-xl">
                <button
                  type="button"
                  className="grid place-items-center text-muted-foreground hover:text-primary"
                  onClick={() =>
                    setPriority((p) => String(Math.min(99, Number(p || 0) + 1)))
                  }
                >
                  <ChevronUpIcon className="size-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="grid place-items-center text-muted-foreground hover:text-primary"
                  onClick={() =>
                    setPriority((p) => String(Math.max(1, Number(p || 0) - 1)))
                  }
                >
                  <ChevronDownIcon className="size-5" aria-hidden="true" />
                </button>
              </div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              1 is highest priority. Leads will remain in the highest priority
              list.
            </p>
          </Field>

          <Field label="Minimum Hours Between Calls">
            <div className="grid grid-cols-2 gap-6">
              <TextInput
                id="minHours"
                value={minHours}
                setValue={setMinHours}
                endIcon={
                  <span className="text-xs font-medium text-muted-foreground">
                    hr
                  </span>
                }
                className="border-input px-4 pr-12 text-sm  bg-transparent shadow-xs"
              />
              <TextInput
                id="minMinutes"
                value={minMinutes}
                setValue={setMinMinutes}
                endIcon={
                  <span className="text-xs font-medium text-muted-foreground">
                    Min
                  </span>
                }
                className="border-input px-4 pr-12 text-sm  bg-transparent shadow-xs"
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Prevents the same contact from being called multiple times within
              this time frame.
            </p>
          </Field>

          <Field label="Assignation">
            <div className="grid grid-cols-2 gap-4">
              <AssignmentCard
                label="Assign List to Group"
                checked={assignmentMode === "group"}
                onClick={() => setAssignmentMode("group")}
              />
              <AssignmentCard
                label="Assign List to Individual"
                checked={assignmentMode === "individual"}
                onClick={() => setAssignmentMode("individual")}
              />
            </div>
          </Field>

          <DropdownMenu open={groupOpen} onOpenChange={setGroupOpen}>
            <DropdownMenuTrigger
              render={
                <button
                  type="button"
                  className={cn(
                    "flex h-11 w-full items-center rounded-lg justify-between border border-input bg-background px-4 text-sm text-muted-foreground shadow-xs",
                    groupOpen && "border-secondary"
                  )}
                >
                  <span className="truncate">
                    {selectedGroups.length > 0
                      ? selectedGroups.join(", ")
                      : "Select group"}
                  </span>
                  <ChevronDownIcon className="size-4" aria-hidden="true" />
                </button>
              }
            />

            <DropdownMenuContent
              className="max-h-44 w-(--anchor-width) p-2"
              sideOffset={8}
            >
              {groups.map((g) => (
                <DropdownMenuCheckboxItem
                  key={g.id}
                  checked={selectedGroups.includes(g.id)}
                  onCheckedChange={() => toggleGroup(g.id)}
                  onSelect={(e) => e.preventDefault()}
                  className="rounded-lg px-3 py-2 text-sm"
                >
                  <span className="flex-1 truncate text-foreground">
                    {g.label}{" "}
                    <span className="text-muted-foreground">
                      ({g.users} users)
                    </span>
                  </span>
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </DialogBody>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            className="h-11 px-7 text-sm font-medium"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="h-11 px-7 text-sm font-medium"
            onClick={() => onOpenChange(false)}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const Field = ({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="mt-2">{children}</div>
    </div>
  );
};

const AssignmentCard = ({
  label,
  checked,
  onClick
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-12 items-center rounded-lg justify-center gap-3 border bg-background px-4 text-sm font-medium",
        checked ? "border-[#1DAFA6] bg-[#F1FCFB]" : "border-border-primary"
      )}
    >
      <span
        className={cn(
          "grid size-5 place-items-center rounded-full border-2",
          checked ? "border-primary" : "border-muted-foreground/50"
        )}
        aria-hidden="true"
      >
        {checked ? (
          <span className="size-2.5 rounded-full bg-secondary" />
        ) : null}
      </span>
      <span className="text-foreground">{label}</span>
    </button>
  );
};

export default CreateListDialog;
