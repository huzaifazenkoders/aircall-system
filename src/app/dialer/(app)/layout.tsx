import type { ReactNode } from "react";

import DialerShell from "@/features/dialer/components/DialerShell";

const layout = ({ children }: { children: ReactNode }) => {
  return <DialerShell>{children}</DialerShell>;
};

export default layout;

