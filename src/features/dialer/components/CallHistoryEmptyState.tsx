import { callHistoryStyles } from "@/features/dialer/styles/dialerStyles";
import Image from "next/image";
import Img from "@/../public/assets/dialer/no-call-history.png";

const CallHistoryIllustration = () => {
  return <Image src={Img} alt="" height={192} width={266} />;
};

const CallHistoryEmptyState = () => {
  return (
    <div className={callHistoryStyles.emptyWrap}>
      <div className={callHistoryStyles.emptyInner}>
        <CallHistoryIllustration />
        <h2 className={callHistoryStyles.emptyTitle}>No Call Activity Yet</h2>
        <p className={callHistoryStyles.emptyDescription}>
          Call records will appear here once You begin making outbound calls.
        </p>
      </div>
    </div>
  );
};

export default CallHistoryEmptyState;
