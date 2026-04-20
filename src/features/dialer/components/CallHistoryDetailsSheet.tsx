"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";

import PhoneList from "@/../public/assets/call-logs/PhoneList.svg";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogIconClose,
  DialogTitle
} from "@/components/ui/dialog";
import { callLogsStyles } from "@/features/call-logs/styles/callLogsStyles";
import { useGetMyCallLogDetail } from "@/features/dialer/services/leadActivityService";

const callStatusVariantMap: Record<string, string> = {
  completed: "connected",
  failed: "not-interested",
  no_answer: "no-answer"
};

const callStatusLabelMap: Record<string, string> = {
  completed: "Completed",
  failed: "Failed",
  no_answer: "No Answer"
};

const CallHistoryDetailsSheet = ({
  open,
  onOpenChange,
  id
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
}) => {
  const { data: detailResponse, isLoading } = useGetMyCallLogDetail(id);
  const record = detailResponse?.data;

  const leadName = record?.lead_name;
  const assignedName = record?.user_name;
  const assignedInitials = `${record?.user_name[0]}${record?.user_name[record?.user_name.length - 1]}`;

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

        {isLoading ? (
          <DialogBody className="flex min-h-0 flex-1 flex-col p-0">
            <div className="flex min-h-0 flex-1 items-center justify-center p-8">
              <Loader2 className="size-6 animate-spin" />
            </div>
          </DialogBody>
        ) : !record ? (
          <DialogBody className="flex min-h-0 flex-1 flex-col p-0">
            <div className="flex min-h-0 flex-1 items-center justify-center p-8">
              <p className="text-text-secondary">No data found</p>
            </div>
          </DialogBody>
        ) : (
          <DialogBody className="flex min-h-0 flex-1 flex-col p-0">
            <section className={callLogsStyles.section}>
              <h3 className={callLogsStyles.sectionTitle}>Lead Information</h3>
              <div className={callLogsStyles.detailsGrid}>
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-0">
                  <div className="flex-1 inline-flex flex-col justify-center gap-0.5">
                    <p className={callLogsStyles.detailLabel}>Name</p>
                    <p className={callLogsStyles.detailValue}>{leadName}</p>
                  </div>
                  <div className="flex-1 inline-flex flex-col justify-center gap-0.5">
                    <p className={callLogsStyles.detailLabel}>Email</p>
                    <p className={callLogsStyles.detailValue}>
                      {record?.lead?.email ?? "—"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-0">
                  <div className="flex-1 inline-flex flex-col justify-center gap-0.5">
                    <p className={callLogsStyles.detailLabel}>Phone</p>
                    <p className={callLogsStyles.detailValue}>
                      {record?.lead?.phone ?? "—"}
                    </p>
                  </div>
                  <div className="flex-1 inline-flex flex-col justify-center gap-0.5">
                    <p className={callLogsStyles.detailLabel}>Timezone</p>
                    <p className={callLogsStyles.detailValue}>
                      {record?.lead?.timezone ?? "—"}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className={callLogsStyles.section}>
              <h3 className={callLogsStyles.sectionTitle}>Call Summary</h3>
              <div className={callLogsStyles.summaryGrid}>
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-0">
                  <div className="flex-1 inline-flex flex-col justify-center gap-0.5">
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
                  <div className="flex-1 inline-flex flex-col justify-center gap-0.5">
                    <p className={callLogsStyles.detailLabel}>Status</p>
                    <Badge
                      variant={
                        callStatusVariantMap[record?.call_status ?? ""] as never
                      }
                      className="rounded-lg px-2 py-1 text-xs font-medium leading-4 tracking-tight"
                    >
                      {callStatusLabelMap[record?.call_status ?? ""] ??
                        record?.call_status}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-0">
                  <div className="flex-1 inline-flex flex-col justify-center gap-0.5">
                    <p className={callLogsStyles.detailLabel}>Call Time</p>
                    <p className={callLogsStyles.detailValue}>
                      {record?.created_at ?? "—"}
                    </p>
                  </div>
                  <div className="flex-1 inline-flex flex-col justify-center gap-0.5">
                    <p className={callLogsStyles.detailLabel}>List</p>
                    <p className={callLogsStyles.detailValue}>
                      {record?.list_name ?? "—"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-0">
                  <div className="flex-1 inline-flex flex-col justify-center gap-0.5">
                    <p className={callLogsStyles.detailLabel}>Event Date</p>
                    <p className={callLogsStyles.detailValue}>
                      {record?.lead?.event_date ?? "—"}
                    </p>
                  </div>
                  <div className="flex-1 inline-flex flex-col justify-center gap-0.5">
                    <p className={callLogsStyles.detailLabel}>Attempt</p>
                    <p className={callLogsStyles.detailValue}>
                      {record?.attempt_number ?? "—"}
                    </p>
                  </div>
                </div>
              </div>

              <div className={callLogsStyles.noteWrap}>
                <p className={callLogsStyles.detailLabel}>Notes</p>
                <p className={callLogsStyles.noteValue}>
                  {record?.notes || "—"}
                </p>
              </div>
            </section>

            {record?.notes && (
              <div className={callLogsStyles.recordingBar}>
                <div className={callLogsStyles.recordingMeta}>
                  <div className={callLogsStyles.recordingIconWrap}>
                    <Image src={PhoneList} alt="" height={39} width={39} />
                  </div>
                  <div className="flex flex-col">
                    <p className={callLogsStyles.recordingLabel}>
                      Notes Summary
                    </p>
                    <p className={callLogsStyles.recordingTime}>
                      {record?.notes}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </DialogBody>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CallHistoryDetailsSheet;
