"use client";

import React from "react";
import { KeyRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { cn } from "@/lib/utils";

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
      className={cn("w-full", "max-w-114", "space-y-10")}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
    >
      <div className={cn("space-y-8")}>
        <div className={cn("space-y-1.5")}>
          <h1 className={cn("text-[28px]", "font-semibold", "text-text-primary")}>
            OTP Verification
          </h1>
          <p className={cn("text-base", "text-text-secondary")}>{hint}</p>
        </div>

        <TextInput
          id="otp"
          label="OTP Code"
          value={otp}
          setValue={setOtp}
          placeholder="Enter OTP"
          inputMode="numeric"
          startIcon={<KeyRound className={cn("size-5", "text-primary")} aria-hidden="true" />}
        />
      </div>

      <Button type="submit" size="xl" className={cn("w-full")}>
        Verify Code
      </Button>
    </form>
  );
};

export default OtpVerificationForm;

