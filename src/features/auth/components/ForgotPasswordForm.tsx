"use client";

import React from "react";
import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { authStyles } from "@/features/auth/styles/authStyles";

const ForgotPasswordForm = ({ onSubmit }: { onSubmit?: () => void }) => {
  const [email, setEmail] = React.useState("john.doe@email.com");

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
          <h1 className={authStyles.title}>Forgot Password</h1>
          <p className={authStyles.subtitle}>
            Enter your email address and we&apos;ll send you an otp to reset
            your password
          </p>
        </div>

        <div className={authStyles.fieldStack}>
          <TextInput
            id="email"
            label="Email address"
            value={email}
            setValue={setEmail}
            placeholder="john.doe@email.com"
            startIcon={
              <Mail className={authStyles.inputIcon} aria-hidden="true" />
            }
          />
        </div>
      </div>

      <Button type="submit" size="xl" className={authStyles.ctaButton}>
        Send Code
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
