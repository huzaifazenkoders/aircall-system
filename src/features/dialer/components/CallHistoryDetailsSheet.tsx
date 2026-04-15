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
import { MyCallLog, MyCallLogDetail } from "@/features/dialer/types/leadActivityTypes";

const callStatusVariantMap: Record<string, string> = {
  completed: "connected",
  failed: "not-interested",
  no_answer: "no-answer",
};

const callStatusLabelMap: Record<string, string> = {
  completed: "Completed",
  failed: "Failed",
  no_answer: "No Answer",
};

const CallHistoryDetailsSheet = ({
  open,
  onOpenChange,
  record,
  isLoading,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  record: MyCallLogDetail | null;
  isLoading?: boolean;
}) => {
  if (!record && !isLoading) {
    return null;
  }

  const leadName = record?.lead
    ? `${record.lead.first_name} ${record.lead.last_name}`
    : "—";
  const assignedName = record?.assigned_to
    ? `${record.assigned_to.first_name} ${record.assigned_to.last_name}`
    : "—";
  const assignedInitials = record?.assigned_to
    ? `${record.assigned_to.first_name[0]}${record.assigned_to.last_name[0]}`
    : "—";

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
                  <p className={callLogsStyles.detailValue}>{leadName}</p>
                </div>
                <div className="flex-1 h-12 inline-flex flex-col justify-center gap-0.5">
                  <p className={callLogsStyles.detailLabel}>Email</p>
                  <p className={callLogsStyles.detailValue}>{record?.lead?.email ?? "—"}</p>
                </div>
              </div>
              <div className="inline-flex gap-0">
                <div className="flex-1 h-12 inline-flex flex-col justify-center gap-0.5">
                  <p className={callLogsStyles.detailLabel}>Phone</p>
                  <p className={callLogsStyles.detailValue}>{record?.lead?.phone ?? "—"}</p>
                </div>
                <div className="flex-1 h-12 inline-flex flex-col justify-center gap-0.5">
                  <p className={callLogsStyles.detailLabel}>Timezone</p>
                  <p className={callLogsStyles.detailValue}>{record?.lead?.timezone ?? "—"}</p>
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
                      {assignedInitials}
                    </span>
                    <span className={callLogsStyles.detailValue}>
                      {assignedName}
                    </span>
                  </div>
                </div>
                <div className="flex-1 h-12 inline-flex flex-col justify-center gap-0.5">
                  <p className={callLogsStyles.detailLabel}>Status</p>
                  <Badge
                    variant={callStatusVariantMap[record?.call_status ?? ""] as never}
                    className="rounded-lg px-2 py-1 text-xs font-medium leading-4 tracking-tight"
                  >
                    {callStatusLabelMap[record?.call_status ?? ""] ?? record?.call_status}
                  </Badge>
                </div>
              </div>
              <div className="inline-flex gap-0">
                <div className="flex-1 h-12 inline-flex flex-col justify-center gap-0.5">
                  <p className={callLogsStyles.detailLabel}>Call Time</p>
                  <p className={callLogsStyles.detailValue}>{record?.created_at ?? "—"}</p>
                </div>
                <div className="flex-1 h-12 inline-flex flex-col justify-center gap-0.5">
                  <p className={callLogsStyles.detailLabel}>Duration</p>
                  <p className={callLogsStyles.detailValue}>
                    {record?.recording_duration ?? "—"}
                  </p>
                </div>
              </div>
              <div className="inline-flex gap-0">
                <div className="flex-1 h-12 inline-flex flex-col justify-center gap-0.5">
                  <p className={callLogsStyles.detailLabel}>Event</p>
                  <p className={callLogsStyles.detailValue}>{record?.lead?.event_name ?? "—"}</p>
                </div>
                <div className="flex-1 h-12 inline-flex flex-col justify-center gap-0.5">
                  <p className={callLogsStyles.detailLabel}>Next Action</p>
                  <p className={callLogsStyles.detailValue}>{record?.next_action ?? "—"}</p>
                </div>
              </div>
            </div>

            <div className={callLogsStyles.noteWrap}>
              <p className={callLogsStyles.detailLabel}>Personal Note</p>
              <p className={callLogsStyles.noteValue}>
                {record?.personal_note || "—"}
              </p>
            </div>

            <div className={callLogsStyles.noteWrap}>
              <p className={callLogsStyles.detailLabel}>Keap Note</p>
              <p className={callLogsStyles.noteValue}>{record?.keap_note || "—"}</p>
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
                  {record?.recording_duration ?? "—"}
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
