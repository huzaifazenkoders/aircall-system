"use client";

import React from "react";
import {
  ArrowLeftIcon,
  CircleIcon,
  ExternalLinkIcon,
  Loader2Icon
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { callbackStyles } from "@/features/dialer/styles/dialerStyles";
import { useGetLeadActivityDetail } from "@/features/dialer/services/leadActivityService";

const tabs = [
  { id: "call-history", label: "Call History" },
  { id: "keap-notes", label: "Keap Notes" },
  { id: "personal-notes", label: "Personal Notes" }
] as const;

const CallbackScheduleDetailsDialog = ({
  open,
  onOpenChange,
  activityId
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activityId: string;
}) => {
  const [activeTab, setActiveTab] =
    React.useState<(typeof tabs)[number]["id"]>("call-history");

  React.useEffect(() => {
    if (open) setActiveTab("call-history");
  }, [open]);

  const { data, isPending } = useGetLeadActivityDetail(activityId);
  const record = data?.data ?? null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        overlayClassName="bg-overlay-strong"
        className={callbackStyles.dialogContent}
      >
        <DialogHeader className={callbackStyles.dialogHeader}>
          <div className={callbackStyles.dialogTitleWrap}>
            <button
              type="button"
              className="grid size-8 place-items-center rounded-full text-[#64748B] transition-colors hover:bg-muted"
              onClick={() => onOpenChange(false)}
            >
              <ArrowLeftIcon className="size-4" />
            </button>
            <div className={callbackStyles.dialogTitle}>
              {record?.lead
                ? `${record.lead.first_name} ${record.lead.last_name}`
                : "Lead Details"}
            </div>
          </div>

          {record?.keap_contact_url ? (
            <a href={record.keap_contact_url} target="_blank" rel="noreferrer">
              <Button variant="outline" size="sm">
                <ExternalLinkIcon className="size-4" />
                Open Contact in Keap
              </Button>
            </a>
          ) : (
            <Button variant="outline" size="sm" disabled>
              <ExternalLinkIcon className="size-4" />
              Open Contact in Keap
            </Button>
          )}
        </DialogHeader>

        <DialogBody className="min-h-0 p-0">
          {isPending || !record ? (
            <div className="flex min-h-100 items-center justify-center">
              <Loader2Icon className="size-8 animate-spin text-gray-400" />
            </div>
          ) : (
            <div className={callbackStyles.dialogBody}>
              {/* Left panel */}
              <div className={callbackStyles.dialogLeft}>
                <section>
                  <div className={callbackStyles.sectionTitle}>
                    BASIC INFORMATION
                  </div>
                  <div className={callbackStyles.infoGrid}>
                    <div>
                      <div className={callbackStyles.detailLabel}>Email</div>
                      <div className={callbackStyles.detailValue}>
                        {record.lead?.email ?? "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className={callbackStyles.detailLabel}>Phone</div>
                      <div className={callbackStyles.detailValue}>
                        {record.lead?.phone ?? "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className={callbackStyles.detailLabel}>
                        Send Timezone
                      </div>
                      <div className={callbackStyles.detailValue}>
                        {record.lead?.timezone ?? "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className={callbackStyles.detailLabel}>
                        Event Location
                      </div>
                      <div className={callbackStyles.detailValue}>
                        {record.lead?.event_location ?? "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className={callbackStyles.detailLabel}>
                        Event Date
                      </div>
                      <div className={callbackStyles.detailValue}>
                        {record.lead?.event_date ?? "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className={callbackStyles.detailLabel}>
                        Referred By
                      </div>
                      <div className={callbackStyles.detailValue}>
                        {record.lead?.referred_by ?? "N/A"}
                      </div>
                    </div>
                  </div>
                </section>

                <div className={callbackStyles.divider} />

                <section>
                  <div className={callbackStyles.sectionTitle}>LEAD STATUS</div>
                  <div className={callbackStyles.statusGrid}>
                    <div>
                      <div className={callbackStyles.detailLabel}>
                        Current Status
                      </div>
                      <div className="mt-2">
                        <span className={callbackStyles.pill}>
                          {record.status ?? "N/A"}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className={callbackStyles.detailLabel}>
                        Assigned User
                      </div>
                      <div className={callbackStyles.detailValue}>
                        {record.assigned_user?.full_name ?? "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className={callbackStyles.detailLabel}>Workflow</div>
                      <div className={callbackStyles.detailValue}>
                        {record.workflow?.name ?? "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className={callbackStyles.detailLabel}>
                        Attempt Count
                      </div>
                      <div className={callbackStyles.detailValue}>
                        {record.attempt_count ?? "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className={callbackStyles.detailLabel}>
                        Last Attempt
                      </div>
                      <div className={callbackStyles.detailValue}>
                        {record.last_attempt_at
                          ? new Date(record.last_attempt_at).toLocaleString()
                          : "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className={callbackStyles.detailLabel}>
                        Next Allowed
                      </div>
                      <div className={callbackStyles.detailValue}>
                        {record.next_allowed_at
                          ? new Date(record.next_allowed_at).toLocaleString()
                          : "N/A"}
                      </div>
                    </div>
                  </div>
                </section>

                {record.last_disposition && (
                  <section>
                    <div className={callbackStyles.sectionTitle}>
                      LAST DISPOSITION
                    </div>
                    <div className={callbackStyles.infoGrid}>
                      <div>
                        <div className={callbackStyles.detailLabel}>Type</div>
                        <div className={callbackStyles.detailValue}>
                          {record.last_disposition.disposition_type ?? "N/A"}
                        </div>
                      </div>
                      <div>
                        <div className={callbackStyles.detailLabel}>Result</div>
                        <div className={callbackStyles.detailValue}>
                          {record.last_disposition.resulting_lead_status ??
                            "N/A"}
                        </div>
                      </div>
                      <div>
                        <div className={callbackStyles.detailLabel}>
                          Max Attempts
                        </div>
                        <div className={callbackStyles.detailValue}>
                          {record.last_disposition.max_attempts ?? "N/A"}
                        </div>
                      </div>
                      <div>
                        <div className={callbackStyles.detailLabel}>
                          Cooldown Behavior
                        </div>
                        <div className={callbackStyles.detailValue}>
                          {record.last_disposition.cooldown_behavior ?? "N/A"}
                        </div>
                      </div>
                    </div>
                  </section>
                )}
              </div>

              {/* Right panel */}
              <div className={callbackStyles.dialogRight}>
                <div className={callbackStyles.tabs}>
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        callbackStyles.tab,
                        activeTab === tab.id && callbackStyles.tabActive
                      )}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {activeTab === "call-history" ? (
                  <div className={callbackStyles.timeline}>
                    {record.call_logs && record.call_logs.length > 0 ? (
                      record.call_logs.map((log, index) => (
                        <div
                          key={log.id}
                          className={callbackStyles.timelineItem}
                        >
                          <div className={callbackStyles.timelineRail}>
                            <div className={callbackStyles.timelineDot}>
                              <CircleIcon className="size-4 fill-none" />
                            </div>
                            {index < (record.call_logs?.length ?? 0) - 1 && (
                              <div className={callbackStyles.timelineLine} />
                            )}
                          </div>
                          <div className="pt-1">
                            <div className={callbackStyles.timelineTitle}>
                              Attempt {log.attempt_number}
                            </div>
                            <div className={callbackStyles.timelineSubtitle}>
                              {log.disposition_type} -{" "}
                              {new Date(log.created_at).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-gray-500 py-8">
                        No call history available
                      </div>
                    )}
                  </div>
                ) : activeTab === "keap-notes" ? (
                  <div className={callbackStyles.noteList}>
                    {record.keap_note ? (
                      <div className={callbackStyles.noteItem}>
                        {record.keap_note}
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 py-8">
                        No Keap notes available
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    No personal notes available
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default CallbackScheduleDetailsDialog;
