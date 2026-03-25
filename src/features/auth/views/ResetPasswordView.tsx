"use client";

import React from "react";

import AuthBackLink from "@/features/auth/components/AuthBackLink";
import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";
import { authStyles } from "@/features/auth/styles/authStyles";

const ResetPasswordView = () => {
  return (
    <div className={authStyles.pageRoot}>
      <div className={authStyles.pageTopBar}>
        <AuthBackLink href="/dialer/auth/verify-code" />
      </div>

      <div className={authStyles.pageContent}>
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPasswordView;
