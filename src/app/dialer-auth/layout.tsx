import React from "react";

import DialerAuthLayout from "@/features/dialer-auth/layout/DialerAuthLayout";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <DialerAuthLayout>{children}</DialerAuthLayout>;
};

export default layout;
