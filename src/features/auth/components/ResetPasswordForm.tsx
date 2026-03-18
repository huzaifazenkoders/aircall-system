"use client";

import React from "react";
import { LockKeyhole } from "lucide-react";

import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/ui/password-input";
import { authStyles } from "@/features/auth/styles/authStyles";

const ResetPasswordForm = ({ onSubmit }: { onSubmit?: () => void }) => {
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
          <h1 className={authStyles.title}>Reset password</h1>
          <p className={authStyles.subtitle}>
            Create a new password for your account
          </p>
        </div>

        <div className={authStyles.resetFields}>
          <PasswordInput
            id="password"
            label="Password"
            value={password}
            setValue={setPassword}
            startIcon={
              <LockKeyhole
                className={authStyles.inputIcon}
                aria-hidden="true"
              />
            }
          />

          <PasswordInput
            id="confirmPassword"
            label="Re-type Password"
            value={confirmPassword}
            setValue={setConfirmPassword}
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
        Save
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
