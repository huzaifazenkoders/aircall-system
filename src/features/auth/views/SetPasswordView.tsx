"use client";

import React from "react";

import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";
import { authStyles } from "@/features/auth/styles/authStyles";

const SetPasswordView = () => {
  return (
    <div className={authStyles.pageRoot}>
      <div className={authStyles.pageContentNoTopBar}>
        <ResetPasswordForm
          title="Set Your Password"
          subtitle=""
          passwordLabel="New Password"
          confirmPasswordLabel="Confirm New Password"
          submitLabel="Save"
        />
      </div>
    </div>
  );
};

export default SetPasswordView;
