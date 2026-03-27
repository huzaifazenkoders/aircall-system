"use client";

import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { authStyles } from "@/features/auth/styles/authStyles";
import { cn } from "@/lib/utils";
import OtpInput from "@/components/ui/otp-input.component";

const OtpVerificationForm = ({
  onSubmit,
  email = "alex@example.com"
}: {
  onSubmit?: () => void;
  email?: string;
}) => {
  const [otp, setOtp] = React.useState(["1", "", "", "", "", ""]);

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
          <h1 className={authStyles.title}>Verify code</h1>
          <p className={authStyles.otpIntro}>
            We&apos;ve sent a 6-digit code to{" "}
            <span className={authStyles.otpStrong}>{email}</span>. Enter it
            below to verify your email and continue.
          </p>
        </div>

        <div className={authStyles.otpActions}>
          <OtpInput />

          <Button type="submit" size="xl" className={authStyles.ctaButton}>
            Verify
          </Button>

          <p className={authStyles.otpFooter}>
            Didn&apos;t receive a code?{" "}
            <Link
              href="/dialer/auth/forgot-password"
              className={authStyles.otpResend}
            >
              Resend
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default OtpVerificationForm;
