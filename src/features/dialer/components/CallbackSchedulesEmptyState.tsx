import { callbackStyles } from "@/features/dialer/styles/dialerStyles";
import Image from "next/image";
import NoImge from "@/../public/assets/dialer/no-data-callback-schedule.png";

const CallbackSchedulesEmptyState = () => {
  return (
    <div className={callbackStyles.emptyWrap}>
      <div className={callbackStyles.emptyInner}>
        <Image src={NoImge} alt="" width={420} height={297} />
        <h2 className={callbackStyles.emptyTitle}>No Callbacks Scheduled</h2>
        <p className={callbackStyles.emptyDescription}>
          You don&apos;t have any upcoming callbacks. Scheduled calls will
          appear here once they are set.
        </p>
      </div>
    </div>
  );
};

export default CallbackSchedulesEmptyState;
