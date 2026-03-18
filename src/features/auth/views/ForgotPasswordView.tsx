"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";

import { authStyles } from "@/features/auth/styles/authStyles";

import AuthBackLink from "../components/AuthBackLink";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import OtpVerificationForm from "../components/OtpVerificationForm";
import ResetPasswordForm from "../components/ResetPasswordForm";

const ForgotPasswordView = () => {
  const [step, setStep] = React.useState<"email" | "otp" | "reset">("email");

  return (
    <div className={authStyles.pageRoot}>
      <div className={authStyles.pageTopBar}>
        {step === "email" ? (
          <AuthBackLink />
        ) : (
          <button
            type="button"
            onClick={() => {
              setStep((prev) => (prev === "reset" ? "otp" : "email"));
            }}
            className={authStyles.backButton}
          >
            <ArrowLeft className={authStyles.backIcon} aria-hidden="true" />
            <span>Back</span>
          </button>
        )}
      </div>

      <div className={authStyles.pageContent}>
        {step === "email" && (
          <ForgotPasswordForm onSubmit={() => setStep("otp")} />
        )}
        {step === "otp" && (
          <OtpVerificationForm onSubmit={() => setStep("reset")} />
        )}
        {step === "reset" && (
          <ResetPasswordForm onSubmit={() => setStep("email")} />
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordView;
