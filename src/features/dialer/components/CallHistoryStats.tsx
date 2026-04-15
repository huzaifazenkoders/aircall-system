import React from "react";
import { callHistoryStyles } from "@/features/dialer/styles/dialerStyles";

const CallHistoryStats = ({
  myStats
}: {
  myStats: {
    total_calls: number;
    calls_today: number;
    connected_positive: number;
    no_answer: number;
    callback_scheduled: number;
  };
}) => {
  const stats = [
    { label: "Total Calls", value: myStats.total_calls },
    { label: "Calls Today", value: myStats.calls_today },
    { label: "Connected/Positive", value: myStats.connected_positive },
    { label: "No Answer", value: myStats.no_answer },
    { label: "Callback Scheduled", value: myStats.callback_scheduled }
  ];

  return (
    <section className={callHistoryStyles.statsCard}>
      {stats.map((item, index) => (
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
