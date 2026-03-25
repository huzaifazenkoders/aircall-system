import { callHistorySummary } from "@/features/dialer/data/dialerData";
import { callHistoryStyles } from "@/features/dialer/styles/dialerStyles";

const CallHistoryStats = () => {
  return (
    <section className={callHistoryStyles.statsCard}>
      {callHistorySummary.map((item) => (
        <div key={item.label} className={callHistoryStyles.statItem}>
          <div className={callHistoryStyles.statLabel}>{item.label}</div>
          <div className={callHistoryStyles.statValue}>{item.value}</div>
        </div>
      ))}
    </section>
  );
};

export default CallHistoryStats;

