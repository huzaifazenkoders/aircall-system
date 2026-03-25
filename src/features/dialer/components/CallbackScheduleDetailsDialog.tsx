"use client";

import React from "react";
import {
  ArrowLeftIcon,
  CircleIcon,
  ExternalLinkIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { type CallbackScheduleRecord } from "@/features/dialer/data/dialerData";
import { callbackStyles } from "@/features/dialer/styles/dialerStyles";

const tabs = [
  { id: "call-history", label: "Call History" },
  { id: "keap-notes", label: "Keap Notes" },
  { id: "personal-notes", label: "Personal Notes" },
] as const;

const CallbackScheduleDetailsDialog = ({
  open,
  onOpenChange,
  record,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  record: CallbackScheduleRecord | null;
}) => {
  const [activeTab, setActiveTab] = React.useState<(typeof tabs)[number]["id"]>("call-history");

  React.useEffect(() => {
    if (open) {
      setActiveTab("call-history");
    }
  }, [open]);

  if (!record) {
    return null;
  }

  const activeNotes =
    activeTab === "keap-notes" ? record.keapNotes : record.personalNotes;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent overlayClassName="bg-overlay-strong" className={callbackStyles.dialogContent}>
        <DialogHeader className={callbackStyles.dialogHeader}>
          <div className={callbackStyles.dialogTitleWrap}>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full text-[#64748B] transition-colors hover:bg-muted"
              onClick={() => onOpenChange(false)}
            >
              <ArrowLeftIcon className="size-6" />
            </button>
            <div className={callbackStyles.dialogTitle}>{record.leadName}</div>
          </div>

          <Button variant="outline" className={callbackStyles.dialogAction}>
            <ExternalLinkIcon className="size-5" />
            Open Contact in Keap
          </Button>
        </DialogHeader>

        <DialogBody className="min-h-0 p-0">
          <div className={callbackStyles.dialogBody}>
            <div className={callbackStyles.dialogLeft}>
              <section>
                <div className={callbackStyles.sectionTitle}>BASIC INFORMATION</div>
                <div className={callbackStyles.infoGrid}>
                  <div>
                    <div className={callbackStyles.detailLabel}>Email</div>
                    <div className={callbackStyles.detailValue}>{record.email}</div>
                  </div>
                  <div>
                    <div className={callbackStyles.detailLabel}>Phone</div>
                    <div className={callbackStyles.detailValue}>{record.phone}</div>
                  </div>
                  <div>
                    <div className={callbackStyles.detailLabel}>Send Timezone</div>
                    <div className={callbackStyles.detailValue}>{record.sendTimezone}</div>
                  </div>
                  <div>
                    <div className={callbackStyles.detailLabel}>Registered Event</div>
                    <div className={callbackStyles.detailValue}>{record.registeredEvent}</div>
                  </div>
                  <div>
                    <div className={callbackStyles.detailLabel}>Event Date</div>
                    <div className={callbackStyles.detailValue}>{record.eventDate}</div>
                  </div>
                  <div>
                    <div className={callbackStyles.detailLabel}>Event Location</div>
                    <div className={callbackStyles.detailValue}>{record.eventLocation}</div>
                  </div>
                  <div>
                    <div className={callbackStyles.detailLabel}>Referred By</div>
                    <div className={callbackStyles.detailValue}>{record.referredBy}</div>
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
                      <span className={callbackStyles.pill}>{record.currentStatus}</span>
                    </div>
                  </div>
                  <div>
                    <div className={callbackStyles.detailLabel}>Lead Owner</div>
                    <div className={callbackStyles.detailValue}>{record.leadOwner}</div>
                  </div>
                </div>
              </section>

              <section className={callbackStyles.purchaseCard}>
                <div className={callbackStyles.purchaseHeader}>
                  <div className={callbackStyles.purchaseTitle}>Purchase History</div>
                  <div className={callbackStyles.purchaseTotalWrap}>
                    <span className={callbackStyles.purchaseTotalLabel}>Total Purchase</span>
                    <span className={callbackStyles.purchaseTotalValue}>{record.totalPurchase}</span>
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
                          <td className={callbackStyles.purchaseCell}>{purchase.purchaseDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            <div className={callbackStyles.dialogRight}>
              <div className={callbackStyles.tabs}>
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(callbackStyles.tab, activeTab === tab.id && callbackStyles.tabActive)}
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
                        {index < record.timeline.length - 1 ? <div className={callbackStyles.timelineLine} /> : null}
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
                  {activeNotes.map((note) => (
                    <div key={note} className={callbackStyles.noteItem}>
                      {note}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default CallbackScheduleDetailsDialog;
