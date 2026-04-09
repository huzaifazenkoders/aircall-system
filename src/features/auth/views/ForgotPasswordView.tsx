"use client";

import React from "react";

import { authStyles } from "@/features/auth/styles/authStyles";

import AuthBackLink from "../components/AuthBackLink";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

const ForgotPasswordView = () => {
  return (
    <div className={authStyles.pageRoot}>
      <div className={authStyles.pageTopBar}>
        <AuthBackLink href="/auth/sign-in" />
      </div>

      <div className={authStyles.pageContent}>
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPasswordView;
