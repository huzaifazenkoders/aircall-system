"use client";

import { LockKeyhole } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/ui/password-input";
import { dialerAuthStyles } from "@/features/dialer-auth/styles/dialerAuthStyles";

const DialerAuthResetPasswordForm = ({
  title = "Reset password",
  subtitle = "Create a new password for your account",
  passwordLabel = "Password",
  confirmPasswordLabel = "Re-type Password",
}: {
  title?: string;
  subtitle?: string;
  passwordLabel?: string;
  confirmPasswordLabel?: string;
}) => {
  const [password, setPassword] = React.useState("*********");
  const [confirmPassword, setConfirmPassword] = React.useState("*********");

  return (
    <form className={dialerAuthStyles.formRoot}>
      <div className={dialerAuthStyles.formSection}>
        <div className={dialerAuthStyles.titleBlock}>
          <h1 className={dialerAuthStyles.title}>{title}</h1>
          {subtitle ? <p className={dialerAuthStyles.subtitle}>{subtitle}</p> : null}
        </div>

        <div className={dialerAuthStyles.fieldStack}>
          <PasswordInput
            id="dialer-auth-reset-password"
            label={passwordLabel}
            value={password}
            setValue={setPassword}
            showToggle={false}
            startIcon={
              <LockKeyhole
                className={dialerAuthStyles.inputIcon}
                aria-hidden="true"
              />
            }
            labelClassName={dialerAuthStyles.inputLabel}
            className={dialerAuthStyles.inputField}
          />

          <PasswordInput
            id="dialer-auth-reset-confirm-password"
            label={confirmPasswordLabel}
            value={confirmPassword}
            setValue={setConfirmPassword}
            showToggle={false}
            startIcon={
              <LockKeyhole
                className={dialerAuthStyles.inputIcon}
                aria-hidden="true"
              />
            }
            labelClassName={dialerAuthStyles.inputLabel}
            className={dialerAuthStyles.inputField}
          />
        </div>
      </div>

      <Button type="submit" size="xl" className={dialerAuthStyles.button}>
        Save
      </Button>
    </form>
  );
};

export default DialerAuthResetPasswordForm;
