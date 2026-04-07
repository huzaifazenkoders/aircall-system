"use client";

import { PlayIcon } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogIconClose,
  DialogTitle,
} from "@/components/ui/dialog";
import PhoneList from "@/../public/assets/call-logs/PhoneList.svg";
import { callLogsStyles } from "@/features/call-logs/styles/callLogsStyles";
import { type CallHistoryRecord } from "@/features/dialer/data/dialerData";

const dispositionVariantMap = {
  Connected: "connected",
  Callback: "callback",
  "No Answer": "no-answer",
  "Not Interested": "not-interested",
  "Wrong Number": "wrong-number",
} as const;

const CallHistoryDetailsSheet = ({
  open,
  onOpenChange,
  record,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  record: CallHistoryRecord | null;
}) => {
  if (!record) {
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
            <h3 className={callLogsStyles.sectionTitle}>Lead Information</h3>
            <div className={callLogsStyles.detailsGrid}>
              <div className="inline-flex gap-0">
                <div className="flex-1 h-12 inline-flex flex-col justify-center gap-0.5">
                  <p className={callLogsStyles.detailLabel}>Name</p>
                  <p className={callLogsStyles.detailValue}>{record.leadName}</p>
                </div>
                <div className="flex-1 h-12 inline-flex flex-col justify-center gap-0.5">
                  <p className={callLogsStyles.detailLabel}>Email</p>
                  <p className={callLogsStyles.detailValue}>{record.email}</p>
                </div>
              </div>
              <div className="inline-flex gap-0">
                <div className="flex-1 h-12 inline-flex flex-col justify-center gap-0.5">
                  <p className={callLogsStyles.detailLabel}>Phone</p>
                  <p className={callLogsStyles.detailValue}>{record.phone}</p>
                </div>
                <div className="flex-1 h-12 inline-flex flex-col justify-center gap-0.5">
                  <p className={callLogsStyles.detailLabel}>Timezone</p>
                  <p className={callLogsStyles.detailValue}>{record.timezone}</p>
                </div>
              </div>
            </div>
          </section>

          <section className={callLogsStyles.section}>
            <h3 className={callLogsStyles.sectionTitle}>Call Summary</h3>
            <div className={callLogsStyles.summaryGrid}>
              <div className="inline-flex gap-0">
                <div className="flex-1 h-12 inline-flex flex-col justify-center gap-0.5">
                  <p className={callLogsStyles.detailLabel}>Representative</p>
                  <div className={callLogsStyles.representative}>
                    <span className={callLogsStyles.avatar}>
                      {record.representativeAvatar}
                    </span>
                    <span className={callLogsStyles.detailValue}>
                      {record.representative}
                    </span>
                  </div>
                </div>
                <div className="flex-1 h-12 inline-flex flex-col justify-center gap-0.5">
                  <p className={callLogsStyles.detailLabel}>Status</p>
                  <Badge
                    variant={dispositionVariantMap[record.disposition]}
                    className="rounded-lg px-2 py-1 text-xs font-medium leading-4 tracking-tight"
                  >
                    {record.disposition}
                  </Badge>
                </div>
              </div>
              <div className="inline-flex gap-0">
                <div className="flex-1 h-12 inline-flex flex-col justify-center gap-0.5">
                  <p className={callLogsStyles.detailLabel}>Call Time</p>
                  <p className={callLogsStyles.detailValue}>{record.callTime}</p>
                </div>
                <div className="flex-1 h-12 inline-flex flex-col justify-center gap-0.5">
                  <p className={callLogsStyles.detailLabel}>Duration</p>
                  <p className={callLogsStyles.detailValue}>
                    {record.recordingDuration}
                  </p>
                </div>
              </div>
              <div className="inline-flex gap-0">
                <div className="flex-1 h-12 inline-flex flex-col justify-center gap-0.5">
                  <p className={callLogsStyles.detailLabel}>Event</p>
                  <p className={callLogsStyles.detailValue}>{record.event}</p>
                </div>
                <div className="flex-1 h-12 inline-flex flex-col justify-center gap-0.5">
                  <p className={callLogsStyles.detailLabel}>Next Action</p>
                  <p className={callLogsStyles.detailValue}>{record.nextAction}</p>
                </div>
              </div>
            </div>

            <div className={callLogsStyles.noteWrap}>
              <p className={callLogsStyles.detailLabel}>Personal Note</p>
              <p className={callLogsStyles.noteValue}>
                {record.personalNote || "—"}
              </p>
            </div>

            <div className={callLogsStyles.noteWrap}>
              <p className={callLogsStyles.detailLabel}>Keap Note</p>
              <p className={callLogsStyles.noteValue}>{record.keepNote || "—"}</p>
            </div>
          </section>

          <div className={callLogsStyles.recordingBar}>
            <div className={callLogsStyles.recordingMeta}>
              <div className={callLogsStyles.recordingIconWrap}>
                <Image src={PhoneList} alt="" height={39} width={39} />
              </div>
              <div className="flex flex-col">
                <p className={callLogsStyles.recordingLabel}>Call Recording</p>
                <p className={callLogsStyles.recordingTime}>
                  {record.recordingDuration}
                </p>
              </div>
            </div>

            <button type="button" className={callLogsStyles.playButton}>
              <PlayIcon className="size-6" />
            </button>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default CallHistoryDetailsSheet;
