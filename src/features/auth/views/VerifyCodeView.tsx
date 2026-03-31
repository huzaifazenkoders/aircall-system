"use client";

import React from "react";

import AuthBackLink from "@/features/auth/components/AuthBackLink";
import OtpVerificationForm from "@/features/auth/components/OtpVerificationForm";
import { authStyles } from "@/features/auth/styles/authStyles";

const VerifyCodeView = () => {
  return (
    <div className={authStyles.pageRoot}>
      <div className={authStyles.pageTopBar}>
        <AuthBackLink href="/auth/forgot-password" />
      </div>

      <div className={authStyles.pageContent}>
        <OtpVerificationForm />
      </div>
    </div>
  );
};

export default VerifyCodeView;
