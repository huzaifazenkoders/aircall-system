import BgImage from "@/../public/assets/dialer-auth/dialer-auth-bg-image.png";
import Logo from "@/../public/assets/dialer-auth/logo.svg";
import { dialerAuthStyles } from "@/features/dialer-auth/styles/dialerAuthStyles";
import { cn } from "@/lib/utils";
import Image from "next/image";

const DialerAuthHero = () => {
  return (
    <div className={cn(dialerAuthStyles.heroPanel, "relative")}>
      <div className={dialerAuthStyles.heroInner}>
        <div className={dialerAuthStyles.brandRow}>
          <Image src={Logo} alt="" height={34} width={35} />
          <span className={dialerAuthStyles.brandText}>Aircall System</span>
        </div>

        <div className={dialerAuthStyles.heroCopy}>
          <h1 className={dialerAuthStyles.heroTitle}>
            Where Lead Routing Meets Smart Calling
          </h1>
          <p className={dialerAuthStyles.heroSubtitle}>
            Centralize outbound calling, manage priority lists, and optimize
            lead distribution all in one streamlined platform built for
            high-performance sales teams.
          </p>
        </div>

        <Image
          src={BgImage}
          alt=""
          className={dialerAuthStyles.heroImage}
          width={754}
          height={665}
        />
      </div>
    </div>
  );
};

export default DialerAuthHero;
