import React from "react";
import { callHistoryStyles } from "@/features/dialer/styles/dialerStyles";

const STAT_LABELS = [
  "Total Calls",
  "Calls Today",
  "Connected/Positive",
  "No Answer",
  "Callback Scheduled"
];

const CallHistoryStats = ({
  myStats,
  isPending
}: {
  myStats?: {
    total_calls: number;
    calls_today: number;
    connected_positive: number;
    no_answer: number;
    callback_scheduled: number;
  };
  isPending?: boolean;
}) => {
  const stats = myStats
    ? [
        { label: "Total Calls", value: myStats.total_calls },
        { label: "Calls Today", value: myStats.calls_today },
        { label: "Connected/Positive", value: myStats.connected_positive },
        { label: "No Answer", value: myStats.no_answer },
        { label: "Callback Scheduled", value: myStats.callback_scheduled }
      ]
    : STAT_LABELS.map((label) => ({ label, value: null }));

  return (
    <section className={callHistoryStyles.statsCard}>
      {stats.map((item, index) => (
        <React.Fragment key={item.label}>
          {index > 0 && <div className={callHistoryStyles.statDivider} />}
          <div className={callHistoryStyles.statItem}>
            <div className={callHistoryStyles.statLabel}>{item.label}</div>
            {isPending || item.value === null ? (
              <div className="mt-1 h-8 w-12 animate-pulse rounded-md bg-gray-200" />
            ) : (
              <div className={callHistoryStyles.statValue}>{item.value}</div>
            )}
          </div>
        </React.Fragment>
      ))}
    </section>
  );
};

export default CallHistoryStats;
