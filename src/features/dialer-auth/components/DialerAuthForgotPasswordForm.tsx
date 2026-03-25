"use client";

import { Mail } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { dialerAuthStyles } from "@/features/dialer-auth/styles/dialerAuthStyles";

const DialerAuthForgotPasswordForm = () => {
  const [email, setEmail] = React.useState("john.doe@email.com");

  return (
    <form className={dialerAuthStyles.formRoot}>
      <div className={dialerAuthStyles.formSection}>
        <div className={dialerAuthStyles.titleBlock}>
          <h1 className={dialerAuthStyles.title}>Forgot Password</h1>
          <p className={dialerAuthStyles.subtitle}>
            Enter your email address and we&apos;ll send you an otp to reset
            your password
          </p>
        </div>

        <TextInput
          id="dialer-auth-forgot-email"
          label="Email address"
          value={email}
          setValue={setEmail}
          placeholder="john.doe@email.com"
          startIcon={<Mail className={dialerAuthStyles.inputIcon} aria-hidden="true" />}
          labelClassName={dialerAuthStyles.inputLabel}
          className={dialerAuthStyles.inputField}
        />
      </div>

      <Button type="submit" size="xl" className={dialerAuthStyles.button}>
        Send Code
      </Button>
    </form>
  );
};

export default DialerAuthForgotPasswordForm;
