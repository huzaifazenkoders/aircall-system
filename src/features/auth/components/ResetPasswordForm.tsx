"use client";

import React from "react";
import { LockKeyhole } from "lucide-react";

import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/ui/password-input";
import { authStyles } from "@/features/auth/styles/authStyles";

const ResetPasswordForm = ({
  onSubmit,
  title = "Reset password",
  subtitle = "Create a new password for your account",
  passwordLabel = "Password",
  confirmPasswordLabel = "Re-type Password",
  submitLabel = "Save"
}: {
  onSubmit?: () => void;
  title?: string;
  subtitle?: string;
  passwordLabel?: string;
  confirmPasswordLabel?: string;
  submitLabel?: string;
}) => {
  const [password, setPassword] = React.useState("*********");
  const [confirmPassword, setConfirmPassword] = React.useState("*********");

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
          <h1 className={authStyles.title}>{title}</h1>
          {subtitle ? <p className={authStyles.subtitle}>{subtitle}</p> : null}
        </div>

        <div className={authStyles.resetFields}>
          <PasswordInput
            id="password"
            label={passwordLabel}
            value={password}
            setValue={setPassword}
            showToggle={false}
            startIcon={
              <LockKeyhole
                className={authStyles.inputIcon}
                aria-hidden="true"
              />
            }
          />

          <PasswordInput
            id="confirmPassword"
            label={confirmPasswordLabel}
            value={confirmPassword}
            setValue={setConfirmPassword}
            showToggle={false}
            startIcon={
              <LockKeyhole
                className={authStyles.inputIcon}
                aria-hidden="true"
              />
            }
          />
        </div>
      </div>

      <Button type="submit" size="xl" className={authStyles.ctaButton}>
        {submitLabel}
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
