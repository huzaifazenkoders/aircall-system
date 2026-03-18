"use client";

import React from "react";
import { KeyRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { authStyles } from "@/features/auth/styles/authStyles";

const OtpVerificationForm = ({
  onSubmit,
  hint = "Enter the 6-digit code we sent to your email"
}: {
  onSubmit?: () => void;
  hint?: string;
}) => {
  const [otp, setOtp] = React.useState("");

  return (
    <form
      className={authStyles.formRoot}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
    >
      <div className={authStyles.formSection}>
        <div className={authStyles.titleBlock}>
          <h1 className={authStyles.title}>OTP Verification</h1>
          <p className={authStyles.subtitle}>{hint}</p>
        </div>

        <TextInput
          id="otp"
          label="OTP Code"
          value={otp}
          setValue={setOtp}
          placeholder="Enter OTP"
          inputMode="numeric"
          startIcon={
            <KeyRound className={authStyles.inputIcon} aria-hidden="true" />
          }
        />
      </div>

      <Button type="submit" size="xl" className={authStyles.ctaButton}>
        Verify Code
      </Button>
    </form>
  );
};

export default OtpVerificationForm;
