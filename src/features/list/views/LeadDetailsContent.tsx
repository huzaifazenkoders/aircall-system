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

const LeadDetailsContent = () => {
  const router = useRouter();

  return (
    <div className="overflow-hidden rounded-2xl">
      <div className="flex flex-wrap items-center justify-between gap-6 border-b border-border px-8 py-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex size-10 items-center justify-center rounded-xl border border-input bg-background text-muted-foreground hover:bg-muted"
            aria-label="Back"
          >
            <ArrowLeftIcon className="size-4" aria-hidden="true" />
          </button>
          <h1 className="truncate text-[26px] font-semibold tracking-tight">
            Sarah Mitchell
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            className="h-11 rounded-xl px-5 text-sm font-medium"
          >
            <ExternalLinkIcon className="size-4" aria-hidden="true" />
            Open Contact in Keap
          </Button>
          <Button
            variant="outline"
            className="h-11 rounded-xl px-5 text-sm font-medium"
          >
            <MoveRightIcon className="size-4" aria-hidden="true" />
            Move Lead
          </Button>
        </div>
      </div>

      <div className={cn("grid gap-10 px-8 py-8", "lg:grid-cols-[1fr_360px]")}>
        <div className="min-w-0">
          <SectionTitle>BASIC INFORMATION</SectionTitle>
          <div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-3">
            <Info label="Email" value="sarah@gmail.com" />
            <Info label="Phone" value="+61 412 778 992" />
            <Info label="Send Timezone" value="Australia/Sydney" />

            <Info label="Latest Event Name" value="Sydney Masterclass" />
            <Info label="Event Date" value="March 15, 2025" />
            <Info label="Location" value="Yes" />

            <Info label="Referral" value="Yes" />
            <Info label="Referred By" value="Michael Stevens" />
          </div>

          <div className="my-10 h-px bg-border" />

          <SectionTitle>LEAD STATUS</SectionTitle>
          <div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
            <div>
              <div className="text-sm text-muted-foreground">
                Current Status
              </div>
              <div className="mt-3 inline-flex rounded-lg bg-status-cooldown-bg px-4 py-1 text-xs font-medium text-status-cooldown-fg">
                Cooldown
              </div>
            </div>
            <Info label="Last Assigned Representation" value="James Carter" />
            <Info label="Timezone" value="Australia/Sydney" />
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl bg-muted/30 ring-1 ring-border">
            <div className="flex items-center justify-between gap-4 border-b border-border px-6 py-5">
              <div className="text-lg font-semibold tracking-tight">
                Purchase History
              </div>
              <div className="text-sm font-semibold text-muted-foreground">
                TOTAL PURCHASE{" "}
                <span className="ml-2 text-lg font-semibold text-secondary">
                  $ 2,300
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
                  {Array.from({ length: 7 }).map((_, i) => (
                    <TableRow key={i} className="h-14">
                      <TableCell className="font-medium text-foreground">
                        VIP Ticket
                      </TableCell>
                      <TableCell className="font-semibold text-foreground">
                        $997
                      </TableCell>
                      <TableCell className="text-foreground">
                        06/12/26
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        <div className="min-w-0">
          <Tabs defaultValue="history" className="w-full">
            <TabsList className="h-auto w-full justify-start gap-8 bg-transparent p-0">
              <TabsTrigger
                value="history"
                className="px-0 pb-4 text-sm font-semibold"
              >
                Call History
              </TabsTrigger>
              <TabsTrigger
                value="notes"
                className="px-0 pb-4 text-sm font-semibold text-muted-foreground"
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
                No notes available.
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
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

const Info = ({ label, value }: { label: string; value: string }) => {
  return (
    <div>
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="mt-2 text-sm font-medium text-foreground">{value}</div>
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
      <div className="absolute left-[-34px] top-0.5 grid size-8 place-items-center rounded-full bg-status-active-bg text-status-active-fg ring-4 ring-white">
        <span
          className="size-2.5 rounded-full bg-secondary"
          aria-hidden="true"
        />
      </div>
      <div className="text-sm font-semibold text-foreground">{title}</div>
      <div className="mt-1 text-sm text-muted-foreground">{subtitle}</div>
    </div>
  );
};

export default LeadDetailsContent;
