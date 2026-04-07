import React from "react";

import { callLogsStyles } from "@/features/call-logs/styles/callLogsStyles";
import Image from "next/image";
import NoImage from "@/../public/assets/call-logs/no-call-logs.png";

const CallLogsEmptyState = () => {
  return (
    <div className={callLogsStyles.emptyWrap}>
      <div className={callLogsStyles.emptyInner}>
        <Image src={NoImage} alt="" className="" width={268} height={191} />
        <h2 className={callLogsStyles.emptyTitle}>No Call Activity Yet</h2>
        <p className={callLogsStyles.emptyDescription}>
          Call records will appear here once representatives begin making
          outbound calls.
        </p>
      </div>
    </div>
  );
};

export default CallLogsEmptyState;
