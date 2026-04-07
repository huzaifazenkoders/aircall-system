"use client";

import React from "react";
import {
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon
} from "lucide-react";

import { cn } from "@/lib/utils";
import TextInput from "@/components/ui/text-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import FocusModeDialog from "@/features/dialer/components/FocusModeDialog";
import ResumeAllListsDialog from "@/features/dialer/components/ResumeAllListsDialog";
import ActivateListDialog from "@/features/dialer/components/ActivateListDialog";
import {
  myLists,
  leadStatusOptions,
  type MyListItem,
  type LeadStatus
} from "@/features/dialer/data/dialerData";
import { myListStyles } from "@/features/dialer/styles/dialerStyles";

const leadStatusStyle: Record<LeadStatus, string> = {
  Pending: "bg-amber-50 text-amber-500",
  Cooldown: "bg-cyan-50 text-cyan-500",
  Completed: "bg-teal-100 text-teal-600",
  Scheduled: "bg-indigo-50 text-indigo-600",
  Invalid: "bg-gray-100 text-gray-500",
  "Ban Contact": "bg-gray-100 text-gray-500"
};

const Toggle = ({ active }: { active: boolean }) => (
  <div className="flex items-center">
    <div
      className={cn(
        "w-10 h-4 rounded-[120px]",
        active ? "bg-Brand-300" : "bg-gray-100"
      )}
    />
    <div
      className={cn(
        "size-6 rounded-full shadow-[0px_1.2px_6px_0px_rgba(0,0,0,0.08)] -ml-3",
        active ? "bg-Brand-700" : "bg-gray-400"
      )}
    />
  </div>
);

const MyListComponent = () => {
  const [focusMode, setFocusMode] = React.useState(false);
  const [focusModeDialogOpen, setFocusModeDialogOpen] = React.useState(false);
  const [resumeAllDialogOpen, setResumeAllDialogOpen] = React.useState(false);
  const [activateListDialog, setActivateListDialog] = React.useState<{
    open: boolean;
    list: MyListItem | null;
  }>({ open: false, list: null });

  const [listSearch, setListSearch] = React.useState("");
  const [selectedList, setSelectedList] = React.useState<MyListItem>(
    myLists[0]
  );
  const [leadSearch, setLeadSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("All Status");

  const filteredLists = React.useMemo(
    () =>
      myLists.filter((l) =>
        l.name.toLowerCase().includes(listSearch.toLowerCase())
      ),
    [listSearch]
  );

  const filteredLeads = React.useMemo(() => {
    const q = leadSearch.trim().toLowerCase();
    return selectedList.leads.filter((lead) => {
      const matchesSearch =
        !q || [lead.name, lead.phone].join(" ").toLowerCase().includes(q);
      const matchesStatus =
        statusFilter === "All Status" || lead.leadStatus === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [selectedList, leadSearch, statusFilter]);

  return (
    <>
      <div className={myListStyles.layout}>
        {/* Sidebar */}
        <div className={myListStyles.sidebar}>
          <div className={myListStyles.sidebarHeader}>
            <span className={myListStyles.sidebarTitle}>Assigned Lists</span>
            <div className="flex items-center gap-2 ml-auto">
              <span className={myListStyles.listCardToggleLabel}>
                {focusMode ? "Focus Mode" : "All On"}
              </span>
              <button
                type="button"
                aria-label="Toggle focus mode"
                onClick={() =>
                  focusMode
                    ? setResumeAllDialogOpen(true)
                    : setFocusModeDialogOpen(true)
                }
              >
                <Toggle active={focusMode} />
              </button>
            </div>
          </div>

          <div className={myListStyles.sidebarSearch}>
            <TextInput
              setValue={setListSearch}
              value={listSearch}
              startIcon={<SearchIcon className="size-5 text-gray-500" />}
              placeholder="Search by list name"
              className="h-9 text-base"
            />
          </div>

          <div className={myListStyles.sidebarList}>
            {filteredLists.map((list) => (
              <div
                key={list.id}
                className={cn(
                  myListStyles.listCard,
                  list.active
                    ? myListStyles.listCardActive
                    : myListStyles.listCardInactive,
                  selectedList.id === list.id && "ring-2 ring-Brand-500"
                )}
                onClick={() => setSelectedList(list)}
              >
                <div className={myListStyles.listCardHeader}>
                  <span className={myListStyles.listCardName}>{list.name}</span>
                  <div className={myListStyles.listCardToggleWrap}>
                    <span className={myListStyles.listCardToggleLabel}>
                      {list.active ? "Active" : "Inactive"}
                    </span>
                    <button
                      type="button"
                      aria-label={`Toggle ${list.name}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!list.active)
                          setActivateListDialog({ open: true, list });
                      }}
                    >
                      <Toggle active={list.active} />
                    </button>
                  </div>
                </div>
                <div className={myListStyles.listCardDivider} />
                <div className={myListStyles.listCardMeta}>
                  <div className={myListStyles.listCardMetaItem}>
                    <span className={myListStyles.listCardMetaLabel}>
                      Priority:
                    </span>
                    <span className={myListStyles.listCardMetaValue}>
                      {list.priority}
                    </span>
                  </div>
                  <div className={myListStyles.listCardMetaItem}>
                    <span className={myListStyles.listCardMetaLabel}>
                      Total Lead:
                    </span>
                    <span className={myListStyles.listCardMetaValue}>
                      {list.totalLeads}
                    </span>
                  </div>
                  <div className={myListStyles.listCardMetaItem}>
                    <span className={myListStyles.listCardMetaLabel}>
                      Assigned Diallers
                    </span>
                    <span className={myListStyles.listCardMetaValue}>
                      {list.assignedDiallers}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Table panel */}
        <div className={myListStyles.tablePanel}>
          <div className={myListStyles.toolbar}>
            <TextInput
              setValue={setLeadSearch}
              value={leadSearch}
              startIcon={<SearchIcon className="size-5 text-gray-500" />}
              placeholder="Search..."
              className="h-9 w-72 text-base"
            />
            <div className={myListStyles.toolbarRight}>
              <Select
                value={statusFilter}
                onValueChange={(v) => setStatusFilter(v ?? "All Status")}
              >
                <SelectTrigger className="h-9 text-sm text-gray-800 border-zinc-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent
                  align="end"
                  className="rounded-lg border border-border bg-input py-2 shadow-[0_18px_40px_rgba(15,23,42,0.1)]"
                >
                  {leadStatusOptions.map((opt) => (
                    <SelectItem
                      key={opt}
                      value={opt}
                      className="rounded-none px-3 py-2 text-sm text-text-primary"
                    >
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 border-b border-zinc-200 hover:bg-gray-50">
                <TableHead className={myListStyles.tableHead}>Name</TableHead>
                <TableHead className={myListStyles.tableHead}>
                  Lead Status
                </TableHead>
                <TableHead className={myListStyles.tableHead}>
                  Assigned Rep
                </TableHead>
                <TableHead className={myListStyles.tableHead}>
                  Last Disposition
                </TableHead>
                <TableHead className={myListStyles.tableHead}>
                  Attempt
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id} className={myListStyles.row}>
                  <TableCell className="pl-4 py-3.5">
                    <div className="text-sm font-medium text-gray-800 leading-5">
                      {lead.name}
                    </div>
                    <div className="text-sm text-gray-500 leading-5">
                      {lead.phone}
                    </div>
                  </TableCell>
                  <TableCell className={myListStyles.cell}>
                    <span
                      className={cn(
                        "px-2 py-1 rounded-lg text-xs font-medium leading-4 tracking-tight",
                        leadStatusStyle[lead.leadStatus]
                      )}
                    >
                      {lead.leadStatus}
                    </span>
                  </TableCell>
                  <TableCell className={myListStyles.cell}>
                    {lead.assignedRep ?? "-"}
                  </TableCell>
                  <TableCell className={myListStyles.cell}>
                    {lead.lastDisposition ? (
                      <>
                        <div className="text-sm font-medium text-gray-800 leading-5">
                          {lead.lastDisposition}
                        </div>
                        <div className="text-sm text-gray-500 leading-5">
                          {lead.lastDispositionDate}
                        </div>
                      </>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell className="px-3 py-3.5 text-center text-sm font-medium text-gray-800 leading-5">
                    {lead.attempt}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className={myListStyles.pagination}>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 leading-5">
                Rows per page:
              </span>
              <button
                type="button"
                className="flex items-center gap-2 text-xs text-gray-800 leading-5"
              >
                10
                <ChevronDownIcon className="size-4 text-gray-500" />
              </button>
            </div>
            <span className="text-xs text-gray-800 leading-5">
              1-{filteredLeads.length} of {selectedList.leads.length}
            </span>
            <div className="flex items-start">
              <Button variant="ghost" size="icon" className="p-2 rounded-lg">
                <ChevronLeftIcon className="size-6 text-gray-500" />
              </Button>
              <Button variant="ghost" size="icon" className="p-2 rounded-lg">
                <ChevronRightIcon className="size-6 text-gray-500" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <FocusModeDialog
        open={focusModeDialogOpen}
        onOpenChange={setFocusModeDialogOpen}
        onConfirm={() => setFocusMode(true)}
      />

      <ResumeAllListsDialog
        open={resumeAllDialogOpen}
        onOpenChange={setResumeAllDialogOpen}
        onConfirm={() => setFocusMode(false)}
      />

      <ActivateListDialog
        open={activateListDialog.open}
        onOpenChange={(open) =>
          setActivateListDialog((prev) => ({ ...prev, open }))
        }
        listName={activateListDialog.list?.name ?? ""}
        onConfirm={() => {}}
      />
    </>
  );
};

export default MyListComponent;
