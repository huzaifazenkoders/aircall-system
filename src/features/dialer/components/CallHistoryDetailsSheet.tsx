"use client";

import { CirclePlayIcon, ExternalLinkIcon, PhoneCallIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogIconClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { type CallHistoryRecord } from "@/features/dialer/data/dialerData";
import { callHistoryStyles } from "@/features/dialer/styles/dialerStyles";

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
      <DialogContent position="right" overlayClassName="bg-overlay-strong" className="flex h-full flex-col">
        <DialogHeader className={callHistoryStyles.sheetHeader}>
          <DialogTitle className={callHistoryStyles.sheetTitle}>Call Details</DialogTitle>
          <DialogIconClose />
        </DialogHeader>

        <DialogBody className="flex min-h-0 flex-1 flex-col p-0">
          <section className={callHistoryStyles.sheetSection}>
            <h3 className={callHistoryStyles.sheetSectionTitle}>LEAD INFORMATION</h3>
            <div className={callHistoryStyles.detailGrid}>
              <div>
                <div className={callHistoryStyles.detailLabel}>Name</div>
                <div className={callHistoryStyles.detailValue}>{record.leadName}</div>
              </div>
              <div>
                <div className={callHistoryStyles.detailLabel}>Email</div>
                <div className={callHistoryStyles.detailValue}>{record.email}</div>
              </div>
              <div>
                <div className={callHistoryStyles.detailLabel}>Phone</div>
                <div className={callHistoryStyles.detailValue}>{record.phone}</div>
              </div>
              <div>
                <div className={callHistoryStyles.detailLabel}>Timezone</div>
                <div className={callHistoryStyles.detailValue}>{record.timezone}</div>
              </div>
              <div>
                <div className={callHistoryStyles.detailLabel}>Event</div>
                <div className={callHistoryStyles.detailValue}>{record.event}</div>
              </div>
              <div>
                <div className={callHistoryStyles.detailLabel}>View in Keap</div>
                <a href="#" className={callHistoryStyles.link}>
                  Open Contact in Keap
                  <ExternalLinkIcon className="size-5" />
                </a>
              </div>
            </div>
          </section>

          <section className={callHistoryStyles.sheetSection}>
            <h3 className={callHistoryStyles.sheetSectionTitle}>CALL SUMMARY</h3>
            <div className={callHistoryStyles.detailGrid}>
              <div>
                <div className={callHistoryStyles.detailLabel}>Representative</div>
                <div className={callHistoryStyles.representative}>
                  <span className={callHistoryStyles.representativeAvatar}>{record.representativeAvatar}</span>
                  <span>{record.representative}</span>
                </div>
              </div>
              <div>
                <div className={callHistoryStyles.detailLabel}>Disposition</div>
                <Badge variant={dispositionVariantMap[record.disposition]} className="mt-1.5 h-8 rounded-[0.75rem] px-4 text-base font-medium">
                  {record.disposition}
                </Badge>
              </div>
              <div>
                <div className={callHistoryStyles.detailLabel}>Call Time</div>
                <div className={callHistoryStyles.detailValue}>{record.callTime}</div>
              </div>
              <div>
                <div className={callHistoryStyles.detailLabel}>Next Action</div>
                <Badge variant="cooldown" className="mt-1.5 h-8 rounded-[0.75rem] px-4 text-base font-medium">
                  {record.nextAction}
                </Badge>
              </div>
              <div>
                <div className={callHistoryStyles.detailLabel}>Duration</div>
                <div className={callHistoryStyles.detailValue}>{record.recordingDuration}</div>
              </div>
              <div>
                <div className={callHistoryStyles.detailLabel}>Personal Note</div>
                <div className={callHistoryStyles.detailValue}>{record.personalNote}</div>
              </div>
            </div>

            <div className="mt-8">
              <div className={callHistoryStyles.detailLabel}>Keap Note</div>
              <div className={callHistoryStyles.noteText}>{record.keepNote}</div>
            </div>
          </section>

          <div className={callHistoryStyles.recordingBar}>
            <div className={callHistoryStyles.recordingMeta}>
              <div className={callHistoryStyles.recordingIconWrap}>
                <PhoneCallIcon className="size-7 stroke-[1.8]" />
              </div>
              <div>
                <div className={callHistoryStyles.recordingLabel}>Call Recording</div>
                <div className={callHistoryStyles.recordingTime}>{record.recordingDuration}</div>
              </div>
            </div>

            <button type="button" className={callHistoryStyles.playButton}>
              <CirclePlayIcon className="size-7 stroke-[1.8]" />
            </button>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default CallHistoryDetailsSheet;

