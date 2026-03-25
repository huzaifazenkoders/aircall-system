"use client";

import React from "react";
import { CirclePlayIcon, PhoneCallIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogIconClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { type CallLog } from "@/features/call-logs/data/callLogsData";
import { callLogsStyles } from "@/features/call-logs/styles/callLogsStyles";

const dispositionVariantMap = {
  Connected: "connected",
  Callback: "callback",
  "No Answer": "no-answer",
  "Not Interested": "not-interested",
  "Wrong Number": "wrong-number",
} as const;

type CallLogDetailsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  callLog: CallLog | null;
};

const CallLogDetailsDialog = ({
  open,
  onOpenChange,
  callLog,
}: CallLogDetailsDialogProps) => {
  if (!callLog) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        position="right"
        overlayClassName="bg-overlay-strong"
        className="flex h-full flex-col"
      >
        <DialogHeader className={callLogsStyles.dialogHeader}>
          <DialogTitle className={callLogsStyles.dialogTitle}>
            Call Details
          </DialogTitle>
          <DialogIconClose />
        </DialogHeader>

        <DialogBody className="flex min-h-0 flex-1 flex-col p-0">
          <section className={callLogsStyles.section}>
            <h3 className={callLogsStyles.sectionTitle}>LEAD INFORMATION</h3>
            <div className={callLogsStyles.detailsGrid}>
              <div>
                <p className={callLogsStyles.detailLabel}>Name</p>
                <p className={callLogsStyles.detailValue}>{callLog.leadName}</p>
              </div>
              <div>
                <p className={callLogsStyles.detailLabel}>Email</p>
                <p className={callLogsStyles.detailValue}>{callLog.email}</p>
              </div>
              <div>
                <p className={callLogsStyles.detailLabel}>Phone</p>
                <p className={callLogsStyles.detailValue}>{callLog.phone}</p>
              </div>
              <div>
                <p className={callLogsStyles.detailLabel}>Timezone</p>
                <p className={callLogsStyles.detailValue}>{callLog.timezone}</p>
              </div>
              <div>
                <p className={callLogsStyles.detailLabel}>Event</p>
                <p className={callLogsStyles.detailValue}>{callLog.event}</p>
              </div>
              <div>
                <p className={callLogsStyles.detailLabel}>View in Keap</p>
                <a href="#" className={callLogsStyles.keapLink}>
                  {callLog.keapUrlLabel}
                </a>
              </div>
            </div>
          </section>

          <section className={callLogsStyles.section}>
            <h3 className={callLogsStyles.sectionTitle}>CALL SUMMARY</h3>
            <div className={callLogsStyles.summaryGrid}>
              <div>
                <p className={callLogsStyles.detailLabel}>Representative</p>
                <div className={callLogsStyles.representative}>
                  <span className={callLogsStyles.avatar}>
                    {callLog.representativeAvatar}
                  </span>
                  <span>{callLog.representative}</span>
                </div>
              </div>
              <div>
                <p className={callLogsStyles.detailLabel}>Disposition</p>
                <Badge
                  variant={dispositionVariantMap[callLog.disposition]}
                  className="mt-1.5 h-8 rounded-[12px] px-4 text-[16px] font-medium"
                >
                  {callLog.disposition}
                </Badge>
              </div>
              <div>
                <p className={callLogsStyles.detailLabel}>Call Time</p>
                <p className={callLogsStyles.detailValue}>{callLog.callTime}</p>
              </div>
              <div>
                <p className={callLogsStyles.detailLabel}>Next Action</p>
                <Badge
                  variant="cooldown"
                  className="mt-1.5 h-8 rounded-[12px] px-4 text-[16px] font-medium"
                >
                  {callLog.nextAction}
                </Badge>
              </div>
            </div>

            <div className={callLogsStyles.noteWrap}>
              <p className={callLogsStyles.detailLabel}>Note</p>
              <p className={callLogsStyles.noteValue}>{callLog.note}</p>
            </div>
          </section>

          <div className={callLogsStyles.recordingBar}>
            <div className={callLogsStyles.recordingMeta}>
              <div className={callLogsStyles.recordingIconWrap}>
                <PhoneCallIcon className="size-8 stroke-[1.8]" />
              </div>
              <div>
                <p className={callLogsStyles.recordingLabel}>Call Recording</p>
                <p className={callLogsStyles.recordingTime}>
                  {callLog.recordingDuration}
                </p>
              </div>
            </div>

            <button type="button" className={callLogsStyles.playButton}>
              <CirclePlayIcon className="size-7 fill-none stroke-[1.8]" />
            </button>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default CallLogDetailsDialog;
