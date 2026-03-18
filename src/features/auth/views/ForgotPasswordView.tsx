"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";

import { cn } from "@/lib/utils";

import AuthBackLink from "../components/AuthBackLink";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import OtpVerificationForm from "../components/OtpVerificationForm";
import ResetPasswordForm from "../components/ResetPasswordForm";

const ForgotPasswordView = () => {
  const [step, setStep] = React.useState<"email" | "otp" | "reset">("email");

  return (
    <div className={cn("flex", "min-h-screen", "w-full", "flex-col")}>
      <div className={cn("px-8", "pt-8")}>
        {step === "email" ? (
          <AuthBackLink />
        ) : (
          <button
            type="button"
            onClick={() => {
              setStep((prev) => (prev === "reset" ? "otp" : "email"));
            }}
            className={cn(
              "inline-flex",
              "items-center",
              "gap-2",
              "text-sm",
              "font-medium",
              "text-text-primary",
              "transition-colors",
              "hover:text-secondary"
            )}
          >
            <ArrowLeft className={cn("size-4")} aria-hidden="true" />
            <span>Back</span>
          </button>
        )}
      </div>

      <div className={cn("flex", "flex-1", "items-center", "justify-center", "px-8", "pb-10")}>
        {step === "email" && <ForgotPasswordForm onSubmit={() => setStep("otp")} />}
        {step === "otp" && <OtpVerificationForm onSubmit={() => setStep("reset")} />}
        {step === "reset" && <ResetPasswordForm onSubmit={() => setStep("email")} />}
      </div>
    </div>
  );
};

export default ForgotPasswordView;
