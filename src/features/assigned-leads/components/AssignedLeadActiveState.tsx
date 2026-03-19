"use client";

import React from "react";
import { ExternalLinkIcon } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { assignedLeadStyles as s } from "@/features/assigned-leads/styles/assignedLeadStyles";
import AssignedLeadCallBar from "@/features/assigned-leads/components/AssignedLeadCallBar";
import {
  AssignedLeadInfo,
  AssignedLeadSectionTitle
} from "@/features/assigned-leads/components/AssignedLeadInfo";
import AssignedLeadTimelineItem from "@/features/assigned-leads/components/AssignedLeadTimelineItem";
import { useAircall } from "@/features/aircall/hooks/useAirCall";

const AssignedLeadActiveState = () => {
  const { dial, isReady } = useAircall({
    containerId: "#phone-container",
    onCallEnded: (data) => {
      console.log("Call completed!");

      // YOUR FUTURE LOGIC
    }
  });
  return (
    <div className="flex flex-col">
      <div className="w-full h-[500px]">
        <div id="phone-container" className="w-full h-full"></div>
      </div>

      <button onClick={() => dial("+923302546626")} disabled={!isReady}>
        {isReady ? "Dial number" : "Loading Aircall..."}
      </button>
      <AssignedLeadCallBar />

      <section className={s.card}>
        <header className={s.cardHeader}>
          <h1 className={s.cardTitle}>Lead Information</h1>
          <button type="button" className={s.cardLink}>
            <ExternalLinkIcon className="size-4" aria-hidden="true" />
            Click to Open Contact in Keap
          </button>
        </header>

        <div className={s.contentGrid}>
          <div className="min-w-0">
            <AssignedLeadSectionTitle>
              BASIC INFORMATION
            </AssignedLeadSectionTitle>
            <div className={s.infoGrid3}>
              <AssignedLeadInfo label="Email" value="sarah@gmail.com" />
              <AssignedLeadInfo label="Phone" value="+923302546626" />
              <AssignedLeadInfo
                label="Send Timezone"
                value="Australia/Sydney"
              />

              <AssignedLeadInfo
                label="Latest Event Name"
                value="Sydney Masterclass"
              />
              <AssignedLeadInfo label="Event Date" value="March 15, 2025" />
              <AssignedLeadInfo label="Location" value="Yes" />

              <AssignedLeadInfo label="Referral" value="Yes" />
              <AssignedLeadInfo label="Referred By" value="Michael Stevens" />
            </div>

            <div className={s.divider} />

            <AssignedLeadSectionTitle>LEAD STATUS</AssignedLeadSectionTitle>
            <div className={s.infoGrid2}>
              <div>
                <div className={s.infoLabel}>Current Status</div>
                <div className={s.statusBadge}>Cooldown</div>
              </div>
              <AssignedLeadInfo
                label="Assigned Representation"
                value="James Carter"
              />
              <AssignedLeadInfo label="Timezone" value="Australia/Sydney" />
              <AssignedLeadInfo label="Call Type" value="Cold Lead" />
            </div>

            <div className={s.purchaseCard}>
              <div className={s.purchaseHeader}>
                <div className={s.purchaseTitle}>Purchase History</div>
                <div className={s.purchaseTotal}>
                  TOTAL PURCHASE
                  <span className={s.purchaseTotalAmount}>$ 2,300</span>
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
            <AssignedLeadSectionTitle>
              CALL HISTORY TIMELINE
            </AssignedLeadSectionTitle>
            <div className={s.timelineWrap}>
              <div className={s.timelineList}>
                <div className={s.timelineLine} aria-hidden="true" />
                <div className={s.timelineItems}>
                  <AssignedLeadTimelineItem
                    title="No Answer"
                    subtitle="Olivia Smith on Feb 20, 2025 at 10:12 AM"
                  />
                  <AssignedLeadTimelineItem
                    title="No Answer"
                    subtitle="Olivia Smith on Feb 20, 2025 at 10:12 AM"
                  />
                  <AssignedLeadTimelineItem
                    title="No Answer"
                    subtitle="Olivia Smith on Feb 20, 2025 at 10:12 AM"
                  />
                  <AssignedLeadTimelineItem
                    title="Voice Mail"
                    subtitle="Olivia Smith on Feb 20, 2025 at 10:12 AM"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AssignedLeadActiveState;
