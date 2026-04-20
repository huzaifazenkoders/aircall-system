"use client";

import React from "react";
import { Loader2Icon, PlayIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogIconClose,
  DialogTitle
} from "@/components/ui/dialog";
import { type CallLog } from "@/features/call-logs/types/callLogTypes";
import { callLogsStyles } from "@/features/call-logs/styles/callLogsStyles";
import Image from "next/image";
import PhoneList from "@/../public/assets/call-logs/PhoneList.svg";

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

type CallLogDetailsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  callLog: CallLog | null;
  isLoading?: boolean;
};

const CallLogDetailsDialog = ({
  open,
  onOpenChange,
  callLog,
  isLoading
}: CallLogDetailsDialogProps) => {
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

        <DialogBody className="flex min-h-0 flex-1 flex-col p-0 overflow-y-auto">
          {isLoading || !callLog ? (
            <div className="flex flex-1 items-center justify-center">
              <Loader2Icon className="size-8 animate-spin text-panel-muted" />
            </div>
          ) : (
            <>
              <section className={callLogsStyles.section}>
                <h3 className={callLogsStyles.sectionTitle}>
                  Lead Information
                </h3>
                <div className={callLogsStyles.detailsGrid}>
                  <div className="flex flex-col gap-4 sm:flex-row sm:gap-0">
                    <div className="flex-1 inline-flex flex-col justify-center gap-0.5">
                      <p className={callLogsStyles.detailLabel}>Name</p>
                      <p className={callLogsStyles.detailValue}>
                        {callLog.lead
                          ? `${callLog.lead.first_name} ${callLog.lead.last_name}`
                          : callLog.lead_id}
                      </p>
                    </div>
                    <div className="flex-1 inline-flex flex-col justify-center gap-0.5">
                      <p className={callLogsStyles.detailLabel}>Email</p>
                      <p className={callLogsStyles.detailValue}>
                        {callLog.lead?.email ?? "—"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 sm:flex-row sm:gap-0">
                    <div className="flex-1 inline-flex flex-col justify-center gap-0.5">
                      <p className={callLogsStyles.detailLabel}>Phone</p>
                      <p className={callLogsStyles.detailValue}>
                        {callLog.lead?.phone ?? "—"}
                      </p>
                    </div>
                    <div className="flex-1 inline-flex flex-col justify-center gap-0.5">
                      <p className={callLogsStyles.detailLabel}>Timezone</p>
                      <p className={callLogsStyles.detailValue}>
                        {callLog.lead?.timezone ?? "—"}
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
                      <p className={callLogsStyles.detailLabel}>
                        Representative
                      </p>
                      <div className={callLogsStyles.representative}>
                        <span className={callLogsStyles.avatar} />
                        <span className={callLogsStyles.detailValue}>
                          {callLog.assigned_to
                            ? `${callLog.assigned_to.first_name} ${callLog.assigned_to.last_name}`
                            : "—"}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 inline-flex flex-col justify-center gap-0.5">
                      <p className={callLogsStyles.detailLabel}>Status</p>
                      <Badge
                        variant={
                          callStatusVariantMap[callLog.call_status] as never
                        }
                        className="rounded-lg px-2 py-1 text-xs font-medium leading-4 tracking-tight"
                      >
                        {callStatusLabelMap[callLog.call_status]}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 sm:flex-row sm:gap-0">
                    <div className="flex-1 inline-flex flex-col justify-center gap-0.5">
                      <p className={callLogsStyles.detailLabel}>Call Time</p>
                      <p className={callLogsStyles.detailValue}>
                        {new Date(callLog.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex-1 inline-flex flex-col justify-center gap-0.5">
                      <p className={callLogsStyles.detailLabel}>Attempt #</p>
                      <p className={callLogsStyles.detailValue}>
                        {callLog.attempt_number}
                      </p>
                    </div>
                  </div>
                </div>

                <div className={callLogsStyles.noteWrap}>
                  <p className={callLogsStyles.detailLabel}>Note</p>
                  <p className={callLogsStyles.noteValue}>
                    {callLog.notes || "—"}
                  </p>
                </div>
              </section>

              <div className={callLogsStyles.recordingBar}>
                <div className={callLogsStyles.recordingMeta}>
                  <div className={callLogsStyles.recordingIconWrap}>
                    <Image src={PhoneList} alt="" height={39} width={39} />
                  </div>
                  <div className="flex flex-col">
                    <p className={callLogsStyles.recordingLabel}>
                      Call Recording
                    </p>
                  </div>
                </div>
                <button type="button" className={callLogsStyles.playButton}>
                  <PlayIcon className="size-6" />
                </button>
              </div>
            </>
          )}
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default CallLogDetailsDialog;
