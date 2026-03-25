"use client";

import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { dialerAuthStyles } from "@/features/dialer-auth/styles/dialerAuthStyles";

const DialerAuthVerifyCodeForm = () => {
  const [otp, setOtp] = React.useState(["1", "", "", "", "", ""]);

  return (
    <form className={dialerAuthStyles.formRoot}>
      <div className={dialerAuthStyles.formSection}>
        <div className={dialerAuthStyles.titleBlock}>
          <h1 className={dialerAuthStyles.title}>Verify code</h1>
          <p className={dialerAuthStyles.otpIntro}>
            We&apos;ve sent a 6-digit code to{" "}
            <span className={dialerAuthStyles.otpStrong}>alex@example.com</span>.
            Enter it below to verify your email and continue.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className={dialerAuthStyles.otpGrid}>
            {otp.map((digit, index) => (
              <input
                key={`dialer-auth-otp-${index}`}
                value={digit}
                placeholder="-"
                onChange={(event) => {
                  const next = [...otp];
                  next[index] = event.target.value.slice(-1);
                  setOtp(next);
                }}
                inputMode="numeric"
                maxLength={1}
                aria-label={`Verification digit ${index + 1}`}
                className={cn(
                  dialerAuthStyles.otpCell,
                  index === 0 && dialerAuthStyles.otpCellActive
                )}
              />
            ))}
          </div>

          <Button type="submit" size="xl" className={dialerAuthStyles.button}>
            Verify
          </Button>

          <p className={dialerAuthStyles.otpFooter}>
            Didn&apos;t receive a code?{" "}
            <Link href="/dialer-auth/forgot-password" className={dialerAuthStyles.otpFooterLink}>
              Resend
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default DialerAuthVerifyCodeForm;
