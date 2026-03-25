import type { ReactNode } from "react";

import DialerSidebar from "@/features/dialer/components/DialerSidebar";
import DialerTopbar from "@/features/dialer/components/DialerTopbar";
import { dialerShellStyles } from "@/features/dialer/styles/dialerStyles";

const DialerShell = ({ children }: { children: ReactNode }) => {
  return (
    <div className={dialerShellStyles.shell}>
      <div className={dialerShellStyles.frame}>
        <DialerSidebar />
        <div className={dialerShellStyles.content}>
          <DialerTopbar />
          <main className={dialerShellStyles.page}>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DialerShell;

