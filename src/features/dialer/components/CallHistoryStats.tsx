import React from "react";
import { callHistorySummary } from "@/features/dialer/data/dialerData";
import { callHistoryStyles } from "@/features/dialer/styles/dialerStyles";

const CallHistoryStats = () => {
  return (
    <section className={callHistoryStyles.statsCard}>
      {callHistorySummary.map((item, index) => (
        <React.Fragment key={item.label}>
          {index > 0 && <div className={callHistoryStyles.statDivider} />}
          <div className={callHistoryStyles.statItem}>
            <div className={callHistoryStyles.statLabel}>{item.label}</div>
            <div className={callHistoryStyles.statValue}>{item.value}</div>
          </div>
        </React.Fragment>
      ))}
    </section>
  );
};

export default CallHistoryStats;

