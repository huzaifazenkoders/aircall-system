import React from "react";

import { authStyles } from "@/features/auth/styles/authStyles";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={authStyles.authLayoutRoot}>
      <div className={authStyles.heroPanel}>
        <h1 className={authStyles.heroTitle}>
          Where Lead Routing Meets Smart Calling
        </h1>
        <p className={authStyles.heroSubtitle}>
          Centralize outbound calling, manage priority lists, and optimize lead
          distribution all in one streamlined platform built for
          high-performance sales teams.
        </p>
      </div>
      <div className={authStyles.authContentPanel}>{children}</div>
    </div>
  );
};

export default AuthLayout;
