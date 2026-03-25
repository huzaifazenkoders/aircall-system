import React from "react";

import DialerAuthHero from "@/features/dialer-auth/components/DialerAuthHero";
import { dialerAuthStyles } from "@/features/dialer-auth/styles/dialerAuthStyles";

const DialerAuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={dialerAuthStyles.layoutRoot}>
      <DialerAuthHero />
      <div className={dialerAuthStyles.contentPanel}>{children}</div>
    </div>
  );
};

export default DialerAuthLayout;
