"use client";

import React from "react";
import { ExternalLinkIcon } from "lucide-react";
import moment from "moment";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { assignedLeadStyles as s } from "@/features/assigned-leads/styles/assignedLeadStyles";
import {
  AssignedLeadInfo,
  AssignedLeadSectionTitle
} from "@/features/assigned-leads/components/AssignedLeadInfo";
import AssignedLeadTimelineItem from "@/features/assigned-leads/components/AssignedLeadTimelineItem";
import { useAircall } from "@/features/aircall/hooks/useAirCall";
import CallOutcomeDialog from "@/features/assigned-leads/components/CallOutcomeDialog";
import { CurrentLead } from "@/features/assigned-leads/types/assignedLeadTypes";
import {
  useCreateCallLog,
  useStartCall
} from "@/features/assigned-leads/services/assignedLeadService";
import { assignedLeadKeys } from "@/features/assigned-leads/query-keys";
import { handleMutationError } from "@/utils/handleMutationError";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DISPOSITION_ID_MAP: Record<string, string> = {
  "No Answer": "no_answer",
  "Connected / Positive": "connected",
  "Not Interested": "not_interested",
  "Callback Scheduled": "callback_scheduled",
  "Voicemail Left": "voicemail_left",
  "Wrong Number": "wrong_number",
  "Do Not Call": "do_not_call",
  "Ban Contact": "ban_contact"
};

const CALL_STATUS_MAP: Record<string, "completed" | "failed" | "no_answer"> = {
  "No Answer": "no_answer",
  "Connected / Positive": "completed",
  "Not Interested": "completed",
  "Callback Scheduled": "completed",
  "Voicemail Left": "no_answer",
  "Wrong Number": "failed",
  "Do Not Call": "failed",
  "Ban Contact": "failed"
};

const normalizePhoneNumber = (value?: string | null) =>
  (value ?? "").replace(/\D/g, "");

const AssignedLeadActiveState = ({ lead }: { lead: CurrentLead }) => {
  const queryClient = useQueryClient();
  const [callOutcomeOpen, setCallOutcomeOpen] = React.useState(
    lead.status === "in_progress"
  );
  const lastDialedNumberRef = React.useRef<string | null>(null);

  const { mutate: createCallLog, isPending } = useCreateCallLog();
  const { mutate: startCall } = useStartCall();

  const { dial, isReady } = useAircall({
    containerId: "#phone-container",
    onOutgoingCall: (data) => {
      const dialedNumber = data?.to ?? null;
      const expectedNumber = normalizePhoneNumber(lead.lead.phone);
      const normalizedDialedNumber = normalizePhoneNumber(dialedNumber);

      lastDialedNumberRef.current = dialedNumber;

      if (
        expectedNumber &&
        normalizedDialedNumber &&
        expectedNumber === normalizedDialedNumber
      ) {
        startCall(lead.id);
      }
    },
    onCallEnded: () => {
      const expectedNumber = normalizePhoneNumber(lead.lead.phone);
      const dialedNumber = normalizePhoneNumber(lastDialedNumberRef.current);

      if (expectedNumber && dialedNumber && expectedNumber !== dialedNumber) {
        toast.error(
          "The dialed number did not match this lead's phone number, so disposition was skipped."
        );
        lastDialedNumberRef.current = null;
        return;
      }

      lastDialedNumberRef.current = null;
      setCallOutcomeOpen(true);
    }
  });

  // Dial as soon as aircall is ready
  React.useEffect(() => {
    if (isReady && lead.lead.phone) {
      dial(lead.lead.phone);
    }
  }, [isReady]);

  const handleOutcomeSubmit = ({
    disposition,
    personalNote,
    callbackDate,
    callbackTime
  }: {
    disposition: string;
    callbackDate: Date | null;
    callbackTime: string;
    personalNote: string;
    keapNoteTemplate: string;
    keapTag: string;
  }) => {
    createCallLog(
      {
        payload: {
          lead_activity_id: lead.id,
          disposition_id: DISPOSITION_ID_MAP[disposition] ?? disposition,
          notes: personalNote.trim(),
          call_status: CALL_STATUS_MAP[disposition] ?? "completed",
          scheduled_call_at:
            callbackDate && callbackTime
              ? moment(callbackDate)
                  .set({
                    hour: parseInt(callbackTime.split(":")[0], 10),
                    minute: parseInt(callbackTime.split(":")[1], 10)
                  })
                  .toISOString()
              : undefined
        }
      },
      {
        onSuccess: () => {
          setCallOutcomeOpen(false);
          toast.success(
            "Call Logged Successfully. The call outcome has been recorded. A new contact will be assigned automatically."
          );
          queryClient.invalidateQueries({
            queryKey: assignedLeadKeys.currentLead
          });
        },
        onError: handleMutationError
      }
    );
  };

  return (
    <>
      <div className={s.page}>
        <div className={s.shell}>
          <div className={s.mainColumn}>
            <section className={s.card}>
              <header className={s.cardHeader}>
                <h1 className={s.cardTitle}>Lead Information</h1>
                {lead.lead.keap_contact_url ? (
                  <Button
                    // link={lead.lead.keap_contact_url}
                    // target="_blank"
                    rel="noreferrer"
                    variant={"ghost"}
                    className={s.cardLink}
                  >
                    <ExternalLinkIcon className="size-4" aria-hidden="true" />
                    Click to Open Contact in Keap
                  </Button>
                ) : (
                  <Button
                    variant={"ghost"}
                    type="button"
                    className={s.cardLink}
                  >
                    <ExternalLinkIcon className="size-4" aria-hidden="true" />
                    Click to Open Contact in Keap
                  </Button>
                )}
              </header>

              <div className={s.contentGrid}>
                <div className="min-w-0">
                  <AssignedLeadSectionTitle>
                    BASIC INFORMATION
                  </AssignedLeadSectionTitle>
                  <div className={s.infoGrid3}>
                    <AssignedLeadInfo label="Email" value={lead.lead.email} />
                    <AssignedLeadInfo label="Phone" value={lead.lead.phone} />
                    <AssignedLeadInfo
                      label="Send Timezone"
                      value={lead.lead.timezone}
                    />
                    <AssignedLeadInfo
                      label="Event Name"
                      value={lead.lead.event_name || "N/A"}
                    />
                    <AssignedLeadInfo
                      label="Location"
                      value={lead.lead.event_location}
                    />
                    <AssignedLeadInfo
                      label="Event Date"
                      value={lead.lead.event_date || "N/A"}
                    />
                    <AssignedLeadInfo
                      label="Referral"
                      value={lead.lead.is_referral ? "Yes" : "No"}
                    />
                    <AssignedLeadInfo
                      label="Referred By"
                      value={lead.lead.referred_by || "—"}
                    />
                  </div>

                  <div className={s.divider} />

                  <AssignedLeadSectionTitle>
                    LEAD STATUS
                  </AssignedLeadSectionTitle>
                  <div className={s.infoGrid2}>
                    <div>
                      <div className={s.infoLabel}>Current Status</div>
                      <div className={cn(s.statusBadge, "capitalize")}>
                        {lead.status.replaceAll("_", " ")}
                      </div>
                    </div>
                    <AssignedLeadInfo
                      label="Assigned Representation"
                      value={
                        lead.assigned_rep
                          ? `${lead.assigned_rep.first_name} ${lead.assigned_rep.last_name}`
                          : "—"
                      }
                    />
                    <AssignedLeadInfo
                      label="Timezone"
                      value={lead.lead.timezone}
                    />
                    <AssignedLeadInfo
                      label="Call Type"
                      value={lead.list.call_type}
                    />
                  </div>

                  {lead?.purchases?.length && (
                    <div className={s.purchaseCard}>
                      <div className={s.purchaseHeader}>
                        <div className={s.purchaseTitle}>Purchase History</div>
                        <div className={s.purchaseTotal}>
                          TOTAL PURCHASE
                          <span className={s.purchaseTotalAmount}>
                            {lead.total_purchase ?? "—"}
                          </span>
                        </div>
                      </div>

                      <div className="w-full overflow-x-auto bg-card">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="min-w-52">
                                Product
                              </TableHead>
                              <TableHead className="w-40">Amount</TableHead>
                              <TableHead className="w-44">
                                Purchase Date
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {(lead.purchases ?? []).map((p) => (
                              <TableRow key={p.id} className="h-14">
                                <TableCell className="font-medium text-foreground">
                                  {p.product}
                                </TableCell>
                                <TableCell className="font-semibold text-foreground">
                                  {p.amount}
                                </TableCell>
                                <TableCell className="text-foreground">
                                  {p.purchase_date}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  )}
                </div>

                {lead.timeline?.length && (
                  <div className="min-w-0">
                    <AssignedLeadSectionTitle>
                      CALL HISTORY TIMELINE
                    </AssignedLeadSectionTitle>
                    <div className={s.timelineWrap}>
                      <div className={s.timelineList}>
                        <div className={s.timelineLine} aria-hidden="true" />
                        <div className={s.timelineItems}>
                          {(lead.timeline ?? []).map((item) => (
                            <AssignedLeadTimelineItem
                              key={item.id}
                              title={item.title}
                              subtitle={item.subtitle}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>

          <aside className={s.sideColumn}>
            <section className={s.dialerPanel} aria-label="Aircall dialer">
              <div className={s.dialerFrame}>
                <div id="phone-container" />
              </div>
            </section>
          </aside>
        </div>
      </div>

      {lead.workflow_id && (
        <CallOutcomeDialog
          open={callOutcomeOpen}
          onOpenChange={setCallOutcomeOpen}
          isPending={isPending}
          workflowId={lead.workflow_id}
          onSubmit={handleOutcomeSubmit}
        />
      )}

      {/* <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-border bg-background shadow-lg px-5 py-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Aircall Event Tester (Only for testing purpose for now, will be
          removed later)
        </p>
        <div className="flex flex-wrap gap-2">
          {(
            [
              { event: "incoming_call", label: "Incoming Call" },
              { event: "call_end_ringtone", label: "End Ringtone" },
              { event: "outgoing_call", label: "Outgoing Call" },
              { event: "outgoing_answered", label: "Outgoing Answered" },
              { event: "call_ended", label: "Call Ended" },
              { event: "comment_saved", label: "Comment Saved" }
            ] as const
          ).map(({ event, label }) => (
            <button
              key={event}
              type="button"
              onClick={() =>
                triggerEvent(event, { phone_number: lead.lead.phone })
              }
              className="rounded-lg border border-border bg-muted px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted/70 transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      </div> */}
    </>
  );
};

export default AssignedLeadActiveState;
