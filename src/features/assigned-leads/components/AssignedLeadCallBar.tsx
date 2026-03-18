"use client";

import React from "react";
import { MicIcon, PauseIcon, PhoneOffIcon, VoicemailIcon } from "lucide-react";

import { assignedLeadStyles as s } from "@/features/assigned-leads/styles/assignedLeadStyles";

const AssignedLeadCallBar = () => {
  return (
    <section className={s.callBar} aria-label="Active call">
      <div className={s.callBarLeft}>
        <div className={s.callAvatar} aria-hidden="true">
          SM
        </div>
        <div className={s.callMeta}>
          <div className={s.callName}>Sarah Mitchell</div>
          <div className={s.callTimer}>01:25</div>
        </div>
      </div>

      <div className={s.callActions}>
        <div className={s.callAction}>
          <button type="button" className={s.callActionButton} aria-label="Mic">
            <MicIcon className="size-5" aria-hidden="true" />
          </button>
          <div className={s.callActionLabel}>Mic</div>
        </div>

        <div className={s.callAction}>
          <button
            type="button"
            className={s.callActionButton}
            aria-label="Pause"
          >
            <PauseIcon className="size-5" aria-hidden="true" />
          </button>
          <div className={s.callActionLabel}>Pause</div>
        </div>

        <div className={s.callAction}>
          <button
            type="button"
            className={s.callActionButton}
            aria-label="Voicemail"
          >
            <VoicemailIcon className="size-5" aria-hidden="true" />
          </button>
          <div className={s.callActionLabel}>Voicemail</div>
        </div>

        <div className={s.callAction}>
          <button
            type="button"
            className={s.callActionDanger}
            aria-label="Leave"
          >
            <PhoneOffIcon className="size-5" aria-hidden="true" />
          </button>
          <div className={s.callActionLabel}>Leave</div>
        </div>
      </div>
    </section>
  );
};

export default AssignedLeadCallBar;

