"use client";

import type { ReactNode } from "react";

import DialerSidebar from "@/features/dialer/components/DialerSidebar";
import { dialerShellStyles } from "@/features/dialer/styles/dialerStyles";
import AppTopbar from "@/components/custom/app-shell/AppTopbar";

const DialerShell = ({ children }: { children: ReactNode }) => {
  return (
    <div className={dialerShellStyles.shell}>
      <div className={dialerShellStyles.frame}>
        <DialerSidebar />
        <div className={dialerShellStyles.content}>
          <AppTopbar openSidebar={() => {}} />
          <main className={dialerShellStyles.page}>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DialerShell;
