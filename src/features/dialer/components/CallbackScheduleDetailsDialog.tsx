"use client";

import React from "react";
import { ArrowLeftIcon, CircleIcon, ExternalLinkIcon, Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { callbackStyles } from "@/features/dialer/styles/dialerStyles";
import { useGetLeadActivityDetail } from "@/features/dialer/services/leadActivityService";

const tabs = [
  { id: "call-history", label: "Call History" },
  { id: "keap-notes", label: "Keap Notes" },
  { id: "personal-notes", label: "Personal Notes" },
] as const;

const CallbackScheduleDetailsDialog = ({
  open,
  onOpenChange,
  activityId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activityId: string;
}) => {
  const [activeTab, setActiveTab] = React.useState<(typeof tabs)[number]["id"]>("call-history");

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
              {record?.lead ? `${record.lead.first_name} ${record.lead.last_name}` : "—"}
            </div>
          </div>

          {record?.keap_contact_url ? (
            <Button variant="outline" size="sm" asChild>
              <a href={record.keap_contact_url} target="_blank" rel="noreferrer">
                <ExternalLinkIcon className="size-4" />
                Open Contact in Keap
              </a>
            </Button>
          ) : (
            <Button variant="outline" size="sm" disabled>
              <ExternalLinkIcon className="size-4" />
              Open Contact in Keap
            </Button>
          )}
        </DialogHeader>

        <DialogBody className="min-h-0 p-0">
          {isPending || !record ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <Loader2Icon className="size-8 animate-spin text-gray-400" />
            </div>
          ) : (
            <div className={callbackStyles.dialogBody}>
              {/* Left panel */}
              <div className={callbackStyles.dialogLeft}>
                <section>
                  <div className={callbackStyles.sectionTitle}>BASIC INFORMATION</div>
                  <div className={callbackStyles.infoGrid}>
                    <div>
                      <div className={callbackStyles.detailLabel}>Email</div>
                      <div className={callbackStyles.detailValue}>{record.lead?.email ?? "—"}</div>
                    </div>
                    <div>
                      <div className={callbackStyles.detailLabel}>Phone</div>
                      <div className={callbackStyles.detailValue}>{record.lead?.phone ?? "—"}</div>
                    </div>
                    <div>
                      <div className={callbackStyles.detailLabel}>Send Timezone</div>
                      <div className={callbackStyles.detailValue}>{record.lead?.timezone ?? "—"}</div>
                    </div>
                    <div>
                      <div className={callbackStyles.detailLabel}>Registered Event</div>
                      <div className={callbackStyles.detailValue}>{record.lead?.event_name ?? "—"}</div>
                    </div>
                    <div>
                      <div className={callbackStyles.detailLabel}>Event Date</div>
                      <div className={callbackStyles.detailValue}>{record.lead?.event_date ?? "—"}</div>
                    </div>
                    <div>
                      <div className={callbackStyles.detailLabel}>Event Location</div>
                      <div className={callbackStyles.detailValue}>{record.lead?.event_location ?? "—"}</div>
                    </div>
                    <div>
                      <div className={callbackStyles.detailLabel}>Referred By</div>
                      <div className={callbackStyles.detailValue}>{record.lead?.referred_by ?? "—"}</div>
                    </div>
                  </div>
                </section>

                <div className={callbackStyles.divider} />

                <section>
                  <div className={callbackStyles.sectionTitle}>LEAD STATUS</div>
                  <div className={callbackStyles.statusGrid}>
                    <div>
                      <div className={callbackStyles.detailLabel}>Current Status</div>
                      <div className="mt-2">
                        <span className={callbackStyles.pill}>{record.status}</span>
                      </div>
                    </div>
                    <div>
                      <div className={callbackStyles.detailLabel}>Lead Owner</div>
                      <div className={callbackStyles.detailValue}>{record.lead?.lead_owner ?? "—"}</div>
                    </div>
                    <div>
                      <div className={callbackStyles.detailLabel}>Lead Arrival Time</div>
                      <div className={callbackStyles.detailValue}>
                        {record.lead?.created_at
                          ? new Date(record.lead.created_at).toLocaleString()
                          : "—"}
                      </div>
                    </div>
                  </div>
                </section>

                <section className={callbackStyles.purchaseCard}>
                  <div className={callbackStyles.purchaseHeader}>
                    <div className={callbackStyles.purchaseTitle}>Purchase History</div>
                    <div className={callbackStyles.purchaseTotalWrap}>
                      <span className={callbackStyles.purchaseTotalLabel}>Total Purchase</span>
                      <span className={callbackStyles.purchaseTotalValue}>{record.total_purchase}</span>
                    </div>
                  </div>

                  <div className={callbackStyles.purchaseTableWrap}>
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className={callbackStyles.purchaseHead}>Product</th>
                          <th className={callbackStyles.purchaseHead}>Amount</th>
                          <th className={callbackStyles.purchaseHead}>Purchase Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {record.purchases.map((purchase) => (
                          <tr key={purchase.id} className="border-b border-border last:border-b-0">
                            <td className={callbackStyles.purchaseCell}>{purchase.product}</td>
                            <td className={callbackStyles.purchaseCell}>{purchase.amount}</td>
                            <td className={callbackStyles.purchaseCell}>{purchase.purchase_date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
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
                    {record.timeline.map((item, index) => (
                      <div key={item.id} className={callbackStyles.timelineItem}>
                        <div className={callbackStyles.timelineRail}>
                          <div className={callbackStyles.timelineDot}>
                            <CircleIcon className="size-4 fill-none" />
                          </div>
                          {index < record.timeline.length - 1 && (
                            <div className={callbackStyles.timelineLine} />
                          )}
                        </div>
                        <div className="pt-1">
                          <div className={callbackStyles.timelineTitle}>{item.title}</div>
                          <div className={callbackStyles.timelineSubtitle}>{item.subtitle}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={callbackStyles.noteList}>
                    {(activeTab === "keap-notes" ? record.keap_notes : record.personal_notes).map(
                      (note, i) => (
                        <div key={i} className={callbackStyles.noteItem}>
                          {note}
                        </div>
                      )
                    )}
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
