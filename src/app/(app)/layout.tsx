import React from "react";

import AppShell from "@/components/custom/app-shell/AppShell";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <AppShell>{children}</AppShell>;
};

export default layout;
