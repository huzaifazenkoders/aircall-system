"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, ExternalLinkIcon, MoveRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { groupsStyles } from "@/features/groups/styles/groupsStyles";
import { Lead } from "@/features/list/types/leadTypes";
import {
  getLeadStatus,
  LeadStatusBadge
} from "@/features/list/components/LeadStatusBadge";
import MoveLeadDialog from "@/features/list/components/list-details/MoveLeadDialog";

const LeadDetailsContent = ({
  lead,
  onBack,
  fromListId
}: {
  lead: Lead | null;
  onBack?: () => void;
  fromListId?: string;
}) => {
  const router = useRouter();
  const leadName = getLeadName(lead);
  const [moveLeadOpen, setMoveLeadOpen] = React.useState(false);

  if (!lead) return null;

  return (
    <div className="overflow-hidden rounded-lg">
      <div className="flex flex-wrap items-center justify-between gap-6 border-b border-border px-6 py-6">
        <div className="flex min-w-0 items-center gap-3">
          <Button
            type="button"
            size={"icon"}
            variant={"ghost"}
            onClick={() => {
              if (onBack) {
                onBack();
                return;
              }

              router.back();
            }}
          >
            <ArrowLeftIcon aria-hidden="true" />
          </Button>
          <h1 className="truncate text-2xl font-medium">{leadName}</h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline-transparent"
            type="button"
            disabled={!lead.keap_contact_url}
            onClick={() => {
              if (lead.keap_contact_url) {
                window.open(
                  lead.keap_contact_url,
                  "_blank",
                  "noopener,noreferrer"
                );
              }
            }}
          >
            <ExternalLinkIcon className="size-4" aria-hidden="true" />
            Open Contact in Keap
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={() => setMoveLeadOpen(true)}
            disabled={!fromListId}
          >
            <MoveRightIcon className="size-4" aria-hidden="true" />
            Move Lead
          </Button>
        </div>
      </div>

      <div className={cn("grid gap-5 px-6 py-6", "lg:grid-cols-[1fr_360px]")}>
        <div className="min-w-0">
          <SectionTitle>BASIC INFORMATION</SectionTitle>
          <div className="mt-3 grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-3">
            <Info label="Email" value={lead.email} />
            <Info label="Phone" value={lead.phone} />
            <Info label="Send Timezone" value={lead.timezone} />

            <Info label="Latest Event Name" value={lead.event_name} />
            <Info label="Event Date" value={formatLeadDate(lead.event_date)} />
            <Info label="Location" value={lead.event_location} />

            <Info label="Referral" value={lead.is_referral ? "Yes" : "No"} />
            <Info label="Referred By" value={lead.referred_by} />
          </div>

          <div className="my-5 h-px bg-border" />

          <SectionTitle>LEAD STATUS</SectionTitle>
          <div className="mt-3 grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
            <div>
              <div className="text-sm text-muted-foreground">
                Current Status
              </div>
              <div className="mt-3">
                <LeadStatusBadge status={getLeadStatus(lead)} />
              </div>
            </div>
            <Info label="Lead Owner" value={lead.lead_owner} />
            <Info label="Timezone" value={lead.timezone} />
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl bg-muted/30 ring-1 ring-border">
            <div className="flex items-center justify-between gap-4 border-b border-border px-6 py-5">
              <div className="text-lg font-semibold tracking-tight">
                Purchase History
              </div>
              <div className="text-sm font-semibold text-muted-foreground">
                TOTAL PURCHASE
                <span className="ml-2 text-lg font-semibold text-secondary">
                  $0
                </span>
              </div>
            </div>

            <div className="w-full overflow-x-auto bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-52">Product</TableHead>
                    <TableHead className="w-40">Amount</TableHead>
                    <TableHead className="w-44">Purchase Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="h-14">
                    <TableCell
                      colSpan={3}
                      className="text-center text-sm text-muted-foreground"
                    >
                      No purchase history available.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        <div className="min-w-0">
          <Tabs defaultValue="history" className="w-full">
            <TabsList className={cn(groupsStyles.tabsList, "bg-transparent")}>
              <TabsTrigger
                value="history"
                className={`${groupsStyles.tabsTrigger} ${groupsStyles.tabsUnderline}`}
              >
                Call History
              </TabsTrigger>
              <TabsTrigger
                value="notes"
                className={`${groupsStyles.tabsTrigger} ${groupsStyles.tabsUnderline}`}
              >
                Keap Notes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="history" className="m-0 pt-6">
              <div className="relative pl-8">
                <div
                  className="absolute top-0 bottom-0 left-3.5 w-px bg-border"
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-8">
                  <HistoryItem
                    title="No Answer"
                    subtitle="Olivia Smith on Feb 20, 2025 at 10:12 AM"
                  />
                  <HistoryItem
                    title="No Answer"
                    subtitle="Olivia Smith on Feb 20, 2025 at 10:12 AM"
                  />
                  <HistoryItem
                    title="No Answer"
                    subtitle="Olivia Smith on Feb 20, 2025 at 10:12 AM"
                  />
                  <HistoryItem
                    title="Voice Mail"
                    subtitle="Olivia Smith on Feb 20, 2025 at 10:12 AM"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notes" className="m-0 pt-6">
              <div className="text-sm text-muted-foreground">
                {lead.notes || "No notes available."}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {fromListId && (
        <MoveLeadDialog
          open={moveLeadOpen}
          onOpenChange={setMoveLeadOpen}
          leadId={lead.id}
          fromListId={fromListId}
          onConfirm={onBack}
        />
      )}
    </div>
  );
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-xs font-semibold tracking-wider text-foreground">
      {children}
    </div>
  );
};

const Info = ({ label, value }: { label: string; value?: string | null }) => {
  return (
    <div>
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="mt-2 text-sm font-medium text-foreground">
        {value || "—"}
      </div>
    </div>
  );
};

const HistoryItem = ({
  title,
  subtitle
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="relative">
      <div className="absolute -left-8.5 top-0.5 grid size-8 place-items-center rounded-full bg-status-active-bg text-status-active-fg ring-4 ring-white">
        <span
          className="size-2.5 rounded-full bg-secondary"
          aria-hidden="true"
        />
      </div>
      <div className="text-sm font-semibold text-foreground ms-2">{title}</div>
      <div className="mt-1 text-sm text-muted-foreground ms-2">{subtitle}</div>
    </div>
  );
};

const getLeadName = (lead: Lead | null) => {
  if (!lead) return "Lead Details";

  return (
    [lead.first_name, lead.last_name].filter(Boolean).join(" ") ||
    "Unnamed Lead"
  );
};

const formatLeadDate = (value?: string | null) => {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
};

export default LeadDetailsContent;
