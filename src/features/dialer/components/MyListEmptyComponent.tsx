import Image from "next/image";
import { myListStyles } from "@/features/dialer/styles/dialerStyles";
import NoImage from "@/../public/assets/dialer/no-data-my-list-flow.png";

const MyListEmptyComponent = () => {
  return (
    <div className={myListStyles.emptyWrap}>
      <div className={myListStyles.emptyInner}>
        <Image src={NoImage} alt="" width={433} height={292} quality={1000} />
        <h2 className={myListStyles.emptyTitle}>No Lists Available</h2>
        <p className={myListStyles.emptyDescription}>
          It looks like you haven&apos;t been assigned to any lists yet. Please
          check back later or contact your admin.
        </p>
      </div>
    </div>
  );
};

export default MyListEmptyComponent;
